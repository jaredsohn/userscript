// ==UserScript==
// @name           Sms440 By kingmachinee
// @include        http://*smsspark.com/quick_sms.php
// @include        http://*smsspark.com/submit_success.php?mob=9823143195
// @include        http://*smsspark.com*
// @description    Send SMS
// @copyright      kingmachinee
// ==/UserScript==


if(document.location=="http://smsspark.com/quick_sms.php#"||document.location=="http://www.smsspark.com/quick_sms.php#")
{
var code;
document.getElementById('txt_Number').value=9823143195;
code='Testing';
document.getElementByName('quickSMSMessage').value=code;
void(0);
document.getElementById('sendButtonID****').click();
}

if(document.location=="http://smsspark.com/submit_success.php?mob=9823143195")
{
setTimeout('document.location="http://smsspark.com/quick_sms.php"',3000);
}