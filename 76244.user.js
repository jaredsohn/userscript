// ==UserScript==
// @name   Jason.SUN's Google Reader
// @description   Fix large image in Google Reader. 
// @version   1.1
// @include   https://www.google.com/reader/*
// @include   http://www.google.com/reader/*
// ==/UserScript==

//GM_addStyle(".item-body img {max-width:100% !important;}")
GM_addStyle(".item-body img {width:100% !important; height: auto !important; }")
