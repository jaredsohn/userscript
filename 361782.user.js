// ==UserScript==
// @name          Google Image Search
// @namespace     erosman
// @description   Direct Links in Google Image Search
// @updateURL     https://userscripts.org/scripts/source/361782.meta.js
// @downloadURL   https://userscripts.org/scripts/source/361782.user.js
// @include       http://www.google.*/*
// @include       https://www.google.*/*
// @grant         GM_addStyle
// @author        erosman
// @version       1.18
// ==/UserScript==

/* --------- Note ---------
  This script cleans Google Image Search and shows direct links to images.

  Basic Image Search: No direct link + removes junk (shows dimensions & size)
  (Note: Google has stopped including the direct links to the images in the Basic Image Search.)
  Standard Image Search: Direct link + Page link (click the dimension bar) + removes junk (shows dimensions but not size)
  Upload Image Search: Direct link + Page link + removes junk (shows dimensions but not size)
  Web Search: Direct link for the large image + removes junk



  --------- History ---------

  1.18 Code Improvement (Search by Upload)
  1.17 Code Improvement
  1.16 Code Improvement
  1.15 Code Improvement
  1.14 Improved Live Search + Code Improvement
  1.13 Fixed the issue re: http://userscripts.org/topics/209339
  1.12 Google keeps changing its Style, so script now inserts its own style instead of using Google's
  1.11 Google changed Style (class), Web Search large image direct link is available again (2014-03-11)
  1.10 Google changed their Web Search, large image doesn't have direct link anymore (2014-03-10)
  1.9 Code Improvement
  1.8 Code Improvement + updated the pattern for Basic Image Search
  1.7 Code Improvement + replaced deprecated Mutation events (DOMNodeInserted) with MutationObserver
  1.6 Code Improvement, Double decodeURIComponent
  1.5 Code Improvement + Updated the CSS change by Google (Site Link)
  1.4 Google Instant handling Improvement
  1.3 Moved the include separation to the script
  1.2 Code Improvement + Improved handling of Google Instant
  1.1 Code Improvement + Added Web Search cleaning + Added Image Box Cleaning
      + removed Old Style Search Query
  1.0 Initial release

*/



(function() { // anonymous function wrapper, used for error checking & limiting scope
'use strict';

if (window.self !== window.top) { return; } // end execution if in a frame

// verify the correct page to process
switch (location.pathname) {

 case '/':
 case '/search':
  break;

 default:
  return; // end execution if wrong page
}

var q = location.search; // Query string

switch (true) {

  case q.indexOf('tbm=isch')!== -1:               // Image Search
    if (q.indexOf('sout=1') !== -1) {             // Basic Image Search
      var pat1 = /q=(http[^&]+)/;
      clean();
      break;
    }
    var pat1 = /imgurl=(http[^&]+)/;             // Standard Image Search
    var pat2 = /imgrefurl=(http[^&]+)/;
    clean();
    new MutationObserver(clean).observe(document.getElementById('search'), { childList: true, subtree: true });
    break;

  case q.indexOf('tbs=sbi:') !== -1:              // Search by Upload
    var pat1 = /imgurl=(http[^&]+)/;
    clean();
    cleanBox();
    break;

   case q.indexOf('tbm=vid') !== -1:              // Videos Search
   case q.indexOf('tbm=nws') !== -1:              // News Search
   case q.indexOf('tbm=bks') !== -1:              // Books Search
   case q.indexOf('tbm=shop') !== -1:             // Shopping Search
    break;

  default:                                        // Web Search
   cleanBox();
   new MutationObserver(cleanBox).observe(document.body, { childList: true, subtree: true });
}


function clean() {

  // get all image links
  var img = document.querySelectorAll('a > img');

  for (var i = 0, len = img.length; i < len; i++) {

    var a = img[i].parentNode;
    var lnk = decodeURIComponent(decodeURIComponent(a.href));

    var imgurl = lnk.match(pat1);
    var imgrefurl = pat2 ? lnk.match(pat2) : 0;

    if (imgurl) {
      a.href = imgurl[1];
    }

    if (imgrefurl) {
      var span = a.parentNode.querySelector('.rg_ilmn');
      if (span) {
        var ref = document.createElement('a');
        ref.setAttribute('style', 'color: #fff; text-decoration: none; display: block;');
        ref.href = imgrefurl[1];
        ref.textContent = span.textContent;
        span.textContent = '';
        span.appendChild(ref);
      }
      a.addEventListener('click', stopEvent, false);
      a.addEventListener('mousedown', stopEvent, false);
    }
  }
}


function cleanBox() {
  
  // add Google Image Search Style for large image link
  GM_addStyle(' \
    .gis { background: rgba(0, 0, 0, 0.4); letter-spacing: 1px; transition: all 0.2s ease-in-out 0s; \
      padding: 0px; position: absolute; right: 0px; bottom: 1px; } \
    .gis:hover { background: #000; } \
    .gis a { color: #fff; font-size: 16px; text-shadow: 0px 0px 2px black, 0px 0px 3px black; \
      text-decoration: none; display: inline-block; padding: 5px 8px 7px 8px; } \
  ');
  
  var img = document.querySelectorAll('.rg_ul a > img');
  if (!img[0]) { return; }  // end execution if not found

  for (var i = 0, len = img.length; i < len; i++) {

    var a = img[i].parentNode;
    var lnk = decodeURIComponent(decodeURIComponent(a.href));

    // large image only
    var imgurl = lnk.match(/imgurl=(http[^&]+)/);

    if (imgurl) {
      a.href = imgurl[1];

      var imgrefurl = lnk.match(/imgrefurl=(http[^&]+)/);
      if (imgrefurl) {
        // Use class of 'More Images' div
        var div = document.createElement('div');
        div.className = 'gis';
        var divLink = document.createElement('a');
        divLink.href = imgrefurl[1];
        divLink.textContent = 'Site Link';
        div.appendChild(divLink);
        a.parentNode.parentNode.appendChild(div);
      }
    }
    else if (lnk.indexOf('?q=') !== -1) {  // no direct link
      a.href = img[i].getAttribute('title');
    }
  }

}


function stopEvent(ev) {
  // prevent propagation of the element
  ev.stopPropagation();
}


})(); // end of anonymous function
