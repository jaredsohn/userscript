// ==UserScript==
// @name           OneRiot Link Cleaner
// @namespace      #aVg
// @description    Cleans OneRiot links
// @include        *
// @version        0.1
// @license        CC by Attribution-Noncommercial-No Derivative Works 3.0 Unported (http://creativecommons.org/licenses/by-nc-nd/3.0/)
// ==/UserScript==
function process(a) {
	if(a.host=="tr.oneriot.com") GM_xmlhttpRequest({
		url : a.href,
		method : "HEAD",
		onload : function(A) {
			if(/\s*(?:http:\/\/)?tr\.oneriot/.test(a.textContent)) a.textContent = A.finalUrl;
			a.href = A.finalUrl;
		}
	});
}
for(var i = document.links.length - 1; i>=0; --i) process(document.links[i]);