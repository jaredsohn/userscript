// ==UserScript==
// @name           DarkReject Autologin
// @namespace      DarkReject Autologin
// @description    DarkReject Autologin
// @include        http://www.darkreject.com/*
// ==/UserScript==

// Edit these options :

email="email";
pass="password";

// Do not touch these
document.getElementsByName('email')[0].value=email;         		 // Write username
document.getElementsByName('password2')[0].value=pass;    		 // Write password
document.getElementsByName('email')[0].form.submit();				 // Log in