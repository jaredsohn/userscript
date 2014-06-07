// ==UserScript==// @name          Bring Email Link Back on LinkedIn// @namespace     http://www.japaninyourpalm.com// @description   Adds direct email link back to top of each LinkedIn profile// @include       http://www.linkedin.com/profile?viewProfile*// ==/UserScript==

var xpath = "//p[contains(@class,'sndemail')]";

var emailElem = document.evaluate(xpath,
                document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;

if (emailElem) {
	var newSendMailElem = document.getElementById('send-email');
	var newLiElem = document.createElement('li');
	newLiElem.appendChild(emailElem.cloneNode(true));
	newSendMailElem.parentNode.insertBefore(newLiElem, newSendMailElem.nextSibling);	
}