// ==UserScript==
// @name          Replace thumbnails with images on gallery.aethereality.net
// @namespace     http://gallery.aethereality.net
// @description	  Loads full-size pics instead of thumbnails.
// @include       *displayimage*
// @include       *album*
// @include       *gal*
// @include       *pic*
// @include	  *gallery*
// ==/UserScript==

// Fixes an "feature"/annoyance in Coppermine and other photo gallery systems.  In such systems, you
// click on a thumbnail in a list of images to bring up the image page.  This page contains a reduced-
// size version of the picture.  You then have to click the picture to bring up the full-size version.
// This is a very nice feature for dialup users, but it's just plain annoying and adds an extra step
// for broadband users.  This userscript replaces the reduced version with the full one.
//   NOTE: If height and width params are set (like in some Coppermine setups), this script will still
// replace the image with the full-size version, but your browser will resize it.  Right-clicking and
// saving the pic will save the FULL size version, not the browser-reduced one you see.
// (If anybody knows how to remove height/width params in JS without setting them to 0, tell me.)

(function() {

  pics = document.getElementsByTagName("img");
  for (i=0; i < pics.length; i++) {
    var thisPic = pics[i];
    if ((thisPic.src.indexOf("/gallery/") == -1) || (thisPic.src.indexOf("thumb/thumb-") == -1)) {
      // skip if this pic isn't in an "albums" directory or doesn't have the "normal_" prefix
      // (requirement that "albums" be in the path disabled to make it work with more sites,
      //  re-enable it for more security against it breaking other pictures)
      continue;
    }

    var idx = thisPic.src.indexOf("thumb/thumb-");
    //if (thisPic.src.indexOf("/",idx) != -1)
    // skip if "normal_" was in the path, not the filename; added as extra protection
    // against breaking other pics since I disabled the "albums" requirement
    //continue;

    thisPic.src = thisPic.src.substr(0,idx)+thisPic.src.substr(idx+12);

    // Remove "normal_" from filename to display non-resized version
    // (for JS n00bs: Takes the substring from the start to just before the 'n' of "normal_"
    //  and the substring from just after the '_' and puts them together.)
    thisPic.alt = thisPic.title = "Right-click and 'Save Image As...' to save full-size version, click to view."
    // Change the tooltip
  }
 })();


