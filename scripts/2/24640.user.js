// ==UserScript==
// @name           AH2hListing
// @namespace      http://naarvoren.nl/artikel/monkeyformats/
// @include        http://webwinkel.ah.nl/*
// @include        http://webwinkel.etos.nl/*
// @include        http://webwinkel.gall.nl/*
// ==/UserScript==

function addClass(thepath, theclass) {
	var allDivs, thisDiv;
	allDivs = document.evaluate(thepath,document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
	for (var i = 0; i < allDivs.snapshotLength; i++) {
    	thisDiv = allDivs.snapshotItem(i);
    	thisDiv.className = thisDiv.className +' '+ theclass;
	}
}

function replaceClass(thepath, theclass) {
	var allDivs, thisDiv;
	allDivs = document.evaluate(thepath,document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
	for (var i = 0; i < allDivs.snapshotLength; i++) {
    	thisDiv = allDivs.snapshotItem(i);
    	thisDiv.className = theclass;
	}
}

function replaceText(thepath, searchText, replaceText) {
	var allDivs, thisDiv;
	re = new RegExp(searchText,'g');
	allDivs = document.evaluate(thepath,document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
	for (var i = 0; i < allDivs.snapshotLength; i++) {
    	thisDiv = allDivs.snapshotItem(i);
		thisDiv.innerHTML = thisDiv.innerHTML.replace(re, replaceText);
	}
}

addClass("//div[@class='product']/div","item");
addClass("//div[@class='product']","hlisting");
addClass("//p[@class='p_price']"," price");
replaceClass("//div[@class='product_info']/h4/a[@class='description']","fn");
addClass("//div[@class='product_info']/p","description");
addClass("//div[@class='product_image']/a/img"," photo");

replaceText("//div[@class='product_price']", "</p>", "</p><div class=\"lister vcard\" style=\"display:none;\"><span class=\"fn\">Albert Heijn</span></div>");


