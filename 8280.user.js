// ==UserScript==
// @name          Amazon-Harold B. Lee Library Lookup
// @namespace     http://beta.lib.byu.edu/greasemonkey/
// @description	  Search the Harold B. Lee Library Catalog from Amazon book listings.
// @include       http://*.amazon.*
// ==/UserScript==

// Original script from Amazon-Hennepin County Library Lookup (http://userscripts.org/scripts/show/4167)
// Adapted for the Harold B. Lee Library by Jared Howland
// Version 0.1
// Released 2007-03-22

(

function()
{

var libraryUrlPattern = 'http://labs.oclc.org/xisbn/liblook?baseURL=http://catalog.lib.byu.edu&opacID=sirsi9&isbn='
var libraryURLPatternForLink = 'http://labs.oclc.org/xisbn/liblook?baseURL=http://catalog.lib.byu.edu&opacID=sirsi9&isbn='
var libraryName = 'Harold B. Lee';


var libraryLookup = 
    {
    insertLink: function(isbn, hrefTitle, aLabel, color)
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
        link.setAttribute('href', libraryURLPatternForLink + isbn);
        link.setAttribute('style','color: ' + color + '\;' + 'background-color:#ff9');

        var label = document.createTextNode( aLabel );

        link.appendChild(label);

        div.insertBefore(newTitle, origTitle);
        div.insertBefore(br, origTitle);
        div.insertBefore(link, origTitle);
        div.removeChild(origTitle);
        },

    insertNoMatchLink: function(TheTitle, hrefTitle, aLabel, color)
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
        link.setAttribute('href', libraryURLPatternForNoMatch + TheTitle);
        link.setAttribute('style','color: ' + color + '\;' + 'background-color:#ff9');

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
                    {
                    libraryLookup.insertLink (
                        isbn,
                        "Search for this book at the Harold B. Lee Library",
                        "Check " + libraryName + " Library for this book",
                        "#a70"
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

var origTitle = document.evaluate("//div[@class='buying']/b[@class='sans']", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null ).singleNodeValue;
var TheTitle = origTitle.textContent ;

if ( ! origTitle )
  { return; }

libraryLookup.doLookup(isbn);

}
)();