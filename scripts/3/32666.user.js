// ==UserScript==
// @name          Boston University Login Hack
// @namespace      https://weblogin.bu.edu
// @description   Allows you to save your password on BU websites
// @include       http://weblogin.bu.edu/*
// @include       https://weblogin.bu.edu/*
// ==/UserScript==

/* This code circumvents BU not allowing people to store passwords
* in their browsers. It really isn't super secure, so definitely do
* not use it if you are worried about security. Mainly, you have to store
* your password in plain text, so it would be easy to steal. However, if you
* are like me and don't care, but want convenience, then go ahead.  
*
* IMPORTANT: You have to edit the username and password fields below to 
* be correct. Enjoy!
 */

// ==/UserScript==


function doLogin() 
{
	theform = document.forms.namedItem("theform");
	user = theform.elements.namedItem("user");
	pw2 = theform.elements.namedItem("pw2");
	pw = theform.elements.namedItem("pw");
	
	user.value = "username"; 
	pw2.focus(); 
	pw2.value = "password"; 
	allowSubmit = 1;  
	canCopyData = 1; 
	doSubmit = function() {allowSubmit = 0; return true;};  
	pw.value = pw2.value; 
	pw2.value.replace(/.+/g, "*"); 
	copiedData = 1; theform.submit(); 
}

doLogin()