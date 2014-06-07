// ==UserScript==
// @name          Die Stämme blau (only PA)
// @namespace     http://userstyles.org
// @description	  Dieser Style versetzt die Schnellleiste und das obere Menü mit einem schicken, blauen Hintergrund und orangenen Hovers.
// @author        Asmodiel
// @homepage      http://userstyles.org/styles/4456
// @include       http://die-staemme.de/*
// @include       https://die-staemme.de/*
// @include       http://*.die-staemme.de/*
// @include       https://*.die-staemme.de/*
// ==/UserScript==
(function() {
var css = "a:hover { font-weight:bold !important; color: #0082BE !important; } /* Menüleiste */ table.menu { border: 2px double #024168 !important; background: url('http://asmodiel.as.funpic.de/ds/header_back.gif') repeat !important; } table.menu a, table.menu td { color: #000 !important; } table.menu a:hover { font-weight:bold !important; color: #0082BE !important; } table { border-spacing: 0px !important; padding: 0px !important; } table.vis { border-spacing: 1px !important; padding: 1px !important; border: 1px double #024168 !important; table-layout: auto !important;} /* Top-Menü-Item mit Hover */ table.menu tr td { padding: 1px !important; padding-left: 4px !important; padding-right: 4px !important; white-space: nowrap !important; background: #0470B3 url('http://asmodiel.as.funpic.de/ds/header_back.gif') repeat-x !important; } table.menu tr td:hover { background: #0470B3 url('http://asmodiel.as.funpic.de/ds/header_back_inv.gif') repeat-x !important; } th { text-align: left !important; font-weight:bold !important; background: #1388D3 !important; } .forum { background: url('http://asmodiel.as.funpic.de/ds/header_back.gif') repeat-x !important; border: 1px solid #000 !important; padding:1px !important; white-space:nowrap !important; line-height:150% !important; } .selected { background: url('http://asmodiel.as.funpic.de/ds/header_back_inv.gif') repeat-x !important; }";
if (typeof GM_addStyle != "undefined") {
	GM_addStyle(css);
} else if (typeof addStyle != "undefined") {
	addStyle(css);
} else {
	var heads = document.getElementsByTagName("head");
	if (heads.length > 0) {
		var node = document.createElement("style");
		node.type = "text/css";
		node.appendChild(document.createTextNode(css));
		heads[0].appendChild(node); 
	}
}
})();