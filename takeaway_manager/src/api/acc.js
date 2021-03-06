// 账号api模块
import request from "@/utils/request";
// 引入qs转post请求
import Qs from "qs";

// 获取 登录接口
export const login_api = (data) => {
	return request({
		method: "post",
		url: "/users/checkLogin",
		data: Qs.stringify(data),
	});
};

// 获取 账号列表
export const accList_api = (data) => {
	return request({
		method: "get",
		url: "/users/list",
		params: data,
	});
};

// 添加 账号
export const addList_api = (data) => {
	return request({
		method: "post",
		url: "/users/add",
		data: Qs.stringify(data),
	});
};

// 删除 账号
export const delAcc_api = (data) => {
	return request({
		method: "get",
		url: "/users/del",
		params: data,
	});
};

// 删除 批量账号
export const delAll_api = (data) => {
	return request({
		method: "get",
		url: "/users/batchdel",
		params: data,
	});
};

// 修改 账号
export const changeGroup_api = (data) => {
	return request({
		method: "post",
		url: "/users/edit",
		data: Qs.stringify(data),
	});
};

// 修改 密码
export const changePwd_api = (data) => {
	return request({
		method: "post",
		url: "/users/editpwd",
		data: Qs.stringify(data),
	});
};

// 检测 旧密码正确
export const checkOldPwd_api = (data) => {
	return request({
		method: "get",
		url: "/users/checkoldpwd",
		params: data,
	});
};

// 获取 个人信息
export const getInfo_api = () => {
	return request({
		method: "get",
		url: "/users/info",
	});
};

// 获取 身份角色
export const getRole_api = () => {
	return request({
		method: "get",
		url: "/users/role",
	});
};

// 修改 头像
export const editImg_api = (data) => {
	return request({
		method: "get",
		url: "/users/avataredit",
		params: data,
	});
};
