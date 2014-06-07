// ==UserScript==
// @name          Sunnyvale Library Lookup
// @namespace     http://minwoo.blogsite.org/svlib
// @description   On Amazon, display book availability in the Sunnyvale Library. Based on LibraryLookup by Jon Udell and Palo Alto Library lookup.
// @include       *.amazon.*/*
// ==/UserScript==

// TODO:
// * Display status (checked out, available, due when, etc...)

(

 function()
 {
   var libLoginUrl = 'http://library.ci.sunnyvale.ca.us/web2/tramp2.exe/log_in?*TCPPSESID=0&setting_key=text_user&home_library=1home&screen=browse.html&guest=Go+to+the+Catalog';
   var libSessionId = /goto\/(\w{8})\.000\?/;
   var libNumSearch1 = 'http://library.ci.sunnyvale.ca.us/web2/tramp2.exe/form/';   
   var libNumSearch2 = '.000?*DB_DSPLY=D&hitlist_format=&hitlist_screen=HitList.html&servers=1home&query_screen=Numeric.html&buttons=n_cn%3Ddo_authority_search+default_value%3Dsearch_button_numeric+index%3Dc+search_button_numeric%3Dn_cn&buttons=*%3Ddo_authority_search+default_value%3Dsearch_button_numeric+index%3Dc+search_button_numeric%3Dn_cn&buttons=n_isbn%3Ddo_authority_search+default_value%3Dsearch_button_numeric+index%3Db+search_button_numeric%3Dn_isbn&n_isbn=+ISBN+&query=';
   var libItemSearch1 = 'http://library.ci.sunnyvale.ca.us/web2/tramp2.exe/authority_hits/';
   var libItemSearch2 = '.003?server=1home&item=1';

   var libraryLookup = 
     {
       insertLink: function(url, hrefTitle, aLabel, color )
       {
         var div = origTitle.parentNode;
         var title = origTitle.firstChild.nodeValue;

         var newTitle = document.createElement('b');
         newTitle.setAttribute('class','sans');

         var titleText = document.createTextNode(title);
         newTitle.appendChild(titleText);
        
         var br = document.createElement('br');

         var link = document.createElement('a');
         link.setAttribute ( 'title', hrefTitle );
         link.setAttribute('href', url);
         link.setAttribute('style','color: ' + color);

         var label = document.createTextNode( aLabel );

         link.appendChild(label);

         div.insertBefore(newTitle, origTitle);
         div.insertBefore(br, origTitle);
         div.insertBefore(link, origTitle);
         div.removeChild(origTitle);
       },

       doLookup: function(isbn)
       {
       GM_xmlhttpRequest({
           method:'GET',
           url: libLoginUrl,
           onload: function(results) {
               page = results.responseText;
               if (libSessionId.test(page)) {
                   var sessionid = page.match(libSessionId)[1];
                   GM_xmlhttpRequest({
                       method:'GET',
                       url: libNumSearch1 + sessionid + libNumSearch2 + isbn,
                       onload: function(results) {
                           page = results.responseText;
                           pattern = new RegExp(isbn + " --", "g");
                           if (pattern.test(page)) {
                               libraryLookup.insertLink(
                                   libItemSearch1 + sessionid + libItemSearch2,
                                   "Found",
                                   "Found in Sunnyvale Library",
                                   "green"
                               );
                           } else {
                               libraryLookup.insertLink(
                                   libItemSearch1 + sessionid + libItemSearch2,
                                   "Not Found",
                                   "Not carried in Sunnyvale Library",
                                   "red"
                               );
                           }
                       }
                   });
               }
           }
       });
       }
     }

   try { 
     var isbn = window._content.location.href.match(/\/(\d{7,9}[\d|X])\//)[1];
   }
   catch (e) { 
     return; 
   }

   var origTitle = document.evaluate("//b[@class='sans']", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null ).singleNodeValue;

   if ( ! origTitle )
     { return; }

   libraryLookup.doLookup(isbn);
 }
 )();

