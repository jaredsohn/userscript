// ==UserScript==
// @name           alipay_withdraw
// @namespace      alipay
// @description    支付宝提现脚本
// @include        https://www.alipay.com/withdraw/common_withdraw.htm
// @require		   http://jqueryjs.googlecode.com/files/jquery-1.3.2.min.js
// ==/UserScript==

var withDrawForms=document.getElementsByName('form1');
if(withDrawForms.length>0){
	var withDrawForm=$(withDrawForms[0]);
	withDrawForm.attr('onSubmit','return true;');
	var submitButtons=document.getElementsByName('submit2');
	if(submitButtons.length>0){
		$(submitButtons[0]).remove();
	}
}
var password=$('#password').remove().clone();
password.attr('type','password');
$('.alieditContainer').empty().append(password);
$('.alieditContainer').after("<input type='submit'>");
