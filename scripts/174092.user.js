// ==UserScript==
// @name        Readly_mod
// @namespace   http://www.feedly.com
// @description A little Google Reader treatment for Feedly (with my mods)
// @updateURL   http://userscripts.org/scripts/source/174092.meta.js
// @installURL  http://userscripts.org/scripts/source/174092.user.js
// @include     http://www.feedly.com/home*
// @include     https://www.feedly.com/home*
// @include     http://cloud.feedly.com/*
// @include     https://cloud.feedly.com/*
// @version     0.7.7.1
// @grant       none
// ==/UserScript==

var keyActions = {
//
// Shift+A Added to feedly, and Shift+X not used
//
//  's65' : function() {
//    // shift+a - mark all as read
//
//    var pageActionMarkAsRead = document.getElementById('pageActionMarkAsRead');
//    if (pageActionMarkAsRead && pageActionMarkAsRead.style.display !== 'none') {
//      // mark as read button is present and visible - we can click on it
//      pageActionMarkAsRead.click();
//    }
//  },
//
//  's88' : function() {
//    // shift + x -- expand/collapse selected category
//    var selcat = document.querySelector('#feedlyTabs .header.target.selected');
//
//    if (selcat != null) {
//      var handle = selcat.querySelector('.handle');
//      if (handle != null) {
//        var evt = document.createEvent('MouseEvents');
//        evt.initMouseEvent('click', true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
//        handle.dispatchEvent(evt);
//      }
//    }
//  }
};

var getPressedKeys = function(e) {
    var keys = '';

    if(e.shiftKey) { keys += 's'; }
    if(e.ctrlKey)  { keys += 'c'; }
    if(e.metaKey)  { keys += 'm'; }
    if(e.altKey)   { keys += 'a'; }

    keys += e.keyCode;

    return keys;
};

document.addEventListener('keydown', function(e) {
    var pressedKeys = getPressedKeys(e);

    var handler = keyActions[pressedKeys];
    if (handler) {
        handler();

        // stop event propagation
        e.stopPropagation();
        e.preventDefault();
    }
}, false);

// mark categories with unread items with bold
(function hideCategories() {
    var categories = document.querySelectorAll('#feedlyTabs .tab');
    var l = categories.length, cat, unread, label;
    for (var i = 0; i < l; i += 1) {
        cat = categories[i];
        if (!cat.alreadyMarked) {
            unread = cat.querySelector('.categoryUnreadCount');
            if (unread == null || !unread.textContent.trim() || unread.textContent.trim() === '0') {
                label = cat.querySelector('.label');
                cat.alreadyMarked = true;
                label.style.fontWeight = 'normal';
                if (unread != null) {
                  unread.style.display = 'none';
                }
            }
        }
    }
    setTimeout(hideCategories, 500);
}());

