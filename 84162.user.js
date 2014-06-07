// ==UserScript==
// @name          Disallow stylesheets certain subreddits
// @namespace     http://www.reaverxai.com/
// @description   
// @include       http://www.reddit.com/r/Portal*
// @include       http://www.reddit.com/r/portal*
// ==/UserScript==

document.styleSheets[1].disabled = true;