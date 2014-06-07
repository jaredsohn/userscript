// ==UserScript==
// @name           Kanji.Koohii: Hide Number Reviewed
// @namespace      danielterhorst.com/hidereviewed
// @include        http://kanji.koohii.com/review/review.php?*
// ==/UserScript==

var reviewcounter = document.getElementById('reviewcounter');

if (reviewcounter) {
	reviewcounter.style.visibility = "hidden";
}