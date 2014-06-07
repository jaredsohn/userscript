// ==UserScript==
// @name           Remove male submissions
// @namespace      gonewild
// @include        http://www.reddit.com/r/gonewild/
// ==/UserScript==

var s = document.evaluate("//a[starts-with(@class,'title ')]",document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
for (i=0;i<s.snapshotLength;i++) {	
	if (/\[m\]|<m>|\s+m\s+|\(m\)|cock|[^(fe)]male/i.test(s.snapshotItem(i).textContent)) {	
		s.snapshotItem(i).parentNode.parentNode.parentNode.style.display = 'none';
	}
}