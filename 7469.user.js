// ==UserScript==
// @name          Amazon Fairfax County Public Library Linky
// @description	  Search the Fairfax County Public Library Catalog from Amazon book listings.
// @include       http://*.amazon.*
// ==/UserScript==

// adapted from Amazon FCPL Linky
(

function()
{
var libraryUrlPattern = 'http://fcplcat.co.fairfax.va.us/uhtbin/cgisirsi/x/0/0/5?srchfield1=020^ISBN^GENERAL^Phrase Processing^ISBN&library=ALL&user_id=GUEST&password=1111&searchdata1=';
var libraryName = 'Fairfax County, Virginia';
var libraryAvailability = /BOOK | Book | Paperback /;
var libraryOnOrder = /On Order/;
var libraryInProcess = /Currently being cataloged/;
var libraryHolds = /(\d+) holds on First Copy Returned/;
var libraryDue = /Due: (\d{2}\/\d{2}\/\d{4})/;
var notFound = /found no matches in any library/

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
