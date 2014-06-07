// ==UserScript==
// @name           NYT Paywall Remover
// @description    Hide the NYT paywall overlay
// @version	   3.1
// @include        http*://nytimes.com/*
// @include        http*://*.nytimes.com/*
// ==/UserScript==

GM_addStyle("#overlay, #gatewayCreative {display:none !important;}");
GM_addStyle("html {overflow:auto !important;}");

setTimeout(function() {
	if (document.querySelectorAll('#overlay, #gatewayCreative').length > 0) {
		var _div = document.createElement('div');
		_div.innerHTML = '<div  id="lookofdisapproval" style="z-index: 9999; position: fixed; right: 5px; bottom: 10px; font-size: 18px; font-weight: bold;">&#3232;_&#3232;</div><img src="http://graphics8.nytimes.com/images/misc/nytlogo152x23.gif" onload="document.onkeypress=null;" height="0" />';
		document.body.appendChild(_div);
	}
}, 750);