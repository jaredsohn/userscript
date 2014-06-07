/*
    Rewrite M90 Images to point directly
    at the images.
    Jerimiah Frum, jerimiahf@hotmail.com

*/

// ==UserScript==
// @name          M90 Image Relinker
// @namespace     http://www.repipeline.com/m90.user.js
// @description	  Rewrites M90 Image links to point straight to the pictures
// @include       http://www.m90.org/*
// ==/UserScript==

(function() {
  links = document.getElementsByTagName('A');
  for (i=0; i<links.length; i++) {
    link = links[i];
    if (link.href.match("view_image.php")) {
      link.href = link.href.replace('/view','/show') + '&medium';
    }
  }
})();
