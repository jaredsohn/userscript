// ==UserScript==
// @name          IMDB Bigger Thumbnails
// @namespace     erosman
// @description   Bigger Thumbnail Images
// @updateURL     https://userscripts.org/scripts/source/168201.meta.js
// @downloadURL   https://userscripts.org/scripts/source/168201.user.js
// @include       http://*.imdb.com/*
// @include       https://*.imdb.com/*
// @grant         none
// @author        erosman
// @version       1.11
// @note
// ==/UserScript==


/* --------- Note ---------
  This script removes all Loadlate from images on IMDb if JavaScript is disabled on IMDb
  Large thumbnails on: Title Page, Cast and Crew Page, Chart (US Box Office), Find



  --------- History ---------

  1.11 Remove all Loadlate on all IMDb pages + Code Improvement
  1.10 Code Improvement
  1.9 Code Improvement querySelectorAll
  1.8 Fixed for New IMDB Chart layout 2013-12-21 + Code Improvements
  1.7 More Optimisation + added 'use strict' + switch pattern
  1.6.1 Minor changes in include pattern
  1.6 New match pattern + Added search/find page
  1.5 Code Improvements + Added image parsing of STARmeter Top 10 & MOVIEmeter Top 10
  1.4 'match http*://' was matching unintended pages for some reason!??..changed it to 'include'
      + removed 'onclick removal' as it was not necessary for this script, will post it as a separate script
  1.3 Removed the https matching for IMDB
  1.2 Allow for https + onclick removal;
  1.1 Stricter match + minor improvements to the code
  1.0 Initial release

*/



(function() { // anonymous function wrapper, used for error checking to end execution
'use strict';

if (window.self !== window.top) { return; } // end execution if in a frame

// remove loadlate so images show if JavaScript is disabled
removeLoadlate();

var newWidth = 48;  // this is the new width of the thumbs

var path = location.pathname;

switch (true) {

  case path.indexOf('title') !== -1:
  case path.indexOf('fullcredits') !== -1:
  case path.indexOf('find') !== -1:
    var img = document.querySelectorAll('td.primary_photo a img');
    break;

  case path.indexOf('chart') !== -1:
    var img = document.querySelectorAll('td.posterColumn a img');
    break;
}

if (img[0]) {  makeBigger(); }


function removeLoadlate() {

  var elem = document.querySelectorAll('img[loadlate]');
  for (var i = 0, len = elem.length; i < len; i++) {

    // set the value of loadlate to src
    elem[i].src = elem[i].getAttribute('loadlate');
    elem[i].removeAttribute('loadlate');
    elem[i].removeAttribute('class');
  }
}


function makeBigger() {

  for (var i = 0, len = img.length; i < len; i++) {

    // change thumb to a larger thumb
     var n = img[i].src.lastIndexOf('._V1');
 
    switch (true) {

      case (n !== -1):
        img[i].src = img[i].src.substr(0, n) + '._V1_SX' + newWidth + '_.jpg';
        img[i].removeAttribute('width');
        break;

      case img[i].src.indexOf('.png') !== -1:
        img[i].width = newWidth;
        break;
    } 
    
    img[i].removeAttribute('height');
  }
}



})(); // end of anonymous function