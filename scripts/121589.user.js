// ==UserScript==
// @name           blogspot auto skipp content warning
// @namespace      mezb
// @description    blogspot auto skipp content warning
// @include        http://*blogspot.com*
// @include	   *blogger.com/blogin.g?blogspotURL=*
// @version        1.1
// @updateURL      http://userscripts.org/scripts/source/121589.user.js
// @downloadURL	   http://userscripts.org/scripts/source/121589.user.js
// ==/UserScript==


try {
		
	window.open(document.getElementById('maia-main').getElementsByTagName('a')[1],'_parent');
//	GM_openInTab(document.getElementsByTagName('a')[2]);


} catch (e) {
//		console.log(e.source + e.message);
}
