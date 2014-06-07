// ==UserScript==
// @name           EX.UA Ad's Killer
// @description	   ex.ua without ads
// @namespace      http://userscripts.org/scripts/review/124437
// @source         http://userscripts.org/scripts/show/124437
// @identifier     http://userscripts.org/scripts/source/124437.user.js
// @author         Vadym Gulyi <me@vady.kiev.ua>
// @icon           http://www.ex.ua/favicon.ico
// @icon64         http://www.iconfinder.com/data/icons/VISTA/web_design/png/64/banner_design.png
// @date           2012-01-29
// @version        1.0.4
// @versiontext    Fixed ban of video advert
// @include        http://*ex.ua/*
// ==/UserScript==

(function() {
	var id;
	location.href = "javascript:void(window.player_ad = 0)"; // remove player ad | unsafeWindow location hack
	// prevent loading ads scripts by DOMContentLoaded
	var scripts = document.getElementsByTagName('script');
	for (var J = scripts.length-1;  J >=0;  --J) {
		if (/(hit\.ua|adriver\.ru|mediacom\.com\.ua|adocean\.pl)/i.test(scripts[J].src)){
			console.log("Killed", scripts[J].src);
			scripts[J].parentNode.removeChild(scripts[J]);        
		}
	}
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
	GM_addStyle("#search_box, #search_help, #search_line, #search_button { position: relative; left: auto; top: auto; width: auto; height: auto; background-image: none } #search_line { padding-top: 1em } #search_hint { position: absolute; left: 0; top: 3em } #search_text { float: left; font-size: 11pt; width: 50% } #search_button { padding-top: 0 } #search_link { display: none } #search_help { text-align: left; line-height: 0; padding: 1em 0 } #search_help br { display: none } #search_form { padding: .7em } "); // remove search ad
	id = document.querySelector('td[valign="top"] > div[style^="height: 28px"]');
	if(id) id.parentNode.removeChild(id); // remove ads bar
	if(location.pathname == '/') {
		id = document.querySelector('table tr:nth-child(2) td[style^="padding: 16px"] > center > div');
		if(id && id.getAttribute('style') != "margin-top: 24px;") id.parentNode.removeChild(id); // remove home page ad
	}
	id = document.getElementById('ad_block');
	if(id) id.parentNode.removeChild(id); // remove list ad
})();