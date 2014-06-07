// ==UserScript==
// @name        Google Reader Unread Count with KeyBoard ShortCut
// @namespace   http://ellab.org/
// @version     1.0
// @description Display actual unread count instead of "1000+" in Google Reader. Keyboard shortcut ('3') added'
// @include     http*://www.google.com/reader/*
// ==/UserScript==

/*
Original Author: Angus http://angusdev.mysinablog.com/
Date:   2007-09-27

Version history:
1.0    27-Sep-2007   First release to userscripts.org
1.1    13-Oct-2007   Added support for keyboard shortcut
*/

function $(id){ return document.getElementById(id); }

function calcUnread() {
  var countedUrl = new Array();

  var res = document.evaluate("//li[contains(@class, 'folder')]//li[contains(@class, 'folder')]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
  var total = 0;
  var totalplus = false;
  for (var i=0;i<res.snapshotLength;i++) {
    var res2 = document.evaluate(".//li[contains(@class, 'unread')]/a/span/span[contains(@class, 'unread-count')]", res.snapshotItem(i), null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
    var subtotal = 0;
    var subtotalplus = false;
    for (var j=0;j<res2.snapshotLength;j++) {
      var countres = res2.snapshotItem(j).innerHTML.match(/\((\d*)\+?\)/);
      if (countres) {
        var count = parseInt(countres[1], 10);
        subtotal += count;
        if (res2.snapshotItem(j).innerHTML.match(/\(100\+\)/)) {
          subtotalplus = true;
          totalplus = true;
        }
        if (countedUrl.indexOf(res2.snapshotItem(j).parentNode.parentNode.href) < 0) {
          total += count;
          countedUrl[countedUrl.length] = res2.snapshotItem(j).parentNode.parentNode.href;
        }
      }
    }
    if (subtotal > 0) {
      var resfolder = document.evaluate(".//a/span/span[contains(@class, 'unread-count')]", res.snapshotItem(i), null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
      if (resfolder) {
        resfolder.innerHTML = '&nbsp;(' + subtotal + (subtotalplus?'+':'') + ')';
      }
    }
  }
  if (total > 0) {
    $('reading-list-unread-count').innerHTML = ' (' + total + (totalplus?'+':'') + ')';
  }
}

if ($('reading-list-selector')) {
  var a = document.createElement('A');
  a.innerHTML = "<img src='/reader/ui/favicon.ico' border='0' style='vertical-align:bottom;' />";
  a.href = 'javascript:void(0)';
  a.addEventListener("click", calcUnread, 0);

  $('reading-list-selector').appendChild(document.createTextNode(' '));
  $('reading-list-selector').appendChild(a);
}

function keyHandler(event) {
  // Apparently we still see Firefox shortcuts like control-T for a new tab - 
  // checking for modifiers lets us ignore those
  if (event.altKey || event.ctrlKey || event.metaKey) {
    return false;
  }

  // We also don't want to interfere with regular user typing
  if (event.target && event.target.nodeName) {
    var targetNodeName = event.target.nodeName.toLowerCase();
    if (targetNodeName == "textarea" ||
        (targetNodeName == "input" && event.target.type &&
         event.target.type.toLowerCase() == "text")) {
      return false;
    }
  }

  var k = event.keyCode;

  if (k in SIMPLE_ACTIONS) {
    SIMPLE_ACTIONS[k]();
    return true;
  }

  return false;
}

// Constants
const SIMPLE_ACTIONS = {
    // "3": Sort on unread feed, show only unread items
    51: function() {
         // Init Orig Feed the first time
         calcUnread()
    },
};

// main() invocation 
window.addEventListener('keydown', keyHandler, false);


