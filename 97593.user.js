// ==UserScript==
// @name           Last.fm Ads Remove
// @description    hide ads in last.fm
// @include        http://last.fm/*
// @include        http://www.last.fm/*

// ==/UserScript==
document.getElementById("LastAd_leaderboard").style.display = "none";
document.getElementById("LastAd_mpu").style.display = "none";