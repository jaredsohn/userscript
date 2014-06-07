// ==UserScript==
// @name           Practical Common Lisp footnotes
// @namespace      tag:domnit.org,2006-04:gmscripts
// @description    Link footnotes in Practical Common Lisp, or any site that marks up its footnotes the same way
// @include        http://www.gigamonkeys.com/book/*
// @exclude        http://www.gigamonkeys.com/book/
// ==/UserScript==

/*

(C) 2007 Lenny Domnitser
Use this freely under the GNU GPL, http://www.gnu.org/licenses/gpl.html

History
-------

2007-09-04 - Made

*/

var i = 1;
while(true) {
  var r = document.evaluate('//sup[text()="' + i + '"]', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
  if(r.snapshotLength != 2)
    break;
  var ref = document.createElement('a');
  ref.id = 'ref' + i;
  ref.href = '#note' + i;
  var note = document.createElement('a');
  note.id = 'note' + i;
  note.href = '#ref' + i;
  ref.innerHTML = note.innerHTML = i;
  with(r.snapshotItem(0)) {
    removeChild(firstChild);
    appendChild(ref);
  }
  with(r.snapshotItem(1)) {
    removeChild(firstChild);
    appendChild(note);
  }
  i++;
}