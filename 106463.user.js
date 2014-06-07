// ==UserScript==
// @name          Facebook Chat Fix
// @description   Fixes new (July 2011) Facebook chat to look and behave more like original version.
// @include       http://*.facebook.com/*
// @match         http://*.facebook.com/*
// @version       1.2_8
// @copyright     (C)David Tyler 2011 [davidtyler.we.bs]
// ==/UserScript==

function addGlobalStyle(c) {
    var h = document.getElementsByTagName('head')[0], s = document.createElement('style');
    if (!h) { return; }
    s.type = 'text/css';
    s.innerHTML = c;
    h.appendChild(s);
}

// No separation on Chats
addGlobalStyle('.bb .rNubContainer .fbNub { margin: 0; }');

// Realign Chat Flyouts
addGlobalStyle('.bb .fbDockChatTab .fbDockChatTabFlyout { bottom: 25px; width: 260px; }');
addGlobalStyle('.bb .fbDockChatTab.openToggler { width: 160px; }');

// Don't Enlarge or Hide Chatee Name
addGlobalStyle('.bb .fbDockChatTab.openToggler .fbNubButton { display: block; width: 148px; }');

// Realign Typing Icon
addGlobalStyle('.bb .typing .fbChatUserTab .wrapWrapper { background-position: left center; padding: 0; }');
addGlobalStyle('.bb .typing .fbChatUserTab .wrap { background: none; }');

// And hide the new 'chatee is typing' text
addGlobalStyle('.typingIndicator { display: none; }');

// But what about the Chat Menu?
addGlobalStyle('.bb .fbDockChatBuddyListNub.openToggler .fbNubButton { display: block; border-top: 1px solid rgba(29, 49, 91, .3) }');
addGlobalStyle('.bb .fbDockChatBuddyListNub.openToggler .fbNubFlyout { bottom: 25px; }');