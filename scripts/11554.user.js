// ==UserScript==
// @name          Amazon-ACT Library Lookup
// @author     	Ross Rowe
// @description	  Search the ACT Library Catalog from Amazon listings.
// @include       http://*.amazon.*
// ==/UserScript==

(

function()
{

var libraryUrlPattern = 'http://www.librarycatalogue.act.gov.au/ipac20/ipac.jsp?index=ISBNEX&term='
var libraryURLPatternForLink = 'http://www.librarycatalogue.act.gov.au/ipac20/ipac.jsp?index=ISBNEX&term='
var libraryURLPatternForNoMatch = 'http://www.librarycatalogue.act.gov.au/ipac20/ipac.jsp?index=.GW&term='
var libraryURLPatternForAuthor = 'http://www.librarycatalogue.act.gov.au/ipac20/ipac.jsp?index=.AW&term='
var libraryName = 'ACT Public Library';
var copyFound = /Item Information/;
var libraryAvailability = /Checked In/;
var libraryOnOrder = /(\d+) Copies On Order/;
var libraryInProcess = /Pending/; 
var libraryHolds = /Requests: (\d+)/;
var libraryCopies = /Reservable copies: (\d+)/;
var libraryDueBack = /(\d{2}\/\d{2}\/\d{4})/;
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
        link.setAttribute('style','color: ' + color + '\;' + 'background-color:#FFFF99');

        var label = document.createTextNode( aLabel );

        link.appendChild(label);

        div.insertBefore(newTitle, origTitle);
        div.insertBefore(br, origTitle);
        div.insertBefore(link, origTitle);
        div.removeChild(origTitle);

		var authorlink = document.createElement('a');
        authorlink.setAttribute ( 'title', 'Show ACT Library listings for ' + authorText );
        authorlink.setAttribute('href', libraryURLPatternForAuthor + authorText);
		var authorlabel = document.createTextNode( "Show ACT Library listings for " + authorText );
        authorlink.appendChild(authorlabel);
		div.appendChild( authorlink);
        },

    insertNoMatchLink: function(titleText, hrefTitle, aLabel, color)
        {
        var div = origTitle.parentNode;
        var title = origTitle.firstChild.nodeValue;

        var newTitle = document.createElement('b');
        newTitle.setAttribute('class','sans');

        var titleTextNode = document.createTextNode(title);
        newTitle.appendChild(titleTextNode);
        
        var br = document.createElement('br');

        var link = document.createElement('a');
		//remove hardcover/softcover from link
		var title = titleText.replace(/.hardcover.|.softcover.|.paperback./i,'');
        link.setAttribute ( 'title', hrefTitle );
        link.setAttribute('href', libraryURLPatternForNoMatch + title);
        link.setAttribute('style','color: ' + color + '\;' + 'background-color:#FFFF99');

        var label = document.createTextNode( aLabel );

        link.appendChild(label);

        div.insertBefore(newTitle, origTitle);
        div.insertBefore(br, origTitle);
        div.insertBefore(link, origTitle);
        div.removeChild(origTitle);

		var authorlink = document.createElement('a');
        authorlink.setAttribute ( 'title', 'Show ACT Library listings for ' + authorText );
        authorlink.setAttribute('href', libraryURLPatternForAuthor + authorText);
		var authorlabel = document.createTextNode( "Show ACT Library listings for " + authorText );
        authorlink.appendChild(authorlabel);
		div.appendChild( authorlink);
        },
		
    doLookup: function ( isbn )
        {
	    // window.alert("Searching: " + libraryUrlPattern + isbn);
        GM_xmlhttpRequest
            ({
            method:'GET',
            url: libraryUrlPattern + isbn,
            onload:function(results)
                {
                page = results.responseText;
				// window.alert(page);
                if ( notFound.test(page) )
                    {
                    var due = page.match(notFound)[1]
                    libraryLookup.insertNoMatchLink (
                        titleText,
                        "Check for other editions",
                        "This edition not in " + libraryName + " Library. Click to check for other editions.",
                        "red"
                        );
                    }

					else if ( copyFound.test(page) )
			        {
					 if ( libraryAvailability.test(page) )
		                    {
							// var copies = page.match(libraryCopies)[1]
		                    libraryLookup.insertLink (
		                        isbn,
		                        "On the shelf now!",
		                        "Available in " + libraryName + " Library!",
		                        "green"
		                        );
		                    }
		                else if ( libraryOnOrder.test(page) )
		                    {
							// var CopiesOnOrder = page.match(libraryOnOrder)[1]
							var holds = page.match(libraryHolds)[1]
		                    libraryLookup.insertLink (
		                        isbn,
		                        "On order!",
		                        "Request on order from " + libraryName + " Library",
		                        "#AA7700"  // dark yellow
		                        );
		                    }                    
		                else if ( libraryInProcess.test(page) )
		                    {
							// var copies = page.match(libraryCopies)[1]
		                    libraryLookup.insertLink (
		                        isbn,
		                        "In process!",
		                        "Available soon at " + libraryName + " Library!" ,
		                        "#AA7700"  // dark yellow
		                        );
		                    }                    
		                 else if ( libraryHolds.test(page)  )
		                    {
		                    var holds = page.match(libraryHolds)[1]
		                    // var copies = page.match(libraryCopies)[1]
		                    var due = page.match(libraryDueBack)[1]
		                    libraryLookup.insertLink (
		                        isbn,
		                        holds + " Holds",
		                        "Request from " + libraryName + " Library (currently " + holds + " requests)",
		                        "#AA7700"   //dark yellow
		                        );
		                    }
						else if ( libraryDueBack.test(page) )
		                    {
		                    var due = page.match(libraryDueBack)[1]
		                    libraryLookup.insertLink (
		                        isbn,
		                        "Due back " + due,
		                        "Due back at " + libraryName + " Library on " + due,
		                        "#AA7700"  // dark yellow
		                        );
		                    } 
						else {
							// var copies = page.match(libraryCopies)[1]
				            libraryLookup.insertLink (
				                isbn,
				                "Available",
				                "Copy available, click for details",
				                "green"
				                );
						}
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
var titleText = origTitle.textContent;
var authorText = document.title.match(/: ([^:]+)$/)[1];

if ( ! origTitle )
  { return; }

libraryLookup.doLookup(isbn);

}
)();