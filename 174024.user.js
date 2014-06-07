// ==UserScript==
// @name       Age Check Autocomplete
// @namespace  reddit.com/u/cris9696
// @version    0.1
// @description  Age Check Autocomplete 
// @include	http://store.steampowered.com/agecheck/*
// @include	https://store.steampowered.com/agecheck/*
// @run-at document-end 
// ==/UserScript==

document.getElementsByName("ageYear")[0].value="1900";
document.getElementsByClassName("btn_checkout_green")[0].click();


