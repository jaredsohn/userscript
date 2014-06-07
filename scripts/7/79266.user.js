// ==UserScript==
// @name           Realtor.com google links
// @namespace      Realtor.com
// @description    Adds links to google maps
// @include        http://www.realtor.com/realestateandhomes-search/*
// @include        http://www.realtor.com/realestateandhomes-detail/*
// @require        http://code.jquery.com/jquery-1.3.2.js
// ==/UserScript==
// By Daniel Powell (danp129 AT yahoo)
/// <reference path="jquery-132-vsdoc.js"> 

$(document).ready(function() {
// EDIT daddr to be your place of work!
	var daddr="new york, NY";
	var saddr=$(".hsLDPrw1").text();
// Code for when viewing a property
	$(".hsLDPrw1").after(" <a target=\"_blank\" href=\"http://maps.google.com/maps?hl=en&saddr="+saddr+"&daddr="+daddr+"\">Directions</a>");
// Code for search results
	$(".lvAddress").each(function (index) {
		var saddr=$(this).find("h2").find("a").text();
		$(this).find("h2").after(" <a style=\"float: right; padding:7px 0 7px 6px;\" target=\"_blank\" href=\"http://maps.google.com/maps?hl=en&saddr="+saddr+"&daddr="+daddr+"\">Directions</a> ");
	});
});

