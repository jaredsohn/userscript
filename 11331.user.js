// Feedpaper for Sage
// User script providing enhancements for Sage extension 
// For use in conjunction with my stylesheet (feedpaper.css)
// Copyright (c) 2007 Samuel Saint-Pettersen <samji@bigfoot.com>
// Released under the GPL licence
// http://www.gnu.org/copyleft/gpl.html
// ---------------------------------------------------------------------
// This is a Greasemonkey user script.
// To install it, you need Greasemonkey: http://www.greasespot.net
// ---------------------------------------------------------------------
// Changes for 0.2:
// * References slightly tweaked stylesheet
// * Correctly resolves feed URLs containing an underscore (_)
// ---------------------------------------------------------------------
// To do: 
// Proper support for Atom feeds; proper support for pages which link
// to multiple feeds.
// ---------------------------------------------------------------------
// ==UserScript==
// @name Feedpaper for Sage
// @version 0.2
// @author Samuel Saint-Pettersen
// @description Enhancements for feeds in Sage extension
// @include *chrome/sage.html
// ==/UserScript==
(function() {
/*  Remove multiline comments next to //STARTCSS and //ENDCSS 
	respectively to retrieve stylesheet from Internet.
	It is recommended to save the CSS file locally and configure its
	use with Sage manually.
*/
	/*//STARTCSS
	// apply custom stylesheet to feed view
	var cssUrl = "http://www.hotlinkfiles.com/files/268908_oxtbu/feedpaper.css";
	var stylesheet = document.getElementsByTagName("link")[0];
	stylesheet.setAttribute("href", cssUrl);
	//ENDCSS*/
	
	// remove technorati links from feed
	var technorati_re = /.*technorati.gif.*/ig;
	var technorati_img = new Array();
	for(var i = 0; i < document.getElementsByTagName("img").length;	i++)
	{
		technorati_img = document.getElementsByTagName("img")[i];
		technorati_src = technorati_img.getAttribute("src");
		var search_tech = technorati_src.search(technorati_re);
		if(search_tech != -1)
		{
			technorati_img.style.display = "none";
		}
	}
	// make all exisiting links open in a new window
	var a = new Array();
	for(var i = 0; i < document.getElementsByTagName("a").length; i++)
	{
		a = document.getElementsByTagName("a")[i];
		a.setAttribute("target", "_blank");
	}
	// place link and full URL to original feed under title and description
	var feed_icon;
	var source = document.getElementById("rss-link").getAttribute("href");
	GM_xmlhttpRequest({
		method: 'GET',
		url: source,
    onload: function(responseDetails) {
		var response = responseDetails.status;
		var returned = responseDetails.responseText;
		var feed_re = /<link.*rel=\"alternate\".*[^<,]/i;
		var feed_re_url = /[:\/a-z0-9._%+-]+\.[a-z]{2,4}[a-z0-9\/.=?_]+[^\">]/ig;
		var atom_re = /.*atom.*/ig;
		var abs_url = /http:\/\//ig;
		var final_url = null;
		if(response != "200")
		{
			// if the request fails, display message in place of URL
			final_url = "Error retrieving feed source.";
		}
		var match_feed = returned.match(feed_re);
		if(match_feed != null)
		{
			var feed = match_feed.toString();
		}
		var match_icon = feed.match(atom_re);
		if(match_icon != null)
		{
			// display atom feed icon if atom feed
			feed_icon = "Atom";
		}
		else
		{
			// display rss feed icon if rss feed
			feed_icon = "http://img508.imageshack.us/img508/8666/rssiconll3.gif";
		}
		var match_url = feed.match(feed_re_url);
		if(match_url != null)
		{
			var feed_url = match_url.toString();
			var search_abs_url = feed_url.search(abs_url); 
			if(search_abs_url != -1)
			{
				// if URL is already absolute, leave as is
				final_url = feed_url;
			}
			else
			{
				// otherwise prepend website URL
				final_url = source + "/" + feed_url;
			}
			var para = document.createElement("p");
			para.setAttribute("id", "fp_section");
			var icon = document.createElement("img");
			icon.setAttribute("src", feed_icon);
			icon.setAttribute("id", "fp_icon");
			icon.setAttribute("alt", "feed icon");
			var link = document.createElement("a");
			link.setAttribute("href", final_url);
			link.setAttribute("id", "fp_src");
			link.setAttribute("target", "_blank");
			var text = document.createTextNode(final_url);
			var desc = document.getElementById("rss-header");
			desc.appendChild(para);
			var fpsec = document.getElementById("fp_section");
			fpsec.appendChild(icon);
			fpsec.appendChild(link);
			var fpsrc = document.getElementById("fp_src");
			fpsrc.appendChild(text);
		}
		else 
		{
			final_url = "Could not determine feed source."
		}
    }});
})();
