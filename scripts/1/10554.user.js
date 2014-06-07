// ==UserScript==
// @name           Ustream mini
// @namespace      http://mikeallred.com/greasemonkey
// @description    Opens Ustream channel in a small, independent window
// @include        http://ustream.tv/*
// @include        http://www.ustream.tv/*
// ==/UserScript==

// find the cam div

window.camLink = '';
theResult = getXpathResult("id('xmcid_channels')/div/div[1]/div/p/a[1]/@href");
for (var i = 0; i < theResult.snapshotLength; i++) {
	GM_setValue(camLink, theResult.snapshotItem(i).value);
}

// prints the link

function printLink() {
	theElem = document.getElementById('flashcontentBr');
	linky = GM_getValue(camLink);
	myLink = document.createElement('a');
	myLink.setAttribute('href', 'javascript: window.open("' + linky + '", "' + linky + '", "location=0,resizable=1,statusbar=0,toolbar=0,width=20,height=20");history.go(0);');
	myText = document.createTextNode('mini');
	myLink.appendChild(myText);
	theElem.appendChild(myLink);
	//alert(linky);
}

function getXpathResult(expr) {
	theResult = document.evaluate(
		expr,
		document,
		null,
		XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
		null
	);
	return theResult;
}

printLink();
