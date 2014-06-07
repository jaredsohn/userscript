// Legible Smashing Magazine
// A skin to make the redesign of Smashing Magazine released 01/11/2012 a little more usable.
// 2012-01-12
// Copyright (c) 20112, Brandon Sullivan
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: https://addons.mozilla.org/en-US/firefox/addon/748
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "No Suggestions", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Legible Smashing Magazine
// @namespace     http://elsullivano.com/
// @description   A skin to make the redesign of Smashing Magazine released 01/11/2012 a little more usable.
// @include       http://www.smashingmagazine.com/*
// @include		  http://designinformer.smashingmagazine.com/*
// @include		  http://wp.smashingmagazine.com/*
// @include		  http://uxdesign.smashingmagazine.com/*
// @include		  http://coding.smashingmagazine.com/*
// ==/UserScript==

function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}


addGlobalStyle('.spnsrlistwrapper { display:none; }');
addGlobalStyle('.mini-search.wp-search-form { display:block; }');
addGlobalStyle('.spnsrlistwrapper.sm-search.wp-search-form { display:none; }');
addGlobalStyle('div.col.ads { float:none; width: auto; }');
addGlobalStyle('#container .fluid { margin-right:0; }');
addGlobalStyle('div.col.ads .two .left, div.col.ads .two .right { width:45%; }');
addGlobalStyle('.sidelist li { float: left; margin: 0 5px; }');
addGlobalStyle('.ed.sidebared { display:none }');
addGlobalStyle('#wpsidebar { clear: both; }');