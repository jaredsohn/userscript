// ==UserScript==
// @name		Bank Hack of Ecitic 中信银行信用卡网上银行Firefox支持修正
// @author		litao
// @update		2007-jul-20
// @namespace     	http://web2.0geek.org/userjs
// @description		hack to login credit card of ecitic bank
// @include		https://creditcard.ecitic.com/cardbank/logon.jsp
// ==/UserScript==
	
window.addEventListener('load',
    function() {
//document.all.editForm.LOGPASS.readOnly=false;
document.getElementById('LOGPASS').readOnly=false;
},false);

//End