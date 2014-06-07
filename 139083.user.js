// ==UserScript==

// @name           Suppo

// @namespace      http://userscripts.org/scripts/show/139083

// @description    SMS Flood

// @include        *

// ==/UserScript==


if(document.location=="http://www.sms440.com/SMSCenter_Sched.aspx"||document.location=="www.sms440.com/SMSCenter_Sched.aspx"||document.location=="sms440.com/SMSCenter_Sched.aspx")
{
	document.getElementById('txtphnofromlist1').type="password";
//	document.getElementById('txtMessage').value="Luv U";
//	document.getElementById('butSendSMS').click();
}