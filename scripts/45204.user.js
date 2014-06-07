// ==UserScript==
// @name           NYTimes expander
// @namespace      
// @description    Jump to full-article view and expand NYTimes articles
// @include        http://www.nytimes.com/*
// ==/UserScript==

// NYTimes expander
// version 1.1 (2009-03-25)
// Copyright (c) Dan Fenwick
// Take it under 3-clause BSD, I guess

// remove big shadow box at the top
function toast_TP() {
	div = document.getElementById('TP_container');
	div.parentNode.removeChild(div);
	div = document.getElementById('TP_container_shadow');
	div.parentNode.removeChild(div);
}

// jump to single-page version, if necessary
// returns true if redirect performed
function consider_redirect() {
	href = window.location.href;

	if (! href.match(/\?.*pagewanted=all/) ) {
		if (href.match(/\?/)) {
			href += "&pagewanted=all";
		} else {
			href += "?pagewanted=all";
		}

		window.location.replace(href);
		return true;
	} else {
		return false;
	}
}

// allow an article to fill the page
function expand_page() {
	// allow page to fill window horizontally, but keep old width for small windows
	div = document.getElementById('shell');
	div.style.width = "95%";
	div.style.minWidth = "971px";

	aColumn = document.getElementById('aColumn');
	bColumn = document.getElementById('bColumn');
	article = document.getElementById('article');

	// moving the "popular" box inside the other column allows the article text to
	// flow around it
	aColumn.insertBefore(bColumn, article);

	// allow the article to fill the box horizontally
	aColumn.style.width = "100%";
	aColumn.style.minWidth = "600px";
	aColumn.style.paddingLeft = "0px";

	article.style.clear = "none";
	article.style.width = "100%";
	article.style.minWidth = "600px";

	// eliminate the gray border to the right of the article text
	document.getElementById('main').style.background = "transparent";

	// correct the whitespace around the article
	body = document.getElementById('articleBody');
	body.style.padding = "0px 10px 0px 10px";
}

// on an index page, only the big shadow box gets touched
href = window.location.href;

if (href.match(/nytimes.com\/$|\/index.html/)) {
	toast_TP();
} else {
	if (! consider_redirect()) {
		toast_TP();
		expand_page();
	}
}

