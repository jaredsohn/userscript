// ==UserScript==
// @name          University of North Carolina Google Books Linky
// @description	  Search the University of North Carolina Library Catalog from Google Books listings.
// @include       http://books.google.*
// ==/UserScript==

// fixed for Firefox 1.5 and GM 0.6.4
//
// Adapted from the AADL GoogleBooks written by Edward Vielmetti, emv@superpatron.com
// Original from Jon Udell "Library Lookup"
// adapted from SPL Linky by Carrick Mundell
// Suggested by Jessamyn West and Kevin Yezbick
// Javascript help by Gordon Mohr
//
// When you are looking at Google Books, you will be
// able to see at a glance whether the University of North Carolina
// owns a copy of the book.
//


(

function()
{

var libraryUrlPattern = 'http://webcat.lib.unc.edu/search/i?';
var libraryUrlPatternTrailer = '&searchscope=1';
var libraryName = 'University of North Carolina';
var libraryAvailability = /CHECKED IN/;
var libraryReference = /LIB USE ONLY/;
var libraryInProcess = /IN PROCESS/;
var libraryEbook = /[computer file]/;
var libraryDue = /DUE (\d\d\-\d\d\-\d\d)/;
var libraryMissing = /MISSING/;
var libraryTransit = /IN TRANSIT/;
var libraryElectronic = /[electronic resource]/;
var libraryHolds = /ON HOLDSHELF/;
var notFound = /would be here/;


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
        link.setAttribute('href', libraryUrlPattern + isbn + libraryUrlPatternTrailer);
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
            url: libraryUrlPattern + isbn + libraryUrlPatternTrailer,
            onload:function(results)
                {
                page = results.responseText;
                if ( notFound.test(page) )
                    {
                    var due = page.match(notFound)[1]
                    libraryLookup.insertLink (
                        isbn,
                        "This version not carried, keep in mind varied editions of the work",
                        "Not in the " + libraryName + " Libraries",
                        "red"
                        );
                    }
		else if ( libraryHolds.test(page) )
                    {                  
			libraryLookup.insertLink (
                        isbn,                      
			"Item Being Held",
                        "Item Being Held at the" + libraryName + " Libraries",
                        "#AA7700"  // dark yellow
                        );
		    }	
                else if ( libraryAvailability.test(page) )
                    {
                    libraryLookup.insertLink (
                        isbn,
                        "On the shelf now!",
                        "Available in the " + libraryName + " Libraries!",
                        "green"
                        );
                    }
		else if ( libraryReference.test(page) )
                    {
                    libraryLookup.insertLink (
                        isbn,
                        "Reference Materials",
                        "Available for Libary Use Only in the " + libraryName + " Libraries",
                        "#E07B8F"  // fuschia maybe
                        );
                    }  
		else if ( libraryInProcess.test(page) )
                    {
                    libraryLookup.insertLink (
                        isbn,
                        "In process!",
                        "In process (available soon) at the " + libraryName + " Libraries!",
                        "#AA7700"  // dark yellow
                        );
                    }	
		else if ( libraryDue.test(page) )
                    {   
                    var due = page.match(libraryDue)[1]
                    libraryLookup.insertLink (
                        isbn,
			"Due back",
                        "Due back at " + libraryName + " Library on " + due,
                        "#AA7700"
                        );
                    }
		else if ( libraryMissing.test(page) )
                    {
                    libraryLookup.insertLink (
                        isbn,
                        "Missing",
                        "This item is listed as Missing from the  " + libraryName + " Libraries",
                        "#F07F00"  // orange
                        );
                    }  
		else if ( libraryTransit.test(page) )
                    {
                    libraryLookup.insertLink (
                        isbn,
                        "In Transit",
                        "This item is in transit amongst the   " + libraryName + " Libraries",
                        "#F07F00"  // orange
                        );
                    }    
		else if ( libraryElectronic.test(page) )
                    {
                    libraryLookup.insertLink (
                        isbn,
                        "Multiple Formats",
                        "This item is available in multiple formats through the " + libraryName + " Libraries",
                        "#107FBF"  // bluie
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
    { var isbn = document.body.textContent.match(/(\d{7,9}[\d|X])/)[1];  }
catch (e)
    { return; }

var origTitle = document.evaluate("//span[@class='title']", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null ).singleNodeValue;

if ( ! origTitle )
  { return; }

libraryLookup.doLookup(isbn);

}
)();

