<template>
	<div class="acc-eidit">
		<Card>
			<header slot="title">
				<span>账号列表</span>
				<el-button type="info" size="mini" round @click="export2Excel()">导出表格</el-button>
			</header>
			<main slot="content">
				<!-- 表格 -->
				<el-table
					ref="accData"
					tooltip-effect="dark"
					style="width: 100%"
					:data="accData"
					@selection-change="sel"
				>
					<el-table-column type="selection" width="55px" :selectable="selectEnable"></el-table-column>

					<el-table-column label="账号">
						<template slot-scope="scope">
							{{ scope.row.account }}
						</template>
					</el-table-column>

					<el-table-column label="用户组">
						<template slot-scope="scope">
							{{ scope.row.userGroup }}
						</template>
					</el-table-column>

					<el-table-column label="创建时间" show-overflow-tooltip>
						<template slot-scope="scope">
							{{ scope.row.ctime | filtime }}
						</template>
					</el-table-column>

					<el-table-column prop="name" label="操作" width="150px">
						<template slot-scope="scope">
							<el-button type="primary" size="mini" @click="edit(scope.row)">编辑</el-button>
							<el-button
								type="danger"
								size="mini"
								:disabled="scope.row.id == currentId ? true : false"
								@click="del(scope.row)"
							>
								删除
							</el-button>
						</template>
					</el-table-column>
				</el-table>

				<!-- 分页器 -->
				<el-pagination
					layout="total, sizes, prev, pager, next, jumper"
					:total="total"
					:page-size="pageSize"
					:current-page="currentPage"
					:page-sizes="[5, 10, 20]"
					@size-change="handleSizeChange($event)"
					@current-change="handleCurrentChange($event)"
				></el-pagination>

				<!-- 操作按钮 -->
				<div class="operate-btn">
					<el-button type="danger" size="medium" round @click="delAll()">批量删除</el-button>
					<el-button type="primary" size="medium" round @click="cancel()">取消选择</el-button>
				</div>

				<!-- 弹窗 -->
				<el-dialog class="dialog" ref="dialog" title="修改信息" :visible.sync="isShow">
					<el-form :model="eiditForm">
						<el-form-item label="账号" label-width="100px">
							<el-input v-model="eiditForm.account" autocomplete="off"></el-input>
						</el-form-item>
						<el-form-item label="用户组" label-width="100px">
							<el-select v-model="eiditForm.userGroup" placeholder="请选择用户组">
								<el-option label="超级管理员" value="超级管理员"></el-option>
								<el-option label="普通管理员" value="普通管理员"></el-option>
							</el-select>
						</el-form-item>
					</el-form>
					<div slot="footer" class="dialog-footer">
						<el-button size="medium" round @click="isShow = false">取消</el-button>
						<el-button type="primary" size="medium" round @click="finish()">确定</el-button>
					</div>
				</el-dialog>
			</main>
		</Card>
	</div>
</template>

<script>
import Card from "@/components/Card.vue";
import { accList_api, delAcc_api, delAll_api, changeGroup_api } from "@/api/acc";
import moment from "moment";
import local from "@/utils/local";

