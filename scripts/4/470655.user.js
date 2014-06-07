// ==UserScript==
// @name       Brolink Embed
// @namespace  http://use.i.E.your.homepage/
// @version    0.1
// @description  enter something useful
// @match      http://localhost/*
// @match      http://*.localhost/*
// @match      http://*.*.dev/*
// @match      http://*.*.local/*
// @match      http://127.0.0.1/*
// @copyright  2012+, You
// ==/UserScript==

var src = document.createElement("script");
src.src = "http://127.0.0.1:9001/socket.js";
src.async = true;
document.head.appendChild(src);
