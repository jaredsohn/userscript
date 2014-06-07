// ==UserScript==
// @name           Facebook - MouseHunt Travel to Catacombs in 400 Minutes
// @namespace      http://userscripts.org/users/65487
// @include        http://apps.facebook.com/mousehunt/*
// @include        http://apps.new.facebook.com/mousehunt/*
// ==/UserScript==

//Attempt to sound the hunting horn every 5 minutes,
//regardless what page, in the MouseHunt game, you are on at the time.

setTimeout(function() { document.location = 'http://apps.facebook.com/mousehunt/travel.php?rid=4&envid=17'; } , 24000000);

