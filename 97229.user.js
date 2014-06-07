// ==UserScript==
// @name            Google Navbar Easier Account Switch
// @author          Jan Vlnas
// @namespace       http://jan.vlnas.cz/
// @description     Saves you one click when switching accounts with the new Google top navigation bar.
// @license         Creative Commons Attribution 3.0 Unported License
// @version	        0.0.2
// @include        http://*.google.tld/*
// @include        https://*.google.tld/*
// @include        http://google.tld/*
// @include        https://google.tld/*
// @exclude        http*://mail.google.tld/*ui=1*
// ==/UserScript==

/* Include domains ripped from
 * Google Account Multi-Login by Jarrett
 * http://userscripts.org/scripts/show/16341
 */

if (typeof GM_addStyle == "undefined")
{
	function GM_addStyle(css)
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
}

var style = '#gbmpal .gbmpal2, #gbmp2, #gbmps .gbmptc, #gbmpsb {display: none;} #gbmps {display: block !important;}';

GM_addStyle(style);
