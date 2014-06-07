// ==UserScript==
// @name          Show G+ notification box only in Google+ 
// @namespace     http://sagg.im/hidegplusnotifications
// @description   To make sure we spend the entire day on Google+, we now have that big attractive notification box in the top right of all Google sites. When receiving a notification while searching the web or composing an email, the notification box turns all red and instantly draws your attention, taking you into the wrong conversation. This one line GreaseMonkey piece hides the notification box in all Google sites except Google+, where it belongs. Tested on Chrome and FF+GreaseMonkey.  
// @include       http://*.google.com/*
// @include       https://*.google.com/*
// @exclude       http://plus.google.com/*
// @exclude       https://plus.google.com/*

// ==/UserScript==

try {document.getElementById("gbg1").style.display = 'none';} catch(e) { }