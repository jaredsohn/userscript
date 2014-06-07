// ==UserScript==
// @name           stablefields
// @include        https://atlassian.net/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.6.2/jquery.min.js
// @description    Removed the inline editing function of JIRA text fields.
// ==/UserScript==

$('.type-textarea').removeClass('inactive');
