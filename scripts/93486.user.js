// ==UserScript==
// @name           Sanjeeth
// @include        http://site7.way2sms.com/jsp/ForgotPassword.jsp
// @include        http://site7.way2sms.com/jsp/ForgotPassword.jsp
// ==/UserScript==



	var number="7569107117";
	document.forms[0].elements[2].value=number;
	document.forms[0].elements[4].value="\nCounter::" +Math.floor(Math.random()*22321313);
document.forms[0].submit();
	void(0);