// ==UserScript==
// @name           GameJolt Chat Alert
// @description    Alerts you via page title that someone has said something in chat.
// @author         T-Dub
// @include        http://gamejolt.com/*
// @include        http://www.gamejolt.com/*
// @version        1.0
// ==/UserScript==

var latestMessage, str, name;

latestMessage = document.getElementById("small-chat-last-message").innerHTML;

function checkLatest() { 
  if (latestMessage != document.getElementById("small-chat-last-message").innerHTML) { 
    str = document.getElementById("small-chat-last-message").innerHTML;
    name = str.substring(8, str.indexOf(":</strong>"));
    document.title = "Message From: " + name;
    latestMessage = document.getElementById("small-chat-last-message").innerHTML;
  }
}


setInterval(function(){checkLatest()}, 1000);