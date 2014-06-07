// ==UserScript==
// @name          Fontanka.Ru SeeMore short cirquit
// @description   Correct fontanka.ru -> seemore.ru links automatically back to their targets.
// @author        dluciv
// @license       WTFPLv2 (http://wtfpl.net/)
// @version       0.0.0.2
// @namespace     http://userscripts.org/scripts/review/173507
// @homepage      http://userscripts.org/scripts/show/173507
// @updateURL     http://userscripts.org/scripts/source/173507.meta.js
// @downloadURL   http://userscripts.org/scripts/source/173507.user.js
//
// @match         http://www.fontanka.ru/*
// ==/UserScript==

var linkIterator = document.evaluate(
  '//a[starts-with(@href, "http://www.seemore.ru/from/")]',
  document.body, null, XPathResult.ORDERED_NODE_ITERATOR_TYPE, null
);

var linkNode = linkIterator.iterateNext();
var links = [];
while (linkNode)
{
  links.push(linkNode);
  linkNode = linkIterator.iterateNext();
}

// Collect, then modify. No other way...

for(var idx in links)
{
  var node = links[idx];
  try {
    var href = node.getAttribute("href");
    var targetid = href.split('/').slice(-1)[0];
    node.setAttribute('href',
      'http://www.seemore.ru/go/' + targetid);
  } catch (e) {
    console.log("Error replacing href: " + e);
  }
}
