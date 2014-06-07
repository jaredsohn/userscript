// ==UserScript==
// @name          LibraryLookup
// @namespace     http://weblog.infoworld.com/udell
// @description   Check availability in Johnson County public libraries
// @include       http://*.amazon.*
// ==/UserScript==

(

function()
{

var libraryUrlPattern = 'http://ibistro3.jocolibrary.org/uhtbin/cgisirsi/x/SIRSI/0/5/?searchdata1='
var libraryNameLocal = 'Lackman Library';
var libraryInCatalog = /Copy info:/
var libraryAvailable = / available at/
var libraryAtBranch  = new RegExp(' available at.+' + libraryNameLocal)

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
                 if ( libraryAtBranch.test(page) )
                    {
                    libraryLookup.insertLink (
                      isbn,
                      "At " + libraryNameLocal,
                      "Available at " + libraryNameLocal + "!"
                       );
                    }
                if ( libraryAvailable.test(page) )
                    {
                    libraryLookup.insertLink (
                        isbn,
                        "Available",
                        "Available from library"
                        );
                    }
                if ( libraryInCatalog.test(page) )
                    {
                    libraryLookup.insertLink (
                        isbn,
                        "Unavailable",
                        "In Library But Unavailable"
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