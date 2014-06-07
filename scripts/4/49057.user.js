// ==UserScript==
// @name           Facebook - Fish  Wrangler Auto-Fish
// @include        http://apps.facebook.com/fishwrangler/*
// @include        http://apps.new.facebook.com/fishwrangler/*
// ==/UserScript==

//Attempt to fish every 15 minutes,
//regardless what page in Fish Wrangler you are on.

setTimeout(function() { document.location = 'http://apps.facebook.com/fishwrangler/start'; } , 900000);