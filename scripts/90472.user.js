// ==UserScript==
// @name			Comic Helper
// @namespace		http://github.com/wfriesen/comic-helper
// @description		Adds content to web comic RSS feeds shown in Google Reader,
// including comics for feeds that don't include it, and hidden "easter egg"
// content
// @version			3.2
// @include			http://reader.google.com/reader/*
// @include			http://www.google.com/reader/*
// @require			https://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// ==/UserScript==

var extension = false;

function is_comic(link) {
	var comics = {
			"http://xkcd.com/" : "xkcd",
			"http://www.amazingsuperpowers.com/" : "asp",
			"http://feedproxy.google.com/~r/AbstruseGoose/" : "ag",
			"http://www.boatcrime.com/" : "bc",
			"http://feedproxy.google.com/~r/smbc-comics/" : "smbc",
			"http://www.smbc-comics.com/" : "smbc",
			"http://www.explosm.net/comics/" : "ch",
			"http://feeds.penny-arcade.com/" : "pa"
	}
	for (var c in comics) {
		if ( link.match("^"+c) ) return comics[c];
	}
	return null;
}

function add_secrets(item_body, title, panel_src) {
	var div = $("<div />");
	if ( title ) div.append($("<p />").append(title));
	if ( panel_src ) div.append($("<img />").attr("src", panel_src));
	$(item_body).after(div);
}

function handle_response(data, item_body, title) {
	var panel_src = null;
	try {
		responseJSON = JSON.parse(data);
		panel_src = responseJSON.panel;
	} catch (e) {}

	if (panel_src || title) {
		add_secrets(item_body, title, panel_src);
	}
}

function ajax_panel(link, item_body, title) {
	link = "http://comic-helper.appspot.com/panel?link="+link;
	if ( extension ) {
		$.get(link, function(data) {
			handle_response(data, item_body, title);
		});
	} else {
		setTimeout(function() {
			GM_xmlhttpRequest({
				method: "GET",
				url: link,
				onload: function(response) {
					handle_response(response.responseText, item_body, title);
				}
			});
		}, 0);
	}
}

function get_extras(comic, item_body, link) {
	link = encodeURIComponent(link);
	var title = null;
	switch (comic) {
		case "ag":
		case "bc":
		case "xkcd":
			title = $(item_body).find("img").attr("title");
			if (title) {
				add_secrets(item_body,title,null);
			}
			break;
		case "asp":
			title = $(item_body).find("img").attr("title");
		case "smbc":
		case "ch":
			ajax_panel(link, item_body, title);
			break;
		case "pa":
			var div_html = $(item_body).find("div").html();
			var test = /New Comic/i;
			if (( div_html ) && ( test.test(div_html) )) {
				ajax_panel(link, item_body, null);
			}
			break;
	}
}

var process_node = function(e) {
	var entry_main = null;
	var entry_title_link = null;
	var item_body = null;
	$(e.target).children("div").each(function() {
		$(this).find("div[class='entry-main']").each(function() {
			entry_main = this;
			$(entry_main).find("a[class='entry-title-link']").each(function() {
				entry_title_link = $(this).attr("href");
			});
			$(entry_main).find("div[class='item-body']").each(function() {
				item_body = this;
			});
		});
	});
	if ( !entry_main || !entry_title_link || !item_body ) return;

	var comic = is_comic(entry_title_link);
	if ( !comic ) return;

	get_extras(comic, item_body, entry_title_link);
}

function go() {
	document.body.addEventListener('DOMNodeInserted', process_node, false);
}

if ( typeof checkOption == 'function' ) {
	extension = true;
	checkOption("reader", go);
} else {
	go();
}
