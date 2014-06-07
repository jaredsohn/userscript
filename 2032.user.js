// ==UserScript==
// @name          NIST Amazon Library Lookup
// @description	  Search the NIST Library Catalog from Amazon book listings and return status.  
// @include       http://*.amazon.*
// ==/UserScript==


// modified by Matthew Bachtell, 2005-12-01
//Based on script from http://www.mundell.org/2005/07/07/seattle-public-library-greasemonkey-script-part-2/ and http://userscripts.org/scripts/show/1775
(

function()
{

// change for your library
var libraryUrlPattern = 'http://library.nist.gov/uhtbin/cgisirsi/x/0/0/123?library=ALL&searchdata1='

// insert your library name here
var libraryName = 'the NIST';

// this is running a regular expression against the returned OPAC page.  Change the text accordingly.
var libraryAvailability = /Books|Held in E119|Strategic Focus Area|New Book shelf/;
var libraryOnOrder = /On Order/;
var libraryInProcess = /Currently being cataloged/;
var libraryDueBack = /Due: (\d{1,2}\/\d{1,2}\/\d{4})/;
var notFound = /found no matches in any library./

// this is the OpenWorldCar portion
var library2UrlPattern = 'http://www.google.com/search?ie=UTF-8&oe=UTF-8&domains=worldcatlibraries.org&sitesearch=worldcatlibraries.org&btnG=Search&q=' // OpenWorldCat via Google (alternativly your could use Yahoo)
var library2Name = 'Other Libraries'; // Search OpenWorldcat
mainmatch = window.content.location.href.match(/\/(\d{9}[\d|X])\//);

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
					if (mainmatch){
						var isbnX = mainmatch[1];
						var header = document.evaluate("//b[@class='sans']", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
					  // Set Worldcat Search	
					  if (header) {       	
						  var link = document.createElement('a');
						  link.setAttribute('href', library2UrlPattern + isbnX);
						  link.setAttribute('title', library2Name);
						  link.innerHTML 	= '<br/>Check ' + library2Name;
						  
							  header.parentNode.insertBefore(link, header.nextSibling);
							}    
						}					
					var due = page.match(notFound)[1]
                    libraryLookup.insertLink (
                        isbn,
                        "Not carried",
                        "Not in " + libraryName + " Library",
                        "red"
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
                else
                    {
                    libraryLookup.insertLink (
                        isbn,
                        "",
                        "",
                        "orange"
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