// ==UserScript==
// @name           Norwich Vermont Public Library Amazon Lookup
// @namespace      http://www.norwichlibrary.org
// @description     Search the Norwich Vermont Library Catalog from Amazon book listings.
// @include        http://*.amazon.*
// ==/UserScript==
// Adapted by Peter Andrews from
// Cab Vinton, http://userscripts.org/scripts/show/56847, from
// Matthew Thompson, http://userscripts.org/scripts/show/26033, from
// Carrick Mundell, http://userscripts.org/scripts/show/1396

var libraryUrlPattern = 'http://216.107.220.106/cgi-bin/koha/opac-search.pl?q=';
var libraryName = 'Norwich Public Library';
var link2catalog = true;

(function(){
   var isbn = get_isbn(window.content.location.href);
   if (isbn==0) { return;}
   else { getBookStatus(isbn); }

//check if there is a ISBN in the Amazon URL
//URL looks like http://www.amazon.com/Liseys-Story-Stephen-King/dp/0743289412/ref=xarw/002-5799652-4968811
function get_isbn(url){
   try { 
      //match if there is a / followed by a 7-9 digit number followed by either another number or an x 
      //followed by a / or end of url 
      var isbn = url.match(/\/(\d{7,9}[\d|X])(\/|$)/)[1]; 
   } catch (e) { return 0; }

   return isbn;
}

//connect to library to get book status for isbn and then insert result under the book title
function getBookStatus(isbn){

   var notFound = /No Result found/;
   var libraryAvailability = /Available/;
   var libraryCheckedOut = /Checked out/;
//in case have multiple records with same ISBN, e.g. 0671249878
   var libraryMultRecords = /Availability/;

   GM_xmlhttpRequest
      ({
      method:'GET',
      url: libraryUrlPattern + isbn,
      onload:function(results) {
         var page = results.responseText;
         if ( notFound.test(page) )
            {
            link2catalog = false;
            setLibraryHTML(
               isbn,
               "Not carried",
               "Not yet in " + libraryName + " - make a purchase suggestion or request an interlibrary loan!",
               "red"
               );
            }
         else if ( libraryAvailability.test(page) )
            {
            setLibraryHTML(
               isbn,
               "Available",
               "Purchased by " + libraryName + " - click link for availability",
               "green" 
               );
            }
         else if ( libraryCheckedOut.test(page) )
            {
            setLibraryHTML(
               isbn,
               "Available",
               "Purchased by " + libraryName + " - click link for availability",
               "green" 
               );
            }
         else if (libraryMultRecords.test(page) )
            {
            setLibraryHTML(
               isbn,
               "Available",
               "Purchased by " + libraryName + " - click link for availability",
               "green" 
               );
            }
         else
            {
            setLibraryHTML(
               isbn,
               "Error",
               "Error checking " + libraryName,
               "orange"
               );
            }
         }
      });
}

//print status of book below book title
function setLibraryHTML(isbn, title, linktext, color) {
   //GM_log(linktext);  

   var title_node = getTitleNode();
   var h1_node = title_node.parentNode;
   var br = document.createElement('br');

   var link = document.createElement('a');
   link.setAttribute('title', title );

   if (link2catalog == false)
      {
         libraryUrlPattern = "http://www.norwichlibrary.org/pages/interlibrary_loan.htm?title=" + title + "&additional_info=ISBN:";
      }
   link.setAttribute('href', libraryUrlPattern + isbn);

   //resize to 60% to get out of the enlarged h1 size and return back to normal
   link.setAttribute('style','font-size: 60%; color: ' + color);

   var label = document.createTextNode( linktext );
   link.appendChild(label);

   //How lame is this javascript DOM syntax?  Instead of having an insertAfter function, you have an insertBefore
   //and then pass in the .nextSibling attribute of the element.  Really inuitive guys.
   h1_node.insertBefore(link, title_node.nextSibling);
   h1_node.insertBefore(br, title_node.nextSibling);
}

// Find the node containing the book title
function getTitleNode()
{
   var titleNodeId = 'btAsinTitle';

   var nodes = document.evaluate("//span[@id='" + titleNodeId + "']", document, null, XPathResult.UNORDERED_NODE_ITERATOR_TYPE, null);
   if(!nodes){
      return null;
   }

   var thisNode = nodes.iterateNext(); 
   var titleNode;
   // Get the last node
   while(thisNode){
      //GM_log( thisNode.textContent );
      titleNode = thisNode;
      thisNode = nodes.iterateNext();
   }

   if (titleNode == null) {
        GM_log("can't find title node");
      return null;
   } else {
       // GM_log("Found title node: " + titleNode.textContent);
   }

   return titleNode;

}

}
)();
