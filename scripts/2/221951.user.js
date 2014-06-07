// ==UserScript==
// @name        Download PDF from BritishNewspaperArchive
// @namespace   newspapers.scripts.us
// @description Gives direct PDF link to search results at BritishNewspaperArchive.co.uk
// @include     http://www.britishnewspaperarchive.co.uk/search/results*
// @version     1.0
// @grant       none
// ==/UserScript==

/* ================================
  This script changes the link on the thumbnail on search
  results of the http://www.britishnewspaperarchive.co.uk/
  website to point directly to the PDF of the page, rather
  than to a display page linking to it. In this way, it is
  possible to download all PDFs returned from a search by
  using "DownThemAll".

  The script uses JQuery to iterate on all <a> tags in
  the thumbnail class, then changes the URL to include the
  "download" part.

  NOTE: You must have sufficient credits to be able to
        download PDFs.

  NOTE: to download pages in DownThemAll!, set up in the "Links" tab:
     - Renaming Mask: *name*.*ext*
     - Fast Filtering: /download/

================================ */

$ = unsafeWindow.$;
$(document).ready(function(){
   var nRecs = 0;
   var nTotalRecs = 0;
   $(".thumbnailContainer a").each(function(index,element){
      ++nTotalRecs;
      var href = $(this).attr('href');
      var match = /^(.*?)viewer\/bl\/(.*?)$/.exec(href);
      if(match !== null){
         $(this).attr('href', match[1] + "viewer/download/bl/" + match[2]);
         ++nRecs;
      } // is this a viewer/bl link?
   }); // for each <a>
   alert("Changed " + nRecs + " (out of " + nTotalRecs + ") links to PDF");
}); // document.ready
