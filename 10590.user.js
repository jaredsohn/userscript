/*

Remove Banner on yahoo webmail
Version 0.4b
(C) 2007 Palaniraja
Use this freely under the GNU GPL, http://www.gnu.org/licenses/gpl.html

*/
// ==UserScript==
// @name           Yahoo webmail++
// @namespace      http://userscripts.org
// @description    An extended yahoo webmail  without ads
// @author         Palaniraja
// @homepage       http://userscripts.org
// @include        http://*.*.mail.yahoo.*/ym/*
// ==/UserScript==

var css = "@namespace url(http://www.w3.org/1999/xhtml); .ad_slug_table, #nwad, #swads, #northbanner{ display:none; } body * { font-family:Verdana, Arial, Helvetica, sans-serif; font-size:11px;} div.msgbody *{font-family:inherit; font-size:inherit;}";

if (typeof GM_addStyle != "undefined") {
	GM_addStyle(css);
} else if (typeof addStyle != "undefined") {
	addStyle(css);
} else {
	var heads = document.getElementsByTagName("head");
	//console.log("printing heads",heads);
	if (heads.length > 0) {
		var node = document.createElement("style");
		node.type = "text/css";
		node.innerHTML = css;
		heads[0].appendChild(node); 
		
	}
}
/*
//will remove the advertisement, but I am not certain to use this xpath only to remove the ad
var rhsAd = document.evaluate('/html/body/table/tbody/tr/td[3]/table/tbody/tr/td[3]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
if(rhsAd)  {
		rhsAd.parentNode.removeChild(rhsAd);
}
*/