// ==UserScript==
// @name           Facebook - MouseHunt Reload
// @namespace      http://userscripts.org/users/65487
// @include        https://apps.facebook.com/mousehunt/*


// ==/UserScript==

//Attempt to sound the hunting horn every 15 minutes,
//regardless what page, in the MouseHunt game, you are on at the time.

setTimeout(function() { document.location = 'https://apps.facebook.com/mousehunt/soundthehorn.php'; } , 900000);
