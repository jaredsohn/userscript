// ==UserScript==
// @name           The Globe & Mail Comment Killer
// @namespace      www.theglobeandmail.com
// @description    Deletes all comments from Globe & Mail articles.
// @include        http://www.theglobeandmail.com/*
// ==/UserScript==

try {
    var elcomments = document.getElementById('latest-comments');
    elcomments.parentNode.removeChild(elcomments);
} catch(err) {
    // Do nothing
}

 