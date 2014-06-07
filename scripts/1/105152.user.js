// ==UserScript==
// @name Chicago Public Library - Search Links
// @namespace tag:corusir5,2011-06-18:ChicagoPublicLibrarySearchLinks
// @description Provides links to Google Books and Amazon on Chicago Public Library book search results.
// @version 0.1
// @author corusir5
// @include http://www.chipublib.org/search/*
// ==/UserScript==

// These are for testing if we're on the search results listing or
// if we're looking at information on a particular item.
resultsRegex = /http:\/\/www.chipublib.org\/search\/results\/.*/;
detailRegex = /http:\/\/www.chipublib.org\/search\/details\/.*/;

if (resultsRegex.test(location.href)) {
    // We're on search results page; link to Google Books and Amazon results.
    
    // First we find out the query.
    search = document.getElementById('refinesource');
    for (var i = 0; i < search.childNodes.length; i++) {
        child=search.childNodes[i];
        if (child.className == 'yourSearchRefine') {
            var searchRegex = /\b[^\(\)]+\b/;
            var query = searchRegex.exec(child.childNodes[1].firstChild.nodeValue);
            break;
        }
    }

    // We'll put our new links after the sort-by form with link to print page.
    place = document.getElementById('sortByForm').parentNode;

    // Now we add the links.
    gbksLink = document.createElement('a');
    gbksLink.href = "http://books.google.com/search?q="+query+"&tbm=bks";
    gbksLink.title = 'Search for "'+query+'" in Google Books.';
    gbksLink.appendChild(document.createTextNode('Search for "'+query+'" in Google Books.'));
    place.parentNode.insertBefore(gbksLink,place.nextSibling);
    place.parentNode.insertBefore(document.createElement('br'), gbksLink.nextSibling);
    
    aLink = document.createElement('a');
    // Thanks to Dave Taylor's post at http://www.askdavetaylor.com/how_to_create_amazon_search_links.html
    // for explaining how to do this.
    aLink.href = "http://www.amazon.com/s?url=search-alias%3Daps&field-keywords="+query;
    aLink.title = 'Search for "'+query+'" on Amazon.';
    aLink.appendChild(document.createTextNode('Search for "'+query+'" on Amazon.'));
    place.parentNode.insertBefore(aLink, gbksLink.nextSibling.nextSibling);

}
    
if (detailRegex.test(location.href)) {
    // We're looking at a single search result; if this is a book, add links to look
    // it up on Google Books or Amazon.
    
    // First, try to figure out the ISBN.
    var isbn = null;

    isbnRegex = /\<b class=\"bibLabel\"\>ISBN:<\/b\> ([0-9]{10,13}).*\<br\>\s*/;
    var snapshotResults=document.evaluate("//div[@id='bibRecord']/p", document, null,
                                      XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

    for (var i = 0; i < snapshotResults.snapshotLength; i++) {
        var item = snapshotResults.snapshotItem(i);
        if (isbnRegex.test(item.innerHTML)) {
            isbn = isbnRegex.exec(item.innerHTML)[1];
        }
    }

    if (isbn == null) { // this isn't a book (perhaps a periodical, etc.); terminate
        return;
    }

    // Now, generate links to Google Books and Amazon.
    var glink = document.createElement('a');
    glink.href = "http://books.google.com/books?vid=ISBN"+isbn;
    glink.title="View this book in Google Books";
    glink.appendChild(document.createTextNode("View this book in Google Books"));
    var gwrapper = document.createElement('p');
    gwrapper.appendChild(glink);
    gwrapper.appendChild(document.createElement('br'));

    var alink = document.createElement('a');
    // In cases where there is both a 10 and a 13-digit ISBN going directly
    // to the Amazon product page may not work (unless we use the correct one),
    // so we just go to search.
    alink.href="http://www.amazon.com/s?url=search-alias%3Daps&field-keywords="+isbn;
    alink.title = "View this book in Amazon";
    alink.appendChild(document.createTextNode("View this book in Amazon"));
    var awrapper = document.createElement('p');
    awrapper.appendChild(alink);
    awrapper.appendChild(document.createElement('br'));

    // Now, place links at end of book information.
    var bookInfo = document.getElementById('bibRecord');
    bookInfo.appendChild(gwrapper);
    bookInfo.appendChild(awrapper);

}
