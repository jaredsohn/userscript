// ==UserScript==
// @name           LibraryThing Editions Escalator
// @namespace      http://userscripts.org/users/brightcopy
// @description    Moves the Editions link on the Book page closer to the top for "challenged" screen resolutions.
// @include        http://*.librarything.tld/work/*
// @license        Public Domain
// ==/UserScript==

var elem = document.evaluate('//div[@class="content summary"]//td[@class="left"]/ul[@class="worknav worknav3"]',
    document.body, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue;

if (elem) {
  var p = elem.parentNode;
  p.removeChild(elem);
  p.insertBefore(elem, p.firstChild.nextSibling.nextSibling);
}

elem = p.firstChild;
if (elem && elem.tagName == 'A') {
  elem = elem.firstChild;
  if (elem && elem.tagName == 'IMG')
    elem.style.marginBottom = 0;
}

elem = p.firstChild;
if (elem) {
  elem = elem.nextSibling;  // the first UL
  if (elem) {
    elem.style.marginTop = '4px';

    elem = p.firstChild.nextSibling;
  }
}

while (elem) {
  elem.style.marginBottom = 0;

  elem = elem.nextSibling;
}