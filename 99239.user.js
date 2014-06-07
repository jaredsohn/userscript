// ==UserScript==
// @name          Facebook Fish Wrangler Auto Fish(C.U.15)
// @include       http://apps.facebook.com/fishwrangler/*
// @include       http://apps.new.facebook.com/fishwrangler/*
// ==/UserScript==

//Fishes close up to every 15 mins.

//Fishes on every page of Fish Wrangler.

setTimeout(function(){document.location = 'http://apps.facebook.com/fishwrangler/start';}, 890000 + Math.round(Math.random() * 33000));