// ==UserScript==
// @name           Mousehunt for Facebook Horn Checker - every 30 Minutes
// @include        http://apps.facebook.com/mousehunt/*
// @include        http://apps.new.facebook.com/mousehunt/*
// ==/UserScript==

//@description Sounds the hunter's horn every 30 minutes as long as you have the mousehunt page open
//Enjoy :D!
setTimeout(function() { document.location = 'http://apps.facebook.com/mousehunt/soundthehorn.php'; } , 3000000);
