// ==UserScript==
// @name          Loudoun County Public Library Amazon Linky
// @namespace     http://www.mundell.org
// @description	  Search the Loudoun County Public Library Catalog from Amazon book listings.
// @include       http://*.amazon.*
// ==/UserScript==

// version 1.1   fixed for Firefox 1.5 and GM 0.6.4

(

function()
{

var libraryUrlPattern = 'http://catalog.lcpl.lib.va.us/ipac20/ipac.jsp?&profile=adm&ri=&index=PISBNEX&term='
var libraryURLPatternForLink = 'http://catalog.lcpl.lib.va.us/ipac20/ipac.jsp?&profile=adm&ri=&index=PISBNEX&term='
var libraryURLPatternForNoMatch = 'http://catalog.lcpl.lib.va.us/ipac20/ipac.jsp?&profile=adm&ri=&index=PALLTI&term='
var libraryName = 'Loudoun County Public';
var libraryAvailability = /Checked In/;
var libraryInProcess = /Newly Acquired/; 
var libraryHeld = /Item being held/;
var libraryCheckOut = /Checked out/;
var libraryDueBack = /(\d{2}\/\d{2}\/\d{4})/;
var libraryElectronic = /Click URL above/;
var libraryComingSoon = /On Order/
var libraryShelving = /Shelving Cart/
var libraryHoldExpired = /Item hold expired/;
var libraryLost = /Lost/
var libraryTransit = /ansit/
var libraryTrace = /Trace/
var notFound = /Sorry, could not find anything matching/

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
        link.setAttribute('style','font-weight:bold; color: ' + color + '\;' + 'background-color:#FFFF99');

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
        link.setAttribute('style','font-weight:bold; color: ' + color + '\;' + 'background-color:#FFFF99');

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
                    libraryLookup.insertNoMatchLink (
                        TheTitle,
                        "Check for other editions!",
                        "This edition is not in " + libraryName + " Library. Click to check for other editions.",
                        "red"
                        );
                    }
				else if ( libraryAvailability.test(page) )
                    {
			    libraryLookup.insertLink (
                        isbn,
                        "On the shelf now!",
                        "Available at " + libraryName + " Library! Click this link to place a request!",
                        "green"
                        );
                    }
				 else if ( libraryElectronic.test(page) )
                    {
                        libraryLookup.insertLink (
                            isbn,
                            "Available electronically",
                            "Available in electronic format from " + libraryName + " Library!",
                            "green"
                        );
                    }
			else if ( libraryShelving.test(page) )
                    {
                    libraryLookup.insertLink (
                        isbn,
                        "On shelving cart!",
                        "On shelving cart at " + libraryName + " Library! Click this link to 				place a request!",
                        "green"
                        );
                    }

			else if ( libraryCheckOut.test(page) )
                    {
			 var duedate = page.match(libraryDueBack)[1]
                    libraryLookup.insertLink (
                        isbn,
                        "Due back" + duedate,
                        "Due back at " + libraryName + " Library on " + duedate + ". Click this link to place a request!",
                        "#CC3366"  // wine color
                        );
			  }
			else if ( libraryHeld.test(page) )
                    {
                    libraryLookup.insertLink (
                        isbn,
                        "Item being held!",
                        "This book is being held for another customer at " + libraryName + " 		Library. Click the link to place a request!",
                        "#9933CC"  // purple
                        );
                    }
 		else if ( libraryHoldExpired.test(page) )
			 {
                    libraryLookup.insertLink (
                        isbn,
                        "Item being held!",
                        "This book is being held for another customer at " + libraryName + " 		Library. Click this link to place a request!",
                        "#9933CC"  // purple
                        ); 
			 }
		else if ( libraryInProcess.test(page) )
                    {
                    libraryLookup.insertLink (
                        isbn,
                        "In process!",
                        "In process (available soon) at " + libraryName + " Library! Click this 		link to place a request!",
                        "#666600" // dark green
                        );
			   }                   
else if ( libraryTransit.test(page) )
                    {
                    libraryLookup.insertLink (
                        isbn,
                        "Item in transit!",
                        "This book is in transit at " + libraryName + " Library. Click this link to place a request!",
                        "#993300" // dark brown 
                        );
			   }
                 else if ( libraryComingSoon.test(page) )
                    {
                    libraryLookup.insertLink (
                        isbn,
                        "Coming soon!",
                        "On order. Coming soon to " + libraryName + " Library! Click this link to place a request!",
                        "#CC3366"  // dark pink
                        );
			 }

else if ( libraryTrace.test(page) )
                    {
			 libraryLookup.insertNoMatchLink (
                        TheTitle,
                        "Temporarily not available!",
                        "Temporarily not available at " + libraryName + " Library! Click to check for other editions.",
                        "#CC3300"  // light brown
                        );
                    }
 else if ( libraryLost.test(page) )
                    {
                    libraryLookup.insertNoMatchLink (
                        TheTitle,
                        "Temporarily not available!",
                        "Temporarily not available at " + libraryName + " Library! Click to check for other editions.",
                        "red"
                        );
                    }
 else
                    {
                    libraryLookup.insertLink (
                        isbn,
                        "Error",
                        "Error checking the status at " + libraryName + " Library. Click to check manually.",
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
var TheTitle = origTitle.textContent ;

if ( ! origTitle )
  { return; }

libraryLookup.doLookup(isbn);

}
)();
