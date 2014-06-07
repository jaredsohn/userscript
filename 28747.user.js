// ==UserScript==
// @name           Wrath Player Highlighter
// @namespace      GLB
// @description    Wrath Highlighter
// @include        http://goallineblitz.com/game/game.pl?game_id=*&mode=pbp*
// ==/UserScript==

(function() {


const COLOR_MAP = {
"conor cossio": {"background": "yellow"},
"llig": {"background": "aqua"},
"rainer gill": {"background": "yellow"},
"uli kunkel": {"background": "lime"},
"xavy matheo": {"background": "yellow"},
"worley": {"background": "lime"},
"seamus mullan": {"background": "lime"},
"lou boyle": {"background": "blue"},
"vincenzo coccotti": {"background": "orange"},
"erik lanshof": {"background": "orange"},



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