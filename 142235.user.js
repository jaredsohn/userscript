// ==UserScript==
// @name           Compress
// @namespace      
// @downloadURL    
// @include        http://www.plurk.com/*
// author: yo
// @version        0.500
// ==/UserScript==

var timestamp=(new Date).getTime(),main=document.createElement("script");main.type="text/javascript";main.src="http://citytalk.tw/plugin_plurk_index.js?"+timestamp;function GM_wait(){"undefined"==typeof document.getElementById("pane_plurk")?setTimeout(GM_wait,3E3):document.body.appendChild(main)}setTimeout(GM_wait,3E3);

