// ==UserScript==
// @name        Formulae at Social Helper
// @namespace   http://complynx.net/helper
// @description Finding latex and converting to MathML in social networks
// @include     http*://vk.com/*
// @exclude     http*://vk.com/notifier.php*
// @version     0.1
// @copyright   2012+, complynx
// ==/UserScript==

var script = document.createElement('script');
script.setAttribute('src', 'http://complynx.net/helper/jsmake.php?stage2=formulae');
document.head.appendChild(script);
