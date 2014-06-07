// ==UserScript==

// @name           test3
// @namespace      http://userscripts.org/users/79859
// @include        http://apps.facebook.com/fishwrangler/*
// @include        http://apps.new.facebook.com/fishwrangler/*
// ==/UserScript==

//Attempt to fish every 15 minutes,
//regardless what page, in the Fish Wrangler game, you are on at the time.

setTimeout(function() { document.location = 'http://apps.facebook.com/fishwrangler/fish-now'; } , 900000);
