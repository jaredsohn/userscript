// ==UserScript==
// @namespace     http://www.tweaksthelimbs.org/greasemonkey/
// @name          LiveMarks New Window
// @description   Opens links from LiveMarks in a new window/tab
// @include       http://sandbox.sourcelabs.com/livemarks/
// ==/UserScript==

document.addEventListener('click',function(e){e.target.target='_blank';},false);
//.user.js