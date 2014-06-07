// ==UserScript==
// @name          WBB Host Tag
// @namespace     erosman
// @description   Alternative Host Tag display
// @updateURL     https://userscripts.org/scripts/source/392154.meta.js
// @downloadURL   https://userscripts.org/scripts/source/392154.user.js
// @include       http://www.warez-bb.org/viewforum.php?*
// @include       http://www.warez-bb.org/search.php?*
// @grant         GM_registerMenuCommand
// @grant         GM_setValue
// @grant         GM_getValue
// @author        erosman
// @version       1.1
// ==/UserScript==


/* --------- Note ---------
  This script moves the Host tags to the end of the topic title,
  or can make it dimmer OR can remove it completely.
  It works both on forum and search.

  Setting the Option:
  Click on GreaseMoneky Icon
  User Scripts Commands...

    Set WBB Host Tag Option:
    1 Move Host Tags to the End
    2 Dim Host Tags
    3 Remove Host Tags



  --------- History ---------


  1.1 Added User Selectable Options
  1.0 Initial release

*/



(function() { // anonymous function wrapper, used for error checking & limiting scope
'use strict';

if (window.self !== window.top) { return; } // end execution if in a frame


// setting User Preferences
function setUserPref(varName, defaultVal, menuText, promtText){

  GM_registerMenuCommand(menuText, function() {
    var val = prompt(promtText, GM_getValue(varName, defaultVal));

    if (val === null)  { return; }  // end execution if clicked CANCEL

    // prepare val
    val = val.replace(/\s{2,}/g, ' ').trim();    // remove multiple spaces and trim
    if (!/^[1-3]$/.test(val)) { return; }        // end execution if unacceptable
    GM_setValue(varName, val);
    location.reload();                           // reload the page with the new changes
  });
}

// prepare UserPrefs
setUserPref(
'option',
'1',
'Set WBB Host Tag Option',
'Set WBB Host Tag Option:\r\n\r\n1 Move Host Tags to the End\r\n2 Dim Host Tags\r\n3 Remove Host Tags'
);

var opt = GM_getValue('option') || 1;


var lnks = document.URL.indexOf('search.php') !== -1 ?
             document.querySelectorAll('span.topictitle a') :
             document.querySelectorAll('a.topictitle');

if (!lnks[0]) { return; } // end execution if not found

for (var i = 0, len = lnks.length; i < len; i++) {

  switch (opt) {

   case '1':
    lnks[i].textContent = lnks[i].textContent.replace(/^\[?([^\]]+)]\s*(.+)/, '$2 [$1]');
    break;

   case '2':
    lnks[i].innerHTML = lnks[i].innerHTML.replace(/^\[?([^\]]+)]\s*(.+)/, '<span style="color: #999;">[$1]</span> $2');
    break;

   case '3':
    lnks[i].textContent = lnks[i].textContent.replace(/^\[?([^\]]+)]\s*(.+)/, '$2');
    break;
  }
}

})(); // end of anonymous function