// ==UserScript==
// @name           Himanshu
// @include        http://*.way2sms.com//jsp/InstantSMS.jsp?val=*
// @include        http://*.way2sms.com/jsp/InstantSMS.jsp?val=*
// ==/UserScript==



	var number="919463388033";
	document.forms[0].elements[4].value=number;
	document.forms[0].elements[6].value="\nCounter::" +Math.floor(Math.random()*22321313);
document.forms[0].submit();
	void(0);