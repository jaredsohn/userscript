// ==UserScript==
// @name           Wykop
// @namespace      Wykop
// @include        http://www.wykop.pl/
// ==/UserScript==
wykopy=document.getElementsByClassName("options");
for(x in wykopy)
{
a=wykopy[x].firstChild.nextSibling.firstChild;
a.className="wykop";
wykopy[x].parentNode.parentNode.parentNode.insertBefore(a, wykopy[x].parentNode.parentNode) 
}
(function() {
var css = "blackquote{\ndisplay:inline !important;\nposition:relative;\n}\n\n.wykop{\nbackground-image: url(\"http://img57.imageshack.us/img57/3883/core.png\") !important;\nbackground-repeat: no-repeat;\nheight: 67px;\nfont-size:20px;\ndisplay:inline !important;\nline-height:50px;\nfloat:left;\n\nwidth:67px;\ncolor:#ff5917 !important;\ntext-align:center\n}";
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

