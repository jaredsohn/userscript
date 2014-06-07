// ==UserScript==
// @name           fubgamingclan-vbulletin-backslash-bug-fix
// @author         bf2edotcom <admin@bf2e.com>
// @namespace      fumbgamingclan
// @description    Fix for the backslash being appended to the domain name in redirect headers.
// @include        http://*fubgamingclan.com*
// @include        http://www.fubgamingclan.com/*
// @include        http://www.fubgamingclan.com*
// @include        http://fubgamingclan.com/*
// @include        http://fubgamingclan.com*
// ==/UserScript==

(function() {
if (location.href.match(/fubgamingclan.com\\\//))
  window.location = location.href.replace(/.com\\\//g, '.com/');
})();
