// ==UserScript==
// @name           DODTracker Name Of Site By Image Placer
// @namespace      kryptonite
// @description    Puts names by DODTracker's site so you can do a search for a particular site
// @version        1.0
// @include        http://www.dodtracker.com/*
// ==/UserScript==

(function() {
var scriptNumber = 111217;

function main() {
	var imgs = document.getElementsByTagName('img');

	for (i = 0; i < imgs.length; i++) {
		if (!/^logo-/.test(imgs[i].id)) continue;

		var txt = document.createTextNode(imgs[i].alt.match(/from (.*)$/)[1]);

		imgs[i].parentNode.appendChild(txt);
	}

}

(function() {
	var head = document.getElementsByTagName('head')[0] || document.documentElement,
	scriptInject = document.createElement('script');

	if (window.top != window.self) return;
	if (typeof unsafeWindow === "undefined")  return main(); // injected iteration
	else {
		scriptInject.src = 'http://userscripts.org/scripts/source/' + scriptNumber + '.user.js?' + (new Date()).getTime();
		scriptInject.type = 'text/javascript';
		head.appendChild(scriptInject);
	}
})();

})();

