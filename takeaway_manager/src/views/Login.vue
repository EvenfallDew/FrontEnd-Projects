<template>
	<div class="login">
		<main>
			<!-- 标题 -->
			<h2 class="title">外卖管理系统登录</h2>
			<el-form
				class="demo-ruleForm"
				ref="loginForm"
				label-width="100px"
				status-icon
				:model="loginForm"
				:rules="rules"
			>
				<el-form-item label="账号" prop="acc">
					<el-input prefix-icon="iconfont icon-login-acc" size="medium" v-model="loginForm.acc"></el-input>
				</el-form-item>
				<el-form-item label="密码" prop="pwd">
					<el-input
						prefix-icon="iconfont icon-login-psw"
						size="medium"
						v-model="loginForm.pwd"
						:type="isShow ? 'text' : 'password'"
						:suffix-icon="isShow ? 'iconfont icon-login-eye-open' : 'iconfont icon-login-eye-close'"
						@click.native="changeType($event)"
					></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="login()" @keyup.native="loginEnter()">
						登录
					</el-button>
				</el-form-item>
			</el-form>
		</main>
	</div>
</template>

<script>
import { login_api } from "@/api/acc.js";
import local from "@/utils/local";

export default {
	data() {
		return {
			// 表单数据
			loginForm: {
				acc: "",
				pwd: "",
			},
			// 控制眼睛的状态
			isShow: false,
			// 验证规则
			rules: {
				// 验证账号
				acc: [
					{
						required: true,
						message: "账号不能为空",
						trigger: "blur",
					},
					{
						min: 5,
						max: 12,
						message: "长度在 5 到 12 个字符",
						trigger: "blur",
					},
				],
				// 验证密码
				pwd: [
					{
						required: true,
						message: "密码不能为空",
						trigger: "blur",
					},
					{
						min: 5,
						max: 12,
						message: "长度在 5 到 12 个字符",
						trigger: "blur",
					},
				],
			},
		};
	},

	created() {
		this.loginEnter();
	},

	methods: {
		// 登录
		login() {
			this.$refs.loginForm.validate(async (valid) => {
				if (valid) {
					// 登录api
					let res = await login_api({
						account: this.loginForm.acc,
						password: this.loginForm.pwd,
					});
					let { code, role, token } = res.data;
					// 判断code
					if (code == 0) {
						local.set("token", token);
						this.$router.push("/layout");
					}
				} else {
					return;
				}
			});
		},
		// 隐藏或显示密码
		changeType(e) {
			if (e.target.className.includes("eye")) {
				this.isShow = !this.isShow;
			}
		},
		// Enter登录
		loginEnter() {
			document.onkeydown = (e) => {
				if (e.key == "Enter") {
					this.login();
				}
			};
		},
	},
};
</script>

<style lang="less" scoped src="../assets/styles/login.less"></style>
