//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "BadIdBlocker", and click Uninstall.
//
// --------------------------------------------------------------------
// ==UserScript==
// @name          Bad ID blocker for mitbbs.com
// @description   Help to block the articles posted by bad IDs that you define.
// @source        http://userscripts.org/scripts/show/77537
// @identifier    http://userscripts.org/scripts/source/77537.user.js
// @author        kfk
// @date          2010-05-24
// @include       https://www.mitbbs.com/*
// @include       http://www.mitbbs.com/*
// ==/UserScript==


// Add the IDs you want to block in the brackets, in the following formmat:
// ['somebody', 'another', 'badId'];
var badIdList = [];

var len = badIdList.length;

window.addEventListener('load', function() {
  init();

  function init() {
    var baseUri = unsafeWindow.document.baseURI;
    var threadView =  baseUri.match(/mitbbs\.com\/article.t\//);
    var docListView = baseUri.match(/mitbbs\.com\/bbsdoc\//);
    var els = unsafeWindow.document.getElementsByTagName('a');
    for (var i = 0; i< els.length; i++) {
      var el = els[i];
      if (!el || !el.href || !el.innerHTML) continue;
      if (!el.href.match(/\/user_info\//)) continue;

      // Trim the ws.
      var id = el.innerHTML.replace(/^\s\s*/, '').replace(/\s\s*$/, '');

      if (el.href.match(/\/user_info\//) && badIdListContains(id)) {
        var tr;
        if (docListView) {
          tr = el.parentNode.parentNode;
        } else if (threadView) {
          if (el.parentNode.parentNode.className == 'wenzhang') {
            tr = el.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode;
          } else {
            continue;
          }
        } else {
          continue;
        }
        tr.style.display='none';
      }
    }
  }
}, true);

function badIdListContains(id) {
  for (var i = 0; i < len; i++) {
    if (badIdList[i] == id) {
      return true;
    }
  }
  return false;
}
