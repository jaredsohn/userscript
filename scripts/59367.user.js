// ==UserScript==
// @name           Instructables header bomb
// @namespace      http://www.instructables.com/
// @description    Doesn't just make the header for instructables clear - it *removes* it. As requested.
// @include        http://www.instructables.com/*
// @author         Lithium Rain

// ==/UserScript==

var header = document.getElementById('header');
if (header) {
    header.parentNode.removeChild(header);
}
