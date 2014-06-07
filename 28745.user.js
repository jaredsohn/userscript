// ==UserScript==
// @name           Paul Kemp Player Highlighter
// @namespace      GLB
// @description    Kemp Highlighter
// @include        http://goallineblitz.com/game/game.pl?game_id=*&mode=pbp*
// ==/UserScript==

(function() {


const COLOR_MAP = {
"eli cash": {"background": "hotpink"},
"raleigh": {"background": "hotpink"},
"walt sobchak": {"background": "hotpink"},
"zissou": {"background": "hotpink"},
"sheppard": {"background": "hotpink"},
"sister": {"background": "hotpink"},
"robert marley": {"background": "hotpink"},
"paul kemp": {"background": "hotpink"},
"lorenzo white": {"background": "hotpink"},
"erick metcalf": {"background": "hotpink"},
"ultra magnus": {"background": "hotpink"},
"zach attach": {"background": "hotpink"},


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