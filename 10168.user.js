// ==UserScript==
// @name           disable mixi footprint jack
// @namespace      http://d.hatena.ne.jp/youpy/
// @include        http://mixi.jp/show_log.pl
// ==/UserScript==

Array.filter(
	     document.getElementsByTagName('div'),
	     function (e) {
		 return e.id.match(/^footprintjack/);
	     }
	     ).forEach(function(e) { e.style.visibility = 'hidden' });

		     
