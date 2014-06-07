// ==UserScript==
// @name           Facebook - MouseHunt Reload 15
// @namespace      http://userscripts.org/users/78062
// @include        http://apps.facebook.com/mousehunt/*
// @include        http://apps.new.facebook.com/mousehunt/*
// ==/UserScript==

//Attempt to sound the hunting horn every 15 minutes.

setTimeout(function() { document.location = 'http://apps.facebook.com/mousehunt/soundthehorn.php'; } , 900000);

