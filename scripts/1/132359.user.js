// ==UserScript==
// @name        HNhance: Hover Reply Links for Hacker News
// @description Adds hover parents to reply links
// @match       http://news.ycombinator.com/*
// ==/UserScript==

(function() {
	"use strict";
	
	// Determine chain of parents
	// ``````````````````````````
	
	var rows = document.getElementsByTagName("table")[3].children[0].children;
	var last = {};
	for (var i in rows) {
		if (! rows[i].children) continue;
	
		rows[i].id = "hnpost_"+i;
		
		var width = rows[i].
			children[0].children[0].children[0].
			children[0].children[0].children[0].
			width;
		
		last[width] = i;
		
		if ((width-40) in last) {
			rows[i].setAttribute("data-hnparent", last[(width-40)]);
		}
	}
	last = {};
		
	// Create hover element
	// ````````````````````
	
	var hover = document.createElement("div");
	hover.id                    = 'hnhance_tooltip';
	hover.style.display         = 'none';
	hover.style.position        = 'fixed';
	hover.style.backgroundColor = "white";
	hover.style.border          = '1px solid darkgrey';
	hover.style.padding         = '3px';
	document.body.appendChild(hover);
	
	hover.appendChild(document.createTextNode("loading..."));
	
	// Create parent links
	// ```````````````````
	
	var u_tags = document.getElementsByTagName("u");
	for (var i = 0; i < u_tags.length; i++) {
		// Walk backward to <tr>.
		// Root posts are one level higher
		var tr = u_tags[i].
			parentNode.parentNode.parentNode.parentNode.
			parentNode.parentNode.parentNode.parentNode;
		var post_id = (tr.id) ? tr.id : tr.parentNode.id;
		
		// Find parent post id
		var parent_id = document.getElementById(post_id).
			getAttribute("data-hnparent");
		
		if (! parent_id) continue;
		
		// Create parent link:
		var parent_link = document.createElement("a");
		parent_link.id = "hnparentlink_"+i;
		parent_link.style['text-decoration'] = 'underline';
		parent_link.setAttribute("href", "javascript:;");
		parent_link.appendChild(document.createTextNode("parent"));
		
		// Mouseover
		var mouseover = function(post_id, e) {
			while (hover.hasChildNodes()) {
				hover.removeChild(hover.lastChild);
			}
			// Retrieve
			var src = document.getElementById(post_id).
				children[0].children[0].children[0].
				children[0].children[2].children;
			for (var i = 0; i < src.length; i++) {
				hover.appendChild(src[i].cloneNode(true));
			}
			hover.style.display = 'block';
		};
		parent_link.onmouseover = mouseover.bind(
			mouseover, "hnpost_"+parent_id
		);
		
		// Mousemove
		parent_link.onmousemove = function(e) {
			hover.style.top = e.clientY + 10;
			hover.style.left = e.clientX + 10;
		}
		
		// Mouseout
		parent_link.onmouseout = function() {
			hover.style.display = 'none';
		};
		
		// Add to document
		u_tags[i].parentNode.appendChild(document.createTextNode(" | "));
		u_tags[i].parentNode.appendChild(parent_link);
	}
	
})();