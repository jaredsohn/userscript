// ==UserScript==
// @name          Amazon MSPPL Linky
// @description   Search the Minneapolis Public Library Catalog from Amazon book listings. 
// @include       http://*.amazon.*
// ==/UserScript==


(

function()
{
var libraryUrlPattern =' http://mplwebcat.mplib.org/search/i?SEARCH='
var libraryName = 'the Minneapolis Public';
var libraryAvailability = /NOT CHCKD OUT/;
var libraryInProcess = /IN TRANSIT/;
//var libraryDueBack = /(\d{2} \w{3} \d{2})/; 
var libraryDueBack = /DUE/;
var libraryComingSoon = /Coming Soon/;
var libraryShelving = /ON HOLDSHELF/;
var libraryHold = /HOLD/;
var libraryLost = /LOST/;
var libraryMissing = /MISSING/;
var libraryStorage = /STORAGE/;
var libraryTrace = /TRACE/; 
var notFound = /No matches found/;

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
                        "Not in " + libraryName + " Library",
                        "red"
                        ); 
                    }
                else if ( libraryAvailability.test(page) )
                    {
                    libraryLookup.insertLink (
                        isbn,
                        "On the shelf now!", 
                        "Available in " + libraryName + " Library!",
                        "green"
                        );
                    }
      else if ( libraryInProcess.test (page) )
                    {
                    libraryLookup.insertLink (
                        isbn,
                        "In transit!",
                        "In transit (available soon) at " + libraryName + " Library!", 
                        "#AA7700"  // dark yellow
                        );
                    }
                else if ( libraryDueBack.test(page) )
                    {
                    var due = page.match(libraryDueBack);     

                    libraryLookup.insertLink (
                        isbn,
                        "Due back " + due,
                        "Due back at " + libraryName + " Library on " + due, 
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
			  else if ( libraryHold.test(page) )
                    {
                    libraryLookup.insertLink (
                        isbn,
                        "On Hold!",
                        "On Hold at " + libraryName + " Library!",
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

