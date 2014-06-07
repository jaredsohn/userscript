// name:    Online Go Server OGS Status Page Enhancer
// version: 0.1
// author:  Ted Ernst
// license: public domain
// credits: This is a modification of the Drago Go Server Status Page Enhancer
//          written by tps12 and found: http://userscripts.org/scripts/show/2172
// source:  http://tedernst.com/go/ogsstatuspageenhancer.user.js
// plan:    1. add "class='main'" to mygames.asp link test
//          2. expand scope to include any OGS page with the standard header.

// ==UserScript==
// @name           Online Go Server OGS Status Page Enhancer
// @namespace      http://tedernst.com
// @description    Adds automatic refresh and a more informative page title to the OGS status page
// @include         *online-go.com/games/mygames.asp
// ==/UserScript==

(function() {

	var DGSEnhancer = {
		checkPage: function() {
			if (/^http:\/\/(www\.)?online-go\.com\//.exec(location.href)) {
				this.enhance();
				this.doTimer();
			}
		},
		enhance: function () {
			// # games where it's my turn
			var games = 0;

			var as = document.getElementsByTagName('a');
			for (var i = as.length - 1; i >= 0; i--) {
				if (as[i].getAttribute('href') == "/games/mygames.asp") {
					games = as[i].firstChild.innerHTML;
				}
			}
				document.title = 'OGS (' + games + ')';
		},
		doTimer: function() {
			setTimeout('document.location=document.location', 30000);
		}
	}

	DGSEnhancer.checkPage();

})();