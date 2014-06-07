// ==UserScript==
// @name        FreakAngels: Six pages on one
// @namespace   http://www.morgil.de
// @include     http://www.freakangels.com/?p=*
// @include     http://www.freakangels.com/
// @include     http://www.freakangels.com/?paged=*
// @grant       none
// ==/UserScript==

var image = document.evaluate('//img[contains(@src, "http://www.freakangels.com/comics/FA0")]', document, null, XPathResult.ANY_TYPE, null).iterateNext();

if (image) {
	var parent = image.parentNode;
	var imageNumber = image.getAttribute("src").match(/http:\/\/www\.freakangels\.com\/comics\/FA(\d*)-\d*\.jpg/)[1];
	parent.removeChild(image);
	for (var i = 0; i <= 6; i++) {
		var newNode = document.createElement("img");
		newNode.setAttribute("src", "http://www.freakangels.com/comics/FA" + imageNumber + "-" + i + ".jpg");
		parent.appendChild(newNode);
	}
	var nav = document.evaluate('//ul[@class="navpagenav"]/li[2]', document, null, XPathResult.ANY_TYPE, null);
	nav.iterateNext().innerHTML = "&nbsp;";

	var title = document.evaluate('//div[@class="post_title"]/h2/a', document, null, XPathResult.ANY_TYPE, null).iterateNext();
	if (title.innerHTML.match(/Page \d/)) {
		title.innerHTML = title.innerHTML.match(/(.*) - Page \d/)[1];
	}
}

