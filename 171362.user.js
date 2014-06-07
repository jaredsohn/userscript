// ==UserScript==
// @name         CoolRom Download Helper
// @namespace    http://jixun.org/
// @version      1.0
// @description  enter something useful
// @include      *://coolrom.com/*
// @copyright    2012+, Jixun
// @run-at       document-start
// ==/UserScript==

var win, funcLoad;
try {
  win = unsafeWindow;
} catch (e) {
  win = window;
}

function descPage () {
  var dlAddrId = location.pathname.match (/\/(\d+)/)[1],
      ele = document.querySelector ('a[href*="dlpop"]').parentNode.parentNode,
      myRow = document.createElement ('tr');
  myRow.innerHTML = '<td colspan=3><iframe height=100 style="border: none;" src="/dlpop.php?id=' + dlAddrId + '"></iframe></td>';
  ele.parentNode.insertBefore (myRow, ele);
}

function dlPage () {
  document.querySelector('table').removeAttribute ('height');
  win.time = 0;
  win.download ();
}


if (location.pathname.indexOf('/roms/') != -1) {
  // Rom View Page
  funcLoad = descPage;
} else if (location.pathname.indexOf ('dlpop.php') != -1) {
  funcLoad = dlPage;
} else { /* CoolRom.com Helper by Jixun */}

addEventListener ('DOMContentLoaded', funcLoad, false);