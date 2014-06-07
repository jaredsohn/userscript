// Adding TabIndex to LJ Post button user script
// version 0.2 BETA!
// 2010-09-01
// Copyright (c) 2010, Andrew Jumashev
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
// select "TabIndex LiveJournal", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          TabIndex LiveJournal
// @namespace     http://www.skazkin.ru/
// @description   This is a quick patch on LiveJournal innovation with adding FB and Twitter repost options. This script supports old Write-Tab-Post style for writing comments.
// @include       *.livejournal.com/*
// ==/UserScript==

function setTabIndex () {
    var button = document.getElementById('submitpost');
    var body = document.getElementById('body');
    if(!body){
        body = document.getElementById('commenttext');
    }
    if(!button){
        button = document.getElementsByName("submitpost")[0];
    }
    if(!button || !body){
        return false;
    }
    body.tabIndex   = 1;
    button.tabIndex = 2;
    
    return false;
}
setTabIndex();
