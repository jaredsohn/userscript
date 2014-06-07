// ==UserScript==
// @name        reddit new comments link
// @namespace   google.com
// @include     http://www.reddit.com/*
// @version     1
// ==/UserScript==

var a1 = document.getElementsByClassName("comments");
var arr = [];
for (var j = 0; j < a1.length; j++) arr[j] = a1[j];

for (var i = 0; i < arr.length; i++) {
    var elem = arr[i];
    var href = elem.getAttribute("href");
    var newElem = elem.cloneNode(true);
    newElem.setAttribute("href", href + "?sort=new");
    newElem.innerHTML = "new";
    newElem.style.marginLeft = "5px";
    elem.parentNode.insertBefore(newElem, elem.nextSibling);
}
