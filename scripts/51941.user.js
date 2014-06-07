// This script adds auto scroll to the bottom of the match page on every refresh if scrolling is enabled
//
// version 0.1.0
// 2009-06-18
// Copyright (c) 2009, Mikkel Bundgaard
// Released under the Creative Commons Attribution 3.0 Unported license
// http://creativecommons.org/licenses/by/3.0/
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.  To install it, you need
// Greasemonkey 0.3 or later: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "Match Scroller", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name           Match Scroller
// @namespace      http://www.grid-iron.org/
// @description    Adds auto scroll to the bottom of the match page on every refrsh if enabled
// @copyright      2009+, Mikkel Bundgaard (http://www.itu.dk/people/mikkelbu) 
// @license        (CC) Attribution; http://creativecommons.org/licenses/by/3.0/
// @version        0.1.0
// @include        http://www.grid-iron.org/index.php?page=match&match_id=*
// @include        http://grid-iron.org/index.php?page=match&match_id=*
// @exclude        http://www.grid-iron.org/index.php?page=match&match_id=*&action=boxscore
// @exclude        http://grid-iron.org/index.php?page=match&match_id=*&action=boxscore
// @exclude        http://www.grid-iron.org/index.php?page=match&match_id=*&action=stats
// @exclude        http://grid-iron.org/index.php?page=match&match_id=*&action=stats
// @contributor    Mikkel Bundgaard (http://www.itu.dk/people/mikkelbu)
// ==/UserScript==

window.setTimeout( function() 
{
    // Toggle scrolling
    function toggle() {
	isScrolling = !isScrolling;
	elem.innerHTML = 'Is ' + (!isScrolling ? '<b>not</b>' : '')  + ' scrolling (click the text to toggle)';
	GM_setValue('scrolling', isScrolling);
    }

    // Path to last element in game log
    var xpath = '//*[@id="home_wrapper"]/div/div/table/tbody/tr/td';
    var bottomLoc = document.evaluate(xpath, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0);

    // Create div-element to hold the scrolling text and possibility for toggling 
    // between scrolling and not scrolling
    var elem = document.createElement('div');

    // Should the page scroll ?
    var isScrolling = GM_getValue('scrolling', false); 
    if (isScrolling) {
	elem.innerHTML = 'Is scrolling (click the text to toggle)';
	// Hack to scroll to the bottom of the page
	window.scrollTo(0,99999999999);
    }
    else {
	elem.innerHTML = 'Is <b>not</b> scrolling (click the text to toggle)';
    }

    // Add listener for clicks
    elem.addEventListener('click', toggle, false);

    // Insert element
    bottomLoc.appendChild(elem);
}, 100);