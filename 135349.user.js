// ==UserScript==// @name          Pinboard
// @description    improve pinboard.in display
// @include        https://pinboard.*
// @include        http://pinboard.*

// ==/UserScript==


function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

//Structure
//addGlobalStyle(' #main_column{width:800px;}');
//addGlobalStyle(' #tag_cloud{width:200px;}');
//addGlobalStyle(' #bookmarks{margin-top:10px;}');

// Fonts
addGlobalStyle(' body{font-size:14px}');
addGlobalStyle(' *{font-family: "SegoeUI", sans-serif}');
addGlobalStyle(' .unread{color: #E80C0C!important}');

// Link color
addGlobalStyle(' a, a:hover,a:visited  {color:#1D478F}');

// (Header (Banner, Logo etc)
addGlobalStyle(' #banner {border:none}');
addGlobalStyle(' #top_menu a, #top_menu a:link, #top_menu a:visited {color:#555555}');

// Bookmarks display
addGlobalStyle(' .bookmark{margin-bottom:15px}');
addGlobalStyle(' .private{background:#fff; border:none}');
addGlobalStyle(' .public{background:#dedede}');

// hide stuff
addGlobalStyle('div.display br {display:none}');
addGlobalStyle(' #logo, #timer, div.rss_linkbox {display:none}');
addGlobalStyle(' #footer {display:none}');
addGlobalStyle('a.when {display:none}');
addGlobalStyle('a.cached {display:none}');
addGlobalStyle('span.bookmark_count {display:none}');
addGlobalStyle('div.star {opacity:0.8}');

// URL
addGlobalStyle(' a.url_display{color: #ababab;font-size:0.8em;}');

// Bookmark title
addGlobalStyle(' a.bookmark_title, .bookmark_title a:link, .bookmark_title a:hover, .bookmark_title a:visited  {font-size:1.1em; color:#1D478F;background-color:#F7FAFF}');

// Source
addGlobalStyle(' .source {font-size:0.9em}');

//URL Description
addGlobalStyle(' .description {color:#303030}');

//Tags
addGlobalStyle(' a.tag {color:#BC5037!important}');