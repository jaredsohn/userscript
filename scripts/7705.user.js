// ==UserScript==
// @name          Chicago Public Library - LibraryLookup
// @description   Search the Chicago Public Library Catalog from Amazon book listings.
// @include       http://*.amazon.*
// @creator       Mike Harris
// @source        http://userscripts.org/scripts/show/
// @identifier    http://userscripts.org/scripts/source/
// @grant         GM_log
// ==/UserScript==

// Adapted by Matthew Thompson from
// by Carrick Mundell http://userscripts.org/scripts/show/1396
// Also adapted from http://http://userscripts.org/scripts/review/26033

(function(){
 
   var libraryUrlPattern = 'http://www.chipublib.org/search/results/?keywords=&title=&author=&series=&subject=&controlNumber=&callNumber=&publisher=&range=&published=&published2=&submitButton.x=0&submitButton.y=0&submitButton=Search&location=&format=&language=&audience=allAudiences&fict=allFormats&advancedSearch=submitted&isbn='

   var libraryName = 'Chicago Public Library';

   var isbn = get_isbn(window.content.location.href);
   if (isbn==0) { return;}
   else { getBookStatus(isbn); }


//check if there is a ISBN in the URL
//URL looks like http://www.amazon.com/Liseys-Story-Stephen-King/dp/0743289412/ref=xarw/002-5799652-4968811
function get_isbn(url){
   try { 
      //match if there is a / followed by a 7-9 digit number followed by either another number or an x 
      //followed by a / or end of url 
      var isbn = url.match(/\/(\d{7,9}[\d|X])(\/|$)/)[1]; 
   } catch (e) { return 0; }

   return isbn;
}

function getBookStatus(isbn){
    setLibraryHTML(
        isbn,
        "",
        "Search for title at " + libraryName,
        "" // no special color
    );
}

//print status of book below book title
function setLibraryHTML(isbn, title, linktext, color) {
   //GM_log(linktext);  

   var title_node = getTitleNode();
   var h1_node = title_node.parentNode;

   var br = document.createElement('br');

   var link = document.createElement('a');
   link.setAttribute('title', title );
   link.setAttribute('href', libraryUrlPattern + isbn);
   //resize to 60% to get out of the enlarged h1 size and return back to normal
   link.setAttribute('style','font-size: 60%');

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