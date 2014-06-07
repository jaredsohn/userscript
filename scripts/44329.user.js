// ==UserScript==
// @name Britannica Hack
// @description View premium Britannica articles for free!
// @namespace Abyssal_Tools
// @include *britannica.com/*
// ==/UserScript==

document.getElementById('bps-upsell-dialog').innerHTML = '';
document.getElementById('bps-upsell-dialog').style.visibility = 'hidden';