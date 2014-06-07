// DDUniverseSancho
// version 0.3 BETA!
// 2011-01-01
// Copyright (c) 2011, EniGMist4
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: https://addons.mozilla.org/en-US/firefox/addon/748
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "DDUniverseSancho", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          DDUniverseSancho
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// @namespace     http://userscripts.org/users/EniGMist4
// @description   DDUniverseSancho script for download all e2dk links in a topic
// @include       http://dduniverse.net/ita/viewtopic.php*
// @include       http://www.dduniverse.net/ita/viewtopic.php*
// ==/UserScript==


document.addEventListener('click', function(event) {
  if (event.target.name == 'sancho') {
    $('.postlink').each(function(index){
      if ($(this).text() != '') {
        var href= $(this).attr('href');
        setTimeout('top.document.location = "'+href+'"', 5000);
      }
    });
  }
}, true);

$('.gensmall').append(' <img name="sancho" style="cursor: pointer" src="http://www.pickled-onion.com/icons/sancho_0_9_31567.png" alt="Download all!"');