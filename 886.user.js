// ==UserScript==
// @name          LibraryLookup
// @namespace     http://weblog.infoworld.com/udell
// @description   Check availability in Keene libraries
// @include       http://*.amazon.*
// ==/UserScript==

(

function()
{

var libraryUrlPattern = 'http://ksclib.keene.edu/search/i='
var libraryName = 'Keene';
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
        
        var sp = document.createTextNode(' ');

        var link = document.createElement('a');
        link.setAttribute ( 'title', hrefTitle );
        link.setAttribute('href', libraryUrlPattern + isbn);

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
                      "Hey! It's available in the " + libraryName + " Library!"
                       );
                    }
                if ( libraryDueBack.test(page) )
                    {
                    var due = page.match(libraryDueBack)[1]
                    libraryLookup.insertLink (
                        isbn,
                        "Due back " + due,
                        "Due back at the " + libraryName + " Library on " + due
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