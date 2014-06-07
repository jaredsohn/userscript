// ==UserScript==
// @name       deals4downloads.com See It
// @namespace  http://www.tomcss.com/
// @version    0.2
// @description  This will automatically go to the website which offers the game for sale, skipping the Deals4Download details page.
// @match      http://www.deals4downloads.com/games/detail/*
// @copyright  2013+, You
// ==/UserScript==

window.onload = function() { document.location.href = $('div.see-it-btn > a')[0].href; }