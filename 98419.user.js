// Songkick - Remove Import Choices
// version 0.2 BETA
// 2011-03-05
// Copyright (c) 2011, yalooze
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
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Songkick - Remove Import Choices
// @description   Removes the Import Choices section from songkick to give you more space above the fold
// @match         http://www.songkick.com/*
// @include       http://www.songkick.com/*
// ==/UserScript==


var importChoices = document.getElementById('import-choices');

if (importChoices) {
    importChoices.parentNode.removeChild(importChoices);
}