// ==UserScript==
// @name          Amazon Gainesville Libraries Linky
// @namespace     http://www.epiphyte.net
// @description	  Search the Alachua County (Gainesville, FL) Library Catalog from Amazon book listings.
// @include       http://*.amazon.*
// @creator       Christina Schulman | userscripts<at>epiphyte<dot>net | http://www.epiphyte.net
// @source        http://userscripts.org/scripts/show/9042
// @identifier    http://userscripts.org/scripts/source/9042.user.js
// @version       1.2
// @date          2008-05-04
// ==/UserScript==

// Version History:
// v1.0 - 5/4/2007 - Initial release
// v1.1 - 4/06/2008 - Updated script to deal with new title node style.
// v1.2 - 5/04/2008 - Updated script to deal with even newer title node style.

// Adapted by Christina Schulman (http://www.epiphyte.net) from
// Ed Vielmetti's Ann Arbor library script (http://www.superpatron.com)
// Originally based on LibraryLookup by Jon Udell.
// Amazon Prime fix by Pat Markland (pmarkland@yahoo.com)
// Title node fixes based on the UW Madison linky script by "Rebs"
// and Hennepin County linky script by Glenn Peterson.
// 
// Go Gators.

(

function()
{
var librarySearchBase = 'http://cs-lewis.acld.lib.fl.us/uhtbin/cgisirsi/';
var libraryFirstPage = librarySearchBase + '0//0/38/0/POWER_SEARCH';
var searchFormPattern = /<form name="searchform" method="post" action="\/uhtbin\/cgisirsi\/([^"]*)">/;

var searchpart1 = 'srchfield1=GENERAL^SUBJECT^GENERAL^^words or phrase&searchdata1=';
var searchpart2 = '&searchoper1=AND';
var searchpart3 = '&library=ALL&language=ANY&item_type=ANY&location=ANY&item_1cat=ANY&item_2cat=ANY&match_on=KEYWORD&pubyear=&sort_by=NONE';

var libraryName = 'Alachua County libraries';

var libraryAvailability = /Checked In Items/;
var libraryShelving = /Returning to shelving location/;
var libraryOnline = /On-line material/;
var libraryOnReserve = /On hold for someone/;
var libraryOnOrder = /Being acquired by the library/;
var libraryCheckedOut = /Material checked\/charged out/;
var libraryRotating = /Rotating items between libraries/;
var libraryTransferring = /Transferring between libraries/;
var libraryMissing = /Missing/;
var libraryLost = /Lost/;
var libraryDelinquent = /Delinquent/;
var notFound = /found no matches in any library/

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

// check notfound first; then on reserve; then missing; then available 

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

	// Lookup session PID and SEQ numbers so that we can run a valid search
	getSearchUrl: function (isbn)
		{
			GM_xmlhttpRequest
				({
				method:'GET',
				url:libraryFirstPage,
				onload:function(results)
				{
					page = results.responseText;
					

					if (searchFormPattern.test(page)) {
						var actionMatch = page.match(searchFormPattern)[1];
						var actionUrl = librarySearchBase + actionMatch;
						actionUrl = actionUrl + '?' + searchpart1 + isbn + searchpart2 + searchpart3;
						libraryLookup.doLookup(actionUrl);
					}
					else {
						var actionUrl = librarySearchBase + '?' + searchpart1 + isbn + searchpart2 + searchpart3;
						libraryLookup.insertLink (
							actionUrl,
							"Error",
							"I got confused checking " + libraryName,
							"orange"
							);
					}
				}
			});
		},


    doLookup: function ( searchurl )
        {
        GM_xmlhttpRequest
            ({
            method:'POST',
            url: searchurl,
            onload:function(results)
                {
				page = results.responseText;
                if ( notFound.test(page) )
                    {
                    libraryLookup.insertLink (
                        searchurl,
                        "Not carried",
                        "Not (yet) in " + libraryName,
                        "red"
                        );
                    }
				else if ( libraryAvailability.test(page) )
					{
					libraryLookup.insertLink (
						searchurl,
						"On the shelf now!",
						"Available now at " + libraryName + "!",
						"green"
						);
					}
				else if ( libraryOnline.test(page) )
					{
					libraryLookup.insertLink (
						searchurl,
						"Available online",
						"Available as online material at " + libraryName + "!",
						"green"
						);
					}
				else if ( libraryShelving.test(page) )
					{
					libraryLookup.insertLink (
						searchurl,
						"Being shelved",
						"Being shelved at " + libraryName + "!",
						"#AA7700"
						);
					}
				else if ( libraryOnReserve.test(page) )
					{   
					libraryLookup.insertLink (
						searchurl,
						"On Reserve",
						"On Reserve at " + libraryName,
						"#AA7700"
						);
					}
				else if ( libraryOnOrder.test(page) )
					{   
					libraryLookup.insertLink (
						searchurl,
						"On Order",
						"On Order at " + libraryName,
						"#AA7700"
						);
					}
				else if ( libraryCheckedOut.test(page) || libraryTransferring.test(page) )
					{
					libraryLookup.insertLink (
						searchurl,
						"Currently checked out",
						"Checked out at " + libraryName,
						"#AA7700"  // dark yellow
						);
					}
				else if ( libraryRotating.test(page))
					{
					libraryLookup.insertLink (
						searchurl,
						"Rotating",
						"Rotating between libraries at " + libraryName,
						"#AA7700"  // dark yellow
						);
					}
                else if ( libraryMissing.test(page) || libraryLost.test(page) || libraryDelinquent.test(page))
                    {
                    libraryLookup.insertLink (
                        searchurl,
                        "Missing",
                        "Missing at " + libraryName,
                        "red"
                        );
                    }                    
                else
                    {
                    libraryLookup.insertLink (
                        searchurl,
                        "Error",
                        "Error checking " + libraryName,
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
	GM_log('amazongnvlib_user.js: Caught exception: ' + e.toString());
	return; 
}

var titleNode = getTitleNode();

if(titleNode == null){
    return;
}

libraryLookup.getSearchUrl(isbn);

}
)();
