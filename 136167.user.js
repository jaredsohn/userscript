// ==UserScript==
// @name          Bigger Hanzi
// @description   Make chinese hanzi bigger because it's too small to be readable by default.
// @version       1.0
// ==/UserScript==

function biggerhanzi() {
	var t=document.evaluate('.//text()[normalize-space(.) != ""]',document.body,null,
		XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);    
	for(i=0;i<t.snapshotLength;i++) {
		var x=t.snapshotItem(i);
		var nt=x.textContent.replace(/([\uff0c\u4e00-\u9eff]+)/g,'<span style="font-size:20pt">$1</span>');
		if(nt.length!=x.textContent.length) {
			var s=document.createElement("span");
			s.innerHTML=nt;
			x.parentNode.replaceChild(s,x);
		}
	}
}

biggerhanzi();

