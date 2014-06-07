// ==UserScript==
// @name          Minuteman Public Library Network
// @description   On Amazon, display search links by ISBN, Author, and Title in MPLN. Cobbled together from LibraryLookup by Jon Udell.
// @include       *.amazon.*/*
// ==/UserScript==

(

function()
{

var libraryISBNUrlPattern = 'http://library.minlib.net/search/i?SEARCH='
var libraryAuthorUrlPattern = 'http://library.minlib.net/search/a?SEARCH='
var libraryTitleUrlPattern = 'http://library.minlib.net/search/t?SEARCH=='

var libraryName = 'Minuteman Public Library Network';
var notFound = /Sorry, could not find anything matching/

var libraryLookup =
    {
    insertLinks: function(isbn, auth)
        {
        var div = origTitle.parentNode;
        var title = origTitle.firstChild.nodeValue;

        var newTitle = document.createElement('b');
        newTitle.setAttribute('class','sans');

        var titleText = document.createTextNode(title);
        newTitle.appendChild(titleText);

        var br = document.createElement('br');

        div.insertBefore(newTitle, origTitle);
        div.insertBefore(br, origTitle);

        div.insertBefore(document.createTextNode("MLN Search: "), origTitle);

        var link = document.createElement('a');
        link.setAttribute ( 'title', "ISBN" );
        link.setAttribute('href', libraryISBNUrlPattern + isbn);
        var label = document.createTextNode( "ISBN" );
        link.appendChild(label);
        div.insertBefore(link, origTitle);
        div.insertBefore(document.createTextNode(" | "), origTitle);

        var link = document.createElement('a');
        link.setAttribute ( 'title', "AUTH" );
        link.setAttribute('href', libraryAuthorUrlPattern + auth);
        label = document.createTextNode( "AUTH" );
        link.appendChild(label);
        div.insertBefore(link, origTitle);
        div.insertBefore(document.createTextNode(" | "), origTitle);

        title = title.replace("(Paperback)","").replace("(Harcover)","");
        link = document.createElement('a');
        link.setAttribute ( 'title', "TITLE" );
        link.setAttribute('href', libraryTitleUrlPattern + title);
        label = document.createTextNode( "TITLE" );
        link.appendChild(label);
        div.insertBefore(link, origTitle);

        div.removeChild(origTitle);
        }
    }


try
    {var isbn = window.content.location.href.match(/\/(\d{7,9}[\d|X])\//)[1];  }
catch (e)
    {  }
try
    { var auth = document.body.innerHTML.match(/field-author-exact=(.*)&/)[1].replace("%20", " "); }
catch (e)
    {  }
var origTitle = document.evaluate("//b[@class='sans']", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null ).singleNodeValue;

if ( ! origTitle )
  { return; }

libraryLookup.insertLinks(isbn, auth);

}
)();



