// ==UserScript==
// @id            org.userscripts.users.warrenbank.yahoomail.remove_ads
// @name          Remove advertisement (clutter) from the new Yahoo! Mail
// @namespace     warren.bank
// @description   Remove advertisement (clutter) from the new Yahoo! Mail.. via a few minor css rules
// @version       2013.11.19
// @author        warren.bank
// @include       /^http[s]?://([^\.]+\.)*mail\.yahoo\.com/.*$/
// ==/UserScript==

/* ****************
 * new css rules:
 * ****************
 *    #slot_REC, #slot_TL1, #theAd, #slot_MB, .attribution-bar {display:none !important;}
 *    #shellcontent {right: 0px !important;}
 * **************** */

(function(){
	var addGlobalStyle = function(css) {
		var head, style;
		head = document.getElementsByTagName('head')[0];
		if (!head) { return; }
		style = document.createElement('style');
		style.type = 'text/css';
		style.innerHTML = css;
		head.appendChild(style);
	};

	var css_rules = [
		'#slot_REC, #slot_TL1, #theAd, #slot_MB, .attribution-bar {display:none !important;}'
	  ,	'#shellcontent {right: 0px !important;}'
	];

	addGlobalStyle( css_rules.join("\n") );
})();
