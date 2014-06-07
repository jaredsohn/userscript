// ==UserScript==
// @name        Remove Yahoo Search Bar
// @description Remove space wasting Yahoo Search Bar
// @include     *.yahoo.com/*
// @grant       metadata
// @version     1.3
// ==/UserScript==

//yahoo.com
var ybar1 = document.getElementById('masthead');
if (ybar1) {
    ybar1.parentNode.removeChild(ybar1);
}
//yahoo finance And Yahoo portfolios
var ybar2 = document.getElementById('header');
if (ybar2) {
    ybar2.parentNode.removeChild(ybar2);
}

//yahoo finance blogs
var ybar3 = document.getElementById('yfi_hd');
if (ybar3) {
    ybar3.parentNode.removeChild(ybar3);
}






