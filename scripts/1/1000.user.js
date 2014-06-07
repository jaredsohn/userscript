// ==UserScript==
// @name          Missouri River Regional Library
// @namespace     http://www.mrrl.org/scripts/mrrl+library+amazon+greasemonkey
// @description   On Amazon, display book availability in the Missouri River Regional Library. Based on LibraryLookup by Jon Udell.
// @include       *.amazon.*/*
// ==/UserScript==

(

function()
{

var libraryUrlPattern = 'http://catalog.mrrl.org/search/i'
var libraryName = 'Missouri River Regional Library';
var libraryAvailability = /ON SHELF/;
var libraryDueBack = /DUE/;
var notFound = /No matches found/;
var processing = /being processed/;

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
                        "Not in " + libraryName,
						"red"
                        );
                    }
                else if ( libraryAvailability.test(page) )
                    {
                    libraryLookup.insertLink (
                      	isbn,
                 	    "On the shelf now!",
                        "Available in " + libraryName,
					    "green"
                         );
                    }
				 else if ( processing.test(page) )
                    {
                    libraryLookup.insertLink (
                      	isbn,
                 	    "Coming Soon!",
                        "Coming soon to " + libraryName,
					    "blue"
                         );
                    }
                else if ( libraryDueBack.test(page) )
                    {
                    libraryLookup.insertLink (
                        isbn,
						"Not available!",
                        "Currently checked out of " + libraryName + " - place a hold on (request) the item",
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
    { var isbn = window._content.location.href.match(/\/(\d{7,9}[\d|X])\//)[1];  }
catch (e)
    { return; }

var origTitle = document.evaluate("//b[@class='sans']", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null ).singleNodeValue;


if ( ! origTitle )
  { return; }

libraryLookup.doLookup(isbn);

}
)();