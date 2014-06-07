// ==UserScript==
// @name        Kapsle 2012
// @namespace   http://kwiki.republika.pl/kapsle2012.html
// @description usuwa posiadane kapsle
// @include     http://kwiki.republika.pl/kapsle2012.html
// @version     1
// ==/UserScript==

var posiadam = [1, 2, 4, 5, 6, 7, 8, 9, 13, 14, 15, 16, 18, 20, 21, 22, 23, 25, 26, 28, 29, 30, 31, 34, 37, 38, 39, 40, 41, 42, 44, 48, 49, 50, 51, 52, 54, 55, 56, 62, 63, 64, 65, 66, 67, 68, 69, 70, 72, 75, 77, 78, 80, 81, 82, 83, 88, 91, 92, 94, 95, 97, 99, 100, 101, 102, 103, 104, 107, 108, 109, 110];
var wszystkie = document.evaluate('//li', 
	document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
for (var i = 0; i<wszystkie.snapshotLength; i++) {
	for (var j = 0; j<posiadam.length; j++) {
			if ( posiadam[j] == i) {
				var post = wszystkie.snapshotItem(i);
				//alert('found');
				post.parentNode.removeChild(post);
				//alert('deleted');
			}
	
	}
}