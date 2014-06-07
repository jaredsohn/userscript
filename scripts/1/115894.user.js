// ==UserScript==
// @name           noMessages
// @namespace      http://www.feuerwache.net/feuerwachen
// @description    Hides the annoying Messages and Friends panels in the lower right corner
// @include        http://www.feuerwache.net/*
// ==/UserScript==
 
document.getElementById('footerMessageLink').style.visibility='hidden';
document.getElementById('footerFriendLink').style.visibility='hidden';