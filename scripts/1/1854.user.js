// ==UserScript==
// @name          Minuteman Library Network LibraryLookup
// @namespace     http://forestfortrees.edublogs.org/
// @description   Check availability in Minuteman Library Network (Massachusetts) on Amazon. Based on LibraryLookup by Jon Udell.
// @include       http://*.amazon.*
// ==/UserScript==

// Thanks to Jon Udell (http://weblog.infoworld.com/udell/stories/2002/12/11/librarylookup.html) and Matt Thompson (http://ucsub.colorado.edu/~thompsma).

(

function()
{

var libraryUrlPattern = 'http://library.minlib.net/search/i='
var libraryName = 'Minuteman Library Network';
var libraryAvailability = /AVAILABLE/;
var libraryDueBack = /DUE (\d{2}\-\d{2}\-\d{2})/;

var libraryLookup = 
    {
    insertLink: function(isbn, hrefTitle, aLabel, due )
        {
        var div = origTitle.parentNode;
        var title = origTitle.firstChild.nodeValue;

        var newTitle = document.createElement('b');
        newTitle.setAttribute('class','sans');

        var titleText = document.createTextNode(title);
        newTitle.appendChild(titleText);
        
        var sp = document.createElement('br');

        var link = document.createElement('a');
        link.setAttribute ( 'title', hrefTitle );
        link.setAttribute('href', libraryUrlPattern + isbn);
		link.setAttribute('style', 'background-color: ffff99');

        var label = document.createTextNode( aLabel );

        link.appendChild(label);

        div.insertBefore(newTitle, origTitle);
        div.insertBefore(sp, origTitle);
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
                if ( libraryAvailability.test(page) )
                    {
                    libraryLookup.insertLink (
                      isbn,
                      "On the shelf now!",
                      "Available through the " + libraryName
                       );
                    }
                if ( libraryDueBack.test(page) )
                    {
                    var due = page.match(libraryDueBack)[1]
                    libraryLookup.insertLink (
                        isbn,
                        "Due back " + due,
                        "Due back through the " + libraryName + " on " + due
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

