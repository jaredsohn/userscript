// ==UserScript==
// @name           Auto Num
// @namespace      pta ni
// @description    pta ni
// @include        http://www.freesms8.in/*
// ==/UserScript==

var victim=0000;
if(document.location=="http://www.freesms8.in/quickSMS.aspx"||document.location=="http://www.freesms8.in/QuickSMS.aspx")
{

document.getElementById('ctl00_BodyPlaceHolder_MobileNumber').value=victim;
}