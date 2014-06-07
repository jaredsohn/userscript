// ==UserScript==
// @name			XKCD.com Day Keys
// @namespace		http://ryanland.com/greasemonkey/
// @description		Step through days' comics with the right/left arrow keys
// ==/UserScript==
//
// Thanks to Sam L at greasemonkey-users@googlegroups.com for
// his suggestion to use a custom MouseEvent to implement this.

// Create event of type "MouseEvents" to allow click simulation
var evt=document.createEvent("MouseEvents");
// attach event to Previous-Page button ("[ < ]")
var prevBtn=document.getElementById('rnd_btn_t').parentNode.previousSibling.previousSibling.children[0]
evt.initMouseEvent("click",false,true,null,1,1,1,1,1,false,false,false,false,0,prevBtn);
// attach event to Next-Page button ("[ > ]")
var nextBtn=document.getElementById('rnd_btn_t').parentNode.nextSibling.nextSibling.children[0]
evt.initMouseEvent("click",false,true,null,1,1,1,1,1,false,false,false,false,0,nextBtn);
// function maps key presses to button events
function nextPrev (event) {
	// user pressed <-- key
	if (event.keyCode==37 && document.querySelector(":focus") == null ) {
		prevBtn.dispatchEvent(evt)
	} else
	// user pressed --> key
	if ( event.keyCode==39 && document.querySelector(":focus") == null ) {
		nextBtn.dispatchEvent(evt)
	}
}

if (location.href.match(/xkcd.com/) == "xkcd.com") {
	// attach function to keyup event
	window.addEventListener('keyup',nextPrev,false);
}