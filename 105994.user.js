// ==UserScript==
// @name           LeproSlideShow
// @namespace      http://kt.era.ee/lepra/
// @description    Показывает слайдшоу картинок из поста
// @include        http://leprosorium.ru/comments/*
// @include        http://*.leprosorium.ru/comments/*
// ==/UserScript==

function xpathOneEx(query, root) {
    return document.evaluate(query, root, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
}
function xpathOne(query) {
    return xpathOneEx(query, document);
}
function xpathMany(query) {
    return document.evaluate(query, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
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
function doSlideShow() {
	includeScript("http://userscripts.org/scripts/source/105993.user.js");
}
addButton("Слайдшоу", doSlideShow);
