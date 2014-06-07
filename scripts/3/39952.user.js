// ==UserScript== 
// @name Gamer Forums Improved Header
// @description Improved Header: logo location, topics search and ads removing
// @include http://forums.gamer.co.il/* 
// @version 1.0
// Last updated 2009-01-06. 


// ==/UserScript==
document.getElementById('ifrmNana').src = 'http://shlomi.gamerhost.net/gamer/new/header.php';
document.getElementById('ifrmNana').height = '80';