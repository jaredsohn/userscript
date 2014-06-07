// ==UserScript==
// @name          Del.icio.us Keyboard Shortcut
// @namespace     http://files.jnewland.com/
// @description   D. Works the same as the bookmarklet, just with no clicking required. Tested in Fluid / Greasekit only.
// @author        Jesse Newland
// @homepage      http://jnewland.com/
// @include       *
// ==/UserScript==


/*
* Code stolen from "Navigate anything like Bloglines" (http://userscripts.org/scripts/show/4886)
* and probably other scripts as well...
*/


var d = 'd'.charCodeAt(0);

document.addEventListener('keypress', keyHandler, true);

// Check that key pressed was keyCodeForPrev/Next without modifiers and that caret is not in a form element
function eventIsClean(e) {
    var targetTag = e.target.tagName;
    var keyCode = e.which;
    return !e.altKey && !e.ctrlKey && !e.metaKey &&
           targetTag != "TEXTAREA" &&
           targetTag != "INPUT" &&
           (keyCode == d);
}

// Handle the keys!
function keyHandler(e) {
 if (!eventIsClean(e)) return;

 var keyCode = e.which;

 //goto next photo page (no exception for last photo, yey!)
 if (keyCode == d) {
   window.location ='http://del.icio.us/post?v=4;url='+encodeURIComponent(window.location.href)+';title='+encodeURIComponent(document.title)
 }

}

