// ==UserScript==
// @name Craigslist Price Manipulator
// @description This script takes the total price of a craigslist apt listing and divides it by the number of bedrooms (split evenly between N roommates)
// @include http://*.craigslist.org/search/apa/*
// @include http://*.craigslist.org/*/apa/
// @include http://*.craigslist.org/search/*
// @include http://*.craigslist.org/apa/

// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// ==/UserScript==

var link, reg, match, total, p;
var json = new Array();
reg = /^\$([0-9]{3,6}) \/ ([0-9])br/i;

$('blockquote p').each(function() {
	link = $(this).children('a');
	link_text = link.html();
	if(link_text != null) {
		match = (link_text.match(reg));
		if(match != null && match[2] != 0) {
			total = Math.ceil(match[1] / match[2]);
			p = $("<strong>").html("$" + total + "/bd ");
			$(this).prepend(p);
			json.push({cost: total, html: $(this)})
			$(this).remove();
		}
	}
})

// sort array

json.sort(function (obj1, obj2) {
	return obj1.cost < obj2.cost ? -1 :
	(obj1.cost > obj2.cost ? 1 : 0);
});

json.reverse();

// repopulate

var beg = $('blockquote h4.ban:first')

jQuery.each(json, function() {
	beg.after(this.html);
})

