// ==UserScript==
// @name            Google Reader Unread Count
// @version         12
// @namespace       http://ellab.org/
// @author          angusdev
// @description     Display actual unread count instead of "1000+" in Google Reader
// @include         http://www.google.tld/reader/*
// @include         https://www.google.tld/reader/*
// ==/UserScript==

/*
Author: Angus http://angusdev.mysinablog.com/
              http://angusdev.blogspot.com/
Date:   2011-12-18

Version history:
12   18-Dec-2011    Issue #34 Refine the matches URL
                    Issue #35 Double count if a feed is in more than 1 tag
11   06-Nov-2011    Issue #32 Fix the problem on Google new version
10   09-Jun-2010    Issue #14 Suppport Safari Extensions
9    25-Nov-2009    Refactoring and optimization
                    Now will listen to each feed's unread count change and recalculate
8    24-Oct-2009    Issue #1 The node no longer has feed url, so use the node title as duplication check
7    02-Oct-2009    Supports Chrome extensions
6    14-May-2009    @include uses top-level-domain (tld) conversion
5    20-Mar-2009    Change the window title to (xxx) Google Reader
                    Listen to DOMTitleChanged event (gecko specified) so can response faster window title changed by Google
4    12-Nov-2008    Supports Chrome
                    Fix the bug that didn't show the '+' sign in total if a feed has 1000+ unread items
3    06-Nov-2008    Fix the problem due to Google changed DOM
                    Fix the problem that didn't count the untagged item
2    13-Jun-2008    Remove the button, change to refresh every 3 seconds, and will update the window title as well
1    27-Sep-2007    First release to userscripts.org
*/

(function(){

var isChrome = false;
var isSafari = false;

// features switch
var hasDOMSubtreeModified = false;

var unreadCountElement = null;

function init() {
  if (navigator.userAgent.match(/Chrome/)) {
    isChrome = true;
  }
  else if (navigator.userAgent.match(/Safari/)) {
    isSafari = true;
  }

  hasDOMSubtreeModified = !isChrome && !isSafari;

  if (document.body) waitForReady();
}

// Wait for the dom ready
function waitForReady() {
  if (unreadCountElement = document.getElementById('reading-list-unread-count')) {
    if (hasDOMSubtreeModified) {
      var res = document.evaluate("//span[contains(@class, 'unread-count') and contains(@class, 'sub-unread-count') and not(contains(@class, 'folder-unread-count'))]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
      for (var i=0;i<res.snapshotLength;i++) {
        res.snapshotItem(i).parentNode.addEventListener('DOMSubtreeModified', modifySubtree, false);
      }
      window.addEventListener("DOMTitleChanged", calcUnread, false);
    }
    else {
      window.setInterval(calcUnread, 3000);
    }
    calcUnread();
  }
  else {
    window.setTimeout(waitForReady, 500);
  }
}

function modifySubtree() {
  if (unreadCountElement.textContent.match(/\d{4}\+?/)) {
    calcUnread();
  }
}

function findItemUnread(checkDuplicated, item) {
  var hasplus = false;
  var count = 0;
  var alreadyCounted = false;
  var countres = item.innerHTML.match(/\((\d*)\+?\)/);
  if (countres) {
    count = parseInt(countres[1], 10);
    if (item.innerHTML.match(/\(1000\+\)/)) {
      hasplus = true;
    }
    var nodeHref = item.parentNode.getAttribute('href');
    if (nodeHref) {
      if (checkDuplicated.indexOf(nodeHref) < 0) {
        checkDuplicated.push(nodeHref);
      }
      else {
        alreadyCounted = true;
      }
    }
  }

  return {count:count,hasplus:hasplus,alreadyCounted:alreadyCounted};
}

function calcUnread() {
  var checkDuplicated = [];
  var total = 0;
  var totalplus = false;
  var res = document.evaluate("//li[contains(@class, 'folder')]//li[contains(@class, 'folder')]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
  for (var i=0;i<res.snapshotLength;i++) {
    var res2 = document.evaluate(".//li[contains(@class, 'unread')]/a/div[contains(@class, 'unread-count')]", res.snapshotItem(i), null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
    var subtotal = 0;
    var subtotalplus = false;
    for (var j=0;j<res2.snapshotLength;j++) {
      var result = findItemUnread(checkDuplicated, res2.snapshotItem(j));
      if (result.hasplus) {
        totalplus = true;
        subtotalplus = true;
      }
      subtotal += result.count;
      if (!result.alreadyCounted) {
        total += result.count;
      }
    }
    if (subtotal > 0) {
      var resfolder = document.evaluate(".//a/div[contains(@class, 'unread-count')]", res.snapshotItem(i), null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
      if (resfolder) {
        resfolder.innerHTML = '&nbsp;(' + subtotal + (subtotalplus?'+':'') + ')';
      }
    }
  }

  // untagged items
  var res2 = document.evaluate("//ul[@id='sub-tree']/li/ul/li[not(contains(@class, 'folder')) and contains(@class, 'unread')]/a/div[contains(@class, 'unread-count')]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
  for (var j=0;j<res2.snapshotLength;j++) {
    var result = findItemUnread(checkDuplicated, res2.snapshotItem(j));
    if (result.hasplus) {
      totalplus = true;
    }
    if (!result.alreadyCounted) {
      total += result.count;
    }
  }

  if (total > 0) {
    var totaltext = total + (totalplus?'+':'');
    unreadCountElement.innerHTML = ' (' + totaltext + ')';

    // update windows title as well
    if (totaltext) {
      var newTitle = '(' + totaltext + ') ' + document.title.replace(/\s*\(\d+\+?\)$/, '').replace(/^\(\d+\+?\)\s*/, '');;
      if (document.title != newTitle) {
        document.title = newTitle;
      }
    }
  }
}

init();

})();
