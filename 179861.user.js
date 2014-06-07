// ==UserScript==
// @name        Download Trove Newspapers
// @namespace   newspapers.scripts.us
// @description Changes search pages for Trove (Australia) to allow direct downloads of PDFs of pages
// @include     http://trove.nla.gov.au/newspaper/result*
// @version     1.0
// @grant       GM_addStyle
// ==/UserScript==

/* ================================
  This script adds a PDF link on search results
  of the  http://trove.nla.gov.au/ website to
  point directly to the PDF of the page, rather than to a HTML
  page including it. In this way, it is possible to download
  all PDFs returned from a search by using "DownThemAll".
  
  The script uses JQuery to iterate on all <a> tags that
  point to articles to download the page they link to. 
  The page is downloaded asynchronously and the script searches
  for var pageId which contains the id of the page the article is on.
  
  If this is found, an element is created being a <a> which points
  to the link of the PDF page.
  
  NOTE: to download pages in DownThemAll!, set up in the "Links" tab:
     - Renaming Mask: *text*.pdf
     - Fast Filtering: /print
  
================================ */

GM_addStyle(".mp_pdf_btn{background:-webkit-gradient(linear,left top,left bottom,color-stop(0.05,#63b8ee),color-stop(1,#468ccf));background:-moz-linear-gradient(center top,#63b8ee 5%,#468ccf 100%);filter:progid:DXImageTransform.Microsoft.gradient(startColorstr='#63b8ee', endColorstr='#468ccf');background-color:#63b8ee;-webkit-border-top-left-radius:5px;-moz-border-radius-topleft:5px;border-top-left-radius:5px;-webkit-border-top-right-radius:5px;-moz-border-radius-topright:5px;border-top-right-radius:5px;-webkit-border-bottom-right-radius:5px;-moz-border-radius-bottomright:5px;border-bottom-right-radius:5px;-webkit-border-bottom-left-radius:5px;-moz-border-radius-bottomleft:5px;border-bottom-left-radius:5px;text-indent:0;border:1px solid #3866a3;display:inline-block;color:#14396a;font-family:Arial;font-size:12px;font-weight:700;font-style:normal;height:17px;line-height:17px;width:32px;text-decoration:none;text-align:center}.mp_pdf_btn:hover{background:-webkit-gradient(linear,left top,left bottom,color-stop(0.05,#468ccf),color-stop(1,#63b8ee));background:-moz-linear-gradient(center top,#468ccf 5%,#63b8ee 100%);filter:progid:DXImageTransform.Microsoft.gradient(startColorstr='#468ccf', endColorstr='#63b8ee');background-color:#468ccf}.mp_pdf_btn:active{position:relative;top:1px}");
$ = unsafeWindow.$; // THIS is required as for some reason Trove disables the $ function...
$(document).ready(function(){
  // Find all the <a href="/ndp/del/article/..."> elements
  $("a[href*='/ndp/del/article/']").each(function(index,element){
      // Get the page they link to...
      //alert($(this).attr('href'));
      $.get($(this).attr('href'), function(data){
         // Process HTML
         var data=$(data);
         // find the <script> that contains the psgeId definition
         var urlD=$('script:contains("var pageId")', data); 
         var sPageId = ($(urlD).text());
         //alert(sPageId);
         var match = /var\spageId\s*=\s*\'(\d*)\'/.exec(sPageId);
         //alert(JSON.stringify(match, null, 4));
         if(match !== null){
           // Get the publication title and date
           // $(element) is the <a> tag
           var sDesc = $(element).parent().siblings('.sourcedate');
           //alert($('em',sDesc).text());
           var sNode='&nbsp;<a class="mp_pdf_btn"' +
                        ' href="/ndp/imageservice/nla.news-page' + 
                        match[1] + 
                        '/print" title="' +
                        $('em',sDesc).text() + '_' + 
                        $('strong',sDesc).text()+'">PDF</a> ';
           $(sDesc).append(sNode);
         }
      });
  }); // for each <a>
}); // document.ready

