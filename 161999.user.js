// ==UserScript==
// @name            Feedly - Disable Advertisements
// @namespace       http://userscripts.org/users/CODYQX4
// @version         1.3
// @description     No Advertisements in Feedly
// @include         http://feedly.com/*
// @include         https://feedly.com/*
// @include         http://*.feedly.com/*
// @include         https://*.feedly.com/*
// @run-at          document-start
// ==/UserScript==

// Define GM_addStyle for Cross-Browser Compatibility
if (typeof GM_addStyle == 'undefined') {
	var GM_addStyle = function (css) {
		var head = document.getElementsByTagName('head')[0],
			style = document.createElement('style');
		if (!head) return;
		style.type = 'text/css';
		style.textContent = css;
		head.appendChild(style);
	}
}

// Set Display CSS Style to None
GM_addStyle("#sponsorsModule_part { display: none !important; }");
GM_addStyle("#fusionModule_part { display: none !important; }");
GM_addStyle("#giftsModule_part { display: none !important; }");
GM_addStyle("#mobileModule_part { display: none !important; }");
GM_addStyle("#amazonModule_part { display: none !important; }");