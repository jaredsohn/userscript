// ==UserScript==
// @name Kongregate Chat Line Highlighting
// @include http://www.kongregate.com/games/*
// @require http://userscripts.org/scripts/source/49229.user.js
// ==/UserScript==

// Nabb, 1st May 2009: nabb.trap17.com
// Updated 22nd May.

//This script will highlight lines which have your name in them with a light green. The colour may be changed below.

setTimeout("x=document.styleSheets[1];x.insertRule('#kong_game_ui .chat_message_window .toMe{background-color:#def6ea;}',x.cssRules.length);nFE(z='ChatRoom.prototype.receivedMessage','e,','e,f=');nFE(z,'e)',\"e,f.toLowerCase().search(this.username().toLowerCase())<0?'{}':{'class':'toMe'})\")",10)