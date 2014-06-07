// ==UserScript==
// @name        GA Integration modifier
// @namespace   VWO
// @description Adds support for 50 GA Custom variable slots
// @include     http://v2.visualwebsiteoptimizer.com/reports/*
// @include     http://v2.visualwebsiteoptimizer.com/create/*
// @include     http://v2.visualwebsiteoptimizer.com/account/*
// @include     https://v2.visualwebsiteoptimizer.com/reports/*
// @include     https://v2.visualwebsiteoptimizer.com/create/*
// @include     https://v2.visualwebsiteoptimizer.com/account/*
// @version     1
// @author		Ankit Jain (ankit@wingify.com)
// @grant		none
// ==/UserScript==
$("document").ready(function() {
	if($("#ga_slot_num option").length == 5) {
		for(var i=6;i<=50;i++) {
			$("#ga_slot_num").append("<option val=" + i + ">" + i + "</option>");
		}
	}
});