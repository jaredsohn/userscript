// ==UserScript==
// @name           Intel Slashvertisement hider
// @namespace      
// @description    Removes the BS Intel Slashvertisements recently added
// @include        http://slashdot.org/*
// @include        http://*.slashdot.org/*
// @include        https://slashdot.org/*
// @include        https://*.slashdot.org/*
// ==/UserScript==

var a;
if (a = document.getElementById('sponsorlinks')){
  a.style.display="none";
}
if (a = document.getElementById('links-opcenter')){
  a.style.display="none";
}
