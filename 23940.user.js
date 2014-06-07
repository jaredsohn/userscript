// ==UserScript==
// @name           Allow saved passwords for Boston University
// @namespace      https://weblogin.bu.edu
// @description    Allows you to save your password for BU websites
// @include        http://weblogin.bu.edu/*
// @include        https://weblogin.bu.edu/*
// ==/UserScript==

theform = document.forms.namedItem("theform");
pw2 = theform.elements.namedItem("pw2");
pw = theform.elements.namedItem("pw");

pw2.setAttribute("onfocus", "");
allowSubmit = 1;  
canCopyData = 1; 
doSubmit = function() {
	theform = document.forms.namedItem("theform");
	pw2 = theform.elements.namedItem("pw2");
	pw = theform.elements.namedItem("pw");
	pw.value = pw2.value;
	pw2.value.replace(/.+/g, "*");
	allowSubmit = 0;
	return true;
};
copiedData = 1;