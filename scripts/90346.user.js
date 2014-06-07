// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: https://addons.mozilla.org/en-US/firefox/addon/748
// Under Tools, there will be a new menu item to 'Install User Script'.
// Accept the default configuration and install.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Tweak TFW2005 colors
// @namespace     
// @description   Tweak TFW2005 colors
// @include       http://www.tfw2005.com/*
// @exclude	  http://www.tfw2005.com/boards/fuzzy-world-2005/*
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

addGlobalStyle('.info:hover { background-color: #B2B2BE; }'); //Change BG Color
addGlobalStyle('.info {padding-left: 2px;padding-right: 0px;padding-top: 2px;padding-bottom: 2px;background-color: #B2B2BE;border: 1px solid #000;margin-bottom: 3px;font-size:10px;}');
addGlobalStyle('.content_wrapper {background:#B2B2BE url(http://www.tfw2005.com/images/page_background.png) repeat-y right top;  padding:20px;}');
addGlobalStyle('.bottomstrip {border-top:1px solid #606066; border-bottom:1px solid #606066; clear:both; margin:0 auto; text-align:center; padding:10px 0; background:#B2B2BE url(http://www.tfw2005.com/boards/members/optimusfan-40048-albums-another-test-picture3443-gradientbg.jpg) center center;}');
addGlobalStyle('.footer_style {text-align:center; clear:both; padding:20px 0 20px 0; background:#B2B2BE;}');
addGlobalStyle('.sidebar li {list-style-type:none; padding:10px 10px; font-size:13px; background:#B2B2BE; color:#000; border-bottom:1px solid #000}');
addGlobalStyle('.alt1Active {background: #B2B2BE;color: #000000;border-top:1px solid #ffffff;border-left:1px solid #ffffff;}');
addGlobalStyle('.alt1 {background: #D2D2DD;color: #000000;border-top:1px solid #ffffff;border-left:1px solid #ffffff;}');
addGlobalStyle('.alt2{	background: #B2B2BE;color: #000000;	border-top:1px solid #ffffff;border-left:1px solid #ffffff;}');
addGlobalStyle('.alt2Active{ background: #D2D2DD;color: #000000;	border-top:1px solid #ffffff;border-left:1px solid #ffffff;}');
addGlobalStyle('.panel{	background: #B2B2BE;	color: #000000;	padding: 10px;	border: 1px solid #1b1b1b;}');
addGlobalStyle('.thead { background: url(http://www.tfw2005.com/boards/members/optimusfan-40048-albums-another-test-picture3443-gradientbg.jpg) repeat-x scroll center center #000000 }'); //Change BG Image 
addGlobalStyle('.topstrip {border-bottom:1px solid #606066; border-top:1px solid #606066; height:49px; margin:0 auto; text-align:center; padding:10px 0; background:#000 url(http://www.tfw2005.com/boards/members/optimusfan-40048-albums-another-test-picture3443-gradientbg.jpg) center center;}');
addGlobalStyle('.bottomstrip {border-top:1px solid #606066; border-bottom:1px solid #606066; clear:both; margin:0 auto; text-align:center; padding:10px 0; background:#e2e2e7 url(http://www.tfw2005.com/boards/members/optimusfan-40048-albums-another-test-picture3443-gradientbg.jpg) center center;}');
addGlobalStyle('h1.h_title, h2.h_title {padding:10px; font-size:16px; margin-bottom:10px; background:#000 url(http://www.tfw2005.com/boards/members/optimusfan-40048-albums-another-test-picture3443-gradientbg.jpg) center center; color:#fff; border:1px solid #000; clear:both;}');
addGlobalStyle('h3.h_title  {padding:10px; font-size:14px; margin-bottom:10px; background:#000 url(http://www.tfw2005.com/boards/members/optimusfan-40048-albums-another-test-picture3443-gradientbg.jpg) center center; color:#fff; border:1px solid #000;}');
addGlobalStyle('.site_navigation {padding:0; margin:0; list-style:none; height:28px; background:#000 url(http://www.tfw2005.com/boards/members/optimusfan-40048-albums-another-test-picture3443-gradientbg.jpg) repeat-x center center; width:100%; border-top:1px solid #40404d;}');
addGlobalStyle('.image_thumb  {background:#000 url(http://www.tfw2005.com/boards/members/optimusfan-40048-albums-another-test-picture3443-gradientbg.jpg) center center; border:1px solid black; padding:5px; margin:0; max-width:125px; max-height:auto;}');
addGlobalStyle('.news_category img {background:#000 url(http://www.tfw2005.com/boards/members/optimusfan-40048-albums-another-test-picture3443-gradientbg.jpg) center center; border:1px solid black; padding:5px; margin:0 0 10px 0;}');
addGlobalStyle('h5.news_ads  {padding:6px; font-size:12px; margin:0px; background:#000 url(http://www.tfw2005.com/boards/members/optimusfan-40048-albums-another-test-picture3443-gradientbg.jpg) center center; color:#fff; border:1px solid #000;}');
addGlobalStyle('h1.resources_sub_section  {padding:10px; font-size:16px; margin:10px 0; clear:both; background:#000 url(http://www.tfw2005.com/boards/members/optimusfan-40048-albums-another-test-picture3443-gradientbg.jpg) center center; color:#fff; border:1px solid #000;}');
addGlobalStyle('h2.resources_sub_section  {padding:8px; 10px; font-size:14px; margin:10px 0; clear:both; background:#000 url(http://www.tfw2005.com/boards/members/optimusfan-40048-albums-another-test-picture3443-gradientbg.jpg) center center; color:#fff; border:1px solid #000;}');
addGlobalStyle('.rbc li h3 {font-size:10px; padding:3px 0; margin:0 auto; background:#000 url(http://www.tfw2005.com/boards/members/optimusfan-40048-albums-another-test-picture3443-gradientbg.jpg) center center; color:#fff; border:1px solid #000; clear:both; width:90%; }');
addGlobalStyle('h3.resources_sub_section  {padding:6px 10px; font-size:12px; margin:10px 0; clear:both; background:#000 url(http://www.tfw2005.com/boards/members/optimusfan-40048-albums-another-test-picture3443-gradientbg.jpg) center center; color:#fff; border:1px solid #000;}');
addGlobalStyle('h5.sidebar {margin:0; padding:10px; font-size:14px; background:#000 url(http://www.tfw2005.com/boards/members/optimusfan-40048-albums-another-test-picture3443-gradientbg.jpg) center center; color:#fff; border:1px solid #000;}');
addGlobalStyle('h3.sidebar {padding:10px; font-size:14px; background:#000 url(http://www.tfw2005.com/boards/members/optimusfan-40048-albums-another-test-picture3443-gradientbg.jpg) center center; color:#fff; border:1px solid #000;}');
addGlobalStyle('h3.sbhi {padding:0px; width:278px; height:39px;}');
addGlobalStyle('.vbmenu_control{background: #000000 url(http://www.tfw2005.com/boards/members/optimusfan-40048-albums-another-test-picture3443-gradientbg.jpg) repeat-x center center;	color: #ffffff;	font: bold 11px verdana, geneva, lucida, arial, helvetica, sans-serif;padding:3px 6px 3px 6px;	white-space: nowrap;	border-top:1px solid #606066;	border-left:1px solid #606066;}');
addGlobalStyle('.tcat{	background: #000000 url(http://www.tfw2005.com/boards/members/optimusfan-40048-albums-another-test-picture3443-gradientbg.jpg) repeat-x center center; 	color: #ffffff; font: bold 13px verdana, geneva, lucida, \'lucida grande\', arial, helvetica, sans-serif; border-top:1px solid #606066; border-left:1px solid #606066;}');