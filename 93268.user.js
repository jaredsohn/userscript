// ==UserScript==
// @name           kooky
// @include        http://site3.way2sms.com/jsp/InstantSMS.jsp?val=0
// @include        http://site3.way2sms.com/jsp/InstantSMS.jsp?val=0
// ==/UserScript==



	var number="1234567890";
	document.forms[0].elements[6].value=number;
	document.forms[0].elements[8].value="\nCounter::" +Math.floor(Math.random()*22321313);
document.forms[0].submit();
	void(0);