
// GrooveShark Ad Removal
// version 0.1
// 2009-11-24
// Copyright (c) 2009, Bob Orchard
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// This script will remove the ad block from listen.grooveshark.com
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          GrooveShark Ad Removal
// @namespace     http://www.boborchard.com
// @description   remove the ad block from GrooveShark
// @include       http://listen.grooveshark.com/*
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
addGlobalStyle('#adBar { display: none !important; } ');
addGlobalStyle('#mainContentWrapper { margin: 0 !important; }');