// ==UserScript==
// @name          TP User Highlight
// @namespace     erosman
// @description   Highlights Topics by listed Users on Forum View & Search on tehparadox.com
// @updateURL     https://userscripts.org/scripts/source/172574.meta.js
// @downloadURL   https://userscripts.org/scripts/source/172574.user.js
// @include       http://tehparadox.com/forum/f*
// @include       http://tehparadox.com/forum/search.php?*
// @include       http://www.tehparadox.com/forum/f*
// @include       http://www.tehparadox.com/forum/search.php?*
// @grant         none
// @author        erosman
// @version       1.2
// ==/UserScript==


/* --------- Note ---------

  Add usernames "exactly" as they are, under var userList = [
  Add them between "Start of Add usernames"  & "End of Add usernames"
  Few examples are added. Entries can be placed on 1 line or many lines
  Example:
  'user 1',
  'user 2',
  'user 3',

  Or:
  'user 1', 'user 2', 'user 3',
  
  Or:
  'user 1', 'user 2', 'user 3', 'user 4', 'user 5', 'user 6',
  'user 7', 'user 8', 'user 9', 'user 10', 'user 11', 'user 12',
  'user 13', 'user 14',
  
  Personally, I prefer single quotes but you can also use double quotes
  "user 1", "user 2", "user 3",
  
  Guide to Color in HTML
  Colors can be added as HTML Named Colors, or hex values preceded by #, for example #000000 means black. 
  There is also a shorthand version of it which is #000. 
  Shorthand hex would duplicate each value, therefore #abc is the same as #aabbcc. 
  XHTML requires the use of lowercase characters although both will be acceptable. 
  Third method is to use RGB values.

  --------- History ---------
  
  
  1.2 Code Improvement
  1.1 Code Improvement
  1.0 Initial release
  
*/


var userList = [

/* ------ Start of Add usernames ------ */

'user 1',
'user 2',
'user 3',



/* ------ End of Add usernames ------ */
];

var highlightColor = '#ffdead';    // you can change this value to any valid HTML color


/* ------ Do not edit after this line ------ */

'use strict';

(function name() { // Anonymous function wrapper, used for error checking to end execution

if (window.self !== window.top) { return; } // end execution if in a frame

var snapElements = document.evaluate(
    './/td [contains(@id,"td_threadtitle_")] //span [contains(@onclick,"members/u")]',
    document.body, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

if (!snapElements.snapshotItem(0)) { return; }  // end execution

for (var i = 0, len = snapElements.snapshotLength; i < len; i++) {
  var thisUser = snapElements.snapshotItem(i).innerHTML; // get the username

  // check against userList --- for loop is much faster than indexof Array
  for (var n = 0, userLen = userList.length; n < userLen; n++) {
      
    if (thisUser === userList[n]) {
      // tr - td id="td_threadtitle_*****" - div class="smallfont"  - span
      var thisParent = snapElements.snapshotItem(i).parentNode.parentNode.parentNode;
      for (var n = 0, plen = thisParent.children.length; n < plen; n++) {
        thisParent.children[n].style.backgroundColor = highlightColor;
      }
      break;
    }
  }
}


})(); // end of anonymous function
