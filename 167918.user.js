// ==UserScript==
// @name        Netflix Ratings Scraper
// @namespace   http://userscripts.org/users/init2null
// @include     http://*.netflix.com/MoviesYouveSeen*
// @include     http://*.netflix.ca/MoviesYouveSeen*
// @include     http://ca.movies.netflix.com/MoviesYouveSeen*
// @include     http://ca.dvd.netflix.com/MoviesYouveSeen*
// @version     1.1
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// @grant       none
// ==/UserScript==

/*
Netflix Ratings Scraper
Copyright 2013 Wesley Crossman (init2null@gmail.com)

Extracts your ratings off of the Netflix's Movies You've Seen page. This script
will automatically run on the page, changing it into a block of comma-separated
names and ratings. To use, copy each page of CSV to a text file (you can use
Notepad), only including the header the first time. When you're finished, save it
as a .csv file, surrounding the filename with quotes: "all my ratings.csv"

You can now open it in Excel or one of the many other programs that support it.
To disable this scraper when you're done, disable or remove it in the GreaseMonkey section
of Firefox Add-Ons.

Copying and distribution of this file, with or without modification,
are permitted in any medium without royalty provided the copyright
notice and this notice are preserved.  This file is offered as-is,
without any warranty.
*/

//This code is sloppy, but fairly resilient against change. If it breaks,
//check for changes in styles:
//Cell-title should contain one link. Cell-title should be followed by
//cell-starbar, which should contain an element with the class sbmf-0 to
//sbmf-50, depending on the rating. Class pagination should exist on the page.

(function() {
	this.$ = this.jQuery = jQuery.noConflict(true);
	var jsonResult = [];
	var csvResult = [];
	$(".cell-title").each(function(index, domtablecell) {
		var otablecell = $(domtablecell);
		var otitle = otablecell.find("a").first();
		var title = otitle.text();
		
		var ostarbar = otablecell.next(".cell-starbar");
		for (var a=0;a<=50;a+=10) {
			if (ostarbar.find(".sbmf-"+a).size() > 0) {
				jsonResult.push({
					"name": title,
					"href": otitle.attr("href"),
					"rating": a/10
				});
				csvResult.push(['"'+title+'"', '"'+otitle.attr("href")+'"', a/10]);
				break;
			}
		}
	});

	/* //Here's the code for those wanting JSON:
	var html = $('<div/>').
		text(JSON.stringify(jsonResult, null, 4)).
		html();
	*/

	//Here's the code for those wanting CSV:
	var html = "name,href,rating\n";
	for (var a=0;a<csvResult.length;a++) {
		html += csvResult[a].join(",") + "\n";
	}

	$("body").replaceWith("<pre>" + html + "</pre>" + $(".pagination").html());
})();
