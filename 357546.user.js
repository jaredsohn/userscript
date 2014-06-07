// ==UserScript==
// @name        DeerFile Hack
// @namespace   deer_file_hack
// @description Allows a non premium user to download without having to wait.
// @include     http://deerfile.com/*
// @version     1
// @grant       none
// ==/UserScript==
document.getElementById('btn_download').disabled = false;