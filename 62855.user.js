// ==UserScript==
// @name           Facebook - My Zoo 
// @namespace      Facebook - My Zoo
// @description    Facebook - My Zoo
// @include        http://apps.facebook.com/playzoo/zoo*
// ==/UserScript==

var timeoutxxx = Math.floor(Math.random()*90+30) * 1000; //give delay for 30.000 - 120.000 miliseconds (in other words, 0,5 - 2 minutes)

setTimeout(function() { document.location = 'http://apps.facebook.com/playzoo/zoo/shop.php'; } , 450000 + timeoutxxx); //7.5 minutes


