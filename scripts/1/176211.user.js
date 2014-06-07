// ==UserScript==
// @name			QuidcoFixer
// @namespace	QuidcoFixer
// @version		1.7
// @description	QuidcoFixer
// @match		*://*.quidco.com/*
// @match		*://*.quidco.local/*
// @match		*://*.quidco.dev/*
// @require		https://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js
// @icon			http://static.quidco.com/img/favicon.ico
// @copyright		2013+, Mike Salmon
// ==/UserScript==

$(function() {
    $('#main-nav .main-nav-container .logo').css('position', 'relative').css('left', '-260px');
    $('#main-nav .main-nav-container .browse').css('left', '170px');
    $('#main-nav .main-nav-container .search').css('left', '200px');
});