// ==UserScript==

// @name          Hide facebook new bar

// @namespace     http://*.facebook.com/*

// @namespace     https://*.facebook.com/*

// @description   hide the new annoying facebook bar

// @include       *

// ==/UserScript==

var chatSidebar = document.getElementsByClassName("fbChatSidebar")[0];
chatSidebar.style.display="none";

