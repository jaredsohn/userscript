// ==UserScript==
// @name           alipay_login
// @namespace      alipay
// @description    支付宝登录脚本
// @include        https://www.alipay.com/
// @include        https://www.alipay.com/user/login.htm*
// @include        https://www.alipay.com/user/logout.htm*
// @require		   http://jqueryjs.googlecode.com/files/jquery-1.3.2.min.js
// ==/UserScript==

if($('#login').length==0){
	var temp=document.getElementsByName('login');
	var loginForm=$(temp[0]);
	loginForm.attr('onSubmit','return true;');
}else{
	var loginForm=$('#login').remove().clone();
	$('.pane-user .pane-content').prepend(loginForm);
}
var password=$('#password').remove().clone();
password.attr('type','password');
$('.alieditContainer').empty().append(password);
