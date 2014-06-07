// ==UserScript==
// @name        Hessensport24-AdBlock
// @namespace   de.mann.greasemonkey.hessensport24.banner_remover
// @description Blocks ads on hessensport24.de
// @include     http://www.hessensport24.de/*
// @version     1.0
// ==/UserScript==

// Remove ads from the heading
document.getElementsByClassName('banneritem').remove();
// Remove ads above the content and on the left & right hand side of the page
document.getElementById('rightnarrow').remove();
