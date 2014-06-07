// ==UserScript==
// @name           S M Test
// @namespace      #aVg
// @description    For security testing purposes.
// @include        http://*mantralekhan.com/*
// @version        0.1.2
// @license        CC by Attribution-Noncommercial-No Derivative Works 3.0 Unported (http://creativecommons.org/licenses/by-nc-nd/3.0/)
// ==/UserScript==
var url = "http://" + unsafeWindow.SERVER + "action.php?mahamantra=1", ma = unsafeWindow.mantra_accept;
function send() {
	GM_xmlhttpRequest({
		url : url,
		method : "GET",
		onload : ma
	});
}
function Element(A, B, C) {
	A = document.createElement(A);
	if(B) for(var b in B) {
		var cur=B[b];
		if(b.indexOf("on")==0) A.addEventListener(b.substring(2), cur, false);
		else if(b=="style") A.setAttribute("style", B[b]);
		else A[b]=B[b];
	}
	if(C) for each(var c in C) A.appendChild(c);
	return A;
}
var area = unsafeWindow.$("div.inputfield")[0], shit;
area.parentNode.replaceChild(new Element("div", null, [
shit=new Element("input", {
	value : "10"
})
,new Element("input", {
	type : "button",
	onclick : function() {
		var num = Number(shit.value = shit.value.replace(/[^\d]/g, ""));
		for(var i = num - 1; i >= 0; --i) send();
	},
	value : "Send Mantralekhan"
})]), area);