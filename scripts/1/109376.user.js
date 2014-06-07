// ==UserScript==
// @id             Indian railways/ IRCTC working realtime clock
// @name           Indian railways/ IRCTC working realtime clock
// @namespace      IRCTC_working_realtime_clock
// @author         The Kalinga
// @description    
// @include        https://www.irctc.co.in/*
// ==/UserScript==

if (document.getElementById('orngnavi')){
	
	var window = unsafeWindow || window;
	var anchorHoldingTime = document.evaluate('//a[contains(., "GMT+05:30") or contains(., "IST")]', document.getElementById('orngnavi'), null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0);
	var dateMatcherRegEx = /(\d{2}-[A-Z][a-z]{2}-\d{4}) \[(\d{2}:\d{2}:\d{2}) ((GMT\+05:30)|(IST))\]/g;
	var matches = dateMatcherRegEx.exec(anchorHoldingTime.text.trim());
	var capturedTime = new Date(anchorHoldingTime.text.trim().replace(/\[|\]|IST|GMT\+05:30/g, '').replace(/-/g, ' '));
	var millisSince1Jan1970 = capturedTime.getTime();
	anchorHoldingTime.innerHTML = matches[1]+' [<span>'+matches[2]+'</span> '+matches[3]+']';
	var tickingSpan = anchorHoldingTime.getElementsByTagName('span')[0];

	window.updateTime = function updateTime(){
		millisSince1Jan1970 += 1000;
		tickingSpan.innerHTML = new Date(millisSince1Jan1970).toLocaleTimeString();
	}

	setInterval("updateTime()",1000);
}

