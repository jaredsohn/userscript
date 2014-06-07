// ==UserScript==
// @name       RYM: disable community button
// @match      http://rateyourmusic.com/*
// @copyright  2012+, You
// ==/UserScript==
document.getElementById('navtop').getElementsByTagName('li')[5].style.display = 'none';