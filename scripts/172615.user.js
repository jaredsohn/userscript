// ==UserScript==
// @name          WBB User Filter
// @namespace     erosman
// @description   Combined Highlight & Remove Topics by listed Users on Forum View & Search on warez-bb.org
// @updateURL     https://userscripts.org/scripts/source/172615.meta.js
// @downloadURL   https://userscripts.org/scripts/source/172615.user.js
// @include       http://www.warez-bb.org/viewforum.php?*
// @include       http://www.warez-bb.org/search.php?*
// @grant         none
// @author        erosman
// @version       1.1
// ==/UserScript==


/* --------- Note ---------

  Add usernames "exactly" as they are, under var highlight = [ ... AND/OR ...  var blacklist = [
  Add them between "Start of *** usernames"  & "End of *** usernames"
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
  
  1.1 Code improvement
  1.0 Initial release
  
*/


var highlight = [

/* ------ Start of Highlight usernames ------ */

'user 1',
'user 2',
'user 3',



/* ------ End of Highlight usernames ------ */
];


var blacklist = [

/* ------ Start of Blacklist usernames ------ */

'user 1',
'user 2',
'user 3',



/* ------ End of Blacklist usernames ------ */
];


var highlightColor = '#ffdead';    // you can change this value to any valid HTML color


/* ------ Do not edit after this line ------ */

'use strict';

(function name() { // Anonymous function wrapper, used for error checking to end execution

if (window.self !== window.top) { return; } // end execution if in a frame

var badNumber = 0;

var snapElements = document.evaluate(
    './/div [contains(concat(" ", normalize-space(@class), " "), " posts ")] ' +
    '//a [contains(@href,"profile.php?mode=viewprofile&u=")]',
    document.body, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

if (!snapElements.snapshotItem(0)) { return; }  // end execution

for (var i = 0, len = snapElements.snapshotLength; i < len; i++) {
  var thisUser = snapElements.snapshotItem(i).innerHTML; // get the username
  var found =  false;
  
  // check against highlight --- for loop is much faster than indexof Array
  for (var n = 0, userLen = highlight.length; n < userLen; n++) {
    
    if (thisUser === highlight[n]) {
      // div class="list-rows" -| div class="topicrow" - div class="posts" - span - a    
      var thisParent = snapElements.snapshotItem(i).parentNode.parentNode.parentNode;
      for (var n = 0, plen = thisParent.children.length; n < plen; n++) {
        thisParent.children[n].style.backgroundColor = highlightColor;
      }
      found = true;
      break;
    }
  }
  
  if (!found) {
  // check against blacklist --- for loop is much faster than indexof Array
    for (var n = 0, userLen = blacklist.length; n < userLen; n++) {
        
      if (thisUser === blacklist[n]) {
        // div class="list-rows" -| div class="topicrow" - div class="posts" - span - a
        snapElements.snapshotItem(i).parentNode.parentNode.parentNode.style.display = 'none';
        badNumber++;
        break;
      }
    }
  }

}

// notification
if (badNumber) {
  var thisNotify = document.createElement('div');
  thisNotify.setAttribute('style', 
          'color: #fff; text-align: center; font-style: normal; font-size: small; padding: 5px; ' +
          'background-color: #8b0000; position: fixed; left: 0px; top: 0px; width: 100%; z-index: 101;');
  
  thisNotify.innerHTML += 
        '<span style="vertical-align: middle;"><b>WBB User Blacklist</b> has removed ' + 
        badNumber + (badNumber > 1 ? ' topics' : ' topic') + '</span>';

  var thisClick = document.createElement('span');
  thisClick.setAttribute('style', 
          'margin-right: 10px; padding: 2px 4px; border: 1px solid #fff; float: right; cursor: pointer;');
  thisClick.innerHTML = '<b>X</b>';
  thisClick.setAttribute('title','Click to Close');
  thisClick.setAttribute('onclick', 'this.parentNode.style.display = "none";');
  thisNotify.appendChild(thisClick);
  
  document.body.insertBefore(thisNotify, document.body.firstChild);
}

})(); // end of anonymous function