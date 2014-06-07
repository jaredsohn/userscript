// ==UserScript==
// @name           alipay_cooperate
// @namespace      alipay
// @description    支付宝合作商户登录脚本
// @include        https://www.alipay.com/cooperate/*
// @require		http://jqueryjs.googlecode.com/files/jquery-1.3.2.min.js
// ==/UserScript==

var loginForms=document.getElementsByName('login');
if(loginForms.length>0){
	var loginForm=$(loginForms[0]);
	loginForm.attr('onSubmit','return true;');
}
var password=$('#password').remove().clone();
password.attr('type','password');
$('.alieditContainer').empty().append(password);
