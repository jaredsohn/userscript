// ==UserScript==
// @name           Google Footer Remover
// @namespace      http://www.google.com/ig
// @description    Removes footer from Google homepage (google.com/ig)
// @author  Alan Kelly
// @version 2.2
// @include        *google.com/ig*
// ==/UserScript==

if (document.getElementById("footer") != null) {
	document.getElementById("footer").style.display = 'none';
}
if (document.getElementById("footer_promos") != null) {
	document.getElementById("footer_promos").style.display = 'none';
}
if (document.getElementById("footerwrap") != null) {
	document.getElementById("footerwrap").style.display = 'none';
}