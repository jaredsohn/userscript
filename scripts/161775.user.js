// ==UserScript==
// @name        Watch_later_first
// @namespace   YouTube
// @description Make "Watch Later" (not "What to watch") your landing page.
// @version     0.1.2
// @include     http://www.youtube.com/
// @include     https://www.youtube.com/
// @author      paxcoder
// @run-at      document-start
// ==/UserScript==

//And the award for the most trivial user script goes to..
window.location = 'https://www.youtube.com/feed/watch_later';