// ==UserScript==
// @name          userscripts.org: remove empty install stats
// @namespace     http://github.com/johan/
// @description   Removes all empty install log lines from userscripts.org script admin pages
// @include       http://userscripts.org/scripts/admin/*
// ==/UserScript==

var table = $X('id("content")/div[@class="admin_section"]/table'),
    empty = $x('.//tr[td[2]="0"]', table),
    count = empty.length;
if (count) {
  empty.forEach(function(tr) { tr.parentNode.removeChild(tr); });
  console.log('removed '+ count +' empty install log line'+
              (count == 1?'':'s'));
}

function $x(xpath, root) {
  var doc = root ? root.evaluate ? root : root.ownerDocument : document;
  var got = doc.evaluate(xpath, root||doc, null, 0, null), next, result = [];
  switch (got.resultType) {
    case got.STRING_TYPE:
      return got.stringValue;
    case got.NUMBER_TYPE:
      return got.numberValue;
    case got.BOOLEAN_TYPE:
      return got.booleanValue;
    default:
      while ((next = got.iterateNext()))
	result.push(next);
      return result;
  }
}

function $X(xpath, root) {
  var got = $x(xpath, root);
  return typeof got == 'object' ? got[0] : got;
}
