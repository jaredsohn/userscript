// ==UserScript==
// @name           Twitter pagination
// @description    twitter.com : Find first posts (1st posts, first page) if still available in twitter's time limited archives
// @version        2011-03-17_1851
// @author         Tristan "jesus2099" DANIEL (http://miaou.ions.fr)
// @licence        GPL (http://www.gnu.org/copyleft/gpl.html)
//
// @include        http*://twitter.com/*
// ==/UserScript==

/* If you want to enable userjs on https, go to opera:config#UserPrefs|UserJavaScriptonHTTPS
   thanks to Jason Grigsby (http://userfirstweb.com/233/how-to-find-a-twitter-first-post/)
   for old twitter accounts it seems that there is a limit on archived post count */

(function () {
/* - --- - --- - --- - START OF CONFIGURATION - --- - --- - --- - 
	colour		: just put "" for standard Twitter stylings
	linkcolour	: 
	background	: 
	border		: 
	padding		: 
	toooldwarningafter : my experience told me approx. 15X but it might totally different
	toooldwarningtext : bla bla proutor 
	toolURLs    : array of tools and URL patterns with %username% variable (put null for no tools) */
	var colour = "black";
	var linkcolour = "maroon";
	var background = "yellow";
	var border = "medium maroon dashed";
	var padding = "2px 4px";
	var title = "Pages";
	var toooldwarningafter = 157;
	var toooldwarningtext = "Following links could be unarchived: ";
	var tooltitle = "Tools";
	var toolURLs = { "twilog":"http://twilog.org/%username%", "twitter counter":"http://twittercounter.com/%username%", "twitter grader":"http://twittergrader.com/%username%" };
/* - --- - --- - --- - END OF CONFIGURATION - --- - --- - --- - */
	if (document.getElementById("profile_tab")) {
		var user = document.getElementById("follow").value;
		var li, strong, a, span;
		var url = document.getElementById("profile_tab").firstChild.getAttribute("href");
		var page = "page=([0-9]+)";

		var menu = document.getElementById("side").getElementsByTagName("ul")[0];
		var pages = Math.ceil(document.getElementById("update_count").firstChild.nodeValue.replace(/,/,"") / 20);

		var curpage = top.location.href.match(page);
		if (curpage) {
			curpage = curpage[1];
		} else {
			curpage = 1;
		}

		li = document.createElement("li");
		li.style.color = colour;
		li.style.background = background;
		li.style.border = border;
		li.style.padding = padding;

		if (toolURLs) {
			span = document.createElement("span");
			span.className = "label"
			span.appendChild(document.createTextNode(tooltitle));
			li.appendChild(span);
			li.appendChild(document.createTextNode(" \u00A0 "));
			for (tool in toolURLs) {
				a = document.createElement("a");
				a.style.color = linkcolour;
				a.setAttribute("href", toolURLs[tool].replace(/%username%/g, user));
				a.appendChild(document.createTextNode(tool));
				li.appendChild(a);
				li.appendChild(document.createTextNode(". \u00A0 "));
			}
			li.appendChild(document.createElement("br"));
		}

		span = document.createElement("span");
		span.className = "label"
		span.appendChild(document.createTextNode(title));
		li.appendChild(span);
		li.appendChild(document.createTextNode(" \u00A0 "));

		for (var i=1; i<=pages; i++) {
			var txt = (i<10?"\u00a0":"")+i;
			if (i == toooldwarningafter+1) {
				li.appendChild(document.createElement("br"));
				strong = document.createElement("strong");
				strong.appendChild(document.createTextNode(toooldwarningtext));
				li.appendChild(strong);
			} else if (i != 1) {
				li.appendChild(document.createTextNode(", "));
			}
			if (i != curpage) {
				a = document.createElement("a");
				a.style.color = linkcolour;
				a.setAttribute("href", url+(i>1?"?page="+i:""));
				a.appendChild(document.createTextNode(txt));
				li.appendChild(a);
			} else {
				strong = document.createElement("strong");
				strong.appendChild(document.createTextNode(txt));
				li.appendChild(strong);
			}
		}

		menu.appendChild(li);
	}

})();