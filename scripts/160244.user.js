// ==UserScript==
// @name        Torrentz.eu Exact Search
// @namespace   http://userscripts.org/users/23652
// @description Hide the non-exact search results on Torrentz.eu
// @include     http://torrentz.eu/search*?f=*
// @copyright   JoeSimmons
// @version     1.0.0
// @license     http://creativecommons.org/licenses/by-nc-nd/3.0/us/
// @require     http://userscripts.org/scripts/source/51532.user.js
// @require     http://usocheckup.redirectme.net/160244.js
// @grant       GM_getValue
// @grant       GM_log
// @grant       GM_openInTab
// @grant       GM_registerMenuCommand
// @grant       GM_setValue
// @grant       GM_xmlhttpRequest
// @grant       GM_addStyle
// ==/UserScript==

String.prototype.find = function(s) {
return (this.indexOf(s) != -1);
};

var q = $g("#thesearchbox").value.toLowerCase(),
	results = $g("//div[@class='results']/dl/dt/a");

for(var i=0, l=results.snapshotLength; i < l; i++) {
	var r = results.snapshotItem(i);
	
	if(r.textContent.toLowerCase().find(q) === false) {
		r.parentNode.parentNode.setAttribute("style", "display: none;");
	}
}