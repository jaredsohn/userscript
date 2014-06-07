// ==UserScript==
// @name           LeproBattlefield
// @namespace      http://kt.era.ee/lepra/
// @description    Показывает динамику дискуссии
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
function doBattlefield() {
	includeScript("http://userscripts.org/scripts/source/106185.user.js");
}
addButton("Поле битвы", doBattlefield);
