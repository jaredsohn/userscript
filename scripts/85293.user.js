// ==UserScript==
// @name          HAZ-Forum entrümpeln
// @description   Räumt das neue HAZ-Forum auf :-)
// @include       http://forum.haz.de/*
// @namespace     http://tuxproject.de
// ==/UserScript==

function XPath(Params) { return document.evaluate(Params, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null); }
function removeClass(element, name) {
    var regex = new RegExp("(.*)"+name+"(.*)");
    element.className = element.className.replace(regex, "$1$2");
}

var thisElement, allElements, theRegex, theID;

// == 1) Breitenbeschränkung aus der Seite entfernen ==

thisElement = XPath("//div[@id='seite']");
if (thisElement.snapshotItem(0)) {
	thisElement.snapshotItem(0).style.width="100%";
}

// == 2) Breitenbeschränkung aus allen Beiträgen entfernen ==

theRegex = /showthread\.php\?p=(\d+)/;
theID = theRegex.exec(window.location);

//if (Math.abs(theID[1]) > 0) {
	// wir sind in einem Diskussionsstrang
	allElements = XPath("//div[@class='page fixedwidth']");
	for (var i = 0; i < allElements.snapshotLength; i++) {
		removeClass(allElements.snapshotItem(i),"fixedwidth");
		removeClass(allElements.snapshotItem(i),"page");
		allElements.snapshotItem(i).style.width="100%";
		allElements.snapshotItem(i).style.marginLeft="none";
		allElements.snapshotItem(i).style.background="none repeat scroll 0 0 #FFFFFF";
		allElements.snapshotItem(i).style.color="black";
	}
	
	allElements = XPath("//div[@class='mdsk_spc_open']");
	for (var i = 0; i < allElements.snapshotLength; i++) {
		removeClass(allElements.snapshotItem(i),"mdsk_spc_open");
		allElements.snapshotItem(i).style.width="100%";
	}
//}

// == 3) Breitenbeschränkung aus der Navigationsleiste entfernen ==

thisElement = XPath("//div[@id='navigation']");
if (thisElement.snapshotItem(0)) {
	thisElement.snapshotItem(0).style.width="100%";
}

thisElement = XPath("//div[@id='navigation2']");
if (thisElement.snapshotItem(0)) {
	thisElement.snapshotItem(0).style.width="100%";
}

thisElement = XPath("//div[@id='login']");
if (thisElement.snapshotItem(0)) {
	thisElement.snapshotItem(0).style.width="450px"; // für die Amazonwerbung ;)
}

// == 4) unnötigen Krempel raus ==

XPath("//div[@id='banner1']").snapshotItem(0).parentNode.removeChild(XPath("//div[@id='banner1']").snapshotItem(0));
XPath("//div[@id='banner2']").snapshotItem(0).parentNode.removeChild(XPath("//div[@id='banner2']").snapshotItem(0));
XPath("//div[@id='header']").snapshotItem(0).parentNode.removeChild(XPath("//div[@id='header']").snapshotItem(0));
XPath("//div[@id='fuss']").snapshotItem(0).parentNode.removeChild(XPath("//div[@id='fuss']").snapshotItem(0));

// == 5) Werbelink einfügen ;-) ==

thisElement = XPath("//div[@id='login']/a[1]");
if (thisElement.snapshotItem(0)) {
	thisElement = thisElement.snapshotItem(0);

	var amazonlink = document.createElement('a');
	amazonlink.href = 'http://www.amazon.de/?tag=hirnfi20-21';
	amazonlink.appendChild(document.createTextNode('Einkaufen auf Amazon.de'));
	thisElement.parentNode.insertBefore(amazonlink, thisElement);
}