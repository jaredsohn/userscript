// ==UserScript==
// @name TESTING
// @include http://taleofdragons.net/levelup?id=*
// @include http://magistream.com/creature/*
// @include http://www.virtuadopt.com/quick_feed.php?id=*
// @include http://www.virtuadopt.com/feed.php?id=*

if(/"*"/i.test(document.body.textContent)) {var x=window.open("","_self");x.close();} 

// ==/UserScript==