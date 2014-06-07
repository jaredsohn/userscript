// ==UserScript==
// @name           Yakedi simplifier
// @namespace      http://userscripts.org/user/mmm
// @include        http://www.yakedi.com/*
// @description Skips through the meaningless steps in Yakedi.com
// ==/UserScript==

//alert(window.location.href);


if (window.location.href == "http://www.yakedi.com/") {
	window.location.href = "http://www.yakedi.com/login/";
}

if (window.location.href == "http://www.yakedi.com/login/") {
	document.forms[0].submit();
}

if (window.location.href == "http://www.yakedi.com/user/?txt=Thank+you") {
	window.location.href = "http://www.yakedi.com/user/sendsms/step1/";
}

if (window.location.href == "http://www.yakedi.com/user/sendsms/step3/") {
	document.forms[0].submit();
}

if (window.location.href == "http://www.yakedi.com/user/sendsms/step4/") {
	window.location.href = "http://www.yakedi.com/user/sendsms/step1/";
}
