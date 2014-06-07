// ==UserScript==
// @name		Lifehacker UK Layout
// @version		1.0
// @namespace		http://userscripts.org/users/72447
// @description		Forwards Gawker sites to their UK counterparts (which don't have the horrendous AJAX layout).
// @include		http://lifehacker.com/*
// @include		http://gizmodo.com/*
// @include		http://gawker.com/*
// @include		http://kotaku.com/*
// @include		http://io9.com/*
// @include		http://jalopnik.com/*
// @include		http://deadspin.com/*
// @inlcude		http://jezebel.com/*
// ==/UserScript==

(function() {
	var loc = /^(https?:\/\/)(deadspin|gizmodo|gawker|kotaku|lifehacker|jezebel|io9|jalopnik)\.com(.+)$/i;
	var match = loc.exec(window.location);
	
	if(match) {
		try { window.stop(); }
		catch(ex) { document.execCommand('Stop'); }
		window.location.href = match[1] + 'uk.' + match[2] + '.com' + match[3];
	}
})();