// ==UserScript==
// @name          Digg Exclude Categories
// @namespace     http://www.devdive.com/
// @description   Exclude categories of your choice from appearing on Digg.com.
// @include       http://digg.com/*
// @include       http://www.digg.com/*
// ==/UserScript==

//Add/remove categories here.
var categories=new Array("technology","robots","apple","hardware");

//Do not change anything below this line.
var encs, div;
var expr="";

for(var i=0;i<categories.length-1;i++) {
	expr += "(div.innerHTML.indexOf('>"+categories[i]+"<')!=-1) || ";
}
expr += "(div.innerHTML.indexOf('>"+categories[i]+"<')!=-1)";

encs = document.evaluate(
    "//div[contains(@id, 'enclosure')]",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);

alert(encs.snapshotLength);
for (var i = 0; i < encs.snapshotLength; i++) {
    div = encs.snapshotItem(i);
	if(eval(expr)) {
		div.style.display="none";
	}	
}