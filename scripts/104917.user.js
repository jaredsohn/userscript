// ==UserScript==
// @name           LeproFloodMeter
// @namespace      http://kt.era.ee/lepra/
// @description    Показывает статистику длинных тредов в посте
// @include        http://leprosorium.ru/comments/*
// @include        http://*.leprosorium.ru/comments/*
// ==/UserScript==

function xpathOneEx(query, root) {
    return document.evaluate(query, root, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
}

function xpathOne(query) {
    return xpathOneEx(query, document);
}

function includeScript(url, onload) {
	var s = document.createElement("script");
    s.src = url;
	s.onload = onload;
    document.body.appendChild(s);
}

function addButton(title, onClick) {
	var elButton = document.createElement('td');
	elButton.innerHTML = "<a href='' onclick='return false;'>" + title + "</a>";
	elButton.childNodes[0].addEventListener("click", onClick, false);
	panel = xpathOne("//table[@class='category']//tr")
	panel.appendChild(elButton);
}

function doFloodMeter() {
	includeScript("http://userscripts.org/scripts/source/104919.user.js");
}

addButton("Флудомер", doFloodMeter);
