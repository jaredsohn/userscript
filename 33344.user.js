// ==UserScript==
// @name           Goodreads List Maximizer
// @namespace      http://lab.pythonaro.com
// @description    Expand GR layout to occupy the entire browser screen when showing a list of books (shelf)
// @include        http://www.goodreads.com/review/list/*
// ==/UserScript==

// enlarge main divs

var mainDivs =  document.evaluate(
		"//div[@class='mainContent'] | //div[@class='mainContentFloat'] | //div[@id='leadercol']",
		document,
		null,
		XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
		null);
for (var f = 0; f < mainDivs.snapshotLength ; f++){
	div = mainDivs.snapshotItem(f);
	div.style.width = '99%';
	div.style.padding = '5px';
}
var tableDiv =  document.evaluate(
		"//div[@id='rightCol'] ",
		document,
		null,
		XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
		null);
for (var f = 0; f < tableDiv.snapshotLength ; f++){
	div = tableDiv.snapshotItem(f);
	div.style.width = 'auto';
	div.style.position = 'absolute';
	div.style.left = '240px';
	div.style.padding = '12px 10px 10px 0px';
}

var leaderDiv =  document.evaluate(
		"//div[@class='footerContainer']",
		document,
		null,
		XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
		null);
for (var f = 0; f < leaderDiv.snapshotLength ; f++){
	div = leaderDiv.snapshotItem(f);
	leaderDiv.style.border = '10px solid black';
	leaderDiv.style.visibility = 'hidden';
	leaderDiv.style.display = 'none';
}




// bonus: clean up the "edit" column
as =   document.evaluate(
	"//table[@id='myBooks']/tbody/tr/child::node()/a[@style='float: right;']",
		document,
		null,
		XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
		null);
for  (var i = 0; i < as.snapshotLength; i ++){
	a = as.snapshotItem(i);
	a.style.cssFloat = 'none';
	a.parentNode.style.width = "4%";
	a.parentNode.removeChild(a.parentNode.getElementsByTagName('br')[0]);
	a.parentNode.insertBefore(document.createTextNode("\u00a0\u00a0"),a.nextSibling);
}
