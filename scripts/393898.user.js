// ==UserScript==
// @name        itm ignored post improver
// @namespace   http://userscripts.org/users/138028
// @include     http://www.inthemix.com.au/forum/*
// @version     3.11 for Workgroups
// @require		http://j.i.tsatic-cdn.net/343/global/jquery/jquery-1.4.2.js
// ==/UserScript==

$(function() {
	var catHtml = function() {
		$(this).html('<img src="http://thecatapi.com/api/images/get?category=sunglasses#' + Math.random() + '">');
	};
	
	$('.post-content a[href="profile.php?do=editlist"]').closest('.post-content').each(catHtml);
});