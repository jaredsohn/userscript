// ==UserScript==
// @name           piratequest autologin
// @namespace      piratequest autologin
// @description    piratequest autologin
// @include        http://www.piratequest.net/*
// ==/UserScript==
// rem = remember me yes or no
// Edit these options :

name="username";
pass="password";
rem="yes"

// Do not touch these
document.getElementsById('username_sign_in')[0].value=name;         		 // Write username
document.getElementsById('password_sign_in')[0].value=pass;    		 // Write password
if (rem="yes")
  {
   document.getElementsByName('rememberme')[0].checked=true;       //Remember me
  } else {
   document.getElementsByName('rememberme')[0].checked=false;
  }
document.getElementById("sign-in-form").submit();				 // Log in