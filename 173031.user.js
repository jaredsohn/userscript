// ==UserScript==
// @name       Highlight Unread Emails
// @namespace  http://dustinjsparks.com/owa/
// @version    0.1
// @description  Just makes the highlighting on unread emails actually visible.
// @match      https://*.outlook.com/owa/*
// @copyright  2013+, You
// ==/UserScript==

var unreadDiv = $('._lv_u ._lv_x')
    unreadDiv.css('height', '71px');
    unreadDiv.css('width', '100%');
    unreadDiv.css('background-color', 'lightyellow !important');