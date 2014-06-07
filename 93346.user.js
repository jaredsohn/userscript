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
// @namespace      http://teamhb.org/
// @description    Adds auto scroll to the bottom of the match page on every refrsh if enabled
// @include        http://www.teamhb.org/index.php?page=match&match_id=*
// @include        http://teamhb.org/index.php?page=match&match_id=*
// @exclude        http://www.teamhb.org/index.php?page=match&match_id=*&action=boxscore
// @exclude        http://teamhb.org/index.php?page=match&match_id=*&action=boxscore
// @exclude        http://www.teamhb.org/index.php?page=match&match_id=*&action=stats
// @exclude        http://teamhb.org/index.php?page=match&match_id=*&action=stats
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