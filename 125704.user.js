// ==UserScript==
// @name           CBC Music Cleanup
// @namespace      http://gapple.ca
// @include        http://music.cbc.ca/*
// ==/UserScript==

var div;

// Hide Top Ad
div = document.getElementById('leaderboardAd');
div.style.display = 'none';

// Scroll blog / comment box
div = document.getElementById('contentblock').parentNode;
div.style.zIndex = 100;
div.style.overflowX = 'hidden';
div.style.overflowY = 'auto';
div.style.width = (div.offsetWidth + 17) + 'px';
div.style.height = (document.documentElement.clientHeight - 160) + 'px';

// Hide black CBC header
div = document.getElementById('navHeaderWrapperDiv');
div.style.display = 'none';

// Hide big footers
div = document.getElementById('footer');
div.style.display = 'none';
div = document.getElementById('cbcFooter');
div.style.display = 'none';
