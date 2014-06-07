// ==UserScript==
// @name           KoL Wiki Search
// @namespace      http://freecog.net/2007/
// @description    Search the KoL Wiki one of two ways: 1) double-click on bold text; 2) shift-click on selected text.
// @include        http://*kingdomofloathing.com/*
// ==/UserScript==

if (/^http:\/\/(www\d*\.)?kingdomofloathing\.com\//.test(document.location) &&
		document.body) {

if (/kol-wiki-search-window_open/.test(window.location.hash)) {
	GM_setValue("window_open", confirm("Set KoL Wiki Search to open" +
			" windows with window.open()?\n\nWindows opened will obey" + 
			" your Firefox window opening preferences.\n\n(If you" + 
			" don't know what this means, click 'cancel'.)"));
}

function launch(search_text) {
	var url = 'http://kol.coldfront.net/thekolwiki/index.php/' + 
				'Special:Search?go=Go&search=' + 
				encodeURIComponent(search_text);
	if (GM_getValue("window_open", false)) {
		window.open(url);
	} else {
		GM_openInTab(url);
	}
}

document.body.addEventListener("dblclick", function(e) {
	if (e.target.tagName === 'B') {
		launch(e.target.textContent);
	}
}, false);

document.body.addEventListener("mouseup", function(e) {
	if (e.shiftKey) {
		if (e.shiftKey && e.target.tagName !== 'A') {
			var query = window.getSelection().toString()
			if (query) {
				launch(query);
				e.preventDefault();
			}
		}
	}
}, false);

}