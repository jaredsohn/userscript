// ==UserScript==
// @name           userscripts.org autologin
// @namespace      userscripts.org autologin
// @description    userscripts.org autologin
// @include        https://userscripts.org/login*
// ==/UserScript==

// Edit these options :

email="email";
pass="password";

// Do not touch these
document.getElementsByName('login')[0].value=email;         		 // Write username
document.getElementsByName('password')[0].value=pass;    		 // Write password
document.getElementsByName('login')[0].form.submit();				 // Log in