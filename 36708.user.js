// ==UserScript==

// @name           Reddit - Remove bluebar

// @namespace      http://reddit.com

// @description    Removes the new reddit bluebar

// @include        http://www.reddit.com/

// @include        http://www.reddit.com/new/

// ==/UserScript==

var bluebar = document.getElementById('sr-header-area');
if (bluebar) {
    bluebar.parentNode.removeChild(bluebar);
}