/*

Dragon Go Server status page enhancer

*/

// ==UserScript==
// @name			Dragon Go Server Status Page Enhancer
// @namespace		http://tps12.50webs.com
// @description		Adds automatic refresh and a more informative page title to the DGS status page.
// @include			*dragongoserver.net/status.php
// ==/UserScript==

(function() {

	var DGSEnhancer = {
		checkPage: function() {
			if (/^http:\/\/(www\.)?dragongoserver\.net\//.exec(location.href)) {
				this.enhance();
				this.doTimer();
			}
		},
		enhance: function () {
			// count links to game pages
			var games = 0;

			var as = document.getElementsByTagName('a');
			for (var i = as.length - 1; i >= 0; i--) {
				var oc = as[i].getAttribute('href');
				if (oc) {
					var ms = oc.match(/^game\.php\?gid=[0-9]+$/);
					if (ms) games++;
				}
			}

			if(games > 0)
				document.title = 'DGS (' + games + ')';
			else
				document.title = 'DGS';
		},
		doTimer: function() {
			setTimeout('document.location=document.location', 300000);
		}
	}

	DGSEnhancer.checkPage();

})();
