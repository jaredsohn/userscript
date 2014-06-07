// ==UserScript==
// @name		eRepublikUA
// @version		0.1
// @description	Ukrainian Official UserScript
// @author		eCitizens Maximko & DimaXY3
// @namespace	eUkarine
// @include		http://ww*.erepublik.com/*
// @require		http://jqueryjs.googlecode.com/files/jquery-1.3.1.min.js
// ==/UserScript==

// Constants
var VERSION = '0.02';
var HIGHLIGHT_COLOR = "#ffff9b";
var UKRAINIAN_COMPANIES = new Array();

Array.prototype.contains = function (element) {

	alert("contains" + UKRAINIAN_COMPANIES.length);

	for (var i = 0; i < this.length; i++) {

		alert("in loop");

		if (this[i] == element) {
			return true;
		}
	}
	return false;
}

function getUACompanies() {
	GM_xmlhttpRequest({
		method: 'GET',
		url: 'http://docs.google.com/View?id=dhpbc8gw_30f7nxwgds',

		onload: function (response) {
			if (response.status != 200)
				return;

			var companies = response.responseText.match('@@@(.*)@@@')[1].split("<br>");

			return companies;

			//alert(response.responseText.match('@@@(.*)@@@')[1]);
			//alert(companies.length);

			//var ukrainian_companies = new Array();

			//			for (var c in companies) {
			//				//alert(companies[c]);
			//				ukrainian_companies.push(companies[c]);
			//			}

			//alert(ukrainian_companies)

			//return ukrainian_companies;
		}
	});
}

function highlightUaCompanies(companies) {
	$("table.offers tr").each(function(i) {
		if (i == 0) return;
		var link = $(this).find("td(0) a");
		var regex = /(http\:\/\/www\.erepublik\.com\/en\/company\/.+?\-)(\d+)$/;
		var num = link.get(0).href.replace(regex, "$2");

		if (companies.contains(num)) {
			$(this).css("background-color", HIGHLIGHT_COLOR);
		}
	});
}

function pageLoad(e) {
	var c = getUACompanies();
	alert(c.length);

	highlightUaCompanies(c);
};

var $ = jQuery.noConflict();

$(document).ready(function () {
	pageLoad();	
});