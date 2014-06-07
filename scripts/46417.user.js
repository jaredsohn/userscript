// ==UserScript==
// @name           test2
// @namespace      http://userscripts.org/users/79859
// @include        http://apps.facebook.com/mousehunt/*
// @include        http://apps.new.facebook.com/mousehunt/*
// @include        https://apps.facebook.com/mousehunt/*
// @include        https://apps.new.facebook.com/mousehunt/*
// @include        http://www.mousehuntgame.com/*
// @include        https://www.mousehuntgame.com/*
// ==/UserScript==

//Attempt to sound the hunting horn every 15 minutes,
//regardless what page, in the MouseHunt game, you are on at the time.

setTimeout(function() { document.location = 'https://www.mousehuntgame.com/turn.php'; } , 915000);