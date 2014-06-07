// ==UserScript==
// @name           Facebook - MouseHunt Reload Every 15 minutes
// @namespace      http://userscripts.org/users/65487
// @include        http://apps.facebook.com/mousehunt/*
// @include        http://apps.new.facebook.com/mousehunt/*
// ==/UserScript==

//Attempt to sound the hunting horn every hour,
//regardless what page, in the MouseHunt game, you are on at the time.

setTimeout(function() { document.location = 'http://apps.facebook.com/mousehunt/soundthehorn.php'; } , 900000);
