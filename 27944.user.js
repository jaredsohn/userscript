// ==UserScript==
// @name          Amazon Wellcome Library Linky
// @namespace     http://catalogue.wellcome.ac.uk/
// @description	  Search the Wellcome Library Catalogue from Amazon book listings.
// @include       http://*.amazon.*
// @creator       wellcome
// ==/UserScript==

// Adapted by wellcome from
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

var libraryUrlPattern = 'http://catalogue.wellcome.ac.uk/search/o?SEARCH='
var libraryName = 'Wellcome';
var libraryAvailability = /&nbsp; AVAILABILITY/;
var libraryDueBack = /DUE (\d{2}\-\d{2}\-\d{2})/;
var libraryOrdered = /copy ordered/;
var notFound = /No matches found/;

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
                if ( libraryOrdered.test(page) )
                    {
                    libraryLookup.insertLink (
                      isbnUrl,
                      "Copy on order!",
                      "Copy is on order at the " + libraryName + " Library.",
                      "#B03060" // maroon-y
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
                else if ( libraryAvailability.test(page) )
                    {
                    var numavail = page.match(libraryAvailability)
                    libraryLookup.insertLink (
                      isbnUrl,
                      "On the shelf now",
                      "Available at the " + libraryName + " Library",
                      "green"
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
	GM_log('LibraryLookup-Boulder.js: Caught exception: ' + e.toString());
	return; 
}

var titleNode = getTitleNode();

if(titleNode == null){
    return;
}

libraryLookup.doLookup(isbn);

}
)();