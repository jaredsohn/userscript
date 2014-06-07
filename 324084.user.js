// ==UserScript==
// @name          Opaque dark Twitter top bar (2014)
// @namespace     http://userstyles.org
// @description	  Opaque dark Twitter top bar (2014)
// @author        rolle
// @homepage      http://twitter.com/rolle
// @include       http://twitter.com/*
// @include       https://twitter.com/*
// @include       http://*.twitter.com/*
// @include       https://*.twitter.com/*
// @run-at        document-start
// ==/UserScript==
(function() {
var css = ".global-nav-inner {\n background:#222222 !important;\n } .nav>li {\n color:#aaaaaa !important;\n }";

if (typeof GM_addStyle != "undefined") {
	GM_addStyle(css);
} else if (typeof PRO_addStyle != "undefined") {
	PRO_addStyle(css);
} else if (typeof addStyle != "undefined") {
	addStyle(css);
} else {
	var node = document.createElement("style");
	node.type = "text/css";
	node.appendChild(document.createTextNode(css));
	var heads = document.getElementsByTagName("head");
	if (heads.length > 0) {
		heads[0].appendChild(node); 
	} else {
		document.documentElement.appendChild(node);
	}
}
})();

var script = document.createElement('script'); 
script.type = "text/javascript"; 
script.innerHTML = "b.fn.hover=function(){return}";
document.getElementsByTagName('head')[0].appendChild(script);
