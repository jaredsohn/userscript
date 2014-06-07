// Unicode 5.1 To Zawgyi
// version 1.3.1
// 2009-11-30
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
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
// select "onthefly", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Unicode 5.1 To Zawgyi
// @namespace     http://hahauni.zawgyi.info
// @description   Unicode 5.1 To Zawgyi
// @include       http://my.wikipedia.org/wiki/*
// @include       http://mmfreethinker.wordpress.com/*
// @exclude       
// ==/UserScript==
//window.location.href = "http://hahauni.zawgyi.info/index.php?q="+window.location.href;

function addHTML (html) {
  if (document.all)
    document.body.insertAdjacentHTML('beforeEnd', html);
  else if (document.createRange) {
    var range = document.createRange();
    range.setStartAfter(document.body.lastChild);
    var docFrag = range.createContextualFragment(html);
    document.body.appendChild(docFrag);
  }
  else if (document.layers) {
    var l = new Layer(window.innerWidth);
    l.document.open();
    l.document.write(html);
    l.document.close();
    l.top = document.height;
    document.height += l.document.height;
    l.visibility = 'show';
  }
}

addHTML('<script src="http://www.saturngod.net/u2z.js"></script>');