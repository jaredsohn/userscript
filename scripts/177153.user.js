// ==UserScript==
// @name         Twitter wide
// @version      0.1
// @description  Wider Twitter homepage
// @include      *twitter.com/*
// @copyright    2013+, arturo182
// ==/UserScript==

GM_addStyle(
	'.dashboard { width:32% !important; }' +
    '.wrapper, .wrapper-narrow, .wrapper-permalink, .global-nav .container { width:80% !important; }' +
    '.content-main, .dashboard .tweet-content .tweet-box, .profile-card.profile-header { width: 67% !important; }' +
    '.global-nav .search-input { width: 300px !important; }' +
    '.session .dropdown-menu, .global-nav .pull-right .dropdown-menu, .global-nav .secondary-nav .dropdown-menu { left: -140px; width: 400px !important; }' +
    '.wrapper-profile .profile-card.profile-header .profile-header-inner, #profile_popup .profile-header .profile-header-inner { background-repeat-x: initial; }' +
    '#profile_popup-dialog { margin-left: auto; margin-right: auto; left: auto !important; }' +
    '#profile_popup .modal { width: 50% !important; }' +
    '#profile_popup .profile-header, .profile-header-inner-overlay { width: 100% !important; }' +
    '.inline-reply-tweetbox.swift .tweet-box { width: 97% !important; }'
);