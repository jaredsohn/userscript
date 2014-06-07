// ==UserScript==
// @name           FB GT Auto Refresh
// @include        http://apps.facebook.com/ghost-trappers/*
// ==/UserScript==

//Attempt to Refresh every 60 minutes,

setTimeout(function() { document.location = 'http://apps.facebook.com/ghost-trappers/index.php'; } , 300000);