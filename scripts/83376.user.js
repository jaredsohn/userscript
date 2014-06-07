// ==UserScript==
// @name        Your right to right-click
// @description Right-click rights for Bloggplatsen.se, etc.
// @version     1.0.3
// @namespace   http://userscripts.org/users/204727
// @require     http://sizzlemctwizzle.com/updater.php?id=83376
// @include     http://*.bloggplatsen.se/*
// @include     http://*.bloggplatsen.se.nyud.net/*
// ==/UserScript==


//  Author:
//  sparhawk451@gmail.com
//
//  Credits:
//  This is heavily based on "Unblock Right-Click at Wretch" by CK.
//  Find this here:
//    http://userscripts.org/scripts/show/1580
//    http://userscripts.org/users/477
//
//  It is somewhat modified to work with the swedish blogging site
//  bloggplatsen.se that tries to block right-clicking.
//
//  It should work with many other sites as well, if added manually
//  in Greasemonkey.
//
//  FIGHT BACK!
//
//
//  Change log:
//  (the date format is yy-mm-dd)
//
//  Version 1.0.1 (2010-08-10)
//    * Added auto updater by sizzlemctwizzle, that should hopefully work.
//      See http://userscripts.org/guides/45 to be informed.
//
//  Version 1.0.2 (2010-08-12)
//    * Added support for the CoralCDN cache (add .nyud.net to the host name).
//
//  Version 1.0.3 (2010-08-14)
//    * Cosmetics.
//    * I am testing the auto updater by uploading this.


(function() {
  var Bloggplatsen = new Object();
  Bloggplatsen.unblockRightClick = function() {
    var bodyElm = document.getElementsByTagName('body')[0];
    bodyElm.setAttribute('onDragStart','');
    bodyElm.setAttribute('oncontextmenu','');
    bodyElm.setAttribute('onSelectStart','');
  }
  Bloggplatsen.unblockRightClick();
})();
