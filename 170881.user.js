// ==UserScript==
// @name       Alanstorm
// @version    1.0
// @description  This script make site suitable for save in pdf
// @match      http://alanstorm.com/*
// @match      https://alanstorm.com/*
// @include    http://alanstorm.com/*
// @exclude    http://www.facebook.*/*
// @copyright  2013+, ich01
// @namespace http://userscripts.org/scripts/show/159351
// @updateURL http://userscripts.org/scripts/source/159351.meta.js
// @grant       GM_getValue
// @grant       GM_setValue
// @grant       GM_*
// ==/UserScript==
var css = document.createElement("style");
css.type = "text/css";
css.innerHTML = "h1, h2, h3, h4 { letter-spacing: normal }";
document.body.appendChild(css);

$('#disqus_thread').remove();