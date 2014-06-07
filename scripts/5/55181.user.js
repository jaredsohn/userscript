// ==UserScript==
// @name           FakeNameGenerator Lowercase Email Address
// @namespace      iamai.pip.verisign.com
// @description    Modifies the email address to lowercase
// @include        http://www.fakenamegenerator.com/
// @include        http://www.fakenamegenerator.com/gen-random-*.php
// ==/UserScript==

const EMAIL_XPATH = "//li[@class='email']/span[@class='value']";

with(document.evaluate(EMAIL_XPATH, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue) {
	firstChild.textContent = firstChild.textContent.toLowerCase();
	childNodes[1].childNodes[1].href = childNodes[1].childNodes[1].href.toLowerCase();
}
