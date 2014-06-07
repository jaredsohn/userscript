// ==UserScript==
// @name           gReader Voting
// @namespace      greader.voting
// @description    Voting for gReader (Digg, Reddit)
// @include        http://www.google.com/reader/*
// @include        https://www.google.com/reader/*
// @include        http://digg.com/tools/diggthis.php?u=*&s=compact&k=ccdeaf#googlereader
// @version  	   1.1
// ==/UserScript==

// Credits go to Jordi de Groff: http://userscripts.org/scripts/show/10311
// I cleaned it up a bit and added reddit support

// Change this if you don't want it to reload digg in the iframe... i.e. you actually want it to open a window
// '_self' or '_blank'
var window_target = '_self';

///////////////////////////////////////////////////////////////////////////
//////////////////////////////// CODE /////////////////////////////////////
///////////////////////////////////////////////////////////////////////////

// Reset the target on all links inside the digg iframe
if ((location.href.indexOf("http://digg.com/tools/diggthis.php?u=") === 0) && (location.hash.indexOf("#googlereader") === 0)) {
	
	document.getElementById("f1").target = window_target;
	
	var links = document.getElementsByTagName("A");
	for (var a= 0; a < links.length; a++) {
		links[a].target = window_target;
	}

	return;

}

var entries = document.getElementById("entries");
if (entries) {
	entries.addEventListener('DOMNodeInserted', function(event){nodeInserted(event);},true);
}

function nodeInserted(event) {

	var url;
	var linkbar;
	var btn = document.createElement('span');

	if ((event.target.tagName == 'DIV') && (event.target.className != '')) {

		if (event.target.firstChild && event.target.firstChild.className == 'card') {

			linkbar = event.target.firstChild.firstChild.childNodes[2].childNodes[1].firstChild;
			url 	= event.target.firstChild.firstChild.childNodes[1].childNodes[1].firstChild.childNodes[1].childNodes[1].firstChild.getAttribute('href');

			if (url.indexOf('digg.com') > 0) {

				btn.innerHTML 	= "<iframe src='http://digg.com/tools/diggthis.php?u=" + escape(url) + "&s=compact&k=ccdeaf#googlereader' style='height:15.5px; width:120px;' frameborder='0' scrolling='no'></iframe>";
				linkbar.appendChild(btn);
	
			}
			else if (url.indexOf('reddit.com') > 0) {

				url 		= event.target.firstChild.firstChild.childNodes[1].childNodes[1].firstChild.childNodes[1].childNodes[3].firstChild.firstChild.firstChild.firstChild.getAttribute('href');
				btn.innerHTML 	= "<iframe src='http://reddit.com/button?t=1&url=" + escape(url) + "' style='height:20px; width:120px;' frameborder='0' scrolling='no'></iframe>";
				linkbar.appendChild(btn);

			}


		} else {
			return;
		}

	}
}
