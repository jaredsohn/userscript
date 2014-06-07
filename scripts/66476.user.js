// ==UserScript==
// @name           ZW
// @namespace      http://userscripts.org/users/79859
// @include        http://apps.facebook.com/playzoo/zoo/*
// @include        http://apps.new.facebook.com/playzoo/zoo/*
// ==/UserScript==

//attempt to refresh every 10 minutes.
//regardless what page, in the Zoo World game, you are on at the time.

setTimeout(function() { document.location = 'http://apps.facebook.com/playzoo/zoo/home.php?fb_force_mode=fbml'; } , 600000);