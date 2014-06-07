// ==UserScript==
// @name          Amazon-Carver County Library Lookup
// @namespace     http://winecask.blogspot.com
// @description	  Search the Carver County Library Catalog from Amazon book listings.
// @include       http://*.amazon.*
// ==/UserScript==

// revision history:
// Version 0.1 - Based on Amazon-Hennepin County Library Lookup (4/20/07)
// Thanks to Carrick Mundell and the rest for the Amazon-Hennepin County Library lookup springboard.
(

function()
{

var libraryUrlPattern = 'http://libraryapp.carverlib.org/search/i?SEARCH='
var libraryURLPatternForLink = 'http://libraryapp.carverlib.org/search/i?SEARCH='
var libraryURLPatternForNoMatch = 'http://libraryapp.carverlib.org/search/?searchtype=t&searchscope=10&SORT=D&extended=1&SUBMIT=Search&searchlimits=&searchorigarg=iasdf&searcharg='
var libraryName = 'Carver County';
var libraryAvailability = /Checked In/;
var libraryOnOrder = /(\d+) Copies On Order/;
var libraryInProcess = /Pending/; 
var libraryTransitRequest = /Transit Request/;
var libraryBeingHeld = /Being held/; 
var libraryHolds = /Current Requests: (\d+)/;
var libraryCopies = /Reservable copies: (\d+)/;
var libraryDueBack = /(\d{2}\/\d{2}\/\d{4})/;
var notFound = /Sorry, could not find anything matching/
//// carver vars ////
var carverFOUND = /BIB CONTAINER/;
var carverNOTFOUND = /No matches found/;
var carverONSHELF = /CHECK SHELF/;
var carverDUEBACK = /DUE (\d{2}\-\d{2}\-\d{2})/;
var carverPAPERBACK = /\(Paperback\)/;
var carverHARDCOVER = /\(Hardcover\)/;
var carverREISSUE = /\(REISSUE\)/;

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
        link.setAttribute('style','color: ' + color + '\;' + 'background-color:#FFFF99');

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
               // if ( notFound.test(page) )
               if (carverNOTFOUND.test(page) )
                    {
                    
                    var due = page.match(carverNOTFOUND)[1]
                    libraryLookup.insertNoMatchLink (
                        TheTitle,
                        "Check for other editions",
                        "This edition not in " + libraryName + " Library. Click to check for other editions.",
                        "red"
                        );
                    }
		//else if ( libraryAvailability.test(page) )
		else if ( carverFOUND.test(page) )
                    {
			//var copies = page.match(libraryCopies)[1]
			var carverAVAILABLECOPIES = 0;
			if (carverONSHELF.test(page))
			{
				var carverPATTERN = 'CHECK SHELF';
				carverAVAILABLECOPIES = (page.split(carverPATTERN).length)-1;
			
				var copies = carverAVAILABLECOPIES;
			
				libraryLookup.insertLink (
				isbn,
				"On the shelf now!",
				"Available in " + libraryName + " Library!  (Library currently has " + copies + " copies on the shelf)",
				"green"
				);
                        }
                        else if (carverDUEBACK.test(page))
                        {
                        	var due = page.match(carverDUEBACK)[1]
				libraryLookup.insertLink (
				isbn,
				"Due back " + due,
			        "Due back at " + libraryName + " Library on " + due,
				"#AA7700"  // dark yellow
                       		 );
                        }
                    }
                else if ( libraryOnOrder.test(page) )
                    {
					var CopiesOnOrder = page.match(libraryOnOrder)[1]
					var holds = page.match(libraryHolds)[1]
                    libraryLookup.insertLink (
                        isbn,
                        "On order!",
                        "Request from " + libraryName + " Library (" + CopiesOnOrder + " copies on order, " + holds + " requests)",
                        "#AA7700"  // dark yellow
                        );
                    }                    
                else if ( libraryInProcess.test(page)  || libraryTransitRequest.test(page) )
                    {
					var copies = page.match(libraryCopies)[1]
                    libraryLookup.insertLink (
                        isbn,
                        "In process!",
                        "Available soon at " + libraryName + " Library! (" + copies + " copies pending)" ,
                        "#AA7700"  // dark yellow
                        );
                    }
                else if ( libraryBeingHeld.test(page) )
                    {
	    var holds = page.match(libraryHolds)[1]
                    var copies = page.match(libraryCopies)[1]
                    libraryLookup.insertLink (
                        isbn,
                        "All copies on hold shelf",
                        "Request from " + libraryName + " Library (currently " + holds + " requests on " + copies + " copies)",
                        "#AA7700"  // dark yellow
                        );
                    }                    
                 else if ( libraryHolds.test(page)  )
                    {
                    var holds = page.match(libraryHolds)[1]
                    var copies = page.match(libraryCopies)[1]
                    var due = page.match(libraryDueBack)[1]
                    libraryLookup.insertLink (
                        isbn,
                        holds + " Holds",
                        "Request from " + libraryName + " Library (currently " + holds + " requests on " + copies + " copies)",
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
    { var isbn = window.content.location.href.match(/\/(\d{7,10}[\d|X])\//)[1];
    	
    	//testervar isbn='0312864590';
    }
catch (e)
    { return; }

var origTitle = document.evaluate("//div[@class='buying']/b[@class='sans']", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null ).singleNodeValue;
var TheTitle = origTitle.textContent ;
if (carverPAPERBACK.test(TheTitle))
{
	TheTitle = TheTitle.substring(0,TheTitle.indexOf('(Paperback)'));
}
if (carverHARDCOVER.test(TheTitle))
{
	TheTitle = TheTitle.substring(0,TheTitle.indexOf('(Hardcover)'));
}
if (carverREISSUE.test(TheTitle))
{
	TheTitle = TheTitle.substring(0,TheTitle.indexOf('(REISSUE)'));
}



if ( ! origTitle )
  { return; }

libraryLookup.doLookup(isbn);

}
)();