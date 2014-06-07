// ==UserScript==
// @name        Download PapersPast PDFs
// @namespace   newspapers.scripts.us
// @description Gives direct PDF link to search results at PapersPast (NZ)
// @include     http://paperspast.natlib.govt.nz/cgi-bin/paperspast*
// @version     1.0
// @grant       GM_addStyle
// ==/UserScript==

/* ================================
  This script adds a PDF link on search results
  of the  http://paperspast.natlib.govt.nz/ website to
  point directly to the PDF of the page, rather than to a HTML
  page linking to it. In this way, it is possible to download
  all PDFs returned from a search by using "DownThemAll".
  
  The script uses JQuery to iterate on all <a> tags that
  point to articles to download the page they link to. 
  The page is downloaded asynchronously and the script searches
  for the url to the full page from which to retrieve the id
  to the page. It will then be uses to create the link to the PDF
  download.
  
  If this is found, an element is created being a <a> which points
  to the link of the PDF page.
  
  NOTE: to download pages in DownThemAll!, set up in the "Links" tab:
     - Renaming Mask: *title*.pdf
     - Fast Filtering: getpdf=true
  
================================ */

function ConvertDate(s)
{
   var match = /(\d{1,2})\s*(\w*)\s*(\d{4})/.exec(s);
   if(match !== null){
      var day = ('0'+match[1]).slice(-2); 
      switch(match[2]){
        case 'January':
            return match[3]+'01'+day;
            break;
        case 'February':
            return match[3]+'02'+day;
            break;
        case 'March':
            return match[3]+'03'+day;
            break;
        case 'April':
            return match[3]+'04'+day;
            break;
        case 'May':
            return match[3]+'05'+day;
            break;
        case 'June':
            return match[3]+'06'+day;
            break;
        case 'July':
            return match[3]+'07'+day;
            break;
        case 'August':
            return match[3]+'08'+day;
            break;
        case 'September':
            return match[3]+'09'+day;
            break;
        case 'October':
            return match[3]+'10'+day;
            break;
        case 'November':
            return match[3]+'11'+day;
            break;
        case 'December':
            return match[3]+'12'+day;
            break;
      } // end switch
   }
}

GM_addStyle(".mp_pdf_btn{background:-webkit-gradient(linear,left top,left bottom,color-stop(0.05,#63b8ee),color-stop(1,#468ccf));background:-moz-linear-gradient(center top,#63b8ee 5%,#468ccf 100%);filter:progid:DXImageTransform.Microsoft.gradient(startColorstr='#63b8ee', endColorstr='#468ccf');background-color:#63b8ee;-webkit-border-top-left-radius:5px;-moz-border-radius-topleft:5px;border-top-left-radius:5px;-webkit-border-top-right-radius:5px;-moz-border-radius-topright:5px;border-top-right-radius:5px;-webkit-border-bottom-right-radius:5px;-moz-border-radius-bottomright:5px;border-bottom-right-radius:5px;-webkit-border-bottom-left-radius:5px;-moz-border-radius-bottomleft:5px;border-bottom-left-radius:5px;text-indent:0;border:1px solid #3866a3;display:inline-block;color:#14396a;font-family:Arial;font-size:12px;font-weight:700;font-style:normal;height:17px;line-height:17px;width:32px;text-decoration:none;text-align:center}.mp_pdf_btn:hover{background:-webkit-gradient(linear,left top,left bottom,color-stop(0.05,#468ccf),color-stop(1,#63b8ee));background:-moz-linear-gradient(center top,#468ccf 5%,#63b8ee 100%);filter:progid:DXImageTransform.Microsoft.gradient(startColorstr='#468ccf', endColorstr='#63b8ee');background-color:#468ccf}.mp_pdf_btn:active{position:relative;top:1px}");
$ = unsafeWindow.$; // THIS is required as for some reason Trove disables the $ function...
$(document).ready(function(){
  // Find all the <a href="..."> elements in the class sr-icon
  $(".sr-icon a").each(function(index,element){
      // Get the page they link to...
      //alert($(this).attr('href'));
      $.get($(this).attr('href'), function(data){
         // Process HTML
         var data=$(data);
         // find the id=disclaimer link that contains the id of the page
         var urlD=$('#disclaimer a', data); 
         var match = /&d=(.*?)&/.exec($(urlD).attr('href'))[1];
         //alert(match);
         if(match !== null){
           // Get the publication title and date
           // $(element) is the <a> tag
           var sDesc = $(element).parent().siblings('p');
           //alert($(sDesc).text());
           var sNode='&nbsp;<a class="mp_pdf_btn"' +
                        ' href="/cgi-bin/imageserver/imageserver.pl?oid=' + 
                        match + 
                        '&getpdf=true" title="' +
                        ConvertDate($(sDesc).text())+'_'+$(sDesc).text().replace(/\s+/g,' ') + 
                        '">PDF</a> ';
           $(sDesc).append(sNode); 
         }
      });
  }); // for each <a>
}); // document.ready

