// Google Reader Printer Friendly Relink for standaard.be
// version 0.2
// 2007-04-24
// Copyright (c) 2007, Erdinc
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
// --------------------------------------------------------------------
// WHAT IT DOES:
// Replaces Google Reader's links to the printer friendly version on the Standaard.be
// site when you click on the link, NOT after the site is already loaded.
// It's not redirecting, it's relinking.
// You'll also need the "Print blocker" script http://userscripts.org/scripts/show/6571 
// if you don't want the print dialog to show up all the time.
// --------------------------------------------------------------------
// ==UserScript==
// @name            Google Reader Standaard.be Printer Friendly Relink
// @description     Replaces Google Reader's links to the print version on the Standaard.be 
// @include       http*://*.google.com/reader/*
// ==/UserScript==


document.addEventListener('click', function(event) {
    if (event.target.href.match(/artikelid=(DMF|B|GS|9S|QS)/i)){
    event.target.href = event.target.href.replace(/Detail\.aspx/, 'PrintArtikel.aspx')  ; 
    }
}, true);
