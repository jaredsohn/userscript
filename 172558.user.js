// ==UserScript==
// @name          WBB User Blacklist
// @namespace     erosman
// @description   Removes Topics by Blacklisted Users on Forum View & Search on warez-bb.org
// @updateURL     https://userscripts.org/scripts/source/172558.meta.js
// @downloadURL   https://userscripts.org/scripts/source/172558.user.js
// @include       http://www.warez-bb.org/viewforum.php?*
// @include       http://www.warez-bb.org/search.php?*
// @grant         none
// @author        erosman
// @version       1.3
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

  --------- History ---------
  
  1.3 Code improvement
  1.2 Added Search pages
  1.1 Added Notification
  1.0 Initial release
  
*/


var userList = [

/* ------ Start of Add usernames ------ */

'user 1',
'user 2',
'user 3',



/* ------ End of Add usernames ------ */
];



/* ------ Do not edit after this line ------ */

'use strict';

(function name() { // Anonymous function wrapper, used for error checking to end execution

if (window.self !== window.top) { return; } // end execution if in a frame

var snapElements = document.evaluate(
    './/div [contains(concat(" ", normalize-space(@class), " "), " posts ")] ' +
    '//a [contains(@href,"profile.php?mode=viewprofile&u=")]',
    document.body, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

if (!snapElements.snapshotItem(0)) { return; }  // end execution

var badNumber = 0;

for (var i = 0, len = snapElements.snapshotLength; i < len; i++) {
  var thisUser = snapElements.snapshotItem(i).innerHTML; // get the username

  // check against userList --- for loop is much faster than indexof Array
  for (var n = 0, userLen = userList.length; n < userLen; n++) {
      
    if (thisUser === userList[n]) {
      // div class="list-rows" -| div class="topicrow" - div class="posts" - span - a
      snapElements.snapshotItem(i).parentNode.parentNode.parentNode.style.display = 'none';
      badNumber++;
      break;
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