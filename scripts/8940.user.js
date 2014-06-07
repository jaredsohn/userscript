// ==UserScript==
// GuitarGeek.com Chat Modifier
// version 2.0.1
// 2007-02-04
// Copyright (c) 2007, Ian Chesal (http://ian.coastpedalboards.com/)
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
// To uninstall, go to Tools/Greasemonkey/Manage User Scripts,
// select "GuitarGeek.com Chat Modifier", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          GuitarGeek.com Chat Modifier
// @namespace     http://ian.coastpedalboards.com/download/
// @description   Modifies the layout of the GuitarGeek.com Chat forum so it's easier to read.
// @include       http://guitargeek.com/chat/*
// @include       http://www.guitargeek.com/chat/*
// ==/UserScript==

var version = '2.0.1';

function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

// Everything on GuitarGeek is contained in tables. Get all the tables used.
var tables = document.getElementsByTagName('table');
var allTables = document.evaluate(
    '//table[@width]',
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);

// Table 0 - Sometimes this table contains ads, which we'll nuke, and
// sometimes it contains useful messages about what's going on that we
// want see. Make sure this isn't a useful message before we clear the
// contents of this table.
if ( ! tables[0].innerHTML.match(/Click here if you do not want to wait any longer/i) ) {
    tables[0].innerHTML = '<tr><td><div align="center" style="margin-bottom:10px;color:white;font-weight:bold;">GuitarGeek.com Chat Modifier v' + version + ' Enabled</div></td></tr>';
}   
// Table 10 - Seems to always contain ads. Nuke it.
tables[10].innerHTML = '<td><td>&nbsp;</td></tr>';
