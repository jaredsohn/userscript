// ==UserScript==
// @name           back to main page
// @include        http://*.way2sms.com//jsp/generalconfirm.jsp?*
// @include        http://*.way2sms.com/jsp/generalconfirm.jsp?*
// ==/UserScript==

var loc=window.location.hostname+"/jsp/InstantSMS.jsp?val=1";
loc ="http://"+loc;

document.location=loc;