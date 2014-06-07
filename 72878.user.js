// ==UserScript==
// @name		eRepublikUA
// @version		0.2
// @description	Ukrainian Official UserScript
// @author		eCitizens Maximko & DimaXY3
// @namespace	eUkarine
// @include		http://www.erepublik.com/*
// @require		http://jqueryjs.googlecode.com/files/jquery-1.3.1.min.js
// ==/UserScript==

// Constants
var VERSION = '0.2';
var HIGHLIGHT_COLOR = "#ffff9b";
var UKRAINIAN_COMPANIES = [
	179787,
	186940,
	194677,
	181758,
	206146,
	220797,
	214391,
	182388,
	214223,
	187635,
	186613,
	191106,
	208651,
	85452,
	198576
];

Array.prototype.contains = function (element) {
	for (var i = 0; i < this.length; i++) {
		if (this[i] == element) {
			return true;
		}
	}
	return false;
}

function highlightUaCompanies() {
	$("table.offers tr").each(function(i) {
		if (i == 0) return;
		var link = $(this).find("td(0) a");
		var regex = /(http\:\/\/www\.erepublik\.com\/en\/company\/.+?\-)(\d+)$/;
		var num = link.get(0).href.replace(regex, "$2");
		if (UKRAINIAN_COMPANIES.contains(num)) {
			$(this).css("background-color", HIGHLIGHT_COLOR);
		}
	});
}

function pageLoad(e) {
	highlightUaCompanies();
};

var $ = jQuery.noConflict();

$(document).ready(function () {
	pageLoad();
});