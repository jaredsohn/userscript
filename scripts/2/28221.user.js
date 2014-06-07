// ==UserScript==
// @name           Block Bebo Sponsors
// @namespace      beboads
// @description    Block Bebo Homepage Sponsors, resize changes to fill the gap and center 'sayings'
// @include        http://*.bebo.com/*
// ==/UserScript==
document.getElementById("sponsors").style.display = 'none';
document.getElementById("leftcol").style.width = '98%';
document.getElementById("changes").style.width = '100%';
document.getElementById("sayings").style.margin = '0px 0px 10px 200px';