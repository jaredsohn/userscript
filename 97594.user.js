// ==UserScript==
// @name           IMDB Ads Remove
// @description    hide ads from imdb.com
// @include        http://imdb.com/*
// @include        http://www.imdb.com/*

// ==/UserScript==
document.getElementById("top_ad_wrapper").style.display = "none";
document.getElementById("top_rhs_wrapper").style.display = "none";
document.getElementById("top_rhs_after").style.display = "none";
