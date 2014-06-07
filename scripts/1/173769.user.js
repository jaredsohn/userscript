// ==UserScript==
// @name          USO Menu
// @namespace     erosman
// @description   Adds More Links to the Top Menu
// @updateURL     https://userscripts.org/scripts/source/173769.meta.js
// @downloadURL   https://userscripts.org/scripts/source/173769.user.js
// @include       http://userscripts.org/*
// @include       https://userscripts.org/*
// @grant         GM_addStyle
// @author        erosman
// @version       1.2
// ==/UserScript==

/* --------- Note ---------
  This script adds more links to the Top Menu
  Inspired by the idea of "USO Links" by Tim Smart
  http://userscripts.org/scripts/show/105289


  --------- History ---------

  1.2 New Style with CSS Drop-down Menu
  1.1 Code Improvement, querySelector
  1.0 Initial release

*/



(function() { // anonymous function wrapper, used for error checking to end execution
'use strict'; // ECMAScript-5

if (frameElement) { return; } // end execution if in a frame, object or other embedding points

// check if logged in
var logout = document.querySelector('#top a[href="/logout"]');
if (!logout) { return; } // end execution if not found


// CSS for the drop down menu
var css = ' \
#home-li:hover ul { display: block; } \
#home-li ul { display: none; position: relative; left: 0px; top: 0px; padding: 0; \
  margin-right: -4em; list-style: none; z-index: 100; box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.6); } \
#home-li ul li { float: none !important; margin: 0 !important; font-size: 0.9em !important;} \
#home-li ul li a { color: #fff !important; background-color: #ff8800; display: block; \
  padding: 0 0.5em; transition: all 0.4s ease-in-out 0s; } \
#home-li ul li a:hover { color: #333 !important; background-color: #eee; text-decoration: none !important; } \
';

GM_addStyle(css);


var ul = document.createElement('ul');
var li = logout.parentNode.cloneNode(true);
li.removeAttribute('class');
li.children[0].removeAttribute('class');


// define the new links to be added
var extra = {
  'New Script'     : '/scripts/new',
  'Manage Scripts' : '/home/scripts',
  'Favorites'      : '/home/favorites',
  'Comments'       : '/home/comments',
  'Topics'         : '/home/posts',
  'Settings'       : '/home/settings',
}

// add the new links to the holder
for (var i in extra) {

  var elem = li.cloneNode(true);
  elem.children[0].href = extra[i];
  elem.children[0].textContent = i;
  ul.appendChild(elem);
}

var user = logout.parentNode.parentNode.children[1];
user.id = 'home-li';
user.parentNode.parentNode.style.overflow = 'visible';
user.children[0].textContent += ' \u25bc';
user.appendChild(ul);


})(); // end of anonymous function