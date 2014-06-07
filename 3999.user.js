// ==UserScript==
// @name          Troll Blocker
// @namespace     http://www.mittineague.com/dev/
// @description   blocks out annoying troll posts
// @include       http://giveemhellharry.com/*
// @include       http://www.giveemhellharry.com/*
// ==/UserScript==

/*
 * Troll Blocker  -  trollblocker.user.js version 2.1
 * Author: Mittineague <N/A> (N/A) http://www.mittineague.com
 *
 * Change Log
 * version 1.0 - May 2, 2006
 * version 1.1 - May 4, 2006 // minor changes to output text and comments
 * version 1.2 - May 10. 2006 // made script specific for only the giveemhellharry site
 * version 2.0 - Aug 30. 2006 // changed for blog's new DOM mark-up
 * version 2.1 - November 15, 2006	// added (function(){ [CODE] })();
 *				// changed event capture to bubble for Opera compatibility
 * 
 * script hosted at http://www.mittineague.com/dev/trollblocker.user.js
 * and can be found at http://userscripts.org/scripts/show/3999
 *
 * This script was created specifically for the
 * Give 'Em Hell Harry
 * blogs at www.giveemhellharry.com
 *
 * The - older - blogs use this DOM mark-up (FOR OLDER BLOG POSTS ONLY)
 * ........
 * <li id="#" style="margin-top:2em">			|
 *   [CONTENT HERE]					|
 *   <small>						|
 *     <a href="[users link here]" rel="nofollow">	|
 *     [USERS NAME HERE]				|  replaced
 *     </a>						|  portion
 *     <a href="#">					|  of post
 *     #						|
 *     </a>						|
 *   </small>						|
 * </li>						|
 *							
 * The blogs now use the following DOM mark-up. Replacement differs because "re" comments
 * are "threaded" (grouped in parent container) rather than "flat" (distinct containers) 
 * ........
 * <div class="comment">
 *   <div class="commenttitle">
 *     <a class="nolink" name="comment-Brs">Re: [post]</a>
 *     <div class="commentlink">
 *	 <a href="[link to post]">Reply</a>
 *     </div>        
 *   </div>
 *   <div class="commentauthor">
 *     By <a href="[user link here]">
 *     [USERS NAME HERE]
 *     </a>
 *     <span class="commentdate">[date here]</span>
 *   </div>
 *   <div class="commenttext">				|  replaced
 *     [CONTENT HERE]					|  portion
 *   </div>						|  of post
 * [May be other starting "comment" divs before this div's closing tag]
 * </div>
 *
 * THE FOLLOWING IS NOW "OBSOLETE" - only for older blog posts **
 * script replaces <li> (with it's contents) of known trolls with new <li>
 * script inserts <span> after each </small> on non-blocked posts
 * script replaces <li> (with it's contents) of newly blocked trolls with new <li>
 *
 * CURRENT SCRIPT ACTIONS
 * script replaces text <div> (with it's contents) of known trolls with new <div>
 * script inserts <span> after each user <a> link post time on all posts
 * script replaces text <div> (with it's contents) of newly blocked trolls with new <div>
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

/* BEGIN OLD BLOG FORMAT SCRIPT */
var listItems;

  listItems = document.evaluate(
    "//li/small/a[@rel='nofollow']",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);

  for (var i = 0; i < listItems.snapshotLength; i++) {
    thisListItem = listItems.snapshotItem(i);
    var newSpan = document.createElement('span');
    var blockText = document.createTextNode(" - Troll??  Block " + thisListItem.innerHTML);
    newSpan.appendChild(blockText);
    newSpan.style.color = "#811400";
    newSpan.style.textDecoration = "underline";
    newSpan.style.cursor = "pointer";
    newSpan.style.marginLeft = "2em";
    newSpan.setAttribute("posterName",thisListItem.innerHTML);
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
    thisListItem.parentNode.appendChild(newSpan);

    for (var j = 0; j < knownTrolls.length; j++) {
      if (thisListItem.innerHTML == knownTrolls[j]) {
        var newListItem = document.createElement('li');
        newListItem.style.marginTop = "2em";
        newListItem.style.color = "#f00";
        var newText = document.createTextNode("All posts by " + knownTrolls[j] + " have been Blocked, to view posts by this person you must edit the trollblocker.user.js file.");
        newListItem.appendChild(newText);
        var oneUpNode = thisListItem.parentNode;
        var twoUpNode = oneUpNode.parentNode;
        twoUpNode.parentNode.replaceChild(newListItem, twoUpNode);
      }
    }
  }

function hideNewTroll(newName){

  newItems = document.evaluate(
  "//li/small[a ='" + newName + "']",
  document,
  null,
  XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
  null);

  for (var k = 0; k < newItems.snapshotLength; k++) {
    thisNewItem = newItems.snapshotItem(k);
    var newListItem2 = document.createElement('li');
    newListItem2.style.marginTop = "2em";
    newListItem2.style.color = "#f00";
    var newText2 = document.createTextNode("All posts by " + newName + " have been Blocked on this web page, to view posts by this person, you must Reload this web page.");
    newListItem2.appendChild(newText2);
    var upperNode2 = thisNewItem.parentNode;
    upperNode2.parentNode.replaceChild(newListItem2, upperNode2);
  }
}
/* END OLD BLOG FORMAT SCRIPT */

/* BEGIN NEW BLOG FORMAT SCRIPT */
var divItems;

  divItems = document.evaluate(
    "//div[@class='commentauthor']/a",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);

  for (var i = 0; i < divItems.snapshotLength; i++) {
    thisDivItem = divItems.snapshotItem(i);
    var newSpan = document.createElement('span');
    var blockText = document.createTextNode(" - Troll??  Block " + thisDivItem.innerHTML);
    newSpan.appendChild(blockText);
    newSpan.style.color = "#811400";
    newSpan.style.textDecoration = "underline";
    newSpan.style.cursor = "pointer";
    newSpan.style.marginLeft = "2em";
    newSpan.setAttribute("posterName",thisDivItem.innerHTML);
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
    hideNewTrollRev(newName);
    },
    false);
    thisDivItem.parentNode.appendChild(newSpan);

    for (var j = 0; j < knownTrolls.length; j++) {
      if (thisDivItem.innerHTML == knownTrolls[j]) {
        var newDivItem = document.createElement('div');
        newDivItem.style.marginTop = "1em";
        newDivItem.style.marginBottom = "1em";
        newDivItem.style.color = "#f00";
        var newText = document.createTextNode("All posts by " + knownTrolls[j] + " have been Blocked, to view posts by this person you must edit the trollblocker.user.js file.");
        newDivItem.appendChild(newText);
        var authorDiv = thisDivItem.parentNode;
        var commentDiv = authorDiv.parentNode;
        var commentTextNode = authorDiv.nextSibling;
        commentDiv.replaceChild(newDivItem, commentTextNode.nextSibling);
      }
    }
  }

function hideNewTrollRev(newName){

  newItems = document.evaluate(
  "//div[a ='" + newName + "']",
  document,
  null,
  XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
  null);

  for (var k = 0; k < newItems.snapshotLength; k++) {
    thisNewItem = newItems.snapshotItem(k);
    var newDivItem2 = document.createElement('div');
    newDivItem2.style.marginTop = "1em";
    newDivItem2.style.marginBottom = "1em";
    newDivItem2.style.color = "#f00";
    var newDivText2 = document.createTextNode("All posts by " + newName + " have been Blocked on this web page, to view posts by this person, you must Reload this web page.");
    newDivItem2.appendChild(newDivText2);
    var upperNode2 = thisNewItem.parentNode;
    var textSpace = thisNewItem.nextSibling;
    upperNode2.replaceChild(newDivItem2, textSpace.nextSibling);
  }
}
/* END NEW BLOG FORMAT SCRIPT */

})();