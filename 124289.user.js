// ==UserScript==
// @name           EX.UA Ad's Killer (Opera version)
// @description	   ex.ua without ads
// @namespace      http://addons.opera.com/addons/extensions/details/tonkaia-nastroika-saita-exua/
// @source         http://userscripts.org/scripts/show/124289
// @identifier     http://userscripts.org/scripts/source/124289.user.js
// @author         Vadym Gulyi <me@vady.kiev.ua>
// @icon64         http://addons.opera.com/media/extensions/15/19315/1.0-rev1/icons/icon_64x64.png
// @date           2012-02-08
// @version        1.0.3
// @versiontext    Added filter for list view
// @include        http://*ex.ua/*
// ==/UserScript==

(function() {
	if (typeof GM_addStyle == 'undefined') {
		function GM_addStyle(css) {
			var head = document.getElementsByTagName('head')[0];
			if (head) {
				var style = document.createElement("style");
				style.type = "text/css";
				style.appendChild(document.createTextNode(css));
				head.appendChild(style);
			}
		}
	}
	window.opera.addEventListener('AfterEvent.load', function() {
		window.player_ad = 0; // remove video ad
		window.player_ad_js = 0; // window.opera.defineMagicVariable('player_ad_js', function(v) {return 0}, null);
		GM_addStyle("#search_box, #search_help, #search_line, #search_button { position: relative; left: auto; top: auto; width: auto; height: auto; background-image: none } #search_line { padding-top: 1em } #search_hint { position: absolute; left: 0; top: 3em } #search_text { float: left; font-size: 11pt; width: 50% } #search_button { padding-top: 0 } #search_link { display: none } #search_help { text-align: left; line-height: 0; padding: 1em 0 } #search_help br, #ad_block { display: none } #search_form { padding: .7em } "); // replace search ad styles
	}, false);
	window.opera.addEventListener('BeforeCSS', function(e) {
		e.cssText = e.cssText.replace(/#search_(box|link)\s*\{[^}]+\}/gi,' '); // remove search background styles
	}, false);
	window.opera.addEventListener('BeforeExternalScript', function(e) {
		if(e.element.getAttribute('src').match(/(hit\.ua|adriver\.ru|mediacom\.com\.ua|adocean\.pl|apis\.google\.com|google-analytics\.com)/i)) {
			e.preventDefault(); // block ad & statistics scripts
			e.stopPropagation(); // google+ blocked due internal error (use window.parent.frames[a])
		}
	}, false);
	window.opera.addEventListener("BeforeEvent.DOMContentLoaded", function() {
		var m = document.querySelector('td[valign="top"] > div[style^="height: 28px"]'); // anchor (top menu bar)
		if(m) m.parentNode.removeChild(m); // remove ads bar
		var l = document.getElementById("ad_block");
		if(l) l.parentNode.removeChild(l); // remove list ads
		var p = document.getElementById("player");
		if(p) {
			p.style.top = 0; // player position => top right
			p.style.right = 0;
		}
	}, false);
})();