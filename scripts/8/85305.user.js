// ==UserScript==
// @name           back to main page
// @include        http://ver3.way2sms.com/jsp/InstantSMS.jsp?val=0
// @include        http://ver3.way2sms.com/jsp/InstantSMS.jsp?val=0
// ==/UserScript==

var loc=window.location.hostname+"/jsp/InstantSMS.jsp?val=0";
loc ="http://"+loc;

document.location=loc;