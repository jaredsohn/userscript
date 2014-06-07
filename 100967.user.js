// ==UserScript==
// @name           Facebook Chat Names
// @author         Minim Group
// @namespace      http://minim.co
// @description    Display your friends names on the left menu, not tiny thumbnails.
// @include        https://www.facebook.com/
// @include        http://facebook.com/*
// @include        https://facebook.com/*
// @include        http://*.facebook.com/*
// @include        https://*.facebook.com/*
// @version        0.0.3
// ==/UserScript==

// a function that loads jQuery and calls a callback function when jQuery has finished 
function addJQuery(callback) {
  var script = document.createElement("script");
  script.setAttribute("src", "http://ajax.googleapis.com/ajax/libs/jquery/1.5.2/jquery.min.js");
  script.addEventListener('load', function() {
    var script = document.createElement("script");
    script.textContent = "(" + callback.toString() + ")();";
    document.body.appendChild(script);
  }, false);
  document.body.appendChild(script);
}

// the guts of this userscript
function main() {
  $('.uiTooltipText').addClass('uiChatListItem').removeClass('uiTooltipText');
}

// load jQuery and execute the main function
addJQuery(main);

function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

// addGlobalStyle('#chatFriendsOnline .fbFriendsOnlineFacepile img.uiProfilePhoto, #chatFriendsOnline .fbChatBuddyListTypeahead, #chatFriendsOnline .chatStatus {display: none;}');

