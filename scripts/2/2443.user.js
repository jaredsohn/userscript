// Amazon SLC Linky
// version 0.1
// 2005-12-15
// Based on the Amazon SPL Linky script by Carrick Mundell (http://www.mundell.org)
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "Amazon SLC Linky", and click Uninstall.
//
// --------------------------------------------------------------------
// ==UserScript==
// @name          Amazon SLC Linky
// @namespace     http://www.studiomoustache.com
// @description	  Search the Salt Lake City Public Library Catalog from Amazon book listings.
// @include       http://*.amazon.*
// ==/UserScript==

(

function()
{

var libraryUrlPattern = 'http://salty.slcpl.lib.ut.us/search/i?SEARCH='
var libraryName = 'Salt Lake City Public Library';
var libraryAvailability = /AVAILABLE/;
var libraryOnOrder = /ordered/;
var libraryInProcess = /being processed/;
var libraryNonCirculating = /NONCIRCULATING/;
var libraryDueBack = /DUE \d\d-\d\d-\d\d/;
var notFound = /No matches found/

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
                        "Not at the " + libraryName,
                        "red"
                        );
                    }
                else if ( libraryAvailability.test(page) )
                    {
                    libraryLookup.insertLink (
                        isbn,
                        "On the shelf now!",
                        "Available at the " + libraryName,
                        "green"
                        );
                    }
                else if ( libraryOnOrder.test(page) )
                    {
                    libraryLookup.insertLink (
                        isbn,
                        "On order!",
                        "On order at the " + libraryName,
                        "#AA7700"  // dark yellow
                        );
                    }        
				 else if ( libraryNonCirculating.test(page) )
                    {
                    libraryLookup.insertLink (
                        isbn,
                        "Non-circulating",
                        "This book is non-circulating at the " + libraryName,
                        "#AA7700"  // dark yellow
                        );
                    }             
                else if ( libraryInProcess.test(page) )
                    {
                    libraryLookup.insertLink (
                        isbn,
                        "In process!",
                        "In process (available soon) at the " + libraryName,
                        "#AA7700"  // dark yellow
                        );
                    }                    
                else if ( libraryDueBack.test(page) )
                    {
                    var dueString = new String(page.match(libraryDueBack))
					var dueDate = dueString.slice(4)
                    libraryLookup.insertLink (
                        isbn,
                        "Due back " + dueDate,
                        "Due back at the " + libraryName + " on " + dueDate,
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