// ==UserScript==
// @name           DOM Cleanup
// @namespace      #aVg
// @description    Cleans up the DOM for inspecting layout with the least possible trouble. init: kill "script" and "noscript"
// @include        *
// @version        0.1
// ==/UserScript==
function killTag(A) {
	A = document.getElementsByTagName(A);
	var t;
	for(var i = A.length - 1; i>=0; --i) {
		t = A[i];
		t.parentNode.removeChild(t);
	}
	return killTag;
}
killTag("script")("noscript");