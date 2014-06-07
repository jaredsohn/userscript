/* HSS Ad Remover
	By: Venj@ilovemac.cn (This is not an email addr.)
	Date: Mar.10, 2008
	Version: 0.01
	Copyleft(c)2008 venj
	Use this freely under the GNU GPL, http://www.gnu.org/licenses/gpl.html
*/
// This script can help you to remove the Hotspot Shield Adbar
// hanging over every page that you visit when HSS is on. This
// script intend to give everyone a better user experience and 
// make the Hotspot Shield better.
// 
// I'm not a pro, and my code is nasty, but it's useful in some
// way. Hope you'll like it!
// 
// Note: When you use this script in low speed connection, the
// HSS ad bar will still show, while page is loading, however 
// it will do disappear as the page finish up load. Not very
// perfect, but it still works for me (maybe you, too). ;P 
//
// ==UserScript==
// @name			HSS Ad Remover
// @namespace		http://ilovemac.cn
// @description	Remove the annoying ad bar when Hotspot Shield is running.
// @include		*
// ==/UserScript==
//
// Many Thanks to Palaniraja's "AnchorFree banner killer"!
// Some code are directly copied and pasted from his great script, 
// that I used to use.
// Who is Palaniraja? 
// 	A.P.Palaniraja<A.P.Palaniraja@gmail.com>
// 	http://userscripts.org/scripts/review/11070
// 

var adDiv, allDiv;
allDiv = document.getElementsByTagName('div');
var regEx = /^AFt_dv[0-9]{1,4}$/;
for (var i = 0; i < allDiv.length; i++) {
	if (regEx.test(allDiv[i].id)) {
		adDiv = allDiv[i];
		adDiv.parentNode.removeChild(adDiv);
	}
}

var css = "html {margin-top:0px !important;}";
if (typeof GM_addStyle != "undefined") {
    GM_addStyle(css);
} else if (typeof addStyle != "undefined") {
    addStyle(css);
} else {
    var heads = document.getElementsByTagName("head");
    if (heads.length > 0) {
        var node = document.createElement("style");
        node.type = "text/css";
        node.innerHTML = css;
        heads[0].appendChild(node);
    }
}
