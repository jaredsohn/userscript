// ==UserScript==
// @name           Facebook - MouseHunt Reload Every 15 minutes
// @namespace      http://userscripts.org/users/113641
// @include        http://apps.facebook.com/mousehunt/*
// @include        http://apps.new.facebook.com/mousehunt/*
// @include        http://apps.new.facebook.com/mousehunt/
// @include        http://apps.facebook.com/mousehunt/
// @include       http://www.facebook.com/common/error.html
// @identifier    http://userscripts.org/scripts/source/60222.user.js


// ==/UserScript==

//refreshes to camp page for Mousehunt every 15 mins
//regardless of what page, in the MouseHunt game, you are on at the time.

setTimeout(function() { document.location = 'http://apps.facebook.com/mousehunt/index.php'; } , 900000);