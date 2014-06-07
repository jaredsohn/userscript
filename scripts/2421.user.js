// ==UserScript==
// @name          San Joaquin Valley Library System Lookup
// @namespace     http://www.sjvls.org
// @description   Search the San Joaquin Valley Library System from Amazon book listings.  This includes Coalinga, Fresno County, Kern County, Kings County, Madera County, Mariposa County, Porterville, and Tulare County.
// @include       http://*.amazon.*

// Modified by Kevin Ryan, Dec 21, 2005 (http://www.topmeadow.com/)
// Modified by David Waghalter, Dec 15, 2005
// Modified by Matthew Bachtell, 11-01-05
// Modified by Prakash Rudraraju (http://www.indiagram.com/)
// Modified by Ian Irving (http://www.FalsePositives.com) making libraryUrlPattern and libraryName separate variables and then modifying it for the Toronto Public Library
// Original Work done by, and all credit to, Carrick Mundell (http://www.mundell.org) for the Seattle Public Library: http://www.mundell.org/2005/04/27/librarylookup-greasemonkey-script/
// ==/UserScript==

(

function() {
  var libraryUrlPattern1 = 'http://hip1.sjvls.org/ipac20/ipac.jsp?session=113523F79485D.1964&menu=search&aspect=numeric&npp=20&ipp=20&spp=100&profile=fhq&ri=&index=ISBNEX&term=';
  var libraryUrlPattern2 = '&x=4&y=17&aspect=numeric';
  var libraryName = 'San Joaquin Valley Library System';   // what to Call the Library?
  mainmatch = window.content.location.href.match(/\/(\d{9}[\d|X])\//);

if (mainmatch){
    var isbn = mainmatch[1];
    var header = document.evaluate("//b[@class='sans']", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
  // Check LAPL
  if (header) {
      var link = document.createElement('a');
      link.setAttribute('href', libraryUrlPattern1 + isbn + libraryUrlPattern2);
      link.setAttribute('title', libraryName);
      link.innerHTML    = '<br/><strong>Lookup this book at the ' + libraryName + '</strong>' ;

          header.parentNode.insertBefore(link, header.nextSibling);
        }
}
}
)();

