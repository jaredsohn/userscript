// Kill textarea onfocus=select()
//
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
// @name          Kill textarea onfocus=select()
// @namespace     http://klopp.net.ru
// @description   created for fotki.yandex.ru, but can be used everywhere
// @include       http://fotki.yandex.ru/*

// ==/UserScript==

(function() 
{
  var ta = document.getElementsByTagName('textarea');
  for (var i = 0; i < ta.length; i++) 
  {
  	ta[i].setAttribute('onfocus', undefined);  	
  }
})();
