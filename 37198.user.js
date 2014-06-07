// ==UserScript==
// @name           Gmail Themes: Cold Shower Tweaks
// @namespace      www.arthaey.com
// @description    Removes pink from the Cold Shower theme
// @include        http://mail.google.com/*
// @include        https://mail.google.com/*
// ==/UserScript==
(function() {

var firstClass = "ar6Hkf";
var secondClasses = [
    "S6g97b",
    "iv9XJc",
    "jsbnre",
    "QCouhb"
];

var css = "@namespace url(http://www.w3.org/1999/xhtml); ";
for (var i = 0; i < secondClasses.length; i++) {
    css += "." + firstClass + " ." + secondClasses[i] + " ";
    if (i != secondClasses.length - 1)
        css += ", ";
}
css += "{ background-color: #CFDCE6 !important; }";

// add CSS styles
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

