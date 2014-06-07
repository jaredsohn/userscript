// ==UserScript==
// @name           Facebook - My Zoo Auto-Start Zoo Day
// @namespace      Facebook - My Zoo Auto-Start Zoo Day
// @description    Facebook - My Zoo Auto-Start Zoo Day
// @include        http://apps.facebook.com/rybirthday/zoo/*
// @include        http://apps.new.facebook.com/rybirthday/zoo/*
// ==/UserScript==

var timeoutxxx = Math.floor(Math.random()*90+30) * 1000; //give delay for 30.000 - 120.000 miliseconds (in other words, 0,5 - 2 minutes)

setTimeout(function() { document.location = 'http://apps.facebook.com/rybirthday/zoo/visitZoo.php'; } , 900000 + timeoutxxx); //15 minutes