// --------------------------------------------------------------------
// Remove ping attribute on anchor
// version 0.1
// by: Karl Hansen
// Jan 19, 2006
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
// select "fixAnchorPing", and click Uninstall.
//
// --------------------------------------------------------------------
//
// WHAT IT DOES:
// Changes the value of the ping attribute of an HTML anchor to ''.
// More info at http://whatwg.org/specs/web-apps/current-work/#ping
// --------------------------------------------------------------------
//
// Remove ping attribute on anchor
// ==UserScript==
// @name           fixAnchorPing
// @namespace      http://D5140619:8080/
// @description    Clear the ping attribute on an HTML anchor
// @include        *
// ==/UserScript==

(function() {
       //replace ping attribute value with ''
       var x = 0;
       var isReplaced = false;
       var tags = document.getElementsByTagName("a");
       var numofAnchorTags = tags.length;
   //alert('Found ' + numofAnchorTags  + ' anchor tags');
       while(x < numofAnchorTags) {
               //alert('Dealing with an anchor');
           try {
               var thisTag = tags[x];
               if (!thisTag) { break; }

               var valPing = thisTag.getAttribute("ping");
               //alert('  attribute = ' + valPing);
               if (valPing) {
                       //alert('okay to replace ping');
                               thisTag.setAttribute('ping', '');
                               isReplaced = true;
                               valPing = thisTag.getAttribute("ping");
               } else {
                       //alert('this one is safe');
               }
               if (isReplaced) {
                               //alert('ping is replaced: ' + valPing);
                   numofAnchorTags--; //       one less ping
               } else {
                   x++;        //      checked another anchor
               }
               //alert('done with isReplaced');
           }
           catch(e) {
               alert(""
                       + "err in #" + x + ": " + thisTag.id
                       + "\n" + e.Description
               );
               x++;
           }
       }
})
();

