// ==UserScript==
// @name   Google Reader Image Width Fix
// @description   Fix large image in Google Reader. 
// @version   1.0
// @include   https://www.google.com/reader/*
// @include   http://www.google.com/reader/*
// ==/UserScript==

GM_addStyle(".item-body img {max-width:100% !important;}")