// ==UserScript==
// @name          Netflix-Hennepin County Library Lookup
// @namespace     http://www.hclib.org
// @description	  Search the Hennepin County Library Catalog from Netflix DVD listings.
// @include       http://*.netflix.*
// ==/UserScript==
// Version 1.1 (3-26-2007)
// Version 1.2.0 (9-02-2009)
// Version 1.3 - Updated for 2013 changes (12-30-2013)
(


function()
{

var libraryUrlPattern = 'https://catalog.hclib.org/ipac20/ipac.jsp?aspect=subtab23&limitbox_1=LT01+%3D+fmt_ldr06_video+and+DV01+%3D+fmt_desc04_dvd&index=.TW&term='
var libraryURLPatternForLink = 'http://hzapps.hclib.org/pub/ipac/link2ipac.cfm?NetflixLinkyVersion=1.3&aspect=subtab23&limitbox_1=LT01+%3D+fmt_ldr06_video+and+DV01+%3D+fmt_desc04_dvd&index=.TW&term='
var libraryURLPatternForNoMatch = 'http://hzapps.hclib.org/pub/ipac/link2ipac.cfm?NetflixLinkyVersion=1.3&index=&index=UTL&term='
var libraryName = 'Hennepin County';
var libraryMoreThanOneCopy = /titles matched/;
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
        link.setAttribute ('title', hrefTitle );
        link.setAttribute('href', libraryURLPatternForLink + stringTitle);
        link.setAttribute('target', "_blank");
        link.setAttribute('style','color: ' + color + '\;' + 'background-color:#FFFF99');
        //var link = link + br;
        var label = document.createTextNode( aLabel );

        link.appendChild(label);
        div.appendChild(br, origTitle);
        div.appendChild(link, origTitle);
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
        div.appendChild(br, origTitle);
        div.appendChild(link, origTitle);

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
                else if ( libraryMoreThanOneCopy.test(page) )
                    {
					//var copies = page.match(libraryMoreThanOneCopy)[1]
                    libraryLookup.insertLink (
                        stringTitle,
                        "More than one title!",
                        "Matches more than one title in " + libraryName + " Library -- click this link for details." ,
                        "#AA7700"  // dark yellow
                        );
                    }                    					                    					
                else
                    {
                    libraryLookup.insertLink (
                        stringTitle,
                        "Error",
                        "Click to check " + libraryName + " Library",
                        "orange"
                        );
                    }
                }
            });
        }


    }

var origTitle = document.evaluate("//h2[@class='title']", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null ).singleNodeValue;
var stringTitle = document.title;
var stringTitle = stringTitle.substring(9,stringTitle.length);

if ( ! origTitle )
  { return; }

libraryLookup.doLookup(stringTitle);

}
)();