// ==UserScript==
// @name           Rychyrd Player Highlighter
// @namespace      GLB
// @description    Rychyrd Highlighter
// @include        http://goallineblitz.com/game/game.pl?game_id=*&mode=pbp*
// ==/UserScript==

(function() {


const COLOR_MAP = {
"rywdy": {"background": "fuchsia"},
"brent": {"background": "hotpink"},
"badd bonedeep": {"background": "fuchsia"},
"lynyrd skynyrd": {"background": "hotpink"},
"daddy rych": {"background": "fuchsia"},
"rockin": {"background": "hotpink"},
"wild rych": {"background": "fuchsia"},


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