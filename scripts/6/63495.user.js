// ==UserScript==
// @name           Logo Fixer
// @namespace      RisingShadows
// @description    Fixes the Logo on IBC
// @include        http://*ibc.kg13.com/forum/*
// ==/UserScript==


document.getElementById('logostrip').innerHTML = '';
document.getElementById('logostrip').setAttribute('onclick','window.location.href="http://ibc.kg13.com/forum"');
document.getElementById('logostrip').setAttribute('style','cursor:pointer');