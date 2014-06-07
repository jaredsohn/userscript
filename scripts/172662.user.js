// ==UserScript==
// @name          WBB Topic Highlight
// @namespace     erosman
// @description   Highlight Topics According to User Preference
// @updateURL     https://userscripts.org/scripts/source/172662.meta.js
// @downloadURL   https://userscripts.org/scripts/source/172662.user.js
// @include       http://www.warez-bb.org/viewforum.php?*
// @include       http://www.warez-bb.org/search.php?*
// @grant         none
// @author        erosman
// @version       1.5
// ==/UserScript==

/* --------- Note ---------
  This script highlights Topic Titles by color according to Keywords matches
  Search is case-insensitive and matches WHOLE words.

  Add your preferences under var list = {
  Keep a copy of it since it will be overwritten with updates
  Add them between "Start of user settings"  & "End of user settings"
  Few examples are added. The format is:
  'valid HTML Color' : 'list of keywords separated by comma ,',

  Personally, I prefer single quotes but you can also use double quotes
  "valid HTML Color" : "list of keywords separated by comma ,",

  The order is important. Script searches in the order the list is written.
  So if it finds a match in the first one, it won't check the next one.
  Therefore, order your list according to importance.
  So for example: Limitless (2011) 720p BluRay XVID

  If the order is like the following, it will show as BLUE
  'blue' : 'brrip,bluray,bdrip',
  'red' : 'r5,r6,cam,dvdscr,scr,ts,tsrip,telesync,xvid,divx',

  If the order is like the following, it will show as RED
  'red' : 'r5,r6,cam,dvdscr,scr,ts,tsrip,telesync,xvid,divx',
  'blue' : 'brrip,bluray,bdrip',

  At the moment, it is set to run on all forums & search
  If thee is no need to run on all forums:
  Go to Add-ons - User Scripts ('Ctrl+ Shift + a' on Firefox)
  Click on the Script's Option
  Under User Settings Tab, Add Included/Excluded Pages that you want the script to run on
  Click OK

  Guide to Color in HTML
  Colors can be added as HTML Named Colors, or hex values preceded by #, for example #000000 means black.
  There is also a shorthand version of it which is #000.
  Shorthand hex would duplicate each value, therefore #abc is the same as #aabbcc.
  XHTML requires the use of lowercase characters although both will be acceptable.
  Third method is to use RGB values.

  --------- History ---------

  1.5 Fixed the Search page with the new code
  1.4 Code improvement, Replaced Xpath
  1.3 Code improvement, New RegEx
  1.2 Code improvement
  1.1 New code without RegEx + user friendlier interface
  1.0 Initial release

*/


var list = {

/* ------ Start of user settings ------ */

'#aaa'    : 'r5,r6,cam,dvdscr,scr,ts,tsrip,telesync,xvid,divx',
'#ff4500' : 'unc,uncut,uncensored,unrated,rated,18+,+18',
'#008000' : 'dub,dual',
'#8000ff' : 'scOrp,sUN,roNy,ShAaNiG',
'#00f'    : 'brrip,bluray,bdrip',
'purple'  : 'mb,mkv',


/* ------ End of user settings ------ */
};

/* ------ Do not edit after this line ------ */


(function() { // anonymous function wrapper, used for error checking to end execution
'use strict';

if (window.self !== window.top) { return; } // end execution if in a frame

var lnks = document.URL.indexOf('search.php') !== -1 ?
            document.querySelectorAll('span.topictitle a') :
            document.querySelectorAll('a.topictitle');

if (!lnks[0]) { return; } // end execution if not found

for (var i = 0, len = lnks.length; i < len; i++) {

  var thisLink = lnks[i];
  var thisTest = thisLink.textContent;

  if (thisTest) {

    for (var n in list) {

      var rQuantifiers = /[-\/\\^$*+?.()|[\]{}]/g;
      var pat = new RegExp('\\b(?:' + list[n].replace(rQuantifiers, '\\$&').replace(/,/g, '|') + ')\\b', 'i');
      if (thisTest.match(pat)) {
        thisLink.style.color = n;
        break;
      }
    }
  }
}

})(); // end of anonymous function