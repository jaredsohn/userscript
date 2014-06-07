// ==UserScript==
// @name           Slashdot - Remove Title Prefix(adapted by Data_Man)     
// @description    Removes the "Slashdot - " prefix from tab titles
// @include        http://*slashdot.org/*
// ==/UserScript==

document.title = document.title.replace('Slashdot - ','')