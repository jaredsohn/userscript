// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "Google Books Accessible", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Google Books Accessible
// @description   Adds an "Accessible" link to switch to the accessible version of Google Books
// @include       http://books.google.com*/books?*pg=*
// ==/UserScript==

var is_accessible_url = /output=html_text/;

function GetAccessibleURL() {
   var a = GetAccessibleA();
   if (a)
      return a.href;
}

function GetAccessibleA() {
   var a = document.getElementsByTagName('A')[0];
   if (is_accessible_url.test(a.href))
      return a;
}

function MoveAccessibleDIV ( node, targetParent ) {
   var dropzone = document.getElementById('fullscreen_view');
   var accessible_a = GetAccessibleA();

   dropzone.insertBefore ( accessible_a, dropzone.firstChild );

   accessible_a.innerHTML = 'Accessible';
}

if (is_accessible_url.test(location.href) )
   return;


MoveAccessibleDIV();


