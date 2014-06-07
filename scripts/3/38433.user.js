// No OB/Erog ads
// version 0.2
// 2009-04-11
// Copyright (c) 2008-2009, Trente.Nerfs@gmail.com
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "No OB ads", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          No OB/Erog ads
// @namespace     http://trente-nerfs.over-blog.com/
// @description   Suppress the OB commercials and the Erog bar
// @include       http://*.erog.fr/*
// @include       http://*.erog.com/*
// @include       http://*.over-blog.fr/*
// @include       http://*.over-blog.com/*
// @exclude       http://srv*.admin.over-blog.com/*
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

addGlobalStyle('.pub, body > div[align="center"] { display: none ! important; } body { margin-top: 0px ! important; } #disclaimer { display: none ! important; } body > .clearfix { display: none ! important; }');
