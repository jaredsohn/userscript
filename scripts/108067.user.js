// ==UserScript==
// @name           Facebook Retro' Chat
// @namespace      http://userscripts.org
// @description    Disables the new shitty facebook chat sidebar
// @author         fox (fox91 at anche dot no)
// @license        GPL 3
// @include        http://*.facebook.com/*
// @include        https://*.facebook.com/*
// @match          http://*.facebook.com/*
// @match          https://*.facebook.com/*
// ==/UserScript==

function showAllFriends() {
  if (unsafeWindow.ChatOnlineFriends) {
    if (unsafeWindow.ChatOnlineFriends.maxElements != 9999) {
      unsafeWindow.ChatOnlineFriends.maxElements = 9999;
      unsafeWindow.ChatOnlineFriends.update();
    }
    var available = unsafeWindow.AvailableList.getCount();
    var e = document.getElementById("fbDockChatBuddylistNub");
    if (available !== undefined && e.firstChild.lastChild) {
      e.firstChild.lastChild.innerHTML = "chat ("+available+")";
    }
  }
}

function retroChat() {
  if (unsafeWindow.ChatSidebar) {
    unsafeWindow.ChatSidebar.isViewportCapable = function() { return false; };
    unsafeWindow.ChatSidebar.disable();
    showAllFriends();
    window.setInterval(showAllFriends, 1000);
  }
  else {
    window.setTimeout(retroChat, 1000);
  }
}

window.setTimeout(retroChat, 1000);
