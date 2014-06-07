// ==UserScript==
// @name  Floating Table of Contents
// @namespace   http://userscripts.org/scripts/show/122189
// @description   Makes the Wikipedia Table of Contents (TOC) float at a fixed position and not scroll with the rest of the page. The position can be customized with the "left:" and "top:" parameters (which define in pixels the distance to the left and top border, respectively). Works for any Mediawiki-powered wiki page.
// @include   http://*.wikipedia.org/*
// @include   https://*.wikipedia.org/*
// @include   http://rationalwiki.org/*
// ==/UserScript==
var styleEl = document.createElement('style');
styleEl.type = 'text/css';
styleEl.innerHTML = 'td.mbox-image {    display: none;}table.toc {    position: fixed;    top: 160px;    left: 160px;    border: 0px;    width: 220px;    border-bottom: 1px SOLID #CCC;    border-left: 1px SOLID #CCC;}table.toc tbody tr td ul {    overflow: auto;    max-height: 500px;}body {    overflow-x: hidden;}';
document.documentElement.appendChild(styleEl);
var styleEl = document.createElement('style');
styleEl.type = 'text/css';
styleEl.innerHTML = 'td.mbox-image { display: none;} div.toc { position: fixed; top: 160px; left: 160px; border: 0px;  width: 220px; border-bottom: 1px SOLID #CCC; border-left: 1px SOLID #CCC;} div.toc ul {overflow: auto;  max-height: 500px;} body {overflow-x: hidden;}';
document.documentElement.appendChild(styleEl);