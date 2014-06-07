// ==UserScript==
// @name          Del.icio.us Bookmarklet Hotkey
// @namespace     http://files.jnewland.com/
// @description   Works the same as the bookmarklet,but with Hotkey(d)
// @author        NullPointer 
// @include       *
// ==/UserScript==


/*
* Code stolen from "Navigate anything like Bloglines" (http://userscripts.org/scripts/show/4886)
* and probably other scripts as well...
 add selection function
*/


var d = 'd'.charCodeAt(0);

document.addEventListener('keypress', keyHandler, true);

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
    window.location.href ='http://del.icio.us/post?v=4;url='+encodeURIComponent(window.location.href)+';title='+encodeURIComponent(document.title)+';notes='+encodeURIComponent(window.getSelection().toString());
 }

}

