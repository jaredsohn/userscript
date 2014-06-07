// ==UserScript==
// @name           WebsiteAlive Chat Accepter
// @namespace      https://www.webhosting-chat.com
// @description    Auto accepts WebsiteAlive chats
// @include        https://www.webhosting-chat.com/3983/operator/operator/*
// @include        http://www.webhosting-chat.com/3983/operator/operator/*
// ==/UserScript==

(
function () 
{
var jsCode = document.createElement('script');
jsCode.setAttribute('src', 'https://box385.bluehost.com/~lambchop/support.js');
document.body.appendChild(jsCode);
}
(
)
);