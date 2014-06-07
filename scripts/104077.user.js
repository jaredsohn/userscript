// ==UserScript==
// @name          Distinctions
// @namespace     http://userstyles.org
// @description	  Provides color-coded hyperlinks to aid in determining target file types.
// @author        Wesley Ross Rice
// @include       http://*.*
// @include       https://*.*
// ==/UserScript==
(function() {
var css = "a { text-decoration: none !important; }\na[href$='.exe'], a[href$='.zip'], a[href$='.rar'], a[href$='.gz'], a[href$='.tar'] { color: red !important; }\na[href$='.mp3'] { color: green !important; }\na[href$='.pdf'], a[href$='.doc'], a[href$='.docx'], a[href$='.xls'], a[href$='.xlsx'], a[href$='.ppt'], a[href$='.pptx'],  a[href$='.dvi'], a[href$='.ps'], a[href$='.eps'], a[href$='.rtf'] { color: orange !important; }";
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
