// ==UserScript==
// @id             UpNextHide
// @name           Hide the NY Times UpNext Slide out thing
// @version        1.0.0
// @namespace      codybrumfield.com
// @author         Cody Brumfield
// @description    Hides the "next article" thing on the NY Times
// @include        http://www.nytimes.com/*
// @include        http://global.nytimes.com/*
// @exclude        
// @run-at         document-end
// ==/UserScript==


var css = "#upNext { display: none !important; }"
GM_addStyle(css);
