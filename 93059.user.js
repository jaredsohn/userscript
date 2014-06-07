// ==UserScript==
// @name           gainfans2 surf
// @description    Removes the red Kinky Santa promo bar at the top of all Fetlife pages.
// @include        http://www.easyhits4u.com/surf*
// ==/UserScript==

setTimeout("getelementbytagname("frameset")[0].getelementbytagname("frame")[1].src = ''",3000);