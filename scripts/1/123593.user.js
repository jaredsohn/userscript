// ==UserScript==
// @name          WazeEdPlus
// @version       1.2
// @description   This script helps you adjust the position of underlying bing maps
// @include       *waze.com/*
// ==/UserScript==
//
// This script is just a loader for code hosted on:
//  https://github.com/byo/WazEdPlus

var s = document.createElement('script');
s.id = "wazedplus_root_script";
s.src = 'https://raw.github.com/byo/WazEdPlus/stable/wazedplus.js';
document.getElementsByTagName('head')[0].appendChild(s);
