// ==UserScript==

// @name           test
// @namespace      http://userscripts.org/users/79859
// @include        http://apps.facebook.com/ghost-trappers/*
// @include        http://apps.new.facebook.com/ghost-trappers/*
// ==/UserScript==

//Attempt to sound the hunting horn every 15 minutes,
//regardless what page, in the Ghost Trappers game, you are on at the time.

setTimeout(function() { document.location = 'http://apps.facebook.com/ghost-trappers/hunt.php?c=615'; } , 900000);

