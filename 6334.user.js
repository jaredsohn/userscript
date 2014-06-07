// ==UserScript==
// @name          Troll Blocker 3
// @namespace     http://www.mittineague.com/dev/
// @description   blocks out annoying troll posts
// @include       http://blog01.kintera.com/christianalliance/*
// ==/UserScript==

/*
 * Troll Blocker 3  -  trollblocker3.user.js version 1.2
 * Author: Mittineague <N/A> (N/A) http://www.mittineague.com
 *
 * Change Log
 * version 1.0 - Nov 12, 2006
 * version 1.1 - Nov 13, 2006	// fixed so new spans are only added to comments
 * version 1.2 - November 15, 2006	// added (function(){ [CODE] })();
 *				// changed event capture to bubble for Opera compatibility
 * 
 * script hosted at http://www.mittineague.com/dev/trollblocker3.user.js
 * and can be found at http://userscripts.org/scripts/show/6334
 *
 * This script was created specifically for the
 * Christian Alliance for Progress
 * blogs at blog01.kintera.com/christianalliance/
 *
 * The blogs use this DOM mark-up
 * ........
 * <div>                                                |
 *   <p>                                                | The div section
 *     [CONTENT HERE]                                   | is replaced with
 *   </p>                                               | a new empty div
 * </div>                                               |_______________
 * <p class="posted">                                   |
 *   text - "Posted by:"                                | The p section
 *   <a>                                                | is replaced with
 *     [USER NAME]                                      | a new p saying
 *   </a>                                               | that it has
 *   text - "at Date and Time"                          | been replaced
 * </p>                                                 |
 *
 * CURRENT SCRIPT ACTIONS
 * script replaces <div> and <p> (with it's contents) of known trolls with new <div> <p>
 * script inserts <span> after each user before closing </p> tag on all posts
 * script replaces <div> and <p> (with it's contents) of newly blocked trolls with new <div> <p>
 *
 * Tired of seeing known troll posts on page load?
 * Add known trolls to array sequentially starting with "0"
 * Names are Case sensitive
 * ie. "mittineague" is not the same as "Mittineague", or "MITTINEAGUE"
 * knownTrolls = new Array();
 * knownTrolls[0] = "first known troll's name";
 * knownTrolls[1] = "second known troll's name";
 * knownTrolls[2] = "third known troll's name";
 * knownTrolls[3] = "fourth known troll's name";
 * etc. etc.
 */

(function(){

/* add known trolls beneath the following array as shown above
 * names added here will be filtered from all threads
 * names must be removed from array to see posts again
 */
knownTrolls = new Array();


var dataItems, thisDataItem, userName;
var newItems, thisNewItem;

  dataItems = document.evaluate(
    "//p[@class='posted']/a",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);

  for (var i = 0; i < dataItems.snapshotLength; i++)
  {
    thisDataItem = dataItems.snapshotItem(i);
    userName = thisDataItem.innerHTML;
/* Don't want to add "block this" to main post's time or comments links */
	if( (userName.search(/:/g) == -1 ) && (userName.search(/Comments /gi) == -1 ) )
	{

		var newSpan = document.createElement('span');
		var blockText = document.createTextNode(" - Troll??  Block " + userName);
		newSpan.appendChild(blockText);
		newSpan.style.color = "#811400";
		newSpan.style.textDecoration = "underline";
		newSpan.style.cursor = "pointer";
		newSpan.style.marginLeft = "2em";
		newSpan.setAttribute("posterName",userName);
		newSpan.addEventListener(
		"mouseover",
		function() {
		this.style.textDecoration = "none";
		},
		false);
		newSpan.addEventListener(
		"mouseout",
		function() {
		this.style.textDecoration = "underline";
		},
		false);
		newSpan.addEventListener(
		"click",
		function() {
		var newName = this.getAttribute("posterName");
		hideNewTroll(newName);
		},
		false);
		thisDataItem.parentNode.appendChild(newSpan);
	}

    /* hide known Trolls */
    for (var m = 0; m < knownTrolls.length; m++)
    {
    	if ( userName == knownTrolls[m] )
 	{
        	var newPara = document.createElement('p');
        	var newDiv = document.createElement('div');
	        newPara.style.marginTop = "2em";
        	newPara.style.marginBottom = "2em";
	        newPara.style.color = "#f00";
        	var newText = document.createTextNode("All posts by " + knownTrolls[m] + " have been Blocked, to view posts by this person you must edit the trollblocker3.user.js file.");
	        newPara.appendChild(newText);
        	var atNode = thisDataItem.parentNode; // P
		var wsNode = atNode.previousSibling; // #text (whitespace)
	        var postNode = wsNode.previousSibling; // Div
   		atNode.parentNode.replaceChild(newDiv, postNode);
		atNode.parentNode.replaceChild(newPara, atNode);
	}
    }
    userName = "";
}

function hideNewTroll(newName){

  newItems = document.evaluate(
  "//span[@posterName ='" + newName + "']",
  document,
  null,
  XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
  null);

  for (var n = 0; n < newItems.snapshotLength; n++) {
    thisNewItem = newItems.snapshotItem(n);
    var replacement = document.createElement('p');
    var companion = document.createElement('div');
    replacement.style.marginTop = "2em";
    replacement.style.marginBottom = "2em";
    replacement.style.color = "#f00";
    var newText = document.createTextNode("All posts by " + newName + " have been Blocked on this web page, to view posts by this person, you must Reload this web page.");
    replacement.appendChild(newText);
    var upperNode = thisNewItem.parentNode; // P
    var textNode = upperNode.previousSibling; // #text (whitespace)
    var commentNode = textNode.previousSibling; // Div
    upperNode.parentNode.replaceChild(companion, commentNode);
    upperNode.parentNode.replaceChild(replacement, upperNode);
  }
}

})();