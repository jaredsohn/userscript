// ==UserScript==
// @name           MegaUpload.com - Download Items Directly (bypass everything)
// @namespace      Manix
// @include        http://www.megaupload.com/?d=*
// ==/UserScript==

var h = document.body.parentNode.innerHTML, a, b;
function x(b, e) {
	var m = h.indexOf(b), s = m + b.length, n = h.indexOf(e, s);
	if (m==-1 || n==-1) return false;
	return h.substr(s, n-s);
}
a = x('document.getElementById("downloadhtml").innerHTML = \'<a href="', '"');
b = x('<b>Description:</b> ', '</div>');
if (a && b) document.location = a + b + ".rar";
