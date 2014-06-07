// ==UserScript==
// @name		Late Night Crew Narrow
// @namespace	LatenightCrew.co.uk
// @description	LateNightCrew Narrow version
// @include		http://latenightcrew.co.uk/*
// @include             http://latenightcrew.co.uk
// @include             latenightcrew.co.uk
// @include             http://latenightcrew.co.uk/forum/
// @include             latenightcrew.co.uk/forum/
// @require		http://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js
// @version		1.3
// ==/UserScript==

$.noConflict();
jQuery(document).ready(function($) {

	/** Load the stylesheet from Github */
	$("<link/>", {rel: "stylesheet", href: "http://raiss.nl/lncnarrow.js"}).appendTo("head");

	