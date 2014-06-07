// ==UserScript==
// @name        The Old Reader - Cleaned
// @namespace   http://theoldreader.com
// @include     http://theoldreader.com/*
// @version     2
// @require       http://ajax.googleapis.com/ajax/libs/jquery/2.0.2/jquery.js
// ==/UserScript==

GM_addStyle('.well.sidebar-nav > .nav { width: 225px; }'); //hide unused categories
GM_addStyle(".row-fluid .span3 {width: 250px;}"); // left pane width

jQuery('.reader .body-fixed-top').css({ // right pane width
	'width': jQuery(document).width() - 300,
	'left': 300,
	'margin-left': -30
});
jQuery(window).resize(function() {
	jQuery('.reader .body-fixed-top').css({ // right pane width
		'width': jQuery(document).width() - 300,
		'left': 300,
		'margin-left': -30
	});

});
GM_addStyle(".post.unread {border-left: 4px solid #30A67C; padding-left: 10px}"); // unread item left border color
//.post.unread {border-left: 4px solid #30A67C; padding-left: 10px;}
GM_addStyle(".static .page-header h1 {height: 5px; font-size: 5px;}");
GM_addStyle(".navbar .navbar-inner .container {height: 40px; width: auto;}"); //smaller header
GM_addStyle("html body.reader div.navbar div.navbar-inner {min-height: 40px;}"); //smaller header
GM_addStyle(".navbar .brand {display: none;}"); //hide logo
GM_addStyle("html body.reader div.navbar div.navbar-inner div.container div.row-fluid div.span9 {margin: 0; position: absolute; width: 100%;}"); //fix header
GM_addStyle(".navbar .form-search {margin-left: 10px; margin-top: 5px;}"); //search form
GM_addStyle(".reader .container-fluid {top: 50px;}");
GM_addStyle(".navbar .nav li a {padding-top: 10px; padding-bottom: 10px;}"); // profile links
GM_addStyle(".navbar .nav li.divider-vertical {height: 35px;}"); // profile links separator
GM_addStyle(".nav-list li.active a:not(.i):before {border-left: 3px solid #DD4B39; left: -13px;}");
GM_addStyle(".nano > .pane > .slider {background-color: #DD4B39;}"); //active item selector color
GM_addStyle(".nav-list li.active a {color: #DD4B39;}"); // active item text color
GM_addStyle(".badge.badge-info {background-color: #DD4B39;}"); // unread count badge

GM_addStyle("html body.reader div.navbar div.navbar-inner div.container div.row-fluid div.span9 a.btn{margin-top: 5px;}"); // unread item left border color
//GM_addStyle("html body.reader div.container-fluid div.row-fluid div#main.nano div.static div.floating {width: 463px; float: right; margin-top: -55px;}");
GM_addStyle("html body.reader div.container-fluid div.row-fluid div#main.nano div.static {width: 463px; float: right; margin-top: -55px;}");
GM_addStyle("div.floating {width: 463px; float: right; margin-top: 35px;}");

// GM_addStyle(".posts:first-child {margin-top: 0px;}");
GM_addStyle("html body.reader div.container-fluid div.row-fluid div#main.nano div.slide {top: 25px !important;}");
//GM_addStyle("html body.reader div.container-fluid div.row-fluid div#main.nano {top: 55px !important;}");
//GM_addStyle("div.slide {top: 25px !important;}");

///GM_addStyle("html body.reader div.container-fluid div.row-fluid div#main.nano div.slide div.posts div.well {margin-bottom: 10px;}");

//GM_addStyle("html body.reader div.container-fluid div.row-fluid div#main.nano div.slide div.posts div.well {border: 1px solid #DDDDDD; box-shadow: 0 0 4px #E3E5EB;}");
GM_addStyle("html body.reader div.container-fluid div.row-fluid div#main.nano div.slide div.posts div.well {box-shadow: 0 0 4px #E3E5EB;}");

GM_addStyle(".post h3 a {color: #1155CC; }");
GM_addStyle(".post .label.label-transparent {color: #666666; }");
GM_addStyle(".badge.badge-info {background-color: transparent; color: #666666; border-right: 2px solid #666666; border-left: 2px solid #666666;}");
