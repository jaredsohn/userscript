// Zoho Viewer online file reader
// version 0.8.2
//
// updated by gdap for (a) shorter links and (b) removal of zoho links for google cached and similar pages
// updated to add Zoho expiration URL variable
//
// 2008MAR24
// Copyright (c) 2008, wb
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.  To install it, you need
// Greasemonkey 0.7 or later: http://www.greasespot.net/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "Zoho Viewer - online file reader", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name            Zoho Viewer - online file reader
// @namespace       http://www.moms-ritzcracker.com/projects/Zoho_Viewer/
// @description     Script to open documents using the Zoho online service.
// @include         *        
// ==/UserScript==

(
function ()
 
{	
   var orig_page_links = document.links;
   var page_links = new Array(orig_page_links.length);
   for (var i=0; i < page_links.length; i++){
       page_links[i] = orig_page_links[i];
   }

   for (var i=0; i < page_links.length; i++){
       			    if(page_links[i].href.match(/([^\/\\]+)\.(doc|xls|ppt|pps|odt|ods|odp|sxw|sxc|sxi|rtf|csv)$/i)) 

{

	if( page_links[i].href.indexOf("related:")==-1 && page_links[i].href.indexOf("cache:")==-1 ) {
           var span = document.createElement('span');
		   var code_str = " <a href=\"http://zohoviewer.com/index.jsp?&expiry=1440&url=";
           code_str += page_links[i].href;
           code_str += "\" target=\"_blank\" style=\"text-decoration:none;font-weight:bold;\">\(";
		   code_str += page_links[i].href.match(/[^?.]+$/i);
		   code_str += "\)</a>";
           span.innerHTML = code_str;
           page_links[i].parentNode.insertBefore(span, page_links[i].nextSibling);
}

       }
   }
}
)();