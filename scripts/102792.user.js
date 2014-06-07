// Removing Facebook Sponsored Ads
// version 1.1
// 2011-05-13
//
// --------------------------------------------------------------------
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "Removing Facebook Sponsored Ads", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Removing Facebook Sponsored Ads
// @description   Removes the HTML of Facebook Sponsored Ads
// @include       http://www.facebook.com/*
// @include       http://apps.facebook.com/*
// @include       https://www.facebook.com/*

// ==/UserScript==
//



if (document.getElementById("content")) document.getElementById("content").addEventListener('DOMNodeInserted', function() { window.setTimeout(inYoFace, 5000);}, true);
window.addEventListener('load', DoThat, true);
currentLocation = ""
DoThat()

function DoThat() {

    node = document.getElementById('pagelet_right_sidebar');

    // first, get rid of the scripts that insert Chat elements, then something else referencing Chat
    //document.body.innerHTML =
    //    document.body.innerHTML.replace(/\n<script>big_pipe.onPageletArrive.{2}"id":"pagelet_right_sidebar".*/g,'')
    
    // now that they can't be regenerated, get rid of the Chat elements
    if ( document.getElementById('pagelet_right_sidebar') ) { 
	    node.innerHTML = '';
	node.parentNode.removeChild(key);
    }
}


//
// ChangeLog
// 1.0 - 2011-05-13 - Published
// 1.1 - 2011-05-13 - No regeneration, based on http://userscripts.org/scripts/review/74390
