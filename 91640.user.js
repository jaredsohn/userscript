// ==UserScript==
// @name           Basecamp Most active discussions
// @namespace      http://keyes.ie
// @description    Hides the most active discussions box for Basecamp messages
// @include        https://*.basecamphq.com/*
// ==/UserScript==
var units = document.getElementsByClassName('unit');
for (var i = 0; i < units.length; i++) {
    units[i].parentNode.removeChild(units[i]);
}
