// ==UserScript==
// @name           FixGawker
// @namespace      /
// @include        http://lifehacker.com/*
// @include        http://gawker.com/*
// @include        http://jalopnik.com/*
// @include        http://gizmodo.com/*
// ==/UserScript==
//
document.getElementById('rightwrapper').parentNode.removeChild(document.getElementById('rightwrapper'));
document.querySelector('#main-container > .inner').style.width = 'auto';
document.querySelector('div.gmgrid').style.width = 'auto';
