// ==UserScript==
// @name          Amazon Pittsburgh Libraries Linky
// @namespace     http://www.epiphyte.net
// @description	  Search the Pittsburgh area (Allegheny County) Library Catalogs from Amazon book listings.
// @include       http://*.amazon.*
// @creator       Christina Schulman | userscripts<at>epiphyte<dot>net | http://www.epiphyte.net
// @source        http://userscripts.org/scripts/show/5527
// @identifier    http://userscripts.org/scripts/source/5527.user.js
// @version       1.4
// @date          2008-05-04
// ==/UserScript==

// Version History:
// v1.1 - 5/4/2007 - Fixes Amazon Prime lookup problem
// v1.2 - 5/23/2007 - Fixed a bug that caused a bad link when the book was on hold.
// v1.3 - 4/06/2008 - Updated script to deal with new title node style.
// v1.4 - 5/04/2008 - Updated script to deal with even newer title node style.

// Adapted by Christina Schulman (http://www.epiphyte.net) from
// Ed Vielmetti's Ann Arbor library script (http://www.superpatron.com)
// Originally based on LibraryLookup by Jon Udell.
// Amazon Prime fix by Pat Markland (pmarkland@yahoo.com)
// Title node fixes based on the UW Madison linky script by "Rebs"
// and Hennepin County linky script by Glenn Peterson.

(

function()
{

var libraryUrlPattern = 'http://catalog.einetwork.net/search/i?SEARCH=';
var libraryUrlPatternTrailer = '&submit=Search&searchscope=1&x=0&y=0';
var libraryName = 'Pittsburgh area libraries';
var libraryAvailability = /AVAILABLE/;
var libraryOnOrder = /ordered for/;
var libraryInProcess = /being processed for Library System/;
var libraryHolds = /(\d+) holds* on first copy returned of (\d+) cop/;
var libraryCheckedOut = /Checked Out/;
var libraryBookIsOwned = /bibItemsHeader/;
var libraryInTransit = /IN TRANSIT/;
var libraryDue = /DUE (\d\d\-\d\d\-\d\d)/;
var notFound = /No matches found; nearby ISBN/
var titleNodeClass = 'sans';
var titleNodeId = 'btAsinTitle';

// Find the node containing the book title
function getTitleNode()
{
	var nodes = document.evaluate("//span[@id='" + titleNodeId + "']", document, null, XPathResult.UNORDERED_NODE_ITERATOR_TYPE, null);
	if(!nodes){
		return null;
	}

	var thisNode = nodes.iterateNext(); 
	var titleNode;
	// Get the last node
	while(thisNode){

		//GM_log( thisNode.textContent );
		titleNode = thisNode;
		thisNode = nodes.iterateNext();
	}

	//was (titleValue == null)
	if (titleNode == null) {
        GM_log("can't find title node");
		return null;
	}
	else {
        GM_log("Found title node: " + titleNode.textContent);
	}
	return titleNode;
}

var libraryLookup = 
    {
		insertLink: function(isbnUrl, hrefTitle, aLabel, color )
			{
			var bookdiv = titleNode.parentNode;
			var title = titleNode.firstChild.nodeValue;

			var newTitle = document.createElement('b');
			newTitle.setAttribute('class',titleNodeClass);

			var titleText = document.createTextNode(title);
			newTitle.appendChild(titleText);

			var br = document.createElement('br');

			var link = document.createElement('a');
			link.setAttribute ( 'title', hrefTitle );
			link.setAttribute('href', isbnUrl);
			link.setAttribute('style','font-size:12px;font-weight:normal;color: ' + color);

			var label = document.createTextNode( aLabel );

			link.appendChild(label);

			// cms: If bookdiv is null, re-evaluate the titleNode node
			// 		to pick up its parent node again.  Another linky
			//		script running on the same page may have caused
			//		the node to change.
			if (bookdiv == null) {
				titleNode = getTitleNode();
				if (titleNode != null) {
					bookdiv = titleNode.parentNode;
				}
			}
			if (bookdiv != null) {
				/*
				bookdiv.insertBefore(newTitle, titleNode);
				bookdiv.insertBefore(br, titleNode);
				bookdiv.insertBefore(link, titleNode);
				bookdiv.removeChild(titleNode);
				*/
				bookdiv.insertBefore(link, titleNode.nextSibling);
				bookdiv.insertBefore(br, titleNode.nextSibling);
			}
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
				var isbnUrl = libraryUrlPattern + isbn;
                if ( notFound.test(page) )
                    {
                    var due = page.match(notFound)[1]
                    libraryLookup.insertLink (
                        isbnUrl,
                        "Not carried",
                        "Not (yet) in " + libraryName,
                        "red"
                        );
                    }
                else if ( libraryHolds.test(page) )
                    {
                    var holds = page.match(libraryHolds)[1];
					var copies = page.match(libraryHolds)[2];
					var holdtext = " " + (holds == 1 ? "hold" : "holds");
					var copiestext = " " + (copies == 1 ? "copy" : "copies");
					var bAlreadyOwned = libraryBookIsOwned.test(page);
					var ownstatus = (bAlreadyOwned ? "Checked out" : "On order");
                    libraryLookup.insertLink (
                        isbnUrl,
                        ownstatus + ", " + holds + holdtext,
                        ownstatus + " with " + holds + holdtext + 
						(bAlreadyOwned ? " on " + copies + copiestext : "") + 
						" at " + libraryName,
                        "#AA7700"  // dark yellow
                        );
                    }
				else if ( libraryAvailability.test(page) )
					{
					libraryLookup.insertLink (
						isbnUrl,
						"On the shelf now!",
						"Available now at " + libraryName + "!",
						"green"
						);
					}
				else if ( libraryCheckedOut.test(page) ||  libraryInTransit.test(page))
					{
					libraryLookup.insertLink (
						isbnUrl,
						"Currently checked out",
						"Checked out with no outstanding holds at " + libraryName,
						"#AA7700"  // dark yellow
						);
					}
                else if ( libraryOnOrder.test(page) )
                    {
                    libraryLookup.insertLink (
                        isbnUrl,
                        "On order",
                        "On order at " + libraryName,
                        "#AA7700"  // dark yellow
                        );
                    }                    
                else if ( libraryInProcess.test(page) )
                    {
                    libraryLookup.insertLink (
                        isbnUrl,
                        "In process",
                        "In process (available soon) at " + libraryName,
                        "#AA7700"  // dark yellow
                        );
                    }                    

                else if ( libraryDue.test(page) )
                    {   
                    var due = page.match(libraryDue)[1]
                    libraryLookup.insertLink (
                        isbnUrl,
						"Due back",
                        "Due back at " + libraryName + " on " + due,
                        "#AA7700"
                        );
                    }
                else
                    {
                    libraryLookup.insertLink (
                        isbnUrl,
                        "Error",
                        "I got confused checking " + libraryName,
                        "orange"
                        );
                    }
                }
            });
        }


    }

try { 
	var isbn = window.content.location.href.match(/\/(\d{7,9}[\d|X])\//)[1];  
	GM_log('isbn == ' + isbn);
}
catch (e) { 
	GM_log('amazonpghlib_user.js: Caught exception: ' + e.toString());
	return; 
}

var titleNode = getTitleNode();

if(titleNode == null){
    return;
}

libraryLookup.doLookup(isbn);

}
)();
