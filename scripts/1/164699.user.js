// ==UserScript==
// @name          Remove Recommendations on Twitter
// @namespace     http://userstyles.org
// @description	  Removes the recommendations on your Twitter homepage
// @author        hellblau
// @grant         none
// @include       http://twitter.com/*
// @include       https://twitter.com/*
// @include       http://*.twitter.com/*
// @include       https://*.twitter.com/*
// ==/UserScript==
(function() {
mydiv = document.getElementById('empty-timeline-recommendations');
while ( mydiv.firstChild ) mydiv.removeChild( mydiv.firstChild );
})();