// ==UserScript==
// @name           Show WK enraged level
// @namespace      BvS-Razithel
// @description    Show WK enraged level
// @include        http://www.animecubed.com/billy/bvs/worldkaiju.html
// @include        http://animecubed.com/billy/bvs/worldkaiju.html
// ==/UserScript==

var xpathResult = document.evaluate(
 "/html/body/center/table/tbody/tr/td/table/tbody/tr/td/center/table/tbody/tr/td/center/table/tbody/tr/td/form/div/table/tbody/tr/td/b/font/span", 
 document, null, XPathResult.UNORDERED_NODE_ITERATOR_TYPE, null);
 
var wkList = new Array();
while (x = xpathResult.iterateNext()) {
	wkList.push(x);
}

for (i = 0; i<wkList.length; i++) {
	eLevel = /ENRAGED Level (\d)/.exec(wkList[i].getAttribute("title"));
	if (eLevel != null) {	
		wkList[i].innerHTML = "<b>" + eLevel[0] + "</b>";
	}
}