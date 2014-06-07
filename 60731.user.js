// ==UserScript==
// @name          The Daily WTF - more readable
// @description	  change background-color and color on thedailywtf.com's article
// @include       http://thedailywtf.com/Articles/*
// @include       http://www.thedailywtf.com/Articles/*
// ==/UserScript==
// Notes:
//   * is a wildcard character
//   .tld is magic that matches all top-level domains (e.g. .com, .co.uk, .us, etc.)

(function() {
article = document.getElementById('MainContent');
article.style.backgroundColor = '#ccc';
article.style.color = '#222';
})();