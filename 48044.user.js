// ==UserScript==
// @name           OkCupid unclosed bold/italics fixup
// @namespace      http://code.google.com/p/ecmanaut/
// @description    Patches up pages suffering from their lack of html quoting (or sanitizing) of user input, removing b and i tags. (Works with any other site too you don't want any b or i tags on, but you'll have to add the @include rules yourself.)
// @include        http://okcupid.com/*
// @include        http://www.okcupid.com/*
// ==/UserScript==

fix("b");
fix("i");

function fix(tag) {
  var tags = [].slice.call(document.getElementsByTagName(tag));
  if (tags.length > 5)
    tags.forEach(transplant);
}

function transplant(tag) {
  var p = tag.parentNode;
  do {
    var n = tag.firstChild;
    if (n) p.insertBefore(n, tag);
  } while (n);
  p.removeChild(tag);
}
