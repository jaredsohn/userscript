// ==UserScript==
// @name           Facebook - Ghost Trappers Reload Every Minute
// @include        http://apps.facebook.com/ghost-trappers/*
// @include        http://apps.new.facebook.com/ghost-trappers/*
// ==/UserScript==

//@description Starts a hunt for Ghost Trapper every minute
//Enjoy :D!
setTimeout(function() { document.location = 'http://apps.facebook.com/ghost-trappers/hunt.php'; } , 60000);