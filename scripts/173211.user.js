// ==UserScript==
// @name          WBB Bookmark
// @namespace     erosman
// @description   Adds User-defined Bookmarks to WBB InfoBar
// @updateURL     https://userscripts.org/scripts/source/173211.meta.js
// @downloadURL   https://userscripts.org/scripts/source/173211.user.js
// @include       http://www.warez-bb.org/*
// @grant         GM_registerMenuCommand
// @grant         GM_setValue
// @grant         GM_getValue
// @author        erosman
// @version       1.2
// ==/UserScript==



/* --------- Note ---------
  This script simply adds few user-defined Bookmarks to the InfoBar for quick access.
  You can use relative URLs like my example or full URLs

  Setting Bookmarks:
  Click on GreaseMoneky Icon
  User Scripts Commands...

      Set Bookmarks
      Input Bookmarks (title,url) separated by comma
      Example: title1,URL1,title2,URL2
      Forum Comments,viewforum.php?f=11,Movies,viewforum.php?f=4


  --------- History ---------

  1.2 Code Improvement
  1.1 Code Improvement, Added User Script Commands,
      script can now be auto-updated without losing User Data
  1.0 Initial release

*/


(function name() { // Anonymous function wrapper, used for error checking to end execution
'use strict';

if (window.self !== window.top) { return; } // end execution if in a frame

// setting User Preferences
function setUserPref(varName, defaultVal, menuText, promtText, separator){

  GM_registerMenuCommand(menuText, function() {
    var val = prompt(promtText, GM_getValue(varName, defaultVal));

    if (val === null)  { return; }  // end execution if clicked CANCEL

    // prepare string of variables separated by the separator
    if (separator){
      var pat1 = new RegExp('\\s*' + separator + '+\\s*', 'g');
      var pat2 = new RegExp('(?:^' + separator + '+|' + separator + '+$)', 'g');

      val =
      val.replace(pat1, separator)      // trim space/s around separator & trim repeated separator
         .replace(pat2, '');            // trim starting & trailing separator
    }

    val = val.replace(/\s{2,}/g, ' ').trim();    // remove multiple spaces and trim
    GM_setValue(varName, val);
    location.reload();                           // reload the page with the new changes
  });
}

// prepare UserPrefs
setUserPref(
'bookmarks',
'Forum Comments,viewforum.php?f=11',
'Set Bookmarks',
'Set Bookmarks (title,url) separated by comma\r\n\r\nExample:\r\ntitle1,URL1,title2,URL2',
','
);

var bookmarks = GM_getValue('bookmarks').split(',');
if (!bookmarks[0] || !bookmarks[1]) { return; } // end execution if not found

var div = document.getElementsByClassName('forum-rules');
if (!div[0]) { return; } // end execution if not found

// empty DocumentFragment object as a temporary container for the elements
var docfrag = document.createDocumentFragment();

// create a template
var span = document.createElement('span');
span.setAttribute('style', 'vertical-align: middle; margin-left: 10px;');
span.textContent = '\u2022 '; // same as &bull;
span.appendChild(document.createElement('a'));


for (var i = 0, len = bookmarks.length; i < len; i += 2) {

    var elem = span.cloneNode(true);
    elem.children[0].textContent = bookmarks[i];
    elem.children[0].href = bookmarks[i+1];
    docfrag.appendChild(elem);
}

if (!docfrag.textContent) { return; } // end execution if not found

div[0].appendChild(docfrag);

})(); // end of anonymous function