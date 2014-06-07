// ==UserScript==
// @name           Gmail Multiple-Inbox Scroll fix
// @namespace      com.dwuser.nrohler
// @author         N Rohler
// @authorURL      http://www.dwuser.com/
// @description    Attempts to fix the bug with Gmail multiple-inboxes auto-scrolling.  If it resets the page position when you don't want it to, press and release the shift key and scroll as wanted (the shift press disables the fix for about 1 sec).
// @include        http*://mail.google.*/mail/*
// ==/UserScript==


// Change this threshold as needed to increase or decrease sensitivity.
var jumpThreshold = 350;


var lastScrollPosition = 0;

function handleScroll()
{	
	// Get the new scroll position and the delta
	var newScrollPosition = window.scrollY;
	var delta = newScrollPosition - lastScrollPosition;
	
	// If the delta is greater than the threshhold, this is probably an automatic-jump which took place due to gmail's bug.  Scroll back to the top.
	// Don't do anything if the ctrl key was pressed (which allows for overriding the fix)
	if (delta > jumpThreshold && !isCtrl)
	{
		//window.scrollY = lastScrollPosition;
		window.scroll(window.scrollX, lastScrollPosition);
	}
	else
	{
		// A legitimate scroll; update the tracker
		lastScrollPosition = newScrollPosition;
	}
}

window.addEventListener('scroll', handleScroll, false);
										  

var isCtrl = false; // actually using shift
var resetCtrlTimeout;

handleKeyUp = function(e)
{ 
	if (e.which == 16)  // was 17 for ctrl
	{
		window.clearTimeout(resetCtrlTimeout);
		// Modify the delay (1200) at the end of this line to add more 'shift-disable' time.
		resetCtrlTimeout = window.setTimeout(function(){ isCtrl = false; }, 1200);
		isCtrl = true; 
	}
} 

window.addEventListener('keyup', handleKeyUp, false);

// If you want to change the disable key handler, use this listener:
// window.addEventListener('keydown', handleKeyDown, false);