// ==UserScript==
// @name         Streamline OkC
// @version      2014.01.19
// @description  Hide OkCupid ads and clutter
// @include      http://www.okcupid.com/*
// @url          http://userscripts.org/scripts/source/64547.user.js
// @grant        none
// ==/UserScript==

(function() {
var css = '#action_bar';          // Profile pages: Action header
css += ',#action_footer';         // Profile pages: Action footer
css += ',.content_footer_wrapper';// Profile pages: Action footer
css += ',#similar_users_list';    // Profile Pages: Similar Users List
css += ',.similar';               // Profile Pages: Similar Users Heading

css += ',#p_home .tabbed_heading';// Home page: Greeting
css += ',#matches_block';         // Home page: Matches pane
css += ',#improve_your_matches';  // Home page: Question pane
css += ',.seemore';               // Home page: Action footer
css += ',#section_matches';       // Left pane: You might like

// In-site Ads
css += ',#user_pane';    // Right Pane: Boost your profile
css += ',#visit_button'; // Profile Pages: A-list button
css += ',.upgrade_ad';   // Favorites: A-list button

// Ads
css += ',#leaderboard_wrapper';
css += ',#skysc' + 'raper_floater_wrapper';
css += ',#right_side_bar';
css += ',.okad';

// Function
var head = document.getElementsByTagName('head')[0];
var style = document.createElement('style');
css += '{ display: none !important; }';
if (!head) { return; }
style.type = 'text/css';
try { style.innerHTML = css; }
catch(x) { style.innerText = css; }
head.appendChild(style);
})();
