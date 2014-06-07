// ==UserScript==
// @name        Destiny.gg Chat on Twitch
// @namespace   com.lsenger
// @description Replaces the Twitch default Chat with destiny.gg chat for Destiny channel
// @include     http://www.twitch.tv/destiny
// @version     1
// @grant       none
// ==/UserScript==

rightCol = document.getElementById('right_col');
rightCol.removeChild(rightCol.children[0]);

var iframe = document.createElement('iframe');
iframe.width = "100%";
iframe.height = "100%";
iframe.src="http://www.destiny.gg/embed/chat";
rightCol.appendChild(iframe);