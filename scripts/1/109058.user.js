// ==UserScript==
// @name           Lolsnaps.com - Move those darn navigation buttons to the top!
// @namespace      Lolsnaps.com - Move those darn navigation buttons to the top!
// @description    Puts the "Prev" and "Next" buttons on the top of the page.
// @include        http://lolsnaps.com/*
// ==/UserScript==

var always_on_screen = true; // true/false

// ---------------------------------------
// DO NOT EDIT BELOW THIS LINE -----------
// ---------------------------------------

var ran = 0;

function get(tag, cls, last) {
	var sel = null;
	var obj = document.getElementsByTagName(tag);
	if(obj && obj.length > 0) {
		for(var i=0; i<obj.length; i++) {
			if((obj[i].getAttribute("class")+"").indexOf(cls) > -1) {
				if(last == 1) {
					sel = obj[i];
				} else {
					return obj[i];
				}
			}
		}
	}
	return sel;
}

function func() {
	if(ran) {
		return null;
	}
	var ad = get("div", "right_div", 1);
	if(ad != null) {
		ad.style.display = "none";
	}
	var nav = get("div", "post_pagin");
	if(nav != null) {
		var cont = get("div", "post_cont");
		if(cont != null) {
			var share = get("div", "post_share");
			if(share != null) {
				share.style.display = "none";
			}
			cont.innerHTML = "<div style=\"" + (always_on_screen ? "position:fixed;top:inherit;left:inherit;" : "") + "\" class=\"" + nav.getAttribute("class") + "\">" + nav.innerHTML + "</div>" + cont.innerHTML;
			ran = 1;
		}
	}
}

if(document.addEventListener) {
	document.addEventListener("DOMContentLoaded", func, false);
} else {
	unsafeWindow.onload = function() {
		setTimeout(func, 250);
	}
}
