// ==UserScript==
// @name          Atlantic Print Linker
// @namespace     tag:domnit.org,2006-04:gmscripts
// @description   Make Printer Format links open in current window instead of popup
// @include       http://www.theatlantic.com/doc/*
// ==/UserScript==

/*

(C) 2006 Lenny Domnitser
Use this freely under the GNU GPL, http://www.gnu.org/licenses/gpl.html

History
-------

2006-11-21 - Created

*/

var printLinks = document.evaluate('//a[@href="javascript:openprintpopup()"]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
for(var c = 0, printLink; printLink = printLinks.snapshotItem(c); c++) {
  printLink.href = location.href.replace(/\/doc\/(.+)(?:\/\d+)?$/, '/doc/print/$1');
}