export default {
	components: {
		Card,
	},

	data() {
		return {
			isShow: false, // 控制弹窗显示或者隐藏
			eiditForm: {}, // 编辑弹窗的数据
			currentPage: 1, // 当前分页器要显示第几页数据
			pageSize: 5, // 每页显示几条数据
			total: 20, // 总条数
			accData: [], // 账号数据
			ids: [], // 批量删除需要的数组
			currentId: "",
		};
	},

	created() {
		this.currentId = local.get("info").id;
		this.getList();
		// 颜色
		this.$nextTick(function() {
			this.bgColor = this.$store.state.nowColor;
		});
	},

	mounted() {
		this.$refs.dialog.$el.children[0].style.backgroundColor = this.bgColor;
	},

	computed: {
		bgColor: {
			get() {
				return this.$store.state.nowColor;
			},
			set(v) {},
		},
	},

	watch: {
		bgColor(newVal) {
			document.getElementsByClassName("el-dialog")[0].style.backgroundColor = newVal;
		},
	},
	// 过滤器
	filters: {
		filtime(val) {
			return moment(val).format("YYYY/MM/DD HH:mm");
		},
	},

	methods: {
		// 获取列表
		async getList() {
			let res = await accList_api({
				currentPage: this.currentPage,
				pageSize: this.pageSize,
			});
			let { data, total } = res.data;
			// 页码必须大于0
			if (data.length == 0 && this.currentPage > 1) {
				this.currentPage--;
				// 重绘
				this.getList();
			}
			// 数据
			this.accData = data;
			// 总条数
			this.total = total;
		},
		// 编辑
		edit(row) {
			// 弹窗
			this.isShow = true;
			this.eiditForm = {
				// 浅拷贝
				...row,
			};
		},
		// 编辑完成
		async finish() {
			let res = await changeGroup_api({
				id: this.eiditForm.id,
				account: this.eiditForm.account,
				userGroup: this.eiditForm.userGroup,
			});
			// 成功
			if (res.data.code == 0) {
				// 重绘
				this.getList();
			}
			this.isShow = false;
		},
		// 删除
		del(row) {
			this.$confirm(`此操作将永久删除 ${row.account} ，是否继续?`, "提示", {
				confirmButtonText: "确定",
				cancelButtonText: "取消",
				type: "warning",
			})
				.then(async () => {
					// 确定
					let res = await delAcc_api({
						id: row.id,
					});
					// 成功
					if (res.data.code == 0) {
						// 重绘
						this.getList();
					}
				})
				.catch(() => {});
		},
		// 批量删除
		async delAll() {
			this.$confirm("此操作将永久删除该用户, 是否继续?", "提示", {
				confirmButtonText: "确定",
				cancelButtonText: "取消",
				type: "warning",
			})
				.then(async () => {
					// 判断是否为空
					if (this.ids.length != 0) {
						// 确定
						let res = await delAll_api({
							ids: JSON.stringify(this.ids),
						});
						// 成功
						if (res.data.code == 0) {
							// 重绘
							this.getList();
						}
					}
				})
				.catch(() => {});
		},
		// 多选
		sel(val) {
			this.ids = val.map((item) => item.id);
		},
		// 取消选择
		cancel() {
			this.$refs.accData.clearSelection();
		},
		// 禁用当前账号多选框
		selectEnable(row, rowIndex) {
			if (this.currentId == row.id) {
				return false;
			} else {
				return true; // 不禁用
			}
		},
		// 导出数据
		export2Excel() {
			require.ensure([], () => {
				const { export_json_to_excel } = require("../../../excel/Export2Excel"); // 这里 require 写你的Export2Excel.js的绝对地址
				const tHeader = ["账号", "用户组", "创建时间"]; //对应表格输出的title
				const filterVal = ["account", "userGroup", "ctime"]; // 对应表格输出的数据
				const list = this.accData;
				const data = this.formatJson(filterVal, list);
				export_json_to_excel(tHeader, data, "账号列表"); //对应下载文件的名字
			});
		},
		formatJson(filterVal, jsonData) {
			return jsonData.map((v) => filterVal.map((j) => v[j]));
		},
		// 条数
		handleSizeChange(val) {
			this.pageSize = val;
			this.getList();
		},
		// 页数
		handleCurrentChange(val) {
			this.currentPage = val;
			this.getList();
		},
	},
};
</script>

<style lang="less" scoped src="../../../assets/styles/common.less"></style>
<style lang="less" scoped>
.acc-eidit {
    header {
        display: flex;

        align-items: center;
        justify-content: space-between;
    }

    // 操作按钮
    .operate-btn {
        margin-top: 20px;
    }
}

</style>
