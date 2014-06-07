// ==UserScript==
// @name           Photobucket autologin
// @namespace      Photobucket autologin
// @description    Photobucket autologin
// @include        http://photobucket.com/*
// ==/UserScript==

there is one bug if the user name or password is wrong then it just continues to login with the wrong user or pass

// Edit these options email or username=name, password=pass just fill it in and when you open Photobucket it will automatically log you in.
// If you what it to remember you put "yes" in rem if no put "no" it will nor remember you if you put any thing else

name="email or username";
pass="password";
rem="yes"

// Do not Edit these
document.getElementsByName("loginForm[usernameemail]")[0].value=name;   	      // Write username
document.getElementsByName("loginForm[password]")[0].value=pass;                 // Write password
if (rem="yes")
  {
   document.getElementsByName("loginForm[rememberOnOff]")[0].checked=true;       //Remember me
  } else {
   document.getElementsByName("loginForm[rememberOnOff]")[0].checked=false;
  }
document.getElementById("formHeaderLogin").submit();		                             // Log in