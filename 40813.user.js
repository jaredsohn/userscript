// ==UserScript==
// @name           Facebook - MouseHunt Switch Cheese to RB in 400 Minutes
// @namespace      http://userscripts.org/users/65487
// @include        http://apps.facebook.com/mousehunt/*
// @include        http://apps.new.facebook.com/mousehunt/*
// ==/UserScript==

//Attempt to sound the hunting horn every 5 minutes,
//regardless what page, in the MouseHunt game, you are on at the time.

setTimeout(function() { document.location = 'http://apps.facebook.com/mousehunt/inventory.php?bait=12&hash=CoGLdO227L2t&tab=invCheese'; } , 24000000);