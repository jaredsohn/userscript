// ==UserScript==
// @name        Download La Vanguardia
// @description Script to change all links to found pages to a direct link to the PDF
// @namespace   newspapers.scripts.us
// @include     http://hemeroteca.lavanguardia.com/search.*
// @version     1.0
// @grant       none
// ==/UserScript==

/* ================================
  This script changes all the links on search results
  of the http://hemeroteca.lavanguardia.com/ website to
  point directly to the PDF file, rather than to a HTML
  page including it. In this way, it is possible to download
  all PDFs returned from a search by using "DownThemAll".
  
  The script uses JQuery (used by La Vanguardia) to iterate
  on all <a> with class "edicion" (the string of the title
  and date) to download the page they link to. The page is
  downloaded asynchronously and the src of the <iframe>
  object is retrieved. From it, the string after the '#'
  is discarded (this is the searched string) and the url
  is written in the source element (the date href).
  
  NOTE: to download pages in DownThemAll!, set up in the "Links" tab:
     - Renaming Mask: *name*.*ext*
     - Fast Filtering: *.pdf
================================ */

$(document).ready(function(){
  // Find all the <a class="portada"> elements
  $('a.portada').each(function(index,element){
      // Get the page they link to...
      $.get($(this).attr('href'),function(data){
         // Process HTML
         var data=$(data);
         // find the <iframe> and get the src (the PDF url)
         var url=$('iframe', data).attr('src');
         url = url.substr(0,url.indexOf('#')); // remove search parameters 
         // change the link of the "portada" elements to point directly to the PDF
         //alert(url);
         if(url.length>0){
           //alert(url + '\n' + JSON.stringify($(element), null, 4));
           $(element).attr('href',url); // change the string of the title to link to the PDF
          }
      });
  }); // for each <a>
}); // document.ready
