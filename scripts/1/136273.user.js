// ==UserScript==
// @name       nicolas
// @namespace  http://www.phpost.net/foro/user/451-nico/
// @version    0.1
// @description  probamos
// @match      http://*phpost.net/*
// @copyright  2012+, nico
// ==/UserScript==
jQuery = $ = unsafeWindow.jQuery
    nick = $('.logged_in #user_link .nick').html();
alert(nick);