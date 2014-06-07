// ==UserScript==
// @name       Cryptonit Bouncy Chatbox Fixed
// @namespace  https://cryptonit.net/exchange/
// @version    0.1
// @description  enter something useful
// @match      https://cryptonit.net/exchange/*
// @copyright  2013+, megablue
// ==/UserScript==

var $ = unsafeWindow.jQuery;

$(function(){
    $('#chatroom-user-list-2').remove();
});