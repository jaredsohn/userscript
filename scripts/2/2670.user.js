// ==UserScript==
// @name          Amazon Loudoun County Public Library Linky
// @namespace     
// @description	  Search the Loudoun County Public Library Catalog from Amazon book listings.
// @include       http://*.amazon.*
// 
// Modified 01/19/2006
// ==/UserScript==


(

function()
{

var libraryUrlPattern = 'http://catalog.lcpl.lib.va.us/ipac20/ipac.jsp?index=ISBNE&npp=20&ipp=20&spp=20&term='
var libraryName = 'the Loudoun County Public';
var libraryAvailability = /Checked In/;
var libraryInProcess = /In Process/;
var libraryHeld = /Being Held/;
var libraryDueBack = /Checked out/;
var libraryComingSoon = /Coming Soon/
var libraryShelving = /Shelving cart/
var libraryLost = /Lost/
var libraryMissing = /Missing/
var libraryStorage = /Storage/
var libraryTrace = /Trace/
var notFound = /Sorry, could not find anything matching/

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
                        "could not find anything matching",
                        "Not in " + libraryName + " Library",
                        "red"
                        );
                    }
                else if ( libraryAvailability.test(page) )
                    {
                    libraryLookup.insertLink (
                        isbn,
                        "Checked In",
                        "Available in " + libraryName + " Library!",
                        "green"
                        );
                    }
                else if ( libraryDueBack.test(page) )
                    {
                    var due = page.match(libraryDueBack)[1]
                    libraryLookup.insertLink (
                        isbn,
                        "Checked out" + due,
                        "Checked out from " + libraryName + " Library",
                        "#AA7700"  // dark yellow
                        );
                    }
                else if ( libraryHeld.test(page) )
                    {
                    libraryLookup.insertLink (
                        isbn,
                        "Item being held",
                        "This book is being held for another customer.",
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
                else if ( libraryComingSoon.test(page) )
                    {
                    libraryLookup.insertLink (
                        isbn,
                        "Coming soon!",
                        "Coming soon to " + libraryName + " Library!",
                        "#AA7700"  // dark yellow
                        );
                    }
                else if ( libraryShelving.test(page) )
                    {
                    libraryLookup.insertLink (
                        isbn,
                        "On shelving cart!",
                        "On shelving cart at " + libraryName + " Library!",
                        "#AA7700"  // dark yellow
                        );
                    }
                else if ( libraryStorage.test(page) )
                    {
                    libraryLookup.insertLink (
                        isbn,
                        "In storage",
                        "In storage at " + libraryName + " Library.",
                        "#AA7700"  // dark yellow
                        );
                    }
                else if ( libraryTrace.test(page) )
                    {
                    libraryLookup.insertLink (
                        isbn,
                        "Under trace",
                        "Under a trace at " + libraryName + " Library.",
                        "#AA7700"  // dark yellow
                        );
                    }
                else if ( libraryMissing.test(page) )
                    {
                    libraryLookup.insertLink (
                        isbn,
                        "Missing!",
                        "Missing from " + libraryName + " Library!",
                        "red"
                        );
                    }
                else if ( libraryLost.test(page) )
                    {
                    libraryLookup.insertLink (
                        isbn,
                        "Lost!",
                        "Lost from " + libraryName + " Library!",
                        "red"
                        );
                    }
                else
                    {
                    libraryLookup.insertLink (
                        isbn,
                        "Error",
                        "There was an error checking the status at " + libraryName + " Library. You can always click and check manually.",
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

