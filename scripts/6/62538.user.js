// ==UserScript==
// @name           gPDF
// @version        4.0.2
// @author         ArpitNext
// @namespace      http://blog.arpitnext.com/gpdf
// @description    Open online PDF,DOC,DOCX,XLS,PPT,RTF,ODT,ODS,ODP,CSV etc. files using Google Docs & Zoho Viewer.
// @include        *
// @exclude        http://docs.google.com/*
// ==/UserScript==


// gPDF 4.0. Created by Arpit Kumar (arpit@techraga.in), Website: http://blog.arpitnext.com/gpdf
var dl = document.links;
var googE = ["doc","docx","xls","xlsx","ppt","pps","pptx","pdf"];
var googdetect = new RegExp('^[^\\?#]+\\.(' + googE.join('|') + ')((#|\\?).*)?$', 'i');
var zohoE  = ["rtf","odt","sxw","csv","sxc", "ods","sxi", "odp"];
var zohodetect = new RegExp('^[^\\?#]+\\.(' + zohoE.join('|') + ')((#|\\?).*)?$', 'i');
if (dl && document.location.host != "docs.google.com" && document.location.host != "viewer.zoho.com" && document.location.host != "office.live.com") {
 gPDF(); 
 var ecount = true;
 document.addEventListener('DOMNodeInserted',function(e){
    if (ecount){
      setTimeout(function(){
	gPDF();
        ecount = true;
	}, 1000);
      ecount = false;
    }
  },true);
}
function gPDF(){
  for (var i = 0; i < dl.length; ++i) {
        if (dl[i].host != "docs.google.com" && dl[i].host != "viewer.zoho.com"){
         if (googdetect.test(dl[i].href)){
            dl[i].href="https://docs.google.com/viewer?url="+encodeURI(dl[i].href);
            dl[i].title="Open with Google Docs Viewer.";
         }
         if (zohodetect.test(dl[i].href)){
            dl[i].href="http://viewer.zoho.com/api/urlview.do?url="+encodeURI(dl[i].href)+"&cache=true";
            dl[i].title="Open with Zoho Viewer.";
         }
          
      }
   }
}
// gPDF 4.0 branch 3 b6 Greasemonkey