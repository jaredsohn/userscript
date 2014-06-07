// ==UserScript==
// @name           Pixiv ranking sort
// @namespace      http://userscripts.org/users/424650
// @author         JonnyRobbie
// @description    Sorts pixiv ranking pake by date
// @include        /^http:\/\/www\.pixiv\.net\/ranking\.php\?mode=[a-z]+$/
// @run-at         document-end
// @grant          none
// @updateURL      https://userscripts.org/scripts/source/414774.meta.js
// @downloadURL    https://userscripts.org/scripts/source/414774.user.js
// @version        1.0
// ==/UserScript==

function getNumber(textDate) {
	return parseInt(textDate.substr(0, 4), 10)*100000000 + parseInt(textDate.substr(5, 2), 10)*1000000 + parseInt(textDate.substr(8, 2), 10)*10000 + parseInt(textDate.substr(12, 2), 10)*100 + parseInt(textDate.substr(15, 2), 10);
}

function sortNodes() {
	console.log("sorting...");
	var list = document.getElementsByClassName("ranking-items-container")[0].getElementsByClassName("ranking-items")[0];
	var items = list.childNodes;
	var itemsArr = [];
	for (var i in items) {
		if (items[i].nodeType == 1) { // get rid of the whitespace text nodes
			itemsArr.push(items[i]);
		}
	}
	itemsArr.sort(function(a, b) {
		return getNumber(a.getAttribute("data-date")) == getNumber(b.getAttribute("data-date")) ? 0 : (getNumber(a.getAttribute("data-date")) < getNumber(b.getAttribute("data-date")) ? 1 : -1);
	});
	for (i = 0; i < itemsArr.length; ++i) {
		list.appendChild(itemsArr[i]);
	}
}

function appendSortLink() {
	var menu = document.getElementById("wrapper").getElementsByClassName("ranking-menu")[0].getElementsByClassName("menu-items")[0];
	var menuwrap = document.createElement("li");
	var link = document.createElement("a");
		link.innerHTML = "Sort by newest";
		link.addEventListener("click", function(){sortNodes();})
		link.style.cursor = "pointer";
	menuwrap.appendChild(link);
	menu.appendChild(menuwrap);
}

function main() {
	console.log("pixiv sort start");
	appendSortLink();
}

main()
