// ==UserScript==
// @name           LeproSortComments
// @namespace      http://kt.pri.ee/lepra/
// @description    Сортирует комментарии по рейтингу
// @include        http://leprosorium.ru/comments/*
// @include        http://*.leprosorium.ru/comments/*
// ==/UserScript==

xpathOneEx = function(query, root) {
    return document.evaluate(query, root, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
}
xpathOne = function(query) {
    return xpathOneEx(query, document);
}
xpathMany = function(query) {
    return document.evaluate(query, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
}

addButton = function(title, onClick) {
	var elButton = document.createElement('td');
	elButton.innerHTML = "<a href='' onclick='return false;'>" + title + "</a>";
	elButton.childNodes[0].addEventListener("click", onClick, false);
	panel = xpathOne("//table[@class='category']//tr")
	panel.appendChild(elButton);
}

sortComments = function() {
	var comments = xpathMany("//div[@id='js-commentsHolder']/div[contains(@class,'post')]");
	var a = Array();
	for (var i = 0; i < comments.snapshotLength; i++) {
		var elm = comments.snapshotItem(i);
		var rating = xpathOneEx("div//span[@class='rating']/em", elm).innerHTML;
		a[i] = {'post': elm, 'rating': rating};
	}
	a.sort(function(a,b) { return b.rating - a.rating;});
	
	root = document.getElementById('js-commentsHolder');
	root.innerHTML='';
	for (var i = 0; i < a.length; i++) {
		root.appendChild(a[i].post);
	}
	return false;
}

addButton('Отсортировать комментарии', sortComments);
