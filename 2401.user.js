// ==UserScript==
// @name          Amazon NYPL Linky
// @namespace     http://beachy.freeshell.org/greasemonkey/
// @description	  Search the New York Public Library Catalog from Amazon book listings.
// @include       http://*.amazon.*
//
// Based on work by Carrick Mundell http://userscripts.org/scripts/show/1396
// ==/UserScript==


(function(){
//    GM_log('the New York Public Library');   

    var libraryUrlPattern = 'http://leopac.nypl.org/ipac20/ipac.jsp?index=ISBN&term=';
    var libraryName = 'the New York Public Library';

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

//connect to library server to get book status for isbn and then insert result under the book title
function getBookStatus(isbn){
    GM_log('the New York Public Library Linky Searching');   

    var libraryAvailability = /checked In/;
    var libraryInProcess = /In Process/;
    var libraryDueBack = /(\d{2} \w{3} \d{2})/;
    var libraryComingSoon = /Coming Soon/;
    var libraryShelving = /Shelving cart/;
    var libraryLost = /Lost/;
    var libraryMissing = /Missing/;
    var libraryStorage = /Storage/;
    var libraryTrace = /Trace/;
    var notFound = /Sorry, could not find anything matching/;

    GM_xmlhttpRequest
        ({
        method:'GET',
        url: libraryUrlPattern + isbn,
        onload:function(results) {
            page = results.responseText;
            if ( notFound.test(page) )
                {
                var due = page.match(notFound)[1]
                setLibraryHTML(
                    isbn,
                    "Not carried",
                    "Not in " + libraryName,
                    "red"
                    );
                }
            else if ( libraryAvailability.test(page) )
                {
                setLibraryHTML(
                    isbn,
                    "On the shelf now!",
                    "Available in " + libraryName,
                    "green"
                    );
                }
            else if ( libraryOnOrder.test(page) )
                {
                setLibraryHTML(
                    isbn,
                    "On order!",
                    "On order at " + libraryName,
                    "#AA7700"  // dark yellow
                    );
                }                   
            else if ( libraryInProcess.test(page) )
                {
                setLibraryHTML(
                    isbn,
                    "In process!",
                    "In process (available soon) in the " + libraryName + "!",
                    "#AA7700"  // dark yellow
                    );
                }                   
            else if ( libraryDueBack.test(page) )
                {
                var due = page.match(libraryDueBack)[1]
                setLibraryHTML(
                    isbn,
                    "Due back " + due,
                    "Due back at " + libraryName + " on " + due,
                    "#AA7700"  // dark yellow
                    );
                }
            else if ( libraryComingSoon.test(page) )
                {
                var due = page.match(libraryComingSoon)[1]
                setLibraryHTML(
                    isbn,
                    "Coming soon!",
                    "Coming soon to " + libraryName + "!",
                    "#AA7700"  // dark yellow
                    );
                }
            else if ( libraryShelving.test(page) )
                {
                var due = page.match(libraryShelving)[1]
                setLibraryHTML(
                    isbn,
                    "On shelving cart!",
                    "On shelving cart at" + libraryName + "!",
                    "#AA7700"  // dark yellow
                    );
                }
            else if ( libraryStorage.test(page) )
                {
                setLibraryHTML(
                    isbn,
                    "In storage",
                    "In storage at the " + libraryName + ".",
                    "#AA7700"  // dark yellow
                    );
                }
            else if ( libraryTrace.test(page) )
                {
                setLibraryHTML(
                    isbn,
                    "Under trace",
                    "Under a trace at the " + libraryName + ".",
                    "#AA7700"  // dark yellow
                    );
                }
            else if ( libraryMissing.test(page) )
                {
                setLibraryHTML(
                    isbn,
                    "Missing!",
                    "Missing from the " + libraryName + "!",
                    "red"
                    );
                }
            else if ( libraryLost.test(page) )
                {
                setLibraryHTML(
                    isbn,
                    "Lost!",
                    "Lost from the " + libraryName + "!",
                    "red"
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
    GM_log(linktext);   

    var titleNode = getBookTitleNode();
    var div = titleNode.parentNode;

    var br = document.createElement('br');

    var link = document.createElement('a');
    link.setAttribute('title', title );
    link.setAttribute('href', libraryUrlPattern + isbn);
    link.setAttribute('style','color: ' + color);

    var label = document.createTextNode( linktext );
    link.appendChild(label);

    //How lame is this javascript DOM syntax?  Instead of having an insertAfter function, you have an insertBefore
    //and then pass in the .nextSibling attribute of the element.  Really inuitive guys.
    div.insertBefore(link, titleNode.nextSibling);
    div.insertBefore(br, titleNode.nextSibling);
}

//find the node associated with the title of the book
//currently this is done by getting all objects that are <b class="sans"> and then taking the last one
function getBookTitleNode(){
    //find all node objects that are <b class="sans">
    var iterator = document.evaluate("//b[@class='sans']", document, null, XPathResult.UNORDERED_NODE_ITERATOR_TYPE, null );

    //get the last node
    try {
      var thisNode = iterator.iterateNext();
     
      while (thisNode) {
    //    GM_log( thisNode.textContent );
        titleNode = thisNode;
        thisNode = iterator.iterateNext();
      }   

    } catch (e) {
      dump( 'Error: Document tree modified during iteraton ' + e );
    }

    //if there was only one instance of <b class='sans'> you could use this code
    //var titleNode = document.evaluate("count(//b[@class='sans'])", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null ).singleNodeValue;

    if ( !titleNode)  {GM_log("can't find title node"); return; }
    return titleNode;
}

}
)();
