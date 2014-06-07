// ==UserScript==
// @name           GoD - kill ads
// @namespace      Haromp
// @description    Remove all "trial" entries from the list of games, ads from the sidebar, counter and flash banner
// @include        http://www.gamesofdesire.com/*
// @exclude        http://www.gamesofdesire.com/feed/
// @downloadURL	   http://userscripts.org/scripts/source/125167.user.js
// @updateURL	   http://userscripts.org/scripts/source/125167.meta.js
// @version        1.0
// @icon           http://www.gamesofdesire.com/favicon.ico
// ==/UserScript==

function killAdEntries() {
	var main = document.getElementsByClassName("maincol");

	if (main.length != 1) {
		alert("Skript broken -- found " + main.length + " main columns, expected one.");
		return;
	}

	var cc = 0;
	var entries = main[0].childNodes;

	// node set is dynamic, so a simple 'for' loop won't work
	while (cc < entries.length) {
		var entry = entries[cc];

		// real entries are inside a <div>, kill everything else
		if (entry.nodeName != "DIV") {
			killElement(entry);
			continue;
		}


		// remaining entries may still be spam...
		var doKill = true;

		// keep navigation
		if (entry.className == "wp-pagenavi") {
			doKill = false;
		} else {
			// also keep entries that have tags (i.e. games)

			var tagsArr = entry.getElementsByClassName("postinfo");

			if (tagsArr.length == 1) {
				tags = tagsArr[0].textContent;
				doKill = false;

				// get rid of 'premium' shit
				if (tags.match(/premium/i)) {
					doKill = true;
				}

				// mark 'demo' entries
				if (tags.match(/demo/i)) {
					var txt = entry.getElementsByClassName("text");
					
					if (!txt || txt.length != 2 || txt[0].nodeName != "P") {
						alert("Skript broken -- something's wrong with 'text' for entry:\n\n" + entry.innerHTML);
						return;
					}
					
					txt[0].style.backgroundColor = "crimson";
					txt[0].style.color = "black";
				}
			} // end - if (tagsArr == 1)
		} // end - if (entry.className != "wp-pagenavi")

		if (doKill) {
			killElement(entry);
		} else {
			++cc; // look at next element in dynamic list
		}
	} // end - while
}


function killAdTitle() {
	var entry = document.getElementsByClassName("entry");

	if (entry.length != 1) {
		alert("Skript broken -- found " + entry.length + " entries, expected one.");
		return;
	}

	var cc = 0;
	var foundComment = false;
	var elems = document.getElementsByClassName("entry")[0].childNodes;
	
	while (cc < elems.length) {
		var elem = elems[cc];

		// keep everything up to the first comment
		if (!foundComment && elem.nodeName == "#comment") {
			foundComment = true;
		}

		// after that only keep the flash itself and comments
		if (foundComment && !(elem.id == "flash" || elem.className == "postinfo" || elem.className == "comments-template")) {
			killElement(elem);
		}
		else {
			// keep that element
			++cc;
		}
	} // end - while

	// also remove the flash preloader (iff it's there)
	var preloader = document.getElementById("preloader");

	if (preloader)
		killElement(preloader);
}


function killSidebarAds() {
	var sidebar = document.getElementsByClassName("sidebar");

	if (sidebar.length != 1) {
		alert("Skript broken -- found " + sidebar.length + " sidebars, expected one.");
		return;
	}

	// all ads seem to have class "c_align" - kill them
	var entries = sidebar[0].getElementsByClassName("c_align");

	while (entries.length) {
		var entry = entries[0];
		killElement(entry);
	}
}


function killFlash() {
	var swfDiv = document.getElementById("divFlashTeaser");

	if (!swfDiv) {
		alert("Skript broken -- no found flash ad found.");
		return;
	}

	killElement(swfDiv);
}


function killCounter() {
	var counterDiv = document.getElementById("counter");

	if (!counterDiv) {
		alert("Skript broken -- counter not found.");
		return;
	}

	killElement(counterDiv);
}




// helper
function killElement(ele) {
	if (ele) ele.parentNode.removeChild(ele);
}


// "main" (runs at time of "DOMContentLoaded" event)
try {
	killFlash();
	killCounter();
	killSidebarAds()

	// only pages for individual games have 'flash' div
	if (document.getElementById("flash")) {
		killAdTitle();
	}
	// only profile pages use 'avatar' class
	else if (document.getElementsByClassName("avatar").length) {
		// do nothing for profile pages
	}	else {
		// clean up overview pages
		killAdEntries();
	}
} catch (e) {alert("Error in GM skript:\n\n" + e.message);}
