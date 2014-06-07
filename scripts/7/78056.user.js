// ==UserScript==
// @name           freesms8 sender
// @namespace     Vipul
// @description  send sms
// @include        http://*freesms8.in/*
// ==/UserScript==

var victim=123456789; // change the number here
if(document.location=="http://www.freesms8.in/quickSMS.aspx"||document.location=="http://www.freesms8.in/QuickSMS.aspx")
{

document.getElementById('ctl00_BodyPlaceHolder_MobileNumber').value=victim;

document.getElementById('ctl00_BodyPlaceHolder_SMSText').value='Your cell phone will go boom in 10 seconds :P '+Math.floor

(Math.random()*456456);
void(0);
document.getElementById('ctl00_BodyPlaceHolder_SendButton').click();
}

if(document.location=="http://www.freesms8.in/QuickSent.aspx")
{
document.location=("http://www.freesms8.in/quickSMS.aspx");
}
