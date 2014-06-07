// ==UserScript==
// @name        Cracked One Page
// @namespace   BeenJammin.Greasemonkey.UserScripts
// @description Loads any multi-page content from Cracked.com on one page
// @include     http://*.cracked.com/*
// @version     1.1
// ==/UserScript==

if (navigator.userAgent.toLowerCase().indexOf('chrome') > -1) {
	function addJQuery(callback) {
	  var script = document.createElement("script");
	  script.setAttribute("src", "http://code.jquery.com/jquery-latest.min.js");
	  script.addEventListener('load', function() {
		var script = document.createElement("script");
		script.textContent = "(" + callback.toString() + ")();";
		document.body.appendChild(script);
	  }, false);
	  document.body.appendChild(script);
	}

	// the guts of this userscript
	function main() {
		jQuery.noConflict();
		if (jQuery(".PaginationContent li:first-child a[href]").attr("href")) {
			var page1Url = jQuery(".PaginationContent a[href]").attr("href");
			var page2Url = window.location.href;
			jQuery("section.body section").html("<div id='pageOneContent'></div><div id='pageTwoContent'></div>");
			jQuery("#pageOneContent").load(page1Url + " section.body section");
			jQuery("#pageTwoContent").load(page2Url + " section.body section");
		}
		else if (jQuery(".PaginationContent li:last-child a[href]").attr("href")) {
			var page1Url = window.location.href;
			var page2Url = jQuery(".PaginationContent a[href]").attr("href");
			jQuery("section.body section").html("<div id='pageOneContent'></div><div id='pageTwoContent'></div>");
			jQuery("#pageOneContent").load(page1Url + " section.body section");
			jQuery("#pageTwoContent").load(page2Url + " section.body section");
		}
	}

	// load jQuery and execute the main function
	addJQuery(main);
}

if (jQuery(".PaginationContent li:first-child a[href]").attr("href")) {
	var page1Url = jQuery(".PaginationContent a[href]").attr("href");
	var page2Url = window.location.href;
	jQuery("article.Article section.body section").html("<div id='pageOneContent'></div><div id='pageTwoContent'></div>");
	jQuery("#pageOneContent").load(page1Url + " article.Article section.body section");
	jQuery("#pageTwoContent").load(page2Url + " article.Article section.body section");
}
else if (jQuery(".PaginationContent li:last-child a[href]").attr("href")) {
	var page1Url = window.location.href;
	var page2Url = jQuery(".PaginationContent a[href]").attr("href");
	jQuery("article.Article section.body section").html("<div id='pageOneContent'></div><div id='pageTwoContent'></div>");
	jQuery("#pageOneContent").load(page1Url + " article.Article section.body section");
	jQuery("#pageTwoContent").load(page2Url + " article.Article section.body section");
}