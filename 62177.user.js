// ==UserScript== 
// @name HideTelephones 
// @description Hide Telephone Numbers from USI.INF Website
// @include http://www.inf.usi.ch/people/* 
// ==/UserScript== 

var snapResults = document.evaluate("//*[@class='telephone']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null); 
//alert("Remove "+snapResults.snapshotLength+" Telephones");
for (var i = snapResults.snapshotLength - 1; i >= 0; i--) 
{ 
	var elm = snapResults.snapshotItem(i); 
	var a = elm.getElementsByTagName('a')[0];
	if(a) {
		elm.innerHTML = '<a href="'+ a.href +'">Homepage</a>';
	} else {
		elm.innerHTML = '';
       }
}


