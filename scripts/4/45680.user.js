// ==UserScript==
// @name           Remove advertisements in Orkut
// @namespace      Subin Varghese
// @description    Removes the advertisement module on the right hand side in Orkut.
// @include        http://*.orkut.*
// ==/UserScript==

var css = "@namespace url(http://www.w3.org/1999/xhtml); #rhs_ads { display:none !important; } ";
if (typeof GM_addStyle != "undefined")
{
	GM_addStyle(css);
}
else if (typeof addStyle != "undefined")
{
	addStyle(css);
}
else
{
	var heads = document.getElementsByTagName("head");
	if (heads.length > 0)
        {
		var node = document.createElement("style");
		node.type = "text/css";
		node.appendChild(document.createTextNode(css));
		heads[0].appendChild(node); 
	}
}