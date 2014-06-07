// ==UserScript==
// @name          Amazon OCLS (FL) Linky
// @namespace     http://beachy.freeshell.org/greasemonkey/
// @description	  Search the Orange County Public Library (FL) Catalog from Amazon book listings, copied from NYPL version.
// @include       http://*.amazon.*
// ==/UserScript==

(

function()
{

var libraryUrlPattern = 'http://iii.ocls.info/search/a?a&searchtype=i&searcharg='
var libraryName = 'the Orange County Public ';
var libraryAvailability = /CHECK SHELVES/;
var libraryAvailability2 = /AVAILABLE\/SHELVING/;
var libraryOrdered = /ordered for/;
var libraryCheckedOut = /Checked Out/;
var libraryOnHold = /\+1 Hold/;
var libraryInProcess = /In Processing/;
var notFound = /No matches found; nearby ISBN\/ISSNS are:/

var libraryLookup = 
    {
    insertLink: function(isbn, hrefTitle, aLabel, color )
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
        link.setAttribute('href', libraryUrlPattern + isbn);
        link.setAttribute('style','color: ' + color);

        var label = document.createTextNode( aLabel );

        link.appendChild(label);

        div.insertBefore(newTitle, origTitle);
        div.insertBefore(br, origTitle);
        div.insertBefore(link, origTitle);
        div.removeChild(origTitle);
        },

    doLookup: function ( isbn )
        {
        GM_xmlhttpRequest
            ({
            method:'GET',
            url: libraryUrlPattern + isbn,
            onload:function(results)
                {
                page = results.responseText;
                if ( notFound.test(page) )
                    {
                    var due = page.match(notFound)[1]
                    libraryLookup.insertLink (
                        isbn,
                        "Not carried",
                        "Not available at " + libraryName + " Library",
                        "red"
                        );
                    }
                else if ( libraryAvailability.test(page) || libraryAvailability2.test(page))
                    {
                    libraryLookup.insertLink (
                        isbn,
                        "On the shelf now!",
                        "Available in " + libraryName + " Library!",
                        "green"
                        );
                    }
                else if ( libraryCheckedOut.test(page) )
                    {
                    libraryLookup.insertLink (
                        isbn,
                        "Currently checked out.",
                        "Checked out of " + libraryName + " Library!",
                        "red"
                        );
                    }
                else if ( libraryOnHold.test(page) )
                    {
                    libraryLookup.insertLink (
                        isbn,
                        "On Hold",
                        "On hold at " + libraryName + " Library.",
                        "#AA7700"  // dark yellow
                        );
                    }
                else if ( libraryInProcess.test(page) )
                    {
                    libraryLookup.insertLink (
                        isbn,
                        "In process!",
                        "In process (available soon) at " + libraryName + " Library!",
                        "#AA7700"  // dark yellow
                        );
                    }
                else if ( libraryOrdered.test(page) )
                    {
                    libraryLookup.insertLink (
                        isbn,
                        "Ordered!",
                        "Book has been ordered (available soon) for " + libraryName + " Library!",
                        "#AA7700"  // dark yellow
                        );
                    }
                else
                    {
                    libraryLookup.insertLink (
                        isbn,
                        "Error",
                        "Error checking " + libraryName + " Library",
                        "orange"
                        );
                    }
                }
            });
        }


    }

try 
    { var isbn = window.content.location.href.match(/\/(\d{7,9}[\d|X])\//)[1];  }
catch (e)
    { return; }

var origTitle = document.evaluate("//b[@class='sans']", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null ).singleNodeValue;

if ( ! origTitle )
  { return; }

libraryLookup.doLookup(isbn);

}
)();