(function() {
  var head, style;
  head = document.getElementsByTagName('head')[0];
  if (!head) { return; }
  style = document.createElement('style');
  style.type = 'text/css';
  style.innerHTML =
    /* styles for whole page */
    '.wide #feedlyTabsHolder { margin-top: 17px; }' +
    '.home #feedlyTabsHolder div.simpleUnreadCount { pointer-events: none; }' +
    '.home #feedlyTabsHolder .favicon { opacity: 0.85; }' +
    '.home #feedlyTabs { margin-right: 0; color: #000; }' +
    '.home #feedlyTabs .label { text-transform: none; font-weight:bold; }' +
    '#mytab .label, #latesttab .label, #savedtab .label { text-transform: capitalize !important; }' +
    '.home #feedlyPageHeader { margin-top: 10px; }' +
    '.home #timeline .section { display: none; }' +
    '.home .u0Entry { border-bottom: 0; border-left: 0; border-right: 0; }' +
    '.home .u0Entry .read { font-weight: normal; color: #444; }' +
    '.home .u0Entry .unread { font-weight: bold; color: #222; }' +
    '.home .sourceTitle a, .authors { color: #555; }' +
    '.home h1 .hhint { display:none }' +
    '.home #storeHolder { margin-top:30px; position:absolute; right:0; }' +
    '.home #feedlyPart { padding-right: 15px; }' +
    '.home #feedlyTabsHolder .nonEmpty, .home .u0Entry .title.read { color: #000; }' +

    '.home, .home #feedlyTabs .label, .home h1, .home .inlineFrame .u100entry .title, .home .u0Entry .title { font-family: arial,sans-serif; }' +
    '.home  { background: #fff !important; }' +

    '.home div.simpleUnreadCount { margin-left: 0; }' +
    '.home #feedlyPart0 { background: #F7F7F7; }' +
    '.home #feedlyPart0.area { min-height: 100%; padding: 0 0 0 15px; }' +
    '.home #footnoteBar { display: none; }' +
    '.home #loadingEntries { margin-top: 15px; padding-bottom: 20px; }' +
    '.home #feedlyTitleBar { text-transform: none; font-style: normal; }' +

    /* height of sidebar items -4px */
    '.home #feedlyTabsHolder {line-height: 24px;}' +
    '.home #feedlyTabs .icon {background-size: 24px 24px;height: 24px;width: 24px;}' +
    '.home #feedlyTabs .list {padding-left: 24px;}' +
    '.home #feedlyTabs .favicon {border: 4px solid transparent;}' +
    '.home .tab .feedIndexTitleHolder {line-height: 24px;}' +
    '.home #feedlyTabs .list .moreHandle { margin-left: 24px; }' +
    '.home #feedlyTabs .simpleunreadcount { width: auto; }' +

    '.home .target:hover { background: #eee; }' +
    '.home #feedlyTabsHolder #feedlyTabs .target.selected { color: #DD4B39; }' +
    '.home .entryBody { margin-top: 10px; color: #000; font-size: 13px; }' +
    '.home .entryBody a, .home .entryBody a:visited { color: #15c; }' +
    '.home .metadata { color: #666; }' +

    /* styles for article in condensed view */
    '.home .condensed .inlineFrame { padding: 10px 15px 5px 15px; cursor: auto; }' +
    '.home .condensed .inlineFrame .title { line-height: 30px; margin: 5px 0 10px; font-size: 19px; color: #15c; font-weight: bold; }' +
    '.home .condensed .inlineFrame .title.read { color: #15c; }' +
    '.home .condensed .inlineFrame .u100Entry { min-height: 0; }' +
// Not a fan...
//    '.home .condensed .u0entry.selectedEntry { padding-top: 0; padding-bottom: 0; height: 34px; -webkit-box-shadow: none; background: #E4E4E4; }' +
    '.home .condensed .inlineFrame .entryBody .content img { margin-left: 0 !important; margin-right: 0 !important; }' +
    '.home .entryBody, .home .condensed .entryholder .u100entry { max-width: none; }' +
    '.home .topWikiWidget { display: none !important; }' +
    '.home .bottomWikiWidget { margin-top: 15px; }' +
    '.home .condensed .entryBody br+br { display: none; }' +

    /* youtube iframe fix */
    '.home .entryBody iframe { margin: 0 !important; }' +

    /* My additions (too much space for "no unread" items) */
    '.home .infoBox { margin-top: 30px; margin-bottom: 30px; }';
  head.appendChild(style);
})();


var ob = (function(){
  var MutationObserver = window.MutationObserver || window.WebKitMutationObserver, eventListenerSupported = window.addEventListener;
  return function(obj, callback) {
    if (MutationObserver) {
      var obs = new MutationObserver(function(mutations, observer) {
        if (mutations[0].addedNodes.length || mutations[0].removedNodes.length) {
          callback();
        }
      });
      obs.observe(obj, { childList:true, subtree:true });
    } else if (eventListenerSupported) {
      obj.addEventListener('DOMNodeInserted', callback, false);
      obj.addEventListener('DOMNodeRemoved', callback, false);
    }
  };
})();

ob(document.getElementById('box'), function() {
  var el;
  if ((el = document.getElementById('feedlyFrame')) != null) {
    if (el.style != null && el.style.width != 0) {
      el.style.width = '';
      el.style.backgroundColor = '#fff';
    }
  }

  if ((el = document.getElementById('feedlyPage')) != null) {
    if (el.style != null && el.style.width != 0) {
      el.style.width = '';
    }
  }

  if ((el = document.getElementById('mainArea')) != null) {
    if (el.style != null && el.style.width != 0) {
      el.style.width = '';
    }
  }

  if ((el = document.getElementById('feedlyPart0')) != null) {
    if (el.style != null) {
      el.style.backgroundColor = '#F7F7F7';
    }
  }

  if (navigator.userAgent.toLowerCase().indexOf('firefox') == -1) { /* hello different versions of the same addon */
    var bw = document.getElementsByClassName('bottomWikiWidget');
    for (var i=0; i < bw.length; i++)
    {
      bw[i].style.display = 'block';
    }
  }
});
