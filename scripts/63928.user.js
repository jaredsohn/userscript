// ==UserScript==
// @name           Google Wave - Custom styling mihaibirsan
// @namespace      com.google.wave.styles.mihaibirsan
// @include        http://wave.google.com/wave/*
// @include        https://wave.google.com/wave/*
// ==/UserScript==

var style = ".NHB, .IHB { display: none; } .LP { padding: 2px !important; } .DHB { right: 0; padding-right: 1.2em; }";
var head = document.getElementsByTagName("head")[0];
var el = window.document.createElement('link');
el.rel = 'stylesheet';
el.type = 'text/css';
el.href = 'data:text/css;charset=utf-8,' + escape(style);
head.appendChild(el);
