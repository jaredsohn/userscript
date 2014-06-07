// ==UserScript==
// @name            hatena bookmark no more gigazine
// @namespace       http://userscripts.org/scripts/show/39188
// @description     Hide some famous sites on b.hatena.ne.jp
// @include         http://b.hatena.ne.jp/*
// ==/UserScript==
var denies = [
    'http://gigazine.net/',
    'http://www.popxpop.com/',
    'http://www.simplexsimple.com',
    'http://dain.cocolog-nifty.com/',
    'http://www.ideaxidea.com/',
    'http://e0166.blog89.fc2.com/',
    'http://ryurenzya.seesaa.net/',
    ];
var ids = [];
for (var i = 0; i < denies.length; i++) {
    var xpath = '//a[contains(@href, "' + denies[i] + '")]/../..';
    var entries = document.evaluate( xpath, document, null, XPathResult.ORDERED_NODE_ITERATOR_TYPE, null );
    var entry, li;
    while(entry = entries.iterateNext()) {
      li = entry.parentNode;
      if (li.tagName == 'LI') {
        li.parentNode.removeChild(li);
      }
    }
}
