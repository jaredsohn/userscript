// ==UserScript==
// @name           tokyotosho.info-retitle
// @namespace      VIP
// @include        http://tokyotosho.info/search.php*
// ==/UserScript==

(function() {
	const doc = (typeof unsafeWindow === "object") ?  unsafeWindow.document : window.document;
	const title = doc.getElementsByTagName('title')[0];
	var terms = doc.getElementsByName('terms')[0];
	if (terms = terms && terms.value) title.textContent = terms+' - '+title.textContent;
})()