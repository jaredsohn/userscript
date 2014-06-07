// ==UserScript==
// @name           Fix CAR Notes Height
// @namespace      NI CAR
// @version        1.1
// @date           2012-03-05
// @description    Fixes the height of the CAR notes section in Firefox 6+ and Chrome
// @include        http://*nippm*/itg/web/knta/crt/RequestDetail.jsp*
// ==/UserScript==

var noteFrame;

if( ! /firefox/i.test(navigator.userAgent) ) {
	window.addEventListener('scroll', GetNoteFrame, false);		// chrome calls user scripts before the IFrame is loaded so noteFrame == NULL. Basically I'm delaying the call by only doing it when the page is scrolled.
}
else {
	GetNoteFrame();
}

function GetNoteFrame() {
	noteFrame = document.getElementById('note');

	if (noteFrame != null) {
		FixFrameHeight();
		noteFrame.addEventListener('load', FixFrameHeight, false);	// will handle clicking on "Show All Notes" 
		window.removeEventListener('scroll', GetNoteFrame, false);	// don't call this on every scroll anymore
	}
}

function FixFrameHeight () {
    var frameHeight = noteFrame.contentDocument.body.offsetHeight;
    noteFrame.style.display = "block";
    noteFrame.height = frameHeight;
}