// ==UserScript==
// @name          Center G+ Content
// @description   This script centers the content pane for G+'s homepage.
// @include       https://plus.google.com/*
// ==/UserScript==

var content = document.getElementById('contentPane');
content.style.textAlign = "center";