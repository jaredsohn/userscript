// ==UserScript==
// @name           MyYahoo Tab Switching
// @namespace      http://eden.com
// @include        http://*my.yahoo.com/p/*.html
// @include        http://*my.yahoo.com/
// @include        https://*my.yahoo.com/p/*.html
// @include        https://*my.yahoo.com/
// ==/UserScript==

var gTabsPool = [];
var gCurrentTabIdx = -1;

function initTabsPool() {
  var list = [document.getElementById('top'), document.getElementById('bottom')];
  var tabIdx = 0;
  for (var idx = 0; idx < list.length; idx++) {
    if (!list[idx]) continue;
    var childNodes = list[idx].childNodes;
    for (var i = 0; i < childNodes.length; i++) {
      if ((childNodes[i].tagName == 'LI') && (childNodes[i].id)) {
        var m = /p(.*)/.exec(childNodes[i].id);
        if (m) {
          gTabsPool[tabIdx] = m[1];
          if (childNodes[i].className && (childNodes[i].className.indexOf('current') != -1))
            gCurrentTabIdx = tabIdx;
          tabIdx++;
        }
      }
    }
  }
  // alert ('tabPool: ' + gTabsPool + ', currentTab: ' + gCurrentTab);
}

function onKeyPressed_Ctrl_LeftBracket() {
  // alert('You pressed ctrl+[');
  var newTabIdx;
  if (gCurrentTabIdx == 0) newTabIdx = gTabsPool.length - 1;
  else newTabIdx = gCurrentTabIdx - 1;

  document.location.href = 'http://my.yahoo.com/p/' + gTabsPool[newTabIdx] + '.html';
}

function onKeyPressed_Ctrl_RightBracket() {
  // alert('You pressed ctrl+]');
  var newTabIdx;
  if (gCurrentTabIdx == gTabsPool.length - 1) newTabIdx = 0;
  else newTabIdx = gCurrentTabIdx + 1;

  document.location.href = 'http://my.yahoo.com/p/' + gTabsPool[newTabIdx] + '.html';
}

function keydownHandler(e) {
  if ((e.keyIdentifier == 'U+00DB' || e.which == e.DOM_VK_OPEN_BRACKET) && e.ctrlKey) {
    onKeyPressed_Ctrl_LeftBracket(e);
  } else if ((e.keyIdentifier == 'U+00DD' || e.which == e.DOM_VK_CLOSE_BRACKET) && e.ctrlKey) {
    onKeyPressed_Ctrl_RightBracket(e);
  }
}

// ========= MAIN ============
initTabsPool();
if ((gTabsPool.length > 1) && (gCurrentTabIdx != -1)) {
  document.addEventListener('keydown', keydownHandler, true);
}
// ========= MAIN ============
