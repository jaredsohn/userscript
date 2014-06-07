// File encoding: UTF-8
//{
// Copyright (c) 2013, Ricardo Mendonça Ferreira (ric@mpcnet.com.br)
// Released under the GPL license - http://www.gnu.org/copyleft/gpl.html
// --------------------------------------------------------------------
// ==UserScript==
// @name          Blogger - find posted images
// @description   Filter images by filename when composing a post on Blogger / Blogspot
// @namespace     http://userscripts.org/scripts/show/185952
// @include       http://www.blogger.com/blogger.g*
// @include       https://www.blogger.com/blogger.g*
// @match         http://www.blogger.com/blogger.g*
// @match         https://www.blogger.com/blogger.g*
// @version       0.6
// ==/UserScript==
// --------------------------------------------------------------------
//
// To use this script, you need the Google Chrome browser, or 
// Firefox with the Greasemonkey add-on: http://www.greasespot.net/
// 
// --------------------------------------------------------------------
//
// History:
// --------
// 2014.04.14  0.6 - Google changed its code, I changed mine; search is case-insensitive
// 2014.01.17  0.5 - Google changed its code, I changed mine
// 2014.01.06  0.4 - Added "https" scheme to the include/match attributes of the script
// 2013.12.20  0.3 - Fixed a bug finding the images; added detection for different class name
// 2013.12.18  0.2 - Fixed detection of picker-image frame
// 2013.12.11  0.1 - 1st version - tested only on Google Chrome
//}

(function() {

   var my_id = '[Blogger - find posted images]';
   
   function setup() {
      var modal = false;
      for (var f=0; f < frames.length; f++) {
         try {
            if (frames[f].location.href.match("picker-image")) {
               modal = frames[f].document
               break;
            }
         }
         catch(err) {}
      }
      if (modal) {
         var cancel_btn     = modal.getElementById("picker:ap:3")
       //var from_this_blog = modal.getElementById(":5.label")
         //~ var images         = modal.getElementsByClassName("wd-zj-pe-zf")
         //~ if (!images || !images.length)
             //~ images         = modal.getElementsByClassName("wd-oj-pe-of")
       //var listBoxes      = modal.querySelectorAll("div[role=listbox]")
       //if (listBoxes && listBoxes.length > 1)
       //   var images = listBoxes[1].querySelectorAll("div[role=option]")
         var images = modal.querySelectorAll("div[role=gridcell]")
         if (!cancel_btn || !images || !images.length) {
            //if (!cancel_btn) console.log(my_id+' could not find cancel button!');
            //if (!images)     console.log(my_id+' could not find images!');
            return;
         }
         var label          = modal.createElement('span');
         var search_field   = modal.createElement('input');
         search_field.type  = "text";
         search_field.id    = "imgFilterByFilename";
         search_field.onkeyup = function() {
            var shown = 0;
            var l = images.length
            var fn;
            var filter = new RegExp(search_field.value, "i");
            for (var i=0; i < l; i++) {
               img = images[i];
               fn = img.getElementsByTagName("img")
               if (fn) {
                  fn = fn[0].src;
                  if (! filter || fn.match(filter))
                       { img.style.display=""; shown++ }
                  else { img.style.display="none";     }
               }
            }
            label.innerText=shown+"/"+l;
         }
         cancel_btn.parentNode.insertBefore(search_field, cancel_btn.nextSibling);
         search_field.parentNode.insertBefore(label, search_field.nextSibling);
         clearInterval(keep_trying);
         console.log(my_id+' was set up.');
      }
   }

   var keep_trying = setInterval(setup, 1000);

})()