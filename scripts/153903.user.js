// ==UserScript==
// @name        Hide LinkedIn Today
// @namespace   http://wearegeek.nl/
// @description Hides the 'LinkedIn Today' block above the newsfeed
// @include     http://www.linkedin.com/
// @include     http://www.linkedin.com/*
// @include     https://www.linkedin.com/
// @include     https://www.linkedin.com/*
// @grant	none
// @version     1.2
// ==/UserScript==
var linkedInToday = document.getElementById("today-news-wrapper");

if (linkedInToday) {
    linkedInToday.style.display = 'none';
}

