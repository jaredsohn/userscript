// ==UserScript==
// @name         Outgoing Links Page Removal
// @namespace    http://greasemonkey.nabiki.org/
// @description  Removes outgoing links / "there's monsters on the Internet" page from the deviantart.com domain name.
// @include      http://*.deviantart.com/*
// @copyright    2009, Billy Arnold (http://www.nabiki.org/) (but there's not much that's copyrightable here)
// @license      GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html 

// ==/UserScript==

// based upon a broken program from   http://theshadowstorm.deviantart.com/
// unfixed for months

var links = document.getElementsByTagName('a');
for(var i = 0; i < links.length; ++i) {
	if(links[i].href.indexOf('http://www.deviantart.com/users/outgoing?') > -1) {
		links[i].setAttribute("href", links[i].href.replace('http://www.deviantart.com/users/outgoing?', ''));
	}
}

// The below is sub-optimal, I'd much rather alter the page everywhere,
// but my javascript/ajax/etc skills aren't up to where I could do it.
// The new slideshows load the components via ajax after the main page loads,
// and after greasemonkey has finished.  So
// I'll just update the outgoing page to auto forward.

// if URL= http://www.deviantart.com/users/outgoing?(.*)
// then reload to (.*)

if (window.location.pathname == '/users/outgoing') {
      window.location = window.location.search.substring(1);
}