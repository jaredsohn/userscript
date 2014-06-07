// ==UserScript==
// @name           iGoogle Remove Footer and Change Theme/Add Stuff Bar
// @namespace      http://www.jeanmark.com/robert
// @description    Removes the footer on iGoogle
// @version        1.0
// @include        http*://www.google.*/*
// ==/UserScript==

var footer=document.getElementById('footerwrap');
var bar=document.getElementById('header_promo_wrapper');
var add=document.getElementById('addstuff');

footer.style.display='none';
footer.style.visibility='hidden';
bar.style.display='none';
bar.style.visibility='hidden';
add.style.display='none';
add.style.visibility='hidden';
