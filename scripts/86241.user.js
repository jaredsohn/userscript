// ==UserScript==
// @name           reddit.com/r/wow - wowhead.com links
// @namespace      movzx
// @description    Makes wowhead.com links have tooltips  on reddit.com
// @include        http://reddit.com/r/wow/*

// @include        http://*.reddit.com/r/wow/*
// ==/UserScript==

var wowhead_script_src = 'http://static.wowhead.com/widgets/power.js';
var script_ele = document.createElement('script');

script_ele.src = wowhead_script_src;

document.body.appendChild(script_ele);