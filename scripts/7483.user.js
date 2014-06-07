// ==UserScript==
// @name          Amazon Library Search v2
// @namespace     http://www.muhlenberg.edu
// @description   Search library catalog(s) from Amazon listing.
// @include       http://*.amazon.*

// TODO: better error handling
// TODO: understand why script is loaded multiple times (for frames?),
//       & modify so it detects & skips when appropriate

// Modified by Clif Kussmaul    2010-04-21 for Amazon ebooks
// Modified by Clif Kussmaul    2008-05-11 for Amazon changes
// Modified by Clif Kussmaul    2007-05-02 to search in multiple ways
// Modified by Emily Clasper    2006-12-07
// Modified by Ryan Singel      2006-10-19
// Modified by David Waghalter  2005-12-15 (LA library script)
// Modified by Matthew Bachtell 2005-11-01
// Modified by Prakash Rudraraju (http://www.indiagram.com/)
// Modified by Ian Irving (http://www.FalsePositives.com) 
//   making libraryUrlPattern and libraryName separate variables and then modifying it for the Toronto Public Library
// Original Work done by, and all credit to, Carrick Mundell (http://www.mundell.org) 
//   for the Seattle Public Library: 
//     http://www.mundell.org/2005/04/27/librarylookup-greasemonkey-script/

// A. To configure for a site other than Amazon:
//   1. set the "var header" line to find the appropriate insertion point
//   2. extract the appropriate data for "var data"
//
// B. To configure for one or more libraries:
//   1. create an associative array with the URL for each search type (e.g. author, isbn, title)
//   2. call addSite() with header, data, library name, and the associative array
// ==/UserScript==

function addLink(linkDiv, libraryName, label, url, match) {
  if (match) {
    var link  = document.createElement('a');
    // replace space and punctuation with +
    match     = match.replace(/[?&,:. ]+/g, '+');
    link.setAttribute('title', 'Find ' + label + ' in ' + libraryName);
    link.setAttribute('href' , url + match);
    link.innerHTML = ' <strong>' + label + '</strong> ' ;      
    linkDiv.appendChild(link);
  }
}

function addSite(header, data, lib, urlList) {
//  alert("adding site: " + lib);
  if (header) {
    // create div to contain links
    var linkDiv = document.createElement('div');
    linkDiv.innerHTML = lib + ': ';
    // create link for each key that is in both urlList and data
    for ( key in urlList ) {
      if (data[key]) addLink(linkDiv, lib, key, urlList[key], data[key]);
    }
    // insert linkDiv iff it contains links
    if (linkDiv.childNodes.length > 1) {
      header.parentNode.insertBefore(linkDiv, header);
    }
  }
}
  
// A. extract data and find position to insert links

// was "//div[@class='buying']"
var header = document.evaluate("//table[@class='buyBox']", document, null, 
                                XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;

var data   = new Object();
var match;
// assumes title has form: Amazon.com: <title>: <author> : <type>
// - check for result before indexing array to avoid exceptions
match = document.title.match(/^[^:]+: (.+): ([^:]+):[^:]+$/);
if (match) data['Author'       ] = match[2];
match = document.title.match(/^[^:]+: (.+): ([^:]+):[^:]+$/);
if (match) data['Title'        ] = match[1];
match = window.content.location.href.match(/\/(\d{9}[\d|X])\//);
if (match) data['ISBN'         ] = match[1];
data['Author&Title' ] = data['Author'] + ' ' + data['Title'];

// B. add sites - for each one, create associative array and call addSite()

var bs = new Object();
bs['ISBN'] = 'http://bookscouter.com/prices.php?isbn=';
addSite(header, data, 'BookScouter', bs);

var mberg = new Object();
// author search assumes lastname first
//mberg['author'] = 'http://library.muhlenberg.edu/search/?searchtype=a&searcharg=';
mberg['Author'] = 'http://library.muhlenberg.edu/search/X?';
mberg['ISBN'  ] = 'http://library.muhlenberg.edu/search/?searchtype=i&searcharg=';
mberg['Title' ] = 'http://library.muhlenberg.edu/search/?searchtype=t&searcharg=';
addSite(header, data, 'Muhlenberg', mberg);

var wcat = new Object();
wcat['Author'] = 'http://www.worldcat.org/search?q=au%3A';
wcat['ISBN'  ] = 'http://www.worldcat.org/search?q=isbn%3A';
wcat['Title' ] = 'http://www.worldcat.org/search?q=ti%3A';
addSite(header, data, 'WorldCat', wcat);

var goog = new Object();
goog['Author'       ] = 'http://www.google.com/search?hl=en&lr=&q=';
goog['Title'        ] = 'http://www.google.com/search?hl=en&lr=&q=';
goog['Author&Title' ] = 'http://www.google.com/search?hl=en&lr=&q=';
addSite(header, data, 'Google', goog);
