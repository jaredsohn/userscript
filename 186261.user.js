// ==UserScript==
// @name        Reveal nofollow links on Stack Exchange
// @namespace   http://vyznev.net/
// @description Colors all links with rel=nofollow red on the Stack Exchange network. (Works on other sites too, if you edit the includes.)
// @include     http://*stackexchange.com/*
// @include     http://*stackoverflow.com/*
// @include     http://*superuser.com/*
// @include     http://*serverfault.com/*
// @include     http://*stackapps.com/*
// @include     http://*mathoverflow.net/*
// @include     http://*askubuntu.com/*
// @version     1.0
// @grant       GM_addStyle
// ==/UserScript==

// Yes, that's all there really is to it:
GM_addStyle( 'a[rel="nofollow"] { color: red !important; }' );
