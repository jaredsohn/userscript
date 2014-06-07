// ==UserScript==
// @name          Warren County Library Amazon to LS2 Link
// @namespace     http://www.warrenlib.org
// @description	  Search the Warren County Library LS2 Catalog from Amazon book listings.
// @include       http://*.amazon.*
// @creator       Rob Mersch | admin<at>warrenlib<dot>org | http://www.warrenlib.org
// @source        http://userscripts.org/scripts/show/5527
// @identifier    http://userscripts.org/scripts/source/5527.user.js
// @version       1.0
// @date          2012-05-01
// ==/UserScript==

// Version History:


// Adapted by Rob Mersch (admin<at>warrenlib<dot>org) after being 
// Adapted by Christina Schulman (http://www.epiphyte.net) from
// Ed Vielmetti's Ann Arbor library script (http://www.superpatron.com)
// Originally based on LibraryLookup by Jon Udell.
// Amazon Prime fix by Pat Markland (pmarkland@yahoo.com)
// Title node fixes based on the UW Madison linky script by "Rebs"
// and Hennepin County linky script by Glenn Peterson.

(

function()
{
// Library specific info here
var libraryUrlPattern = 'http://warrenls2.org:8080/?config=ysm#section=search&term=isbn:';
var libraryUrlPatternTrailer = '&dbTab=ls2pac';
var libraryName = 'Warren County Library';

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
			link.setAttribute('style','font-size:14px;font-weight:normal;color: ' + color);

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
				var isbnUrl = libraryUrlPattern + isbn + libraryUrlPatternTrailer;
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
                else
                    {
                    libraryLookup.insertLink (
                        isbnUrl,
                        "Click to see if " + libraryName + " has this title",
                        "See if " + libraryName + " has this title",
                        "Green"
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
