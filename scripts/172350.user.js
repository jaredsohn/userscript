// ==UserScript==
// @name          WBB Find User Posts
// @namespace     erosman
// @description   Adds Find all Posts by the user next to their names
// @updateURL     https://userscripts.org/scripts/source/172350.meta.js
// @downloadURL   https://userscripts.org/scripts/source/172350.user.js
// @include       http://www.warez-bb.org/viewforum.php?*
// @include       http://www.warez-bb.org/search.php?*
// @include       http://www.warez-bb.org/privmsg.php?*
// @include       http://www.warez-bb.org/viewtopic.php?*
// @grant         none
// @author        erosman
// @version       1.3
// ==/UserScript==

/* --------- Note ---------
  This script adds an image next to user name with a link to user's posts
  "Find all Topics" was added in v1.3
  Script is tested on WBB3


  --------- History ---------

  1.3 Added "Find all Topics" to topic view
  1.2 Code improvement querySelectorAll
  1.1 Code Improvement
  1.0 Initial release

*/



(function name() { // anonymous function wrapper, used for error checking to end execution
'use strict';

if (window.self !== window.top) { return; } // end execution if in a frame

// add Find all Posts by the user
// find all posts: &showresults=posts
// find threads started: &search_fields=firstpost

switch (true) {

  case document.URL.indexOf('viewtopic.php') !== -1:
    
    // <div class="user-posts"><a href="./search.php?search_author_id=2908111">Posts: 3847</a></div>
    var lnks = document.querySelectorAll('div.user-posts a');
    if (!lnks[0]) { return; } // end execution if not found

    for (var i = 0, len = lnks.length; i < len; i++) {

      var div = lnks[i].parentNode;

      // clone parent div
      var newElement = div.cloneNode(true);
      newElement.children[0].href += '&search_fields=firstpost';
      newElement.children[0].textContent = 'Find all Topics';
      div.parentNode.insertBefore (newElement, div.nextSibling);
    }
    break;

  default:
    var lnks = document.querySelectorAll('a[href*="profile.php?mode=viewprofile&u="]');
    if (!lnks[0]) { return; } // end execution if not found

    for (var i = 0, len = lnks.length; i < len; i++) {

      var thisLink = lnks[i];
      var newElement = document.createElement('a');
      newElement.href = 'search.php?search_author_id=' + thisLink.href.match(/\d+/) + '&search_fields=firstpost';
      newElement.innerHTML = '&nbsp;<img src="http://img8.warez-bb.org/images/icon_newest_reply.gif" ' +
                              'class="imgspace" alt="" title="Find all Posts" height="6" width="12" />';
      thisLink.parentNode.insertBefore (newElement, thisLink.nextSibling);
    }
}

})(); // end of anonymous function