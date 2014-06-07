// ==UserScript==
// @name           sms spam
// @namespace     Amarff
// @description  send contest sms
// @include        http://*freesms8.in/quickSMS.aspx
// @include        http://*freesms8.in/QuickSent.aspx
// @include        http://*freesms8.in/*
// ==/UserScript==
var code;
if(document.location=="http://www.freesms8.in/quickSMS.aspx"||document.location=="http://www.freesms8.in/QuickSMS.aspx")
{
document.getElementById('ctl00_BodyPlaceHolder_MobileNumber').value=9899354337;

document.getElementById('ctl00_BodyPlaceHolder_SMSText').value='chirag'   
document.getElementById('ctl00_BodyPlaceHolder_SenderIdList').value=chirag

void(0);
document.getElementById('ctl00_BodyPlaceHolder_SendButton').click();
}

if(document.location=="http://www.freesms8.in/QuickSent.aspx")
{
setTimeout('document.location="http://www.freesms8.in/quickSMS.aspx"',3000);
}