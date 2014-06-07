// ==UserScript== 
// @name	 Motherless: show thumbnail titles
// @namespace	http://motherless.com/m/aberrantsatyr
// @description	Add titles to Motherless thumbnails for videos, images, and galleries.  Does not work on pages that show the full images & videos where the small thumbnails are loaded once you scroll down (yet).
// @include	 http://*motherless.com/*
// @grant none
// @require http://ajax.googleapis.com/ajax/libs/jquery/1.10.1/jquery.min.js
// ==/UserScript==


(function() {

$.noConflict() 

jQuery("div.thumb").each(function(i,e){ 
  var title = jQuery(e).attr("title");
  console.log("Found a thumb: " +title);
  jQuery('<div/>', {
    class: 'ellipsis gold',
    text: title
  }).prependTo(jQuery(e));
}); 
 
}());