// ==UserScript==
// @name          Iowa League DO NOT TOUCH List 2.19.12
// @namespace     http://iowaleague.blogspot.com
// @description	  Highlights Iowa League DO NOT TOUCH List Players
// @include       http://baseball.fantasysports.yahoo.com/b1/154*

// ==/UserScript==

(function() {

// key: word to match, value a dictionary of style elements to apply
// to blocks containing that word.
const COLOR_MAP = {
    "christian friedrich": {"background": "black", "color": "white"},
	"derek norris": {"background": "black", "color": "white"},
	"dellin betances": {"background": "black", "color": "white"},
	"jacob turner": {"background": "black", "color": "white"},
	"michael taylor": {"background": "black", "color": "white"},
	"mike trout": {"background": "black", "color": "white"},
	"chris carter": {"background": "black", "color": "white"},
	"julio teheran": {"background": "black", "color": "white"},
	"jarrod parker": {"background": "black", "color": "white"},
	"pomeranz": {"background": "black", "color": "white"},
	"Pomeranz": {"background": "black", "color": "white"},
	"jesus montero": {"background": "black", "color": "white"},
	"devin mesoraco": {"background": "black", "color": "white"},
	"yonder alonso": {"background": "black", "color": "white"},
	"martin perez": {"background": "black", "color": "white"},
	"matt dominguez": {"background": "black", "color": "white"},
	"arodys vizcaino": {"background": "black", "color": "white"},
	"anthony rizzo": {"background": "black", "color": "white"},
	"simon castro": {"background": "black", "color": "white"},
};

function highlightText() {

  var allTextNodes = document.evaluate('//text()', document, null,
                                       XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
                                       null);

  for (var i = 0; i < allTextNodes.snapshotLength; i++) {
    var ele = allTextNodes.snapshotItem(i);
    for (var key in COLOR_MAP) {
      if (ele.nodeValue.toLowerCase().indexOf(key) != -1) {
        // TODO(ark) perhaps make it only highlight the word?
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
