// ==UserScript==
// @name        Download Hemeroteca ABC PDFs
// @namespace   newspapers.scripts.us
// @description Gives direct PDF link to search results at ABC.es
// @include     http://hemeroteca.abc.es/results.stm
// @version     1.0
// @grant       GM_addStyle
// ==/UserScript==

/* ================================
  This script adds a PDF link on search results
  of the http://hemeroteca.abc.es/ website to
  point directly to the PDF of the page, rather than to a HTML
  page linking to it. In this way, it is possible to download
  all PDFs returned from a search by using "DownThemAll".
  
  The script uses JQuery to iterate on all the "Ver" links 
  to download the page they link to. 
  The page is downloaded asynchronously and the script searches
  for the url to the PDF from which to retrieve the URL to.
  
  If this is found, an element is created being a button which points
  to the link of the PDF page.
  
  NOTE: to download pages in DownThemAll!, set up in the "Links" tab:
     - Renaming Mask: *name*.*ext*
     - Fast Filtering: pagina.pdf
  
================================ */

function ChangeValue(arr, param, val)
{
  var index;
  for(index=0; index < arr.length; ++index){
     if(arr[index].name==param){
        arr[index].value=val;
        break;
     }
  } // end for
  // Add it if it wasn't there
  if (index >= arr.length) {
    arr.push({name: param,value: val});
  }
}

GM_addStyle(".mp_pdf_btn{background:-webkit-gradient(linear,left top,left bottom,color-stop(0.05,#63b8ee),color-stop(1,#468ccf));background:-moz-linear-gradient(center top,#63b8ee 5%,#468ccf 100%);filter:progid:DXImageTransform.Microsoft.gradient(startColorstr='#63b8ee', endColorstr='#468ccf');background-color:#63b8ee;-webkit-border-top-left-radius:5px;-moz-border-radius-topleft:5px;border-top-left-radius:5px;-webkit-border-top-right-radius:5px;-moz-border-radius-topright:5px;border-top-right-radius:5px;-webkit-border-bottom-right-radius:5px;-moz-border-radius-bottomright:5px;border-bottom-right-radius:5px;-webkit-border-bottom-left-radius:5px;-moz-border-radius-bottomleft:5px;border-bottom-left-radius:5px;text-indent:0;border:1px solid #3866a3;display:inline-block;color:#14396a;font-family:Arial;font-size:12px;font-weight:700;font-style:normal;height:17px;line-height:17px;width:32px;text-decoration:none;text-align:center}.mp_pdf_btn:hover{background:-webkit-gradient(linear,left top,left bottom,color-stop(0.05,#468ccf),color-stop(1,#63b8ee));background:-moz-linear-gradient(center top,#468ccf 5%,#63b8ee 100%);filter:progid:DXImageTransform.Microsoft.gradient(startColorstr='#468ccf', endColorstr='#63b8ee');background-color:#468ccf}.mp_pdf_btn:active{position:relative;top:1px}");
$ = unsafeWindow.$; // THIS is required to access jQuery on page
$(document).ready(function(){
  var values = $('form[name="results_form"]').serializeArray(); // Must get only THIS form...
  var index, query='', saved_skip=0;
  for(index=0; index < values.length; ++index){
    if(values[index].name=='query'){query = values[index].value;}
    if(values[index].name=='saved_skip'){saved_skip = parseFloat(values[index].value);}
  } // end for
  ChangeValue(values, 'fn','select');
  ChangeValue(values, 'saved_query',query);
  ChangeValue(values, 'length','1');
  ChangeValue(values, 'xslt','ABC-detalle_PDF');
  // Find all the <a title="Ver"> elements
  $("a[title*='Ver']").each(function(index,element){
      var sId = $(this).attr('href');
      // Get only the record id
      sId = sId.substr(sId.indexOf("'")+1,sId.substr(sId.indexOf("'")+1).indexOf("'"));
      var position = 0;
      index = 0;
      $("input[name=mid]").each(function(){if($(this).val()==sId){position=index;}++index;});
      ChangeValue(values, 'skip',parseFloat(saved_skip+position));
      $.post('/detalle.stm',
           $.param(values),
           function(data){
             // Process HTML
             var data=$(data);
             var url=$('.download > a:nth-child(1)', data).attr('href');
             if(url.length>0){
               var sNode='&nbsp;&nbsp;<a class="mp_pdf_btn" href="' + url + '">PDF</a> ';
               $(element).append(sNode); // Add PDF button
              }
          },'html');
  }); // for each <a>
}); // document.ready
