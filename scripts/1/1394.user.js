// ==UserScript==
// @name          University of Colorado at Boulder LibraryLookup
// @namespace     http://www.theoreticalchemist.com
// @description	  Search the CU Library Catalogs from Amazon book listings.
// @include       http://*.amazon.*
// @creator       Matthew Thompson
// @source        http://userscripts.org/scripts/show/
// @identifier    http://userscripts.org/scripts/source/
// ==/UserScript==

// Adapted by Matthew Thompson from
// Christina Schulman (http://www.epiphyte.net)
// and Christoher Holdredge from
// Ed Vielmetti's Ann Arbor library script (http://www.superpatron.com)
// Originally based on LibraryLookup by Jon Udell.
// Amazon Prime fix by Pat Markland (pmarkland@yahoo.com)
// Title node fixes based on the UW Madison linky script by "Rebs"
// and Hennepin County linky script by Glenn Peterson.

(

function() 
{

var libraryUrlPattern = 'http://libraries.colorado.edu/search/i?SEARCH='
var libraryName = 'Norlin';
var libraryAvailability = /AVAILABLE/;
var libraryDueBack = /DUE (\d{2}\-\d{2}\-\d{2})/;
var libraryProcess = /processed/;
var librarySoon = /ASK CIRC DESK/;
var libraryNotFound = /would be here/;


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
				bookdiv.insertBefore(link, titleNode.nextSibling);
				bookdiv.insertBefore(br, titleNode.nextSibling);
			}
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
                var isbnUrl = libraryUrlPattern + isbn;
                if ( libraryNotFound.test(page) )
                    {
                    }
                else if ( libraryAvailability.test(page) )
                    {
                    libraryLookup.insertLink (
                      isbnUrl,
                      "On the shelf now!",
                      "Available in the " + libraryName + " Library!",
                      "green"
                       );
                    }
                else if ( libraryDueBack.test(page) )
                    {
                    var due = page.match(libraryDueBack)[1]
                        libraryLookup.insertLink (
                        isbnUrl,
                        "Due back " + due,
                        "Due back at the " + libraryName + " Library on " + due,
                        "#AA7700" // dark yellow
                        );
                    }
                else if ( librarySoon.test(page) )
                    {
                    libraryLookup.insertLink (
                        isbnUrl,
                        "Coming soon!",
                        "Coming soon at the " + libraryName + " Library! Ask at Circulation!",
                        "#AA00FF" // purple-y
                        );
                    }
                else if ( libraryProcess.test(page) )
                    {
                    libraryLookup.insertLink (
                        isbnUrl,
                        "Copy in process!",
                        "Copy being processed at the " + libraryName + " Library!",
                        "#AA00FF" // purple-y
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
	GM_log('LibraryLookup-Norlin.js: Caught exception: ' + e.toString());
	return; 
}

var titleNode = getTitleNode();

if(titleNode == null){
    return;
}

libraryLookup.doLookup(isbn);

}
)();

