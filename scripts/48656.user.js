// ==UserScript==
// @name           fightwest autologin
// @namespace      fightwest autologin
// @description    fightwest autologin
// @include        http://www.fightwest.com/*
// ==/UserScript==

// Edit these options :

name="username";
pass="password";

// Do not touch these
document.getElementsByName('username')[0].value=name;         		 // Write username
document.getElementsByName('password')[0].value=pass;    		 // Write password
document.getElementByName('loginform').submit();				 // Log in