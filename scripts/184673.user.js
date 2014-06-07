// ==UserScript==
// @name        jira fix pageup override
// @namespace   http://www.google.com
// @include     http://jira.*.com/*
// @version     1
// ==/UserScript==

window.addEventListener('load', function ()
{
    jQuery = unsafeWindow['jQuery'];
    jQuery(document).unbind("keydown");
});