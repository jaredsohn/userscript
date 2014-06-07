// ==UserScript==
// @name            NoLogout_Chatroom 0.5
// @namespace       DemonHellNoire
// @include         http://chat.deviantart.com/chat/*
// @description     Fed up with the logout button on the top of the chats? Wish it was gone? Here's your answer ;)
// ==/UserScript==
//  This is the dedication spot, where I should thank my friends, family.
//  Perhaps even deviantART for putting the logout button on the top of the chats.
//  But I thank Nadia for all her love for me, never giving up on me.
//  I also thank anyone who uses, modifies, or adapts this script, just make sure I get some credit for the idea.

var dasButton = document.evaluate('.//span[@class="logout"]', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0);
dasButton.parentNode.removeChild(dasButton);

//  Special thanks to realillusions for helping me make this code.
//  My code has been removed to make the loading of this script faster, however, at the same time, it was written
//  with the Platypus! add-on. Ergo, the code was bloated.
//  If you really want to see the original code that it produced, note me on deviantART.
.user.js