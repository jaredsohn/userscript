// Block Fark Comment Threads
// version 1.0
// 2009-03-27
// Copyright (c) 2009, Rick Conklin
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
// select "Block Fark Comment Threads", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name           Block Fark Comment Threads
// @namespace      http://www.fark.com
// @description    Prevent me from wasting time by viewing the fark discussion threads.
// @include        http://www.fark.com/*
// ==/UserScript==

function GM_jQuery_Test() {
   if (typeof unsafeWindow.jQuery == 'undefined') {
      // Add jQuery
      var GM_JQ = document.createElement('script');
      GM_JQ.src = 'http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js';
      GM_JQ.type = 'text/javascript';
      document.getElementsByTagName('head')[0].appendChild(GM_JQ);
   }
   GM_wait();
}
// Check if jQuery's loaded
function GM_wait() {
   if (typeof unsafeWindow.jQuery == 'undefined') {
      window.setTimeout(GM_wait,100);
   } else {
      $ = unsafeWindow.jQuery;
      JQ_Ready();
   }
}

// All your GM code must be inside this function
function JQ_Ready() {
   $('#headerTop').hide();
   $('#BoxSwaps').hide();
   $('#rightSideLeftMenubar').hide();
   $('#footer').hide();
   $('div.comlinkcount').hide();
   $('div.mainDate').hide();
   $('#bodyFarkives').hide();
   $('#bodyHeadlineContainer').animate({width:'100%'});

   $('div#bodyHeadlineContainer table tbody tr.headlineRow td:nth-child(4)').each(
      function(intIndex) {
         // The following line completely hides the links.
         $(this).hide();
         // The following code will prompt you before following the link.
         //$(this).bind('click', function() {
         //   if(confirm('Are you sure you really want to waste your time?')) {
         //      return true;
         //   } else {
         //      return false;
         //   };
         //});
      }
   );
}

GM_jQuery_Test();