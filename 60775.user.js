// ==UserScript==
// @name           Facebook - MouseHunt Every 15 mins
// @namespace      http://userscripts.org/users/114909
// @include        http://apps.facebook.com/mousehunt/*
// @include        http://apps.new.facebook.com/mousehunt/*
// ==/UserScript==

//Attempt to sound the hunting horn every 15 minutes,
//regardless what page, in the MouseHunt game, you are on at the time.

setTimeout(function() { document.location = 'http://apps.facebook.com/mousehunt/soundthehorn.php'; } , 900500);