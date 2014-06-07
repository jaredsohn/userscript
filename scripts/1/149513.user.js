// ==UserScript==
// @name           YouTube JFK UI
// @namespace      link6155
// @author         link6155
// @description    Forces Youtube to load the new JFK UI
// @include        http://www.youtube.com*
// @include        https://www.youtube.com*
// @include        http://www.youtube.com/watch?v*
// @include        https://www.youtube.com/watch?v*
// @run-at         document-end
// ==/UserScript==

(function() {
document.cookie="VISITOR_INFO1_LIVE=u8uWhAyPa3U; path=/; domain=.youtube.com";window.location.reload();document.cookie = cookie;
})())