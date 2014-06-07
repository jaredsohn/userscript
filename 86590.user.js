// ==UserScript==
// @name           FullAnimes Auto Clicker
// @author         Aversiste
// @namespace      FullAnimes
// @date           07/09/2010
// @version        0.2
// @description	   Auto click on temporary page before megaupload
// @license        WTF Public License; http://en.wikipedia.org/wiki/WTF_Public_License
// @include        http://fullanimes.free.fr/ddl-episodes*
// ==/UserScript==

(function() {
		var nodes = document.getElementsByTagName('a');
		for (var i = 0; i < nodes.length; ++i) {
			if (nodes[i].innerHTML.indexOf('Cliquez ici', 0) != -1) {
				window.location.replace(nodes[i]);
			}
		}
})();