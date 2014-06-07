// ==UserScript==
// @name            Doctor Who FJ theme
// @description     Hey there fj Whovians
// @include         *funnyjunk.com*
// ==/UserScript==

(function() {
var css = "#contentRight .inner{\nbackground-image: url(\"http://i.imgur.com/nXwvlog.jpg\") !important;\nbackground-repeat:no-repeat !important;\nbackground-position:center !important;\nbackground-attachment:fixed !important;\n}";
if (typeof GM_addStyle != "undefined") {
	GM_addStyle(css);
} else if (typeof PRO_addStyle != "undefined") {
	PRO_addStyle(css);
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

// append at end
document.getElementsByTagName( 'body' )[ 0 ].appendChild( btun );
document.getElementsByTagName( 'body' )[ 0 ].appendChild( rem );
document.getElementsByTagName( 'body' )[ 0 ].appendChild( remc );