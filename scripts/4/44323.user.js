// ==UserScript==
// @name           Google Talk Chat Channel
// @namespace      *
// @description    Gives you the channel for Pidgin so you can join!
// @include        http://talkgadget.google.com/talkgadget/joinpmuc*
// ==/UserScript==

// Get our string..
var myroom = unsafeWindow['room'];
myroom = myroom.replace(/@.*$/, "");
// Insert it!
document.lastChild.children[1].innerHTML = document.lastChild.children[1].innerHTML + '<p style="text-align: center;">Room: <code>'+myroom+'</code></p>';
