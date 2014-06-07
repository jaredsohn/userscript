// ==UserScript==
// @name           WikidotCleaner 0.1
// @description    Clean Wikidot websites of their advertisement material by hiding the upper and lower toolbars
// @include        http://*.wikidot.com/*
// @include http://*.scp-wiki.net/*
// ==/UserScript==


if (document.getElementById("navi-bar") != null) { // If there is an adverstisement top bar on the page

document.getElementById("navi-bar").style.display = "none";
document.getElementById("navi-bar-shadow").style.display = "none";
document.getElementById("footer-bar").style.display = "none";

// If the header menu bar is defined with a fixed position, then it is necessary to move it upwards
// if its position was fixed in order to be just below the advertisement bar
var HeaderStyle = window.getComputedStyle(document.getElementById("header"), null);
if (HeaderStyle.position == "fixed" && ((HeaderStyle.top == "24px") || (HeaderStyle.top == "25px")))
        document.getElementById("header").style.top = "0px";  

}