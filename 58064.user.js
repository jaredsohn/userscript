// ==UserScript==
// @name           Ghost Trappers - Auto Hunt
// @namespace      Ghost Trappers - Auto Hunt
// @include        http://apps.facebook.com/ghost-trappers/*
// ==/UserScript==

//Attempt to hunt every 15 minutes plus some delay

var timeoutxxx = Math.floor(Math.random()*90+30) * 1000; //give delay for 30.000 - 120.000 miliseconds (in other words, 0,5 - 2 minutes)

setTimeout(function() { document.location = 'http://apps.facebook.com/ghost-trappers/hunt.php?d=446'; } , 900000 + timeoutxxx);