// NoPutin user script
// version 0.1 BETA!
// 2007-11-07 (sic!)
// Copyright (c) 2007, dimrub
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
// select "NoPutin", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          NoPutin
// @description   A script that hides LJ userpics with Mr. Putin's face
// @include       http://*.livejournal.com/*
// ==/UserScript==

// This code was written by Tyler Akins and has been placed in the
// public domain.  It would be nice if you left this header intact.
// Base64 code from Tyler Akins -- http://rumkin.com

var keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";

function encode64(input) {
   var output = "";
   var chr1, chr2, chr3;
   var enc1, enc2, enc3, enc4;
   var i = 0;

   do {
      chr1 = input.charCodeAt(i++);
      chr2 = input.charCodeAt(i++);
      chr3 = input.charCodeAt(i++);

      enc1 = chr1 >> 2;
      enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
      enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
      enc4 = chr3 & 63;

      if (isNaN(chr2)) {
         enc3 = enc4 = 64;
      } else if (isNaN(chr3)) {
         enc4 = 64;
      }

      output = output + keyStr.charAt(enc1) + keyStr.charAt(enc2) + 
         keyStr.charAt(enc3) + keyStr.charAt(enc4);
   } while (i < input.length);
   
   return output;
}


var ref_image_enc = "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";

var all_imgs, this_img;
all_imgs = document.getElementsByTagName('img');

function Callback(tag)
{
    this.tag = tag;
    this.func = function(details) {
          img_data = details.responseText;
          img_data_enc = encode64(img_data);
          if (img_data_enc.substr(0, 1000) == ref_image_enc.substr(0, 1000)) {
              alt = document.createTextNode(tag.alt);
              tag.parentNode.replaceChild(alt, tag);
          }
    }
}

for (var i = 0; i < all_imgs.length; i++) {
    this_img_tag = all_imgs[i];
    var url = this_img_tag.src;
    cb = new Callback(this_img_tag);
    if (/userpic.livejournal.com/.test(url)) {
        GM_xmlhttpRequest({
          method:"GET",
          url: url,
          headers:{
              "User-Agent": "monkeyagent",
              "Accept":"image/*",
          },
          onload: cb.func
        });
    }
}


