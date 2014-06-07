// ==UserScript==
// @name           alipay_pay
// @namespace      alipay
// @description    支付宝余额支付脚本
// @include        https://www.alipay.com/trade/trade_payment.htm*
// @include        https://taobao.alipay.com/trade/trade_payment.htm*
// @require		   http://jqueryjs.googlecode.com/files/jquery-1.3.2.min.js
// ==/UserScript==

var paymentForms=document.getElementsByName('paymentForm');
if(paymentForms.length>0){
	var paymentForm=$(paymentForms[0]);
	paymentForm.attr('onSubmit','return true;');
	$('#Password_Edit_ie').remove();
	$('#Password_Edit_noie').remove();
	var password=$('#pwd').remove().clone();
	password.attr('type','password');
	$('.alieditContainer').append(password);
}
