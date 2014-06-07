// ==UserScript==
// @name          PNJ are blue
// @namespace     http://www/
// @description   Description
// @include       http://forum*.lesroyaumes.com/*
// ==/UserScript==
//
//

var spans = document.getElementsByTagName("span");
var i;
for (i = 0 ; i < spans.length ; ++i) {
    if (spans[i].style.color == "blue") spans[i].style.color = "#001080";
}
