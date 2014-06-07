// Google Books TSU Linky with Safari
// version 0.1
// 2006-03-13
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.  To install it, you need
// Greasemonkey 0.3 or later: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "Google Books TSU Linky", and click Uninstall.
//
// --------------------------------------------------------------------
//
// Modified by Walt Howd, whowd@truman.edu
// Written by Edward Vielmetti, emv@superpatron.com
// Original from Jon Udell "Library Lookup"
// adapted from SPL Linky by Carrick Mundell
// Suggested by Jessamyn West and Kevin Yezbick
// Javascript help by Gordon Mohr
//
// When you are looking at Google Books, you will be
// able to see at a glance whether the Truman Library
// owns a copy of the book. You can also see if the 
// book is available online via our Safari subscription.
//
// More at http://www.superpatron.com
// Weblog at http://vielmetti.typepad.com/superpatron
// Library Camp April 14, 2006, Ann Arbor, MI:
//   http://vielmetti.typepad.com/superpatron/2006/03/april_14_2006_l.html
//
// ==UserScript==
// @name          Google Books TSU Linky
// @namespace     http://www2.truman.edu/~whowd/
// @description	  Search the Truman State Library from Google Books listings.
// @include       http://books.google.*
// ==/UserScript==

(

function()
{
var libraryUrlPattern = 'http://lance.missouri.edu/search/i?';
var libraryUrlPatternTrailer = '&extended=1&searchscope=6';
var libraryName = 'Truman State University Library Catalog';
var libraryAvailability = /AVAILABLE/;
var libraryOnOrder = /ordered for Library System/;
var libraryInProcess = /being processed for Library System/;
var libraryHolds = /(\d+) holds on First Copy Returned/;
var libraryDue = /DUE (\d\d\-\d\d\-\d\d)/;
var notFound = /No matches found; nearby ISN/;

var safariUrlPattern = 'http://proquest.safaribooksonline.com/JVXSL.asp?xmlid=';
var safariAvailability = /Table of Contents/;
var safariNotFound = /Not part of your subscription/;

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
	div.insertBefore(document.createElement('br'), origTitle);	
        div.insertBefore(link, origTitle);	

	},
	
    safariLink: function(isbn, hrefTitle, aLabel, color )
        {
        var div = origTitle.parentNode;        
        var br = document.createElement('br');

        var safarilink = document.createElement('a');
        safarilink.setAttribute ( 'title', hrefTitle );
        safarilink.setAttribute('href', safariUrlPattern + isbn);
        safarilink.setAttribute('style','color: ' + color);	

        var safarilabel = document.createTextNode( aLabel );

        safarilink.appendChild(safarilabel);
		      
	div.insertBefore(document.createElement('br'), origTitle);	
        div.insertBefore(safarilink, origTitle);	
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
                        "Not carried",
                        "Not in " + libraryName + " Library",
                        "red"
                        );
                    }
                else if ( libraryHolds.test(page) )
                    {
                    var holds = page.match(libraryHolds)[1]
                    var due = page.match(libraryDue)[1]
                    libraryLookup.insertLink (
                        isbn,
                        holds + " Holds",
                        holds + " Holds, " + "Due back at " + libraryName + " Library on " + due,
                        "#AA7700"  // dark yellow
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
                else if ( libraryOnOrder.test(page) )
                    {
                    libraryLookup.insertLink (
                        isbn,
                        "On order!",
                        "On order at " + libraryName + " Library!",
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
	    GM_xmlhttpRequest
            ({
            method:'GET',
            url: safariUrlPattern + isbn,
            onload:function(safariresults)
                {
                page = safariresults.responseText;
                if ( safariNotFound.test(page) )
                    {
                    var due = page.match(safariNotFound)[1]
                    libraryLookup.safariLink (
                        isbn,
                        "Not in subscription",
                        "Not in Safari Subscription!",
                        "red"
                        );
                    }
                else if ( safariAvailability.test(page) )
                    {
                    libraryLookup.safariLink (
                        isbn,
                        "Read online now!",
                        "Read online at Safari!",
                        "green"
                        );
                    }
                else
                    {
                    libraryLookup.safariLink (
                        isbn,
                        "Error",
                        "Error checking Safari Availability",
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
