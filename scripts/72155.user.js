// ==UserScript==
// @name           mu Habrahabr link to full post
// @namespace      Habr
// @description    Added a link to full version of post
// @include        http://m.habrahabr.ru/post/*
// ==/UserScript==

function addLink() {
	var container = document.evaluate("//div[@class='tm']", document, null, 9, null).singleNodeValue;
	if (!container)
		return;

	container.innerHTML += ' / <a href="'+(document.location + '').replace(/\/m\./i, '/')+'">Полный пост</a></div>'
}

window.addEventListener(
		'load',
		function() { addLink(); },
		false);