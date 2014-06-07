// ==UserScript==
// @name        Newspapers.com PDF Links
// @namespace   newspapers.scripts.us
// @description Add direct link to PDF page for Newspapers.com
// @include     http://www.newspapers.com/search/#query=*
// @version     1.0
// @require     https://gist.github.com/raw/2625891/waitForKeyElements.js
// @grant       GM_addStyle
// ==/UserScript==

/* ================================
  This script adds a PDF link on search results
  of the http://www.newspapers.com/ website to
  point directly to the PDF of the page. In this way,
  it is possible to download all PDFs returned from
  a search by using "DownThemAll".

  As Newspapers.com gradually fills the results with AJAX
  calls, we are using "waitForKeyElements()" to identify and
  load the nodes to search for (the <a class="internal">). From
  them, we get the ID of the page and then create a button
  to the PDF.

  If there are many results returned, not all are loaded by
  Newspapers.com, so it is recommended that the results are
  filtered either by newspaper title or by state to have less
  results and being able to download them all without missing any.

  NOTE: to download pages in DownThemAll!, set up in the "Links" tab:
     - Renaming Mask: *name*.*ext*
     - Fast Filtering: image-pdf.php

================================ */

function ProcessNewspaperCom(jNode)
{
  var match = /\/(\d*)\//.exec(jNode.attr('href'));
  if(match !== null){
     jNode.parent().append('&nbsp;<span><a class="mp_pdf_btn" href="/image-pdf.php?id=' + match[1] + '">PDF</a></span>');
  }// have we found a numeric ID?
} // ProcessNewspaperCom

GM_addStyle(".mp_pdf_btn{background:-webkit-gradient(linear,left top,left bottom,color-stop(0.05,#63b8ee),color-stop(1,#468ccf));background:-moz-linear-gradient(center top,#63b8ee 5%,#468ccf 100%);filter:progid:DXImageTransform.Microsoft.gradient(startColorstr='#63b8ee', endColorstr='#468ccf');background-color:#63b8ee;-webkit-border-top-left-radius:5px;-moz-border-radius-topleft:5px;border-top-left-radius:5px;-webkit-border-top-right-radius:5px;-moz-border-radius-topright:5px;border-top-right-radius:5px;-webkit-border-bottom-right-radius:5px;-moz-border-radius-bottomright:5px;border-bottom-right-radius:5px;-webkit-border-bottom-left-radius:5px;-moz-border-radius-bottomleft:5px;border-bottom-left-radius:5px;text-indent:0;border:1px solid #3866a3;display:inline-block;color:#14396a;font-family:Arial;font-size:12px;font-weight:700;font-style:normal;height:17px;line-height:17px;width:32px;text-decoration:none;text-align:center}.mp_pdf_btn:hover{background:-webkit-gradient(linear,left top,left bottom,color-stop(0.05,#468ccf),color-stop(1,#63b8ee));background:-moz-linear-gradient(center top,#468ccf 5%,#63b8ee 100%);filter:progid:DXImageTransform.Microsoft.gradient(startColorstr='#468ccf', endColorstr='#63b8ee');background-color:#468ccf}.mp_pdf_btn:active{position:relative;top:1px}");
$ = unsafeWindow.$;
waitForKeyElements(".result-breadcrumb a.internal", ProcessNewspaperCom, false);
