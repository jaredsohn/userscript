// ==UserScript==
// @name           Skip NRG Maavaron
// @namespace      http://iss.oy.ne.ro
// @description    Clicks past the annoying NRG Ma'ariv interstitial ads
// @include        http://www.nrg.co.il/online/maavaron*
// ==/UserScript==

// Get the next place to go from the nicely named "skip_btn"
// Go there - no ad!
setTimeout("document.location.href=document.getElementById('skip_btn').href;",500);
