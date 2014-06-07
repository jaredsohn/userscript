// ==UserScript==
// @name          Amazon Rochester Libraries Linky
// @namespace     http://www.epiphyte.net
// @description	  Search the Rochester area (Monroe County NY) Library Catalogs from Amazon book listings.
// @include       http://*.amazon.*
// @creator       Christina Schulman | userscripts<at>epiphyte<dot>net | http://www.epiphyte.net
// @source        http://userscripts.org/scripts/show/6641
// @identifier    http://userscripts.org/scripts/source/6641.user.js
// @version       1.3
// @date          2008-05-04
// ==/UserScript==

// Version History:
// v1.1 - 5/4/2007 - Fixes Amazon Prime lookup problem
// v1.2 - 4/06/2008 - Updated script to deal with new title node style.
// v1.3 - 5/04/2008 - Updated script to deal with even newer title node style.

// Adapted by Christina Schulman (http://www.epiphyte.net)
// and Christoher Holdredge from
// Ed Vielmetti's Ann Arbor library script (http://www.superpatron.com)
// Originally based on LibraryLookup by Jon Udell.
// Amazon Prime fix by Pat Markland (pmarkland@yahoo.com)
// Title node fixes based on the UW Madison linky script by "Rebs"
// and Hennepin County linky script by Glenn Peterson.

(

function() // 0439554934
{

var libraryUrlPattern = 'http://www.rochester.lib.ny.us:2080/cgi-bin/cw_cgi?5000+REDIRX+doSearch_720_w_//i';
//var libraryUrlPattern = 'http://www.rochester.lib.ny.us:2080/cgi-bin/cw_cgi?18385+doSearch+720+w+//i';
var libraryRedirectPattern = /URL=(\S+)"><\/head>/;
var libraryUrlPatternTrailer = '';
var libraryName = 'Rochester area libraries';
var libraryAvailability = /Not Checked Out/;
var libraryOnOrder = /ordered for/;
//var libraryInProcess = /being processed for Library System/;
var libraryHolds = /On Hold Shelf/;
var libraryCheckedOut = /Checked out/;
//var libraryBookIsOwned = /bibItemsHeader/;
var libraryInTransit = /In Transit to library/;
var libraryMissing = /Missing/;
var libraryTraced = /Traced/;
var libraryHoldTransit = /In Transit For Hold/;
var libraryReference = /In Library Use Only/;
var libraryNoStatus = /No status information was found for this title/;
var notFound = /Sorry, there were no matches/;
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

	// The Rochester online catalog redirects through a CGI script that
	// won't work via a direct call, so first we call the CGI and
	// parse out the redirect URL
	doGetRedirect: function ( isbn )
		{
			GM_xmlhttpRequest
				({
				method:'GET',
				url: libraryUrlPattern + isbn + libraryUrlPatternTrailer,
				onload:function(results)
				{
						var page = results.responseText;
						if (libraryRedirectPattern.test(page)) {
							var redirUrl = page.match(libraryRedirectPattern)[1];
							libraryLookup.doLookup(redirUrl);
						}
						else {
							//alert('No redirect URL was found!');
							libraryLookup.insertLink (
								redirUrl,
								"Error",
								"I got confused checking " + libraryName,
								"orange"
								);
						}
				}
			});
		},

    doLookup: function ( redirUrl )
        {
        GM_xmlhttpRequest
            ({
            method:'GET',
            url: redirUrl,
            onload:function(results)
                {
				page = results.responseText;
                if ( notFound.test(page) || libraryNoStatus.test(page) )
                    {
                    libraryLookup.insertLink (
                        redirUrl,
                        "Not carried",
                        "Not (yet) in " + libraryName,
                        "red"
                        );
                    }
				else if ( libraryAvailability.test(page) )
					{
					libraryLookup.insertLink (
						redirUrl,
						"On the shelf now!",
						"Available now at " + libraryName + "!",
						"green"
						);
					}
				else if ( libraryCheckedOut.test(page) ||  libraryInTransit.test(page))
					{
					libraryLookup.insertLink (
						redirUrl,
						"Currently checked out",
						"Checked out at " + libraryName,
						"#AA7700"  // dark yellow
						);
					}
				else if ( libraryHolds.test(page) ||  libraryHoldTransit.test(page))
					{
					libraryLookup.insertLink (
						redirUrl,
						"On hold",
						"On hold shelf at " + libraryName,
						"#AA7700"  // dark yellow
						);
					}
				else if ( libraryReference.test(page) )
                    {
                    libraryLookup.insertLink (
                        redirUrl,
                        "In reference",
                        "In reference section at " + libraryName,
                        "red"
                        );
            	    }    
                else if ( libraryOnOrder.test(page) )
                    {
                    libraryLookup.insertLink (
                        redirUrl,
                        "On order",
                        "On order at " + libraryName,
                        "#AA7700"  // dark yellow
                        );
                    }                    
                else if ( libraryMissing.test(page) ||  libraryTraced.test(page))
                    {   
					libraryLookup.insertLink (
						redirUrl,
						"Missing",
						"Missing at " + libraryName,
						"#AA7700"  // dark yellow
						);
                    }
                else
                    {
	                libraryLookup.insertLink (
                        redirUrl,
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
	GM_log('amazonrochlib_user.js: Caught exception: ' + e.toString());
	return; 
}

var titleNode = getTitleNode();

if(titleNode == null){
    return;
}

libraryLookup.doGetRedirect(isbn);

}
)();

