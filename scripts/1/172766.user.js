// ==UserScript==
// @name          USO Admin Menu
// @namespace     erosman
// @description   Adds Admin links to the Script Menu
// @updateURL     https://userscripts.org/scripts/source/172766.meta.js
// @downloadURL   https://userscripts.org/scripts/source/172766.user.js
// @include       http://userscripts.org/reviews/*
// @include       http://userscripts.org/scripts/*
// @include       http://userscripts.org/topics/*
// @include       https://userscripts.org/reviews/*
// @include       https://userscripts.org/scripts/*
// @include       https://userscripts.org/topics/*
// @grant         GM_addStyle
// @author        erosman
// @version       1.6
// ==/UserScript==

/* --------- Note ---------
  This script adds Admin links to the Script Menu.


  --------- History ---------

  1.6 Code Improvement, re: overflow: hidden;
  1.5 New Style with CSS Drop-down Menu
  1.4 Code Improvement, querySelector + Style Changes
  1.3.1 Added reviews pages
  1.3 Code & Style Improvements
  1.2 New code + New Style + Added topic pages + More Admin links
  1.1 Fixed the @updateURL & @downloadURL error
  1.0 Initial release

*/



(function name() { // anonymous function wrapper, used for error checking to end execution
'use strict';

if (window.self !== window.top) { return; } // end execution if in a frame


// check if user is Admin
var admin = document.querySelector('#script-nav a.admin[href*="/admin/"]');
if (!admin) { return; } // end execution if not found

// get the script's ID
var scriptID = admin.href.match(/\/(\d+)/);
if (!scriptID) { return; }  // end execution if not found

// CSS for the drop down menu
var css = ' \
#admin-li:hover ul { display: block; } \
#admin-li ul { display: none; position: relative; left: 0px; top: 0px; padding: 0; \
  margin-right: -70px; list-style: none; z-index: 100; box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.6); } \
#admin-li ul li { float: none; background-color: #f2f2f2; margin: 0; } \
#admin-li ul li a { display: block; color: #333; transition: all 0.4s ease-in-out 0s; } \
#admin-li ul li a:hover { color: #fff; background-color: #333; text-decoration: none !important; font-weight: bold; } \
';

GM_addStyle(css);


var ul = document.createElement('ul');
var li = admin.parentNode.cloneNode(true);
li.removeAttribute('class');
li.children[0].removeAttribute('class');


// define the new links to be added
var extra = {
  'Edit Metadata'          : '/scripts/edit/',
  'Edit Code'              : '/scripts/edit_src/',
  'Upload New Version'     : '/scripts/upload/',
  'Screenshots & Icon'     : '/scripts/images/',
}

// add the new links to the holder
for (var i in extra) {

  var elem = li.cloneNode(true);
  elem.children[0].href = extra[i] + scriptID[1];
  elem.children[0].textContent = i;
  ul.appendChild(elem);
}

if (document.URL.indexOf('/topics/') !== -1) {
 admin.parentNode.parentNode.parentNode.style.overflow = 'visible';
}
admin.parentNode.id = 'admin-li';
admin.textContent += ' \u25bc';
admin.parentNode.appendChild(ul);


})(); // end of anonymous function