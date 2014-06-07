// ==UserScript==
// @name           Google Groups Improver
// @namespace      #aVg
// @description    Improves Google Groups. Initial: just uses the previously wasted space.
// @include        http://groups.google.com/*
// @version        0.1
// @license        Creative Commons (Attribution-Noncommercial-No Derivative Works) 3.0 Unported (http://creativecommons.org/licenses/by-nc-nd/3.0/)
// ==/UserScript==
if(self!=top) return;
function loop(A, B, C) {
	A = document.evaluate("." + A, C || document.body, null, 6, null);
	var I = A.snapshotLength;
	while(--I >= 0) B.apply(A.snapshotItem(I));
}
loop("//div[@id='inbdy']//br", function() {
	this.parentNode.removeChild(this);
});