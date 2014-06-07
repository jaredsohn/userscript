// HostGator cPanel Cleanup
// Version 1.0
// 4/06/2007
// Copyright (c) 2007, Jojo Yohan
// Thanks to Jasper de Vries for help on making it work.
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "HostGator cPanel Cleanup", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          HostGator cPanel Cleanup
// @description   Removes intrusive ads on the top part of cPanel
// @include       *:2082/frontend/x/index.html
// @include       *:2083/frontend/x/index.html
// @include       http://cpanel.*.com/frontend/x/index.html
// ==/UserScript==
function $x(xpath, root) { // From Johan Sundstr?m
  var doc = root ? root.evaluate ? root : root.ownerDocument : document, next;
  var got = doc.evaluate(xpath, root||doc, null, null, null), result = [];
  while(next = got.iterateNext())
    result.push(next);
  return result;
}

function remove(element) {
  if (element) 
    element.parentNode.removeChild(element);
}

remove($x("/html/body/table/tbody/tr/td/table/tbody/tr[4]/td/table/tbody/tr/td/table")[0]);