// ==UserScript==
// @name          Consolas for github
// @namespace     thedevstop.com
// @description	  See code on github using the Consolas font family.
// @author        Joey Robichaud
// @homepage      http://thedevstop.com
// @include       https://github.com/*
// @include       https://*.github.com/*
// ==/UserScript==
(function() {
var css = ".windows #files .file .data pre, .windows .file .data pre, .linux .file .data pre, .windows #files .file .line-data, .windows #files .file .line-number, .linux #files .file .data pre, .linux #files .file .line-data, .linux #files .file .line-number, .windows .file-box .data pre, .windows .file-box .line-data, .windows .file-box .line-number, .linux .file-box .data pre, .linux .file-box .line-data, .linux .file-box .line-number, .windows #files .file .data td.line_numbers, .linux #files .file .data td.line_numbers, .windows .file-box .data td.line_numbers, .linux .file-box .data td.line_numbers { font-family: Consolas,'Bitstream Vera Sans Mono','Courier New',monospace; }\n" +
"pre, code { font: 12px Consolas,'Bitstream Vera Sans Mono','Courier New',monospace; }\n" +
"#ace-editor { font-family: Consolas,Monaco,Menlo,'Bitstream Vera Sans Mono','DejaVu Sans Mono','Courier New',monospace; }";
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