// ==UserScript==
// @name           Kanji.Koohii: Zen Review
// @namespace      danielterhorst.com/zenreview
// @include        http://kanji.koohii.com/review/review.php?*
// ==/UserScript==

var header = document.getElementById('header');
if (header) {
	header.style.display = "none";
}

var navbar = document.getElementById('navbar');
if (navbar) {
	navbar.style.display = "none";
}

var reviewstats = document.getElementById('reviewstats');
if (reviewstats) {
	reviewstats.parentNode.parentNode.style.visibility = "hidden";
}

var reviewcounter = document.getElementById('reviewcounter');
if (reviewcounter) {
	reviewcounter.style.visibility = "hidden";
}

var footer = document.getElementById('footer');
if (footer) {
	footer.style.display = "none";
}