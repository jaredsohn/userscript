// ==UserScript==
// @name	New York Times Kill Doubleclick Dictionary
// @namespace	http://www.earlh.com
// @description	Changes NYT article source to stop the doubleclick dictionary popup -- modifies code included in  altClickToSearch.js
// @include http://*.nytimes.com/*
// ==/UserScript==


/*
 * the NYT uses a file called altClickToSearch.js to add an event named
 * ActivateAnswers to the dblclick event listener
 *
 * this script removes the event
 *
 * NB: I am a math dev, not a web dev, so when you use unsafeWindow, you may allow the web site
 *     to read your user scripts.  I don't particularly care, you may... use this with care.
 *
 * Enjoy... nyt.script@earlh.com
 *
 */
 
 
 //the event
 var trigger = "dblclick";


/*
 * 1 - try to kill the event handler as soon as the script loads, though this may not work
 * given that it depends on load order
 *
 */
 if ( unsafeWindow.ActivateAnswers )
 	document.removeEventListener(trigger, unsafeWindow.ActivateAnswers, true); 	


/*
 * 2 - to be sure, wait until the page had loaded, then doublecheck the event is gone
 *
 */
window.addEventListener(
'load',
function(){
	var trigger = "dblclick";
	if ( unsafeWindow.ActivateAnswers )
		document.removeEventListener(trigger, unsafeWindow.ActivateAnswers, true);	
}, 
true);