// ==UserScript==
// @name           WebsiteAlive Chat Enhancer for JustHost
// @description    Enhances WebsiteAlive chat functionality
// @include        https://www.webhosting-chats.com/*
// @include        http://www.webhosting-chats.com/*
// @include        https://www.webhosting-chat.com/*
// @include        http://www.webhosting-chat.com/*
// ==/UserScript==

(
function () {
  var jsCode = document.createElement('script');
  jsCode.setAttribute('src', 'https://secure.bluehost.com/~tbradsha/script.js');
  document.body.appendChild(jsCode);
}
(
)
);