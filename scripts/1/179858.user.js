// ==UserScript==
// @name        Download El Mundo Deportivo
// @namespace   newspapers.scripts.us
// @description Download El Mundo Deportivo
// @include     http://hemeroteca.mundodeportivo.com/search*
// @version     1.0
// @grant       none
// ==/UserScript==

/* ================================
  This script changes all the links on search results
  of the http://hemeroteca.mundodeportivo.com/ website to
  point directly to the PDF file, rather than to a HTML
  page including it. In this way, it is possible to download
  all PDFs returned from a search by using "DownThemAll".
  
  The script uses JQuery (used by El Mundo Deportivo) to iterate
  on all <a> with class "resultTitle" (the string of the title
  and date) to download the page they link to. The page is
  downloaded asynchronously and the href of the <a> having
  class "btn1" and "download" is retrieved. The url
  is written in the source element (the date href).
  
  NOTE: to download pages in DownThemAll!, set up in the "Links" tab:
     - Renaming Mask: *text*.pdf
     - Fast Filtering: pdf.raw
================================ */

$(document).ready(function(){
  // Find all the <a class="portada"> elements
  $('div.resultTitle a').each(function(index,element){
      // Get the page they link to...
      $.get($(this).attr('href'),function(data){
         // Process HTML
         var data=$(data);
         // find the <iframe> and get the src (the PDF url)
         var url=$('.btn1.download', data).attr('href');
         // change the link of the "portada" elements to point directly to the PDF
         //alert(url);
         if(url.length>0){
           //alert(url + '\n' + JSON.stringify($(element), null, 4));
           $(element).attr('href',url); // change the string of the title to link to the PDF
          }
      });
  }); // for each <a>
}); // document.ready

