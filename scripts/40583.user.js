// ==UserScript==
// @author         Mitsuhiro Setoguchi
// @name           Full width to half width converter
// @namespace      http://matatabi.homeip.net
// @description    This script convert alphabets and numbers from full width to halfwidth
// @include        *
// ==/UserScript==

var _conv = function(org) {
    return org.replace(/([\uff01-\uff5d])/g,
		       function ($0) {
			   return String.fromCharCode($0.charCodeAt(0) - 65248);
		       });
};

function conv(node) {
    if (node.hasChildNodes())
	for (var i=0; i<node.childNodes.length; i++)
	    conv(node.childNodes[i]);
    else if (node.textContent)
	node.textContent = _conv(node.textContent);
}

conv(document.body);
	