// ==UserScript==
// @name           Ning photo direct link
// @version        1.0
// @description    Makes clicking on a thumbnail in a Ning album go directly to the full size image
// @include        http://*.ning.com/photo*
// ==/UserScript==

function findImg(srch) {
	var i,r = [],x = document.evaluate(srch,document,null,XPathResult.UNORDERED_NODE_ITERATOR_TYPE,null);
	while(i=x.iterateNext()) r.push(i);
	return r;
}
findImg('//IMG[contains(@src, "http://api.ning.com/files/")]').forEach(function(img) {img.parentNode.href = img.src.substr(0,img.src.search('width')-1)});
