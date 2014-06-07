// ==UserScript==
// @name           HiRez Forum
// @namespace      hirez
// @description    A few BillDjango tweaks to clean up the forums a tiny bit
// @include        http://forum.hirezstudios.com/phpbb/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// ==/UserScript==


// Pad things up a bit
$('<style>.row1, .row2, .row3, .legend, .forumrules, tr.row1 .row, tr.row2 .row, tr.row3 .row, .postbottom {padding: 12px; !important;}</style>').appendTo('head');

// Bold the forum titles
$('<style>.cap-right h4 {font-weight:bold; !important;}</style>').appendTo('head');

// Lets add some space to the search bar, and bolden it up a bit
$('<style>p.searchbar {padding: 10px; !important;}</style>').appendTo('head');
$('<style>.searchbar {font-weight:bold; !important;}</style>').appendTo('head');

// Add a little padding to the nav on topics
$('<style>td.nav {padding: 10px; !important;}</style>').appendTo('head');