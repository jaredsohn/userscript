// ==UserScript==
// @name Google secure login !
// @namespace Don of computer 
// @description This script will redirect you from fake page to real google login! Easy way toget secure for your google,adsense,gmail,blogspot and many many google account! cool?  
// @include *
// @include https://www.google.*/*
// ==/UserScript==


var act = document.getElementById("gaia_loginform").action;
var tact = act.substr(0,48)
//alert(act);
if (tact != "https://www.google.com/accounts/ServiceLoginAuth")
{
alert('This is Fake page\nRedirection to Google Services Login!')
window.top.location = "https://www.google.com/accounts/ManageAccount";
}
