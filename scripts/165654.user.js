// ==UserScript==
// @name           Tweakers.net tweaks
// @description    Big serif font in articles and some other moves and hides.
// @namespace      https://userscripts.org/scripts/show/165654
// @updateURL      https://userscripts.org/scripts/source/165654.user.js
// @downloadURL    https://userscripts.org/scripts/source/165654.user.js
// @grant          none
// @version        2014.01.07
// @include        *tweakers.net/*
// ==/UserScript==


var style = document.createElement('style');
style.innerHTML = '' +
    'html .article, ' +
    'html .article > *, ' +
    'html .reactieBody {' +
    '    font: normal 16px/24px georgia, serif;' +
    '}' +
    'html .article h2,' +
    'html .article h3 {' +
    '    font-weight: bold;' +
    '}' +
    'html p.author,' +
    'html p.author * {' +
    '    font: normal 14px/24px georgia, serif;' +
    '}' +
    'html .reactie {' +
    '    margin-top: -11px !important;' +
    '    margin-left: -1px; !important;' +
    '}' +
    '' +
    'html .highlights td {' +
    '   font: normal 14px/16px georgia, serif;' +
    '}' +
    '' +
    'html .wvhj,' +
    'html #true,' +
    'html #b_re, ' +
    'html #sponsored, ' +
    'html #jobs, ' +
    'html #streamone, ' +
    'html #newsletter, ' +
    'html #socialButtons, ' +
    'html .streamer, ' +
    'html .reactie .scoreButton {' +
    '   display: none !important;' +
    '}' +
    '' +
    'html #search {' +
    '   left: 50%;' +
    '   margin-left: -300px;' +
    '   padding-top: 0;' +
    '   position: absolute;' +
    '   top: 10px;' +
    '   width: auto;' + 
    '   z-index: 100;' +
    '}' +
    '' +
    'html #searchbar {' +
    '    height: 25px;' +
    '}' +
    '' +
    '#reacties #reactieContainer {' +
    '   border-left: 1px dotted #ddd !important;' +
    '   padding: 0 !important;' +
    '}' +
    '' +
    '';

document.getElementsByTagName('head')[0].appendChild(style);
