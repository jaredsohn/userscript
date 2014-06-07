// ==UserScript==
// @name           Facebook Declutterer
// @namespace      ms609
//  @version       2.0 - Aug 2008.  Should work with "new look" facebook.  
// @version        0.1 Also removes Facebook flyers
// @version        1.0 Updated to remove new feed ads.
// @version        1.1 "Social" ads removed.
// @version        1.1b Pop-up notifications removed
// @version        1.2a More social ads removed (untested)
// @description    Removes some of the clutter from the Facebook homepage
// @include        http://*.facebook.com/*
// ==/UserScript==

if (document.getElementById("sidebar_ads")) document.getElementById("sidebar_ads").style.display="none";

if (window.location.href.match(/\/home\.php/)) {
	// We're on home page
	document.getElementById("new_stuff_non_content").style.display = "none";
	document.getElementById("new_stuff_content").style.display = "none";
	document.getElementById("pagefooter").style.display = "none";
}
if (document.getElementById("ssponsor")) document.getElementById("ssponsor").style.display="none";
var divs = document.getElementsByTagName("div");
var lastHeader = null;

for(var i=0; i<divs.length; i++) {
    className = divs[i].className;
	if (className == "feed_item clearfix social_ad" || className == "sidebar_item invitefriends" || className == "sidebar_item nextstep" || className.match(/ad_capsule/) || className == "feed_item clearfix" || className == "social_ad_main_anchor clearfix") divs[i].style.display = "none"; else anythingSinceLastHeader = true;
	if (className == "feed_date_header") {
       if (anythingSinceLastHeader && lastHeader) lastHeader.style.display = "none";
       lastHeader = divs[i];
       anythingSinceLastHeader = false;
    }
}
if (document.getElementById("rooster_container")) document.getElementById("rooster_container").style.display = "none";