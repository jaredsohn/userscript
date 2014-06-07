// ==UserScript==
// @name        Google Reader Compacter
// @namespace   http://aj.garcialagar.es/gmscripts
// @description To compact the new Google Reader Interface
// @version     1.2.0
// @include     http://www.google.*/reader/*
// @include     https://www.google.*/reader/*
// ==/UserScript==

// @author      Antonio J. García Lagar <aj@garcialagar.es>
// @copyright   Copyright (c) 2011, Antonio J. García Lagar <aj@garcialagar.es>
// @license     http://www.opensource.org/licenses/BSD-3-Clause
// @homepage    https://github.com/ajgarlag/google-reader-compacter

var styleText='';

/** Autohide top-bar **/
styleText += ' #top-bar {height: 5px}';
styleText += ' #logo, .loaded #search {display: none}';
styleText += ' #top-bar:hover {height: 45px}';
styleText += ' #top-bar:hover #logo, .loaded #top-bar:hover #search {display: block}';
styleText += ' #search {padding: 8px 0}';

/** Viewer header **/
styleText += ' .jfk-button {margin-right: 0}';
styleText += ' #viewer-refresh {min-width: 21px; margin-right: 3px}';
styleText += ' #settings-button {min-width: 21px}';
styleText += ' #entries-down {margin-right: 3px}';
styleText += ' #entries-down {margin-right: 3px}';

// Minimize the recommendations section
if (document.getElementById('lhn-recommendations').className.indexOf('section-minimized') == -1) {
    document.getElementById('lhn-recommendations').className += ' section-minimized';
}

// Select compact density
if (document.getElementById(':3').className.indexOf('goog-option-selected') == -1) {
    alert('Please, select compact view density to improve compactation.')
}

// Write down the style
var head = document.getElementsByTagName('head')[0];
var style = document.createElement('style');
var rules = document.createTextNode(styleText);

style.type = 'text/css';

if (style.styleSheet) {
    style.styleSheet.cssText = rules.nodeValue;
} else {
    style.appendChild(rules);
}

head.appendChild(style);
