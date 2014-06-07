// ==UserScript==
// @name           Duodecimator
// @description    Visually mark all twelve-letter words in web pages.
// @namespace      http://typrase.myopenid.com/
// @include        *
// ==/UserScript==

var forbidden = /pre|textarea|option|head|style|script/i;
var patt = /\b[A-Za-z][a-z]{11}\b/g;
var paras = document.getElementsByTagName('*');
for (var i = 0; i < paras.length; i++) {
    var para = paras[i];
    if (para.nodeName.match(forbidden)) {
        continue;
    }
    for (var j = 0; j < para.childNodes.length; j++) {
        var kid = para.childNodes[j];
        if (kid.nodeType == /*TEXT_NODE*/3) {
            var text = kid.nodeValue;
            if (text.match(patt)) {
                kid.nodeValue = text.replace(patt, '✹$&');
            }
        }
    }
}
