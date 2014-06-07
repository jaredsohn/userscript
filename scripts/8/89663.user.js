// ==UserScript==
// @name           FB - LL Auto Fight
// @include        http://apps.facebook.com/levynlight/*
// ==/UserScript==

//Attempt to catch every 12 minutes,

setTimeout(function() { document.location = 'http://apps.facebook.com/levynlight/turn.php'; } , 720000);