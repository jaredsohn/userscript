// ==UserScript==
// @name           Minimal Google Menu Bar
// @description    Restyles the Google Menu Bar to match the color theme of the rest of Google.
// @version        1.1
// @namespace      oyvey
// @include        http*://*.google.com/*
// @match          http://*.google.com/*
// @match          https://*.google.com/*
// ==/UserScript==

GM_addStyle("#gbx3, #gbx4 { border-color: #CBCBCB !important; background-color: #F1F1F1 !important; } #gbz .gbzt, #gbz .gbgt { color: #5E5E5E !important; font-weight: normal !important; } #gbz .gbz0l .gbts, #gbz .gbzt-hvr, #gbz .gbzt:focus, #gbz .gbgt-hvr, #gbz .gbgt:focus { color: #DD4B39 !important; font-weight: normal !important} #gbz .gbto .gbts, #gbd .gbmt { color: black !important; font-weight: normal !important; } #gbz .gbma { border-top-color: #C0C0C0 !important; } .gbzt-hvr, .gbzt:focus, .gbgt-hvr, .gbgt:focus { color: #DD4B39 !important; background-color: #F1F1F1 !important; } .gbz0l .gbtb2 { border-top-color: #DD4B39 !important; } #gbg .gbgt { color: #5E5E5E !important; } #gbg4:hover, #gbi4s:hover, #gbi4s1:hover { color: #DD4B39 !important; } #gbi4s, #gbi4s1 { font-weight: normal !important; } #gbg5:hover { background-color: #C2C3C3 !important; }");