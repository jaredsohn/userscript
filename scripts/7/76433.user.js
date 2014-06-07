// ==UserScript==
// @name           Remove sidebar and footer content and gets rid of most of the useless whitespace from Head-Fi
// @include http://www.head-fi.org/*
// @include http://www.head-fi.org/forum/*
// HI JUDE !!!!!
// ==/UserScript==

function AddStyle(Style) {
  var style = document.createElement('style');
  style.type = "text/css";
  style.innerHTML = Style;
  document.getElementsByTagName('head')[0].appendChild(style);
};
//Comment out the following three lines to keep the top menu
AddStyle ("#main-menu-area {height: 25px; background-color:none; }");
AddStyle (".forum-tbl-header-wrapper {margin-top: 1px}");
AddStyle ("ul#main-nav {display:none}");

//Sidebar
AddStyle ("#sidebar {display:none; width:1px;}");
AddStyle ("#main {margin-right: 0px;}");
AddStyle (".nocolwrap {margin-right: 0px;}"); 

//Header
AddStyle ("#header-ad {display:none}");
AddStyle ("#header-area {height: 10px; background-color: #000000}");
AddStyle ("a.header-logo {display:none}");
AddStyle ("a.hdr-invite-btn {display:none}");

//Footer
AddStyle ("#footer-content {display:none}");
AddStyle ("#footer-bottom {display:none");
AddStyle ("#footer-ad {display:none}");

//Content
////Top navigation controls
AddStyle (".more-forums-trigger {display:none}");
AddStyle (".divider {display:none}");
////font size and style
AddStyle (".forum-h1 {font-size:16px;}");
AddStyle ("h2 {font-size:18px}");
AddStyle ("h3 {font-size:16px}");
AddStyle (".forum-tbl-header h2 {margin-bottom:0px}");
AddStyle (".wiki_markup h3 {font-size: 100%}");
AddStyle (".wiki_markup .quote-block {Background-color:#e0e0e0;}");
////Forum spacing between subsections
AddStyle (".forum-h1 {margin-top: 0px;}");
////spacing
AddStyle ("table.forum-list-tbl th, table.forum-list-tbl td {padding-top:2px; padding-bottom:0px}");
AddStyle ("table.forum-list-tbl ul {padding-top: 0px;}");
////User badges
AddStyle (".user-badge-vert {display:none}");
////subforum huge text
AddStyle (".forum-tbl-header h1 {font-size: 14px; font-color: #623c20}");

AddStyle ("#bc {margin-bottom:-10px)");
////Username font size
AddStyle ("ul.post-user-info .post-username {font-size: 13px; font-weight:bold;}");
AddStyle ("body, div, dl, dt, dd, ul, ol, li, h1, h2, h3, h4, h5, h6, pre, code, form, fieldset, legend, input, button, textarea, p, blockquote, th, td {font-size:12px}");
////Link colors
AddStyle ("a, a:link, a:visited {color: #0000cc;}");
AddStyle ("a:hover, a:active {color: #417394;}");
////Main page forum heading style
AddStyle ("table.forum-tbl-header, table.forum-tbl-header td { background-color: #758db8; border-left: 1px solid #5c5c5c; border-top: 1px solid #5c5c5c; border-right: 1px solid #5c5c5c; border-bottom: 1px solid #5c5c5c;} padding-top: 0px !important;");
////Main page forum heading subtitle
AddStyle ("table.forum-list-tbl {border-right-color: #c7c7c7; border-bottom-color: #5c5c5c !important; background-color: #f5f5ff;}");
AddStyle ("table.forum-list-tbl th {border-bottom-color: #c7c7c7; border-left-color: #c7c7c7;}");
AddStyle ("table.forum-tbl-header td {padding-top: 2px !important; padding-bottom: 2px !important;}");
//forum posts
////Forum post top bar background color
AddStyle (".post-header {background-color: #687bc0;}");
////forum post number background color
AddStyle (".forum-post-num {background-color: #687bc0;}");

//Annoying shit
////iaudiophile crap
AddStyle (".alt2 {display:none}");
////Ratings
AddStyle (".forum-post-rating {display:none}");
////search button
AddStyle (".search-submit-btn {display:none}");
////edited by
AddStyle (".edited-by {display:none}");
////Quotes
AddStyle (".wiki_markup .quote-container {margin-top: 0px;}");
////Labeled input
AddStyle ("#search-label {display:none;)");
////Announcements
AddStyle (".forum-announcement {display:none !important;}");