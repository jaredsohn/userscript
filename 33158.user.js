// ==UserScript==
// @name          Put Jira Newest Comments on Top
// @namespace     http://www.kivasystems.com
// @description   Makes sure that comments, history in the bug reports are sorted by date in the descending order, so the newest entries are at the top
// @include       http://bugs/browse/*
// ==/UserScript==

// ==RevisionHistory==
// Version 1:
// Released: 2008-09-04.
// Initial release.
// ==/RevisionHistory==

// Copyright: Andriy Palamarchuk, Kiva Systems, Inc 2008
//
// Contact me if you have questions, suggestions.
//
// DESCRIPTION
//
// If the comments, history entries on the Jira bug report pages are sorted
// in ascending order (oldest entries first), the script reloads the page reverting the order
// and making the newest entries show up at the top.
// A workaround of Jira bug http://jira.atlassian.com/browse/JRA-5443
//
// INSTALLATION
//
// See http://wiki.greasespot.net/Greasemonkey_Manual:Installing_Scripts
// for information how to install a Greasemonkey script.

// if a reference ending with this string is found on the page,
// the whole page is replaced with it

const RELOAD_URL_SUFFIX = "\\?actionOrder=desc";

// CODE

/**
 * Ends with string function. Added to the String prototype
 */
String.prototype.endsWith = function(str) {
    return (this.match(str+"$") != null);
}

/**
 * Whether the provided reference tag points to the URL for ordering
 * comments in the required order. The URL ends with RELOAD_URL_SUFFIX.
 */
function isSortReference(ref) {
    if (!ref.href) {
        return;
    }
    
    const orderUrl = ref.href.endsWith(RELOAD_URL_SUFFIX);
    const sortOrderNode = ref.parentNode.textContent.indexOf("Sort Order:") != -1;
    return orderUrl && sortOrderNode;
}

for each (var ref in document.getElementsByTagName("a")) {
    if (isSortReference(ref)) {
        location.href = ref.href;
        break;
    }
}