// ==UserScript==
// @name           Facebook Homepage Friendslist Remover.
// @namespace      http://userscripts.org/users/131595
// @description    Removes the friends list on the homepage of the new Facebook layout.
// @include        http://www.facebook.com/*
// ==/UserScript==
(function () {
GM_addStyle('#chatFriendsOnline { display:none;}');
}) ();