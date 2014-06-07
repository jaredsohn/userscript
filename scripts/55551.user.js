// ==UserScript==
// @name           Facebook - MythMonger Reload
// @namespace      http://userscripts.org/users/103527
// @include        http://apps.facebook.com/mythmonger/*
// @include        http://apps.facebook.com/mythmonger/turn.php*
// ==/UserScript==

//Attempt to play every 5 minutes and a few milliseconds,
//regardless what page, in the MouseHunt game, you are on at the time.

setTimeout(function() { document.location = 'http://apps.facebook.com/mythmonger/turn.php'; } , 300053);

