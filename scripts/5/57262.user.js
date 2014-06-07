// ==UserScript==
// @name           Google Kill Click-Tracking
// @namespace      http://www.clipland.com/
// @description    Removes Google's hidden Javascript click-track mechanism on search results pages
// @include        http://www.google.tld/*
// ==/UserScript==


if( document.URL.match(/\/#/) ){
	// google sometimes serves the results pages in an js filled iframe... very spoky!
	// (seems to be part of their effort to block scripts/robots accessing google (most of them don't execute js...)
	// in this version (and until someone supplies a patch - I coudn't figure it out), we can't filter on these, the mechanism/iframe-js-html-traffic seems to be hidden to Greasemonkey
	return;
}

// brute force attempt to block any depper js event handlers
// it doesn't seem to interfere with ads on the pages (which is desired functionality, as we won't like to break the ToS)
var s = document.getElementsByTagName("SCRIPT");
for(var i=0;i<s.length;i++){
	s[i].innerHTML = ''
}

// loop over results links
var a = document.getElementsByTagName("H3");

for(var i=0;i<a.length;i++){
	// simply nullifying the event-handler does not work in Greasemonkey, also not when running the script as compiled/installed xpi!
	// see: http://groups.google.com/group/greasemonkey-users/browse_thread/thread/3c37e0e9c87fb00f/308db589b9bcc29e
	// that's why we now loop over h3's and alter the html

	var html = a[i].innerHTML
	if( html.match(/\/url\?q=/) ){
		// when google fills in related/alternative spelling results, it adds the /url? redir directly into the href of the link
		html = html.replace(/\/url\?q=/,'')
		html = html.replace(/\&amp;ei=([^"]+)/,'')
		html += ' <small style="color: #0a0; font-size: 18px;">&#9679;</small>'
		a[i].innerHTML = html
	}else{
		// standard results pages do links tracking via registering an onmousedown event
		//  class="l" clicktrackremoved="return rwt(this,'','','res','21','AFQjCNE8u06UohvLMDmIkjuE1vm',''
		html = html.replace(/ onmousedown=/,' ClickTrackRemoved=')
		html += ' <small style="color: #0a0; font-size: 18px;">&#9679;</small>'
		a[i].innerHTML = html
	}
}