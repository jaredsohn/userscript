// ==UserScript==
// @name           Open with Google Document Viewer
// @version        0.51
// @update         http://userscripts.org/scripts/source/109371.user.js
// @namespace      http://goo.gl/jZWjQ
// @description    Insert a Google Docs icon for viewing files with Google Document Viewer.
// @include        http://*
// @include        https://*
// @exclude        http://docs.google.com/*
// @exclude	       https://*mail.google.com/*
// @exclude	       http://*mail.google.com/*
//
// @history        0.51  minor tweak.
// @history        0.5   fully recoded. Updated icons.
// @history        0.1   first release
//
// ==/UserScript==

// Supported File Formats:
// - Documents: PDF, RTF, DOC, DOCX, ODT, SXW*, XPS, PAGES, PS
// - Presentations: PPS, PPT, PPTX, ODP*, SXI*
// - Spreadsheets: XLS, XLSX, ODS*, SXC*
// - Images: TIF, TIFF
// - Truetype Fonts: TTF
// - Drawings: EPS, AI, PSD DXF
// - Compressed files: ZIP, RAR
// * Using Zoho Viewer.

// External resources:
// Google Docs favicon:		http://docs.google.com/favicon.ico
// Spreadsheet icon URL:	https://ssl.gstatic.com/docs/doclist/images/icon_8_spreadsheet_list.png
// Generic Document icon URL:	https://ssl.gstatic.com/docs/doclist/images/icon_8_document_list.png
// Adobe PDF icon URL:		https://ssl.gstatic.com/docs/doclist/images/icon_8_pdf_list.png
// Image icon URL:		https://ssl.gstatic.com/docs/doclist/images/icon_8_image_list.png
// Image icon URL (alt):	https://ssl.gstatic.com/docs/doclist/images/icon_8_drawing_list.png
// Presentation icon URL:	https://ssl.gstatic.com/docs/doclist/images/icon_8_presentation_list.png
// Form icon URL:		https://ssl.gstatic.com/docs/doclist/images/icon_8_form_list.png
// Collection icon URL:		https://ssl.gstatic.com/docs/doclist/images/icon_8_collection_list.png
// Video icon URL:		https://ssl.gstatic.com/docs/doclist/images/icon_8_video_list.png
// Generic icon ULR: 		https://ssl.gstatic.com/docs/doclist/images/icon_8_generic_list.png
// Zip icon URL:		https://ssl.gstatic.com/docs/doclist/images/icon_8_zip_list.png
// ** NEW **
// Spreadsheet icon URL:	https://ssl.gstatic.com/docs/doclist/images/icon_10_spreadsheet_list.png
// Generic Document icon URL:	https://ssl.gstatic.com/docs/doclist/images/icon_10_document_list.png
// Adobe PDF icon URL:		https://ssl.gstatic.com/docs/doclist/images/icon_10_pdf_list.png
// Image icon URL:		https://ssl.gstatic.com/docs/doclist/images/icon_10_image_list.png
// Image icon URL (alt):	https://ssl.gstatic.com/docs/doclist/images/icon_10_drawing_list.png
// Presentation icon URL:	https://ssl.gstatic.com/docs/doclist/images/icon_10_presentation_list.png
// Form icon URL:		https://ssl.gstatic.com/docs/doclist/images/icon_10_form_list.png
// Video icon URL:		https://ssl.gstatic.com/docs/doclist/images/icon_10_video_list.png
// Generic icon ULR: 		https://ssl.gstatic.com/docs/doclist/images/icon_10_generic_list.png

var dl = document.links;
var gdtorun = true;
var ext_pdf = ["pdf"];
var pdffnd = new RegExp('^[^\\?#]+\\.(' + ext_pdf.join('|') + ')((#|\\?).*)?$', 'i');
var ext_xls = ["xls","xlsx","ods","sxc"];
var xlsfnd = new RegExp('^[^\\?#]+\\.(' + ext_xls.join('|') + ')((#|\\?).*)?$', 'i');
var ext_img = ["tif","tiff"];
var imgfnd = new RegExp('^[^\\?#]+\\.(' + ext_img.join('|') + ')((#|\\?).*)?$', 'i');
var ext_drw = ["eps","ai","psd","dxf"];
var drwfnd = new RegExp('^[^\\?#]+\\.(' + ext_drw.join('|') + ')((#|\\?).*)?$', 'i');
var ext_ppt = ["pps","ppt","pptx","odp","sxi"];
var pptfnd = new RegExp('^[^\\?#]+\\.(' + ext_ppt.join('|') + ')((#|\\?).*)?$', 'i');
/*var ext_zip = ["zip","rar"];
var zipfnd = new RegExp('^[^\\?#]+\\.(' + ext_zip.join('|') + ')((#|\\?).*)?$', 'i');*/
var ext_doc = ["doc","docx","rtf","odt","sxw","ps","xps","pages","ttf"];
var docfnd = new RegExp('^[^\\?#]+\\.(' + ext_doc.join('|') + ')((#|\\?).*)?$', 'i');
var gdocE = ["xls","xlsx","pdf","tif","tiff","eps","ai","psd","dxf","pps","ppt","pptx","zip","rar","doc","docx","rtf","odt","ps","xps","pages","ttf"];
var gdocfnd = new RegExp('^[^\\?#]+\\.(' + gdocE.join('|') + ')((#|\\?).*)?$', 'i');
var zohoE = ["sxw","odp","sxi","ods","sxc"];
var zohofnd = new RegExp('^[^\\?#]+\\.(' + zohoE.join('|') + ')((#|\\?).*)?$', 'i');

if (dl && document.location.host != "docs.google.com" && document.location.host != "viewer.zoho.com" && document.location.host != "office.live.com") {
  
  addGDLinks();
  var ecount = true;
  document.addEventListener('DOMNodeInserted',function(e){
    if (ecount){
      setTimeout(function(){
	    addGDLinks();
        ecount = true;
	  }, 3200);
      ecount = false;
    }
  },true);

}

function addGDLinks(){

  var gdchk = document.getElementById("gdlnk");
  if (gdchk) return;
  
  for (var i = 0; i < dl.length; ++i) {
                  	
    if (dl[i].host != "docs.google.com" && dl[i].host != "viewer.zoho.com" && (gdocfnd.test(dl[i].href) || zohofnd.test(dl[i].href))) {
		
      var gdico = document.createElement("img");
      gdico.setAttribute ("id","gdlnk");
      gdico.setAttribute ("style","margin-right:2px; vertical-align:middle; display:inblock; cursor: pointer;");
      gdico.setAttribute ("width","14px");
      gdico.setAttribute ("height","14px");
      if (xlsfnd.test(dl[i].href)) {
	  // Spreadsheets
	    gdico.src = "https://ssl.gstatic.com/docs/doclist/images/icon_10_spreadsheet_list.png";
      } else if (pdffnd.test(dl[i].href)) {
	  // PDF Documents
	    gdico.src = "https://ssl.gstatic.com/docs/doclist/images/icon_10_pdf_list.png";
      } else if (imgfnd.test(dl[i].href)) {
	  // Images
	    gdico.src = "https://ssl.gstatic.com/docs/doclist/images/icon_10_image_list.png";
      } else if (drwfnd.test(dl[i].href)) {
	  // Drawings
	    gdico.src = "https://ssl.gstatic.com/docs/doclist/images/icon_10_drawing_list.png";
      } else if (pptfnd.test(dl[i].href)) {
	  // Presentations
	    gdico.src = "https://ssl.gstatic.com/docs/doclist/images/icon_10_presentation_list.png";
      } else if (docfnd.test(dl[i].href)) {
	  // Documents (doc,docx,rtf,odt,sxw,ps,xps,pages,ttf)
	    gdico.src = "https://ssl.gstatic.com/docs/doclist/images/icon_10_document_list.png";
	    //"https://ssl.gstatic.com/docs/doclist/images/icon_10_word_list.png";
	  } else {
	  // Generic (zip, rar,...)
	    gdico.src = "https://ssl.gstatic.com/docs/doclist/images/icon_10_generic_list.png";
	  }
      gdurl = "https://docs.google.com/gview?url=" + encodeURI(dl[i].href);
      if (zohofnd.test(dl[i].href)) {
	    gdurl = "http://viewer.zoho.com/docs/urlview.do?url=" + encodeURI(dl[i].href);
      }
      gdico.setAttribute ("onclick","window.open('"+ gdurl +"');return false;");
      dl[i].parentNode.insertBefore(gdico, dl[i]);
      
    }
  }
}
