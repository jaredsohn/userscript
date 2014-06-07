//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.  To install it, you need
// Greasemonkey 0.6.6 or later: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/GreaseMonkey/Manage User Scripts,
// select this script, and click Uninstall.
//
// ==UserScript==
// @name          Wordpress.com Stumble Within Blog
// @namespace     http://engtech.wordpress.com
// @description   If logged in to wordpress.com, give an option to stumble
//                within a Wordpress.com blog.
// @include       http://*

// ==/UserScript==

// ==RevisionHistory==
// Version 0.1:
// Released: 2007-04-24.
// Initial release.
// ==/RevisionHistory==

(function () {
  var divs = document.getElementsByTagName('div');
  if (divs[0].id == "wpcombar") {
    var lis = divs[0].getElementsByTagName('li');
    var insert_at = lis[lis.length-1];
    var random = document.createElement('li');
    random.innerHTML = '<a title="Stumble to a post at random" href="'+location.protocol+'//'+location.host+'/?random">Random Post</a>';
    insert_at.parentNode.insertBefore(random, insert_at);

  }
})();
