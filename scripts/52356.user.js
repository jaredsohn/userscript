// ==UserScript==
// @name           NameCheap Search All TLDs
// @namespace      KramerC
// @description    Checks Search all available TLDs by default
// @include        http://www.namecheap.com/domain-name-search.asp*
// ==/UserScript==

function $x(xpath, root) { // From Johan Sundstr?m
  var doc = root ? root.evaluate ? root : root.ownerDocument : document, next;
  var got = doc.evaluate(xpath, root||doc, null, null, null), result = [];
  while(next = got.iterateNext())
    result.push(next);
  return result;
}

$x("/html/body/table/tbody/tr/td/table/tbody/tr[4]/td[3]/span/input")[0].checked = true;