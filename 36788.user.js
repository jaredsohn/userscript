// ==UserScript==
// @name	TIBDRedirect
// @namespace	http://randomproductions.110mb.com/gmscripts/TIBDR/
// @description	Script that redirects painlessly from splash page of TI|BD website.
// @include	http://tibasicdev.wikidot.com/
// ==/UserScript==

if (window.location == "http://tibasicdev.wikidot.com/") {
	window.location="http://tibasicdev.wikidot.com/home";
}