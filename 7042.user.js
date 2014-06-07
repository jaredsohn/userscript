// title: New Window Fixer
// version: 1.0
// created: 2006-01-09
// license: [url=GPL license]http://www.gnu.org/copyleft/gpl.html[/url]
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
//
// --------------------------------------------------------------------
//
//
//
// This script is simply a modified version of New Window Disabler, which 
// disables all new window opening links.
// If you don't want new windows to ever open, visit http://dogdoo.net and 
// install that script.
// 
//
// ==UserScript==
// @name          New Window Fixer
// @namespace     http://www.bobpaul.org/userScripts/
// @description   Removes href="javascript..." type links and links and replaces them with target=blank links so thatmiddle click can be used on such links, if desired. Minor modification to New Window Disabler from http://dogdoo.net.
// @include       *
// @exclude       *newegg.com*
// ==/UserScript==

(
   function () {
      // get all links on page
      var pglinks = document.links;
      // step throught the links one by one
      for (var i=0; i<pglinks.length; i++){
         // check to make sure it is a link, and not an anchor
         if (pglinks[i].href) {
            // kill the javascript links, suggestions welcome to improve this area
            if (pglinks[i].href.match(/^javascript/i) && !pglinks[i].href.match(/swapimage/i)) {
               pglinks[i].href = pglinks[i].href.replace(/^javascript.*?(http:\/\/[^'"]*).*/i,"$1");
               pglinks[i].href = pglinks[i].href.replace(/^javascript.*?['"]([^'"]*\.(html?|php.?|.sp|jp.?g|gif|png|ashx)[^'"]*?)['"].*/i,"$1");
	       pglinks[i].target = "_blank"
               }

            }
         }
      }
   )();