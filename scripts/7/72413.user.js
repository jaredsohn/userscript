// ==UserScript==
// @name           alipay_change_email
// @namespace      alipay
// @description    支付宝改email脚本
// @include        https://lab.alipay.com/user/loginName/emailChange.htm*
// @include        https://lab.alipay.com/user/loginName/emailChangeConfirm.htm*
// @require		   http://jqueryjs.googlecode.com/files/jquery-1.3.2.min.js
// ==/UserScript==

if($('#changeEmailForm').length>0){
	var changeEmailForm=$('#changeEmailForm').remove().clone();
	$('.fm-input').prepend(changeEmailForm);
}else{
	var emalChangeForm=$('#emalChangeForm').remove().clone();
	$('.fm-input').prepend(emalChangeForm);
}
if($('#queryPassword').length>0){
	var queryPassword=$('#queryPassword').remove().clone();
	queryPassword.attr('type','password');
	$('.alieditContainer').empty().append(queryPassword);
}else{
	var payPassword=$('#payPassword').remove().clone();
	payPassword.attr('type','password');
	$('.alieditContainer').empty().append(payPassword);
}
