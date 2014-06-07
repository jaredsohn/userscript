// ==UserScript==
// @name        Download Hemeroteca Digital
// @description Script to change all links to found pages to a direct link to the PDF
// @namespace   newspapers.scripts.us
// @include     http://hemerotecadigital.bne.es/results.*
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// @version     1
// @grant       GM_xmlhttpRequest
// ==/UserScript==

/* ================================
  This script changes all the links on search results
  of the http://hemerotecadigital.bne.es/ website to
  point directly to the PDF file, rather than to a HTML
  page including it. In this way, it is possible to download
  all PDFs returned from a search by using "DownThemAll".
  
  The script uses JQuery (by downloading it from Google)
  to iterate on all <a> inside the<div class="list-thumbnail">
  (the thumbnail of the page) to download the page they link to. 
  The page is downloaded asynchronously and the src of the <frame>
  object pointing to pdf.raw is retrieved. From it, the string 
  after the '&amp;' is discarded (this is the searched string) 
  and the url is written in the source element (the thumbnail href).
  
  As the page with the PDF is a frameset, it is difficult to process it
  with jQuery (haven't been able to...) so, I use GM_xmlhttpRequest
  and parse the returned HTML.
  
  NOTE: to download pages in DownThemAll!, set up in the "Links" tab:
     - Renaming Mask: *text*.pdf
     - Fast Filtering: pdf.raw
  
================================ */

$(document).ready(function(){
  // Find all the <a> elements inside <div class="list-thumbnail">
  $('div.list-thumbnail a').each(function(index,element){
      // Get the page they link to...
      GM_xmlhttpRequest({
          method: "GET",
          url: $(location).attr('protocol')+'//'+$(location).attr('host')+'/'+$(this).attr('href'),
          onload: function(response) {
            var url=response.responseText.substring(response.responseText.indexOf('pdf.raw'));
            url = url.substr(0,url.indexOf('&')); // remove search parameters 
            // change the link of the page thumbnail to point directly to the PDF
            if(url.length>0){
               $(element).attr('href',url); // change the string of the title to link to the PDF
              }
          } // end "response"
        }); //GM_xmlhttpRequest
  }); // for each <a>
}); // document.ready
