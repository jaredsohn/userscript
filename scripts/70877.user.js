// ==UserScript==
// @name           XKCD image title under comics
// @namespace      XKCD
// @description    Shows image alt\title text under comic strip
// @include        http://xkcd.com/*
// @exclude        http://xkcd.com/about/
// ==/UserScript==

function addTitle() {
	var container = document.evaluate("//div[@id='middleContent']/div/div/div[@class='s']", document, null, 9, null).singleNodeValue;
	if (!container)
		return;
	var title = document.evaluate("//div[@id='middleContent']/div/div/div[@class='s']/img", document, null, 9, null).singleNodeValue.title;

	container.innerHTML = container.innerHTML.replace(/<img (.*?)><br>\n<br>/img, "<img $1 /><br /><br /><p>"+title+"</p><br />");
}

window.addEventListener(
		'load',
		function() { addTitle(); },
		false);