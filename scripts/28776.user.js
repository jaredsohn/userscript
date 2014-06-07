// ==UserScript==
// @name           TuNice Player Highlighter
// @namespace      GLB
// @description    TuNice Highlighter
// @include        http://goallineblitz.com/game/game.pl?game_id=*&mode=pbp*
// ==/UserScript==

(function() {


const COLOR_MAP = {
"royce jones": {"background": "hotpink"},
"shaun rose": {"background": "hotpink"},
"bring tha pain": {"background": "hotpink"},
"corner": {"background": "hotpink"},
"d will": {"background": "hotpink"},
"slap uh hoe": {"background": "hotpink"},
"deandre pierce": {"background": "hotpink"},
"armanti edwardz": {"background": "hotpink"},
"jedi force": {"background": "hotpink"},
"fawk cue": {"background": "hotpink"},



};

function highlightText() {

var allTextNodes = document.evaluate('//text()', document, null,
XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
null);

for (var i = 0; i < allTextNodes.snapshotLength; i++) {
var ele = allTextNodes.snapshotItem(i);
for (var key in COLOR_MAP) {
if (ele.nodeValue.toLowerCase().indexOf(key) != -1) {
var span = document.createElement("span");
ele.parentNode.replaceChild(span, ele);
span.appendChild(ele);
for (var css in COLOR_MAP[key]) {
span.style[css] = COLOR_MAP[key][css];
}
}
}
}
}

highlightText();
})();