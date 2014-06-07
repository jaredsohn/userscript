// ==UserScript==
// @name          Troll Blocker 2
// @namespace     http://www.mittineague.com/dev/
// @description   blocks out annoying troll posts
// @include       http://massdems.blogspot.com/*
// ==/UserScript==

/*
 * Troll Blocker 2  -  trollblocker2.user.js version 1.1
 * Author: Mittineague <N/A> (N/A) http://www.mittineague.com
 *
 * Change Log
 * version 1.0 - Nov 11, 2006
 * version 1.1 - November 15, 2006	// added (function(){ [CODE] })();
 *				// changed event capture to bubble for Opera compatibility
 * 
 * script hosted at http://www.mittineague.com/dev/trollblocker2.user.js
 * and can be found at http://userscripts.org/scripts/show/6324
 *
 * This script was created specifically for the
 * Massachusetts Democratic Party
 * blogs at massdems.blogspot.com
 * With special thanks to "Anonymous"
 * for your encouragement
 *
 * The blogs use these DOM mark-ups
 * ........
 * <dt class="comment-data"                             |
 *   <a></a> // "name" anchor tag                       |
 *   text - "At"                                        |
 *   <a>Time and Date</a> // link to above anchor tag   |
 *   text - ","                                         |
 ******* Beginning of Variable DOM Section              |
 * VARIATION 1 : anonymous user comment                 |
 *   text - "Anonymous said..."                         | The dt
 * VARIATION 2 : non-registered user comment            | section is
 *   <span>                                             | replaced with a
 *      [USERS NAME HERE]                               | new dt saying
 *   </span>                                            | that it has
 *   text - " said..."                                  | been replaced
 * VARIATION 3 : registered user comment                |
 *   <a rel="nofollow">                                 |
 *     [USERS NAME HERE]                                |
 *   </a>                                               |
 *   text - " said..."                                  |
 ******* End of Variable DOM Section                    |	
 * </dt>                                                |_______________
 * <dd class="comment-body">                            | The dd section
 *   [CONTENT HERE]                                     | is replaced with
 * </dd>                                                | a new empty dd
 *
 * CURRENT SCRIPT ACTIONS
 * script replaces <dt> and <dd> (with it's contents) of known trolls with new <dt> <dd>
 * script inserts <span> after each user before closing </dt> tag on all posts
 * script replaces <dt> and <dd> (with it's contents) of newly blocked trolls with new <dt> <dd>
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


var dataItems, thisDataItem, userName, thisAttrs;
subNodes = new Array();
var newItems, thisNewItem;

  dataItems = document.evaluate(
    "//dt[@class='comment-data']",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);

  for (var i = 0; i < dataItems.snapshotLength; i++)
  {
  	thisDataItem = dataItems.snapshotItem(i);
	if(thisDataItem.innerHTML.search(/Anonymous/gi) != -1 )
	{
		userName = "Anonymous";
	}

	subNodes = thisDataItem.childNodes;
	for(var j = 0; j < subNodes.length; j++)
	{
		if(subNodes[j].nodeName == "SPAN")
		{
			userName = subNodes[j].innerHTML;
		}
		else if(subNodes[j].nodeName == "A")
		{
			thisAttrs = subNodes[j].attributes;
			for(var k = 0; k < thisAttrs.length; k++)
			{
				if(thisAttrs[k].value == "nofollow")
				{
					userName = subNodes[j].innerHTML;
				}
			}
		}
	}

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
    thisDataItem.appendChild(newSpan);

    /* hide known Trolls */
    for (var m = 0; m < knownTrolls.length; m++)
    {
    	if ( userName == knownTrolls[m] )
 	{
        	var newDT = document.createElement('dt');
        	var newDD = document.createElement('dd');
	        newDT.style.marginTop = "2em";
        	newDT.style.marginBottom = "2em";
	        newDT.style.color = "#f00";
        	var newText = document.createTextNode("All posts by " + knownTrolls[m] + " have been Blocked, to view posts by this person you must edit the trollblocker2.user.js file.");
	        newDT.appendChild(newText);
        	var atNode = thisDataItem; // DT
		var wsNode = atNode.nextSibling; // #text (whitespace)
	        var postNode = wsNode.nextSibling; // DD
   		atNode.parentNode.replaceChild(newDD, postNode);
		atNode.parentNode.replaceChild(newDT, atNode);
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
    var replacement = document.createElement('dt');
    var companion = document.createElement('dd');
    replacement.style.marginTop = "2em";
    replacement.style.marginBottom = "2em";
    replacement.style.color = "#f00";
    var newText = document.createTextNode("All posts by " + newName + " have been Blocked on this web page, to view posts by this person, you must Reload this web page.");
    replacement.appendChild(newText);
    var upperNode = thisNewItem.parentNode; // DT
    var textNode = upperNode.nextSibling; // #text (whitespace)
    var commentNode = textNode.nextSibling; // DD
    upperNode.parentNode.replaceChild(companion, commentNode);
    upperNode.parentNode.replaceChild(replacement, upperNode);
  }
}

})();