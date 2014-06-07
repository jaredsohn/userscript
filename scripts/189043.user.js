// ==UserScript==
// @name        Randomflix
// @namespace   http://www.matthewbacklas.com
// @description Picks a random movie on Netflix
// @include     http://movies.netflix.com/*
// @version     1.1
// @grant       none
// ==/UserScript==
function get_random_movie(){var e=Array();e=document.getElementsByClassName("boxShotImg");var t=Math.floor(Math.random()*1001);var n=e[t];var r=confirm(n.getAttribute("alt"));if(r==true){window.open(n.nextSibling.href)}else{get_random_movie()}}get_random_movie()