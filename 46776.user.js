// ==UserScript==
// @name           operamailclean
// @namespace      http://www.zoqui.com/greasemonkey/operamailclean
// @description    Clean up all banners from the operamail interface
// @include        http://mymail.operamail.com/common/*
// @include        http://www.operamail.com/scripts/common/
// ==/UserScript==

var frm;
frm = document.getElementsByTagName('frameset')[0];
if (frm)
	frm.rows="20,*";
// Change top
var allDivs, thisDiv;
allDivs = document.evaluate(
    "//div[@class='navmenu'] | //p[@class='banner']",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null
);
for (var i = 0; i < allDivs.snapshotLength; i++) {
    thisDiv = allDivs.snapshotItem(i);
    thisDiv.parentNode.removeChild(thisDiv);
}
// Login form
var loginForm;
loginForm=document.getElementsByName("loginForm");
if (loginForm!=undefined){
	//alert(loginForm.tagName);
	// // var divs = document.evaluate("//div[@class='content']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
	// // if (divs.snapshotLenth==1){
		// // var content;
		// // content = thisDiv = allDivs.snapshotItem(0);
		// // thisDiv.parentNode.innerHTML = loginForm.innerHTML; 
	// // }
}
// Change external iFrames
var allElements, thisElement, src;
allElements = document.evaluate(
    "//iframe",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null
);
for (var i = 0; i < allElements.snapshotLength; i++) {
    thisElement = allElements.snapshotItem(i);
	src = thisElement.src;
	if (src.search('.operamail.com')==-1){
		if (thisElement.parentNode.tagName=="P"||thisElement.parentNode.tagName=="TD"){
			thisElement.parentNode.parentNode.removeChild(thisElement.parentNode);
		}
	}
}