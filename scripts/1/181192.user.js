// ==UserScript==
// @name        my.gcc.edu Auto-login
// @namespace   http://userscripts.org/users/WernieBert
// @include     https://my.gcc.edu/*
// @version     1
// @grant       none
// ==/UserScript==

//-------------------------------------------------------------
// To use:
// replace USERID and PASSWORD below with your id and password

var userId   = "USERID";
var password = "PASSWD";

//-------------------------------------------------------------



if (userName.length != 0 && userId != "USERID" && password != "PASSWD")
{
    document.getElementById("userName").value = userId; 
    document.getElementById("password").value = password;
    document.getElementById("btnLogin").click();    
}