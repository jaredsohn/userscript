// ==UserScript==
// @name        Gaia - No Flash Waiting
// @namespace   GaiArch_v3
// @description Disable Flash ads or wait time if you have ABP
// @match     http://*.gaiaonline.com/launch/*
// @version     1
// @grant       none
// ==/UserScript==

var crunchy = document.getElementById('crunchyroll_container');
crunchy.remove();

var crunchComplete = document.getElementById('crunchyroll_on_complete');
crunchComplete.style="display:block;"