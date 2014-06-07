// ==UserScript==
// @name           Linerider Ad Killer
// @description    Simple script to remove the ad bars on linerider.com
// @namespace      LineRiderAdKiller
// @include        http://*linerider.com/*
// ==/UserScript==

var version = 1.0

document.getElementById('block-block-1').style.display='none'
document.getElementById('block-block-10').style.display='none'