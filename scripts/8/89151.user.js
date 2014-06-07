// ==UserScript==
// @name           Clean Xkb Docs
// @namespace      http://www.beaglebros.com
// @description    Removes extraneous table columns from Xkb docs
// @include        http://pascal.tsu.ru/en/xkb/*
// ==/UserScript==

function deleteXPathElement(xPathElement) {
	var badelement = document.evaluate(xPathElement, document, null, XPathResult.ANY_TYPE, null).iterateNext();
	badelement.parentNode.removeChild(badelement);
}

//deleteXPathElement('html/body/table/tbody/tr/td[1]');
deleteXPathElement("//td[@width='300' and @valign='top']");
deleteXPathElement("//td[@class='links']");
deleteXPathElement("//img[@src='/img/logo.jpg']");
