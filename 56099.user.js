// ==UserScript==
// @name           SiteScope Simplifier
// @namespace      mac
// @description    mac
// ==/UserScript==

var allTrs, thisTr;

//Remove Top Bars
allTrs = document.evaluate(
		"//tr[@class='navbox']",
		document,
		null,
		XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
		null );
if( allTrs.snapshotLength > 0 ){
	thisTr = allTrs.snapshotItem(0);
	allTrs.snapshotItem(0).parentNode.removeChild(thisTr);
	thisTr = allTrs.snapshotItem(1);
	allTrs.snapshotItem(1).parentNode.removeChild(thisTr);
	thisTr = allTrs.snapshotItem(2);
	allTrs.snapshotItem(2).parentNode.removeChild(thisTr);

}

//Remove first header
var allH2s = document.evaluate(
	"//h2",
	document,
	null,
	XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
	null );	
var thish2 = allH2s.snapshotItem(0);
allH2s.snapshotItem(0).parentNode.removeChild(thish2);

//Remove spare line
var allH2s = document.evaluate(
	"//br",
	document,
	null,
	XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
	null );	
var thish2 = allH2s.snapshotItem(0);
allH2s.snapshotItem(0).parentNode.removeChild(thish2);

//Remove "use the ..."
var allH2s = document.evaluate(
	"//font",
	document,
	null,
	XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
	null );	
var thish2 = allH2s.snapshotItem(0);
allH2s.snapshotItem(0).parentNode.removeChild(thish2);

// change font size
function addGlobalStyle(css) {
	var head, style;
	head = document.getElementsByTagName('head')[0];
	if (!head) { return; }
	style = document.createElement('style');
	style.type = 'text/css';
	style.innerHTML = css;
	head.appendChild(style);
}

addGlobalStyle('td, tr, th {font-size: 8px }' );
addGlobalStyle('img {height: 10px}' );
