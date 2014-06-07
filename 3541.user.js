// ==UserScript==
// @name          SunnyvaleLibraryLookup
// @namespace     http://nahhhh.com
// @description   Check availability in Sunnyvale libraries
// @include       http://*.amazon.*
// ==/UserScript==

(

function()
{
var libraryUrlPattern = 'http://sunset.ci.sunnyvale.ca.us/search/i?SEARCH=' 
var libraryName = 'Sunnyvale'; 
var libraryAvailability = /Author/;
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
        
        var br = document.createElement('br');

        var link = document.createElement('a');
        link.setAttribute ( 'title', hrefTitle );
        if (isbn == 0) {
          link.setAttribute('href', 'http://sunset.ci.sunnyvale.ca.us/search');
        } else {
          link.setAttribute('href', libraryUrlPattern + isbn);
        }

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
                if ( libraryAvailability.test(page) )
                    {
                    libraryLookup.insertLink (
                      isbn,
                      "Found!",
                      "Found in " + libraryName + " Library!"
                       );
                    } else {
                      libraryLookup.insertLink ( 0,
                                                 "Not available",
                                                 "Not found in " + libraryName + " Library" );
                    }
                }
            });
        }


    }

try 
    { var isbn = window.location.href.match(/\/(\d{7,9}[\d|X])\//)[1];  }
catch (e)
    { return; }

var origTitle = document.evaluate("//b[@class='sans']", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null ).singleNodeValue;

if ( ! origTitle )
  { return; }

libraryLookup.doLookup(isbn);

}
)();
