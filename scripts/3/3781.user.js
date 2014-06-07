// Google Sherlock
// version 0.2 BETA
// 2006-04-03
// Copyright (c) 2006, Bruno M Fonseca
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "Google: Preview", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Google Sherlock 
// @namespace     http://youngpup.net/userscripts
// @description	  See a preview of Google answers.
// @include       http://www.google.*
// --------------------------------------------------------------------
// 06 April 2006
// - Added prefetch of the search results
// - Added the result title in the div preview
// - Added buttons to navigate throw search results
// - Changed "preview" link to a image of a magnifying glass
// --------------------------------------------------------------------
// ==/UserScript==

(function() {

var matchPreviewIdRE = /^fast_view\[(\d+)\]$/;
var matchTitleRE = /<title>(.*?)<\/title>/i;

function PreviewLink(url, i) {
	this.link = document.createElement('a');

	this.link.id = "fast_view[" + i + "]";
	this.link.class = "l";
	this.link.href = url;
	this.link.innerHTML = "<img src='http://www.google.com/options/icons/web.gif' " +
												"alt='Preview this result' " +
												"title='Preview this result' " +
												"width=20 height=20 border=0>&nbsp;";

	this.link.addEventListener("mouseover", this.showDiv, false);
	this.fetched = false;

	// Pre-fetch the content
	GM_xmlhttpRequest({
		method:"GET",
		url:this.link.href,
		link:this,
		headers: {'Referer': document.location},
		onload:this.fetchUrlContent
	});
}

PreviewLink.prototype.fetchUrlContent = function(details) {
	this.link.fetched = true;
	var title = matchTitleRE.exec(details.responseText);
	if (title) {
		this.link.title = title[1];
	}
	// Change base href so we dont break images, or links
	var protocol = "data:text/html,";
	var base = "<base href='" + this.link.link.href + "'>";
	this.link.text = protocol + escape(base) + escape(details.responseText);
}

PreviewLink.prototype.getText = function() {
	return this.text;
}

PreviewLink.prototype.fillDiv = function(text, title) {
	var content_iframe = document.getElementById("SearchContent");
	var page_title = document.getElementById("PageTitle");
	page_title.innerHTML = "<b>" + title + "</b>";
	content_iframe.src = text;
}

PreviewLink.prototype.showButtons = function(id) {
	var previous_result_button = document.getElementById("PreviousResult");
	var next_result_button = document.getElementById("NextResult");

	// Show buttons to walk through results
	if (id == 0) {
		// If it is first page doesnt show previous results button
		previous_result_button.style.visibility = 'hidden';
		next_result_button.style.visibility = 'visible';
	} else if (id == window.preview_links.length - 1) {
		// If it is last page doesnt show next result button
		previous_result_button.style.visibility = 'visible';
		next_result_button.style.visibility = 'hidden';
	} else {
		// If it is in the middle shows everything
		previous_result_button.style.visibility = 'visible';
		next_result_button.style.visibility = 'visible';
	}
}

PreviewLink.prototype.showDiv = function() {
	var id = matchPreviewIdRE.exec(this.id);
	var preview_link = window.preview_links[id[1]];
	var main_div = document.getElementById("PagePopUp");
	main_div.style.left = window.scrollX + window.innerWidth - 1200;
	main_div.style.top = window.scrollY + window.innerHeight - 600; 
	main_div.style.visibility = 'visible';
	
	if (preview_link.fetched) {
		// if we fetched the url use it
		preview_link.fillDiv(preview_link.text, preview_link.title);
	} else {
		// if add the url as title and fetch the page
  	preview_link.fillDiv(preview_link.text, this.href);
	}

	preview_link.showButtons(id[1]);

	// Update the current result
	window.current_result = id[1];
}

function getElementsByClass(tagname, classname) {
	var classes = new Array();
	var x = document.getElementsByTagName(tagname);
	for (var i = 0; i < x.length; ++i) {
		if (x[i].className == classname) {
			classes[classes.length] = x[i];
		}
	}
	return classes;
}

function divHTML() {
	var content = "<table border=0>" +
								"<tr><td id='PageTitle'></td>" + 
								"<td align='right'><button id='CloseLink'>x</button></td></tr>" +
								"<tr><td colspan=2><iframe id=SearchContent height=500 width=1100 src=''></iframe></td></tr>" +
								"<tr><td align='left'><button style='visibility: hidden;' id='PreviousResult'>Previous Result</button></td>" +
								"<td align='right'><button style='visibility: hidden;' id='NextResult'>Next Result</button></td></tr>" +	
								"</table>";
	return content;
}

hideDiv = function() {
	var main_div = document.getElementById("PagePopUp");
	var content_iframe = document.getElementById("SearchContent");
	main_div.style.visibility = 'hidden';
	// Clear the content, so next time user clicks on fast view the old page will not appear
	content_iframe.href = "";

	// FIXME: do we really need to hide these buttons?
	var previous_result_button = document.getElementById("PreviousResult");
	var next_result_button = document.getElementById("NextResult");
	previous_result_button.style.visibility = 'hidden';
	next_result_button.style.visibility = 'hidden';

}

goToNextResult = function() {
	var current_result = window.current_result;

	// avoid walk to undefined results
	if (current_result == window.preview_links - 1) {
		return;
	}

	++current_result;

	var preview_link = window.preview_links[current_result];

	if (preview_link.fetched) {
		// if we fetched the url use it
		preview_link.fillDiv(preview_link.text, preview_link.title);
	} else {
		// if add the url as title and fetch the page
		preview_link.fillDiv(preview_link.text, preview_link.link.href);
	}

	preview_link.showButtons(current_result);

	// Update the current result
	window.current_result = current_result;
}

goToPreviousResult = function() {
	var current_result = window.current_result;

	// avoid walk to undefined results
	if (current_result == 0) {
		return;
	}

	--current_result;

	var preview_link = window.preview_links[current_result];

	if (preview_link.fetched) {
		// if we fetched the url use it
		preview_link.fillDiv(preview_link.text, preview_link.title);
	} else {
		// if add the url as title and fetch the page
		preview_link.fillDiv(preview_link.text, preview_link.link.href);
	}

	preview_link.showButtons(current_result);

	// Update the current result
	window.current_result = current_result;
}

function addDiv() {
	var main_div = document.createElement('div');
	main_div.id = "PagePopUp";
	var s = main_div.style;
	s.position = "absolute";
	s.fontFamily = "Arial, sans-serif";
	s.backgroundColor = "FFFFFF";
	s.borderStyle = "solid";
	s.borderColor = "rgb(128, 128, 128)";
	s.borderWidth = 1;
	s.visibility = 'hidden';
	s.MozBorderRadius = "6px";
	main_div.innerHTML = divHTML();

//	main_div.addEventListener('mouseout', hideDiv, false);

	document.body.appendChild(main_div);

	// Add handlers when user clicks the button
	var previous_result_button = document.getElementById("PreviousResult");
	var next_result_button = document.getElementById("NextResult");

	previous_result_button.addEventListener("click", goToPreviousResult, false);
	next_result_button.addEventListener("click", goToNextResult, false);
	
	var close_link = document.getElementById("CloseLink")
	close_link.addEventListener("click", hideDiv, false);
}

function createFastViewLinks() {
	var links = getElementsByClass("a", "l");
	var ps = getElementsByClass("p", "g");
	window.preview_links = new Array();
	for (var i = 0; i < links.length; ++i) {
		var link = new PreviewLink(links[i].href, i);
		window.preview_links[i] = link;
		links[i].parentNode.insertBefore(link.link, links[i]);
	}
	window.current_result = 0;
}

treatScroll = function() {
	var main_div = document.getElementById("PagePopUp");
	GM_log("scrolling");
	if (main_div.style.visibility == 'visible') {
		// Put the div in the rigth position if the user scrolls the window
		main_div.style.left = window.scrollX + window.innerWidth - 700;
		main_div.style.top = window.scrollY + window.innerHeight - 600; 
	}
}

function main() {
	addDiv();
	createFastViewLinks();
	
	var base = document.createElement("base");

	// Treat scrolls
	window.addEventListener("onscroll", treatScroll, false);
}

main();

})();
