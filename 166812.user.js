// ==UserScript==
// @name           DDLValley Enhancer
// @author         Carlton Kenney
// @namespace      none
// @description    Adds Page Navigation to top of page, removes shoutbox and ads
// @copyright      2013 by Carlton Kenney
// @require    	   http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// @version        0.1b
// @lastupdated    5/6/2013
// @include        *ddlvalley.eu/*
// ==/UserScript==

$(document).ready(function() {
	$('.wp-pagenavi').clone().prependTo('.pb');
	$('.wp-pagenavi:eq(0)').css('padding-bottom', '+=5px');
	$('.widget').remove();
});