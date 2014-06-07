// ==UserScript==
// @name          Netflix-Monroe County Library System Lookup
// @namespace     http://monroe.lib.mi.us
// @description	  Search the Monroe County Library System Catalog for Netflix DVD listings.
// @include       http://*.netflix.*
// ==/UserScript==
// Version 1.1 (3-26-2007)

(

function()
{


//http://saturn.monroe.lib.mi.us/search/X?SEARCH=(pearl%20harbor)&searchscope=18&SORT=D&m=u


var libraryUrlPattern = 'http://saturn.monroe.lib.mi.us/search/X?SEARCH=&searchscope=18&SORT=D&m=u'
var libraryURLPatternForLink = '&searchscope=18&SORT=D&m=u'
var libraryURLPatternForNoMatch = 'http://saturn.monroe.lib.mi.us/'
var libraryName = 'Monroe County Library System';
var libraryAvailability = /Checked In/;
var libraryInProcess = /Pending/; 
var libraryTransitRequest = /Transit Request/;
var libraryHolds = /Current Requests: (\d+)/;
var libraryCopies = /Reservable copies: (\d+)/;
var libraryDueBack = /(\d{2}\/\d{2}\/\d{4})/;
var notFound = /Sorry, could not find anything matching/

var libraryLookup = 
    {
    insertLink: function(stringTitle , hrefTitle, aLabel, color)
        {
        var div = origTitle.parentNode;
        var title = origTitle.firstChild.nodeValue;

        var newTitle = document.createElement('div');
        newTitle.setAttribute('class','title');

        var titleText = document.createTextNode(title);
        newTitle.appendChild(titleText);
        
        var br = document.createElement('br');

        var link = document.createElement('a');
        link.setAttribute ( 'title', hrefTitle );
        link.setAttribute('href', libraryURLPatternForLink + stringTitle);
        link.setAttribute('style','color: ' + color + '\;' + 'background-color:#FFFF99');

        var label = document.createTextNode( aLabel );

        link.appendChild(label);

        div.insertBefore(link, origTitle);
        },

    insertNoMatchLink: function(stringTitle, hrefTitle, aLabel, color)
        {
        var div = origTitle.parentNode;
        var title = origTitle.firstChild.nodeValue;

        var newTitle = document.createElement('div');
        newTitle.setAttribute('class','title');

        var titleText = document.createTextNode(title);
        newTitle.appendChild(titleText);
        
        var br = document.createElement('br');

        var link = document.createElement('a');
        link.setAttribute ( 'title', hrefTitle );
        link.setAttribute('href', libraryURLPatternForNoMatch + stringTitle);
        link.setAttribute('style','color: ' + color + '\;' + 'background-color:#FFFF99');

        var label = document.createTextNode( aLabel );

        link.appendChild(label);

        div.insertBefore(link, origTitle);
        },
		
    doLookup: function ( origTitle )
        {
        GM_xmlhttpRequest
            ({
            method:'GET',
            url: libraryUrlPattern +stringTitle ,
            onload:function(results)
                {
                page = results.responseText;
                if ( notFound.test(page) )
                    {
                    var due = page.match(notFound)[1]
                    libraryLookup.insertNoMatchLink (
                        stringTitle,
                        "Click to browse by title",
                        "No match found in " + libraryName + " Library. Click to browse by title.",
                        "red"
                        );
                    }
				else if ( libraryAvailability.test(page) )
                    {
					try {
					var copies = page.match(libraryCopies)[1]
                    libraryLookup.insertLink (
                        stringTitle,
                        "On the shelf now!",
                        "Available in " + libraryName + " Library!  (Library owns " + copies + " copies)",
                        "green"
                        );
					  }
					  catch (e) {
						libraryLookup.insertLink (
                        stringTitle,
                        "Click to browse by title",
                        "More than one match found in " + libraryName + " Library. Click to browse by title.",
                        "red"
                        );
					  }
                    }
                 else if ( libraryHolds.test(page)  )
                    {
                    var holds = page.match(libraryHolds)[1]
                    var copies = page.match(libraryCopies)[1]
                    libraryLookup.insertLink (
                        stringTitle,
                        holds + " Holds",
                        " Request from " + libraryName + " Library (currently " + holds + " requests on " + copies + " copies) ",
                        "#AA7700"   //dark yellow
                        );
                    }          
				else if ( libraryDueBack.test(page) )
                    {
                    var due = page.match(libraryDueBack)[1]
                    libraryLookup.insertLink (
                        stringTitle,
                        "Due back " + due,
                        "Due back at " + libraryName + " Library on " + due,
                        "#AA7700"  // dark yellow
                        );
                    }
                else if ( libraryInProcess.test(page) || libraryTransitRequest.test(page) )
                    {
					var copies = page.match(libraryCopies)[1]
                    libraryLookup.insertLink (
                        stringTitle,
                        "In process!",
                        "Available soon at " + libraryName + " Library! (" + copies + " copies pending)" ,
                        "#AA7700"  // dark yellow
                        );
                    }                    					
                else
                    {
                    libraryLookup.insertLink (
                        stringTitle,
                        "Error",
                        "Error checking " + libraryName + " Library",
                        "orange"
                        );
                    }
                }
            });
        }


    }

var origTitle = document.evaluate("//div[@class='title']", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null ).singleNodeValue;
var stringTitle = document.title;
var stringTitle = stringTitle.substring(9,stringTitle.length);

if ( ! origTitle )
  { return; }

libraryLookup.doLookup(stringTitle);

}
)();