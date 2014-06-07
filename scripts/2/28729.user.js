// ==UserScript==
// @name           LeproSort
// @namespace      http://detunized.net/
// @description    Sorts comments by their raiting (destroys tree hierarchy)
// @include        http://leprosorium.ru/comments/*
// ==/UserScript==

function getRating(div) {
	return parseInt(div.childNodes[3].childNodes[3].childNodes[1].childNodes[1].childNodes[0].innerHTML, 10);
}

var parentDiv = document.getElementById("content_left_inner");
var comments = [];
var commentIndexes = [];
for (var i = 0; i < parentDiv.childNodes.length; ++i) {
	var node = parentDiv.childNodes[i];
	if ("className" in node && node.className.indexOf("post") != -1) {
		comments.push({div: node, index: i, rating: getRating(node)});
		commentIndexes.push(i);
		
		node.className = node.className.replace(/indent_([1-9]+)/, "indent_0");
		parentDiv.replaceChild(document.createElement("div"), node);
	}
}

comments.sort(function (a, b) {
	return b.rating - a.rating;
});

for (var i = 0; i < commentIndexes.length; ++i) {
	parentDiv.replaceChild(comments[i].div, parentDiv.childNodes[commentIndexes[i]]);
}
