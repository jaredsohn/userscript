// ==UserScript==
// @name          Amazon UNC Chapel Hill Library Linky
// @namespace     http://didion.net
// @description	  v1.0 Search the UNC Chapel Hill Library Catalog from Amazon book listings.  
// @copyright     Creative Commons Attribution-Noncommercial 3.0 United States License. http://creativecommons.org/licenses/by-nc/3.0/us/
// @author        John Didion
// @include       http://*.amazon.*
// ==/UserScript==

// Adapted from the SPL Linky Script by Fat Knowledge (http://userscripts.org/scripts/show/8432/)

(function(){
	//GM_log('UNC Chapel Hill Library Linky');	

	var libraryIsbnUrlPattern = 'http://search.lib.unc.edu/search?Ntk=ISBN&Ntt=';
	var libraryTitleUrlPattern = 'http://search.lib.unc.edu/search?Ntk=Title&Ntt=';
	var libraryName = 'UNC Libraries';

    var NO_MATCH = -1;
    var ERROR = 0;
    var NOT_AVAILABLE = 1;
    var DIGITAL = 2;
    var PHYSICAL = 3;
    
	var isbn = getIsbn(window.content.location.href);
	var isbns = null;
	var status = NO_MATCH;
    var titleNode = null;
    
	if (isbn != 0) {
	    titleNode = getTitleNode();
	    if (titleNode == null) {
	        return;
	    }
	    else {
	        //GM_log("Found title node");
	    }
		createStatusAndLibraryHTML();
		updateStatusHTML('Searching ' + libraryName + '...');

		getStatusForAllISBNs(isbn);
	}
	return;

//get other ISBNs for book and look up status for each
function getStatusForAllISBNs(isbn) {
    var isbnKey = isbn + ".related";
    var isbnRelStr = GM_getValue(isbnKey);
    if (isbnRelStr == undefined || isbnRelStr.length == 0) {
    	var wbUrl = 'http://xisbn.worldcat.org/webservices/xid/isbn/' + isbn;
    	//GM_log("Getting ISBNs from xISBN: " + wbUrl);
    	GM_xmlhttpRequest({
    	    method: 'GET',
    	    url: wbUrl,
    	    headers: {
    	        'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey/0.3',
    	        'Accept': 'application/atom+xml,application/xml,text/xml',
    	    },
    	    onload: function(responseDetails) {
    			//GM_log(responseDetails.responseText);	
    	        var rt = responseDetails.responseText
    	        rt = rt.replace(/isbn\s*/gi, "isbn");
    	        rt = rt.replace(/>\s*</gi, "><");
    	        //GM_log(rt);
	        
    	        var doc = new DOMParser().parseFromString(rt, "application/xml");
    	        var responseStatus = 
    	            doc.getElementsByTagName('rsp').item(0).getAttribute('stat');
    	        if (responseStatus == 'ok') {
    	            var isbnNodes = isbns = doc.getElementsByTagName('isbn');
    	            if (isbnNodes.length == 0) {
    	                GM_setValue(isbnKey, '<none>');
    	            }
    	            else {
                        isbns = new Array(isbnNodes.length);
                        for (var i = 0; i < isbnNodes.length; i++) {
                            isbns[i] = isbnNodes.item(i).firstChild.data;
                        }
                        GM_setValue(isbnKey, isbns.join(","));
    	                getBookStatuses();
    	            }
	            }
	            else {
	                GM_log("Non-ok response status: " + responseStatus);
	                setStatusNoneFound();
	            }
    	    }
    	});
	}
	else if (isbnRelStr != '<none>') {
	    //GM_log("Got ISBNs from cache: " + isbnRelStr);
        isbns = isbnRelStr.split(",");
        getBookStatuses();
    }
}

function getBookStatuses() {
    if (status < PHYSICAL && isbns && isbns.length > 0) {
        //GM_log("No match yet...");        
        var isbn = isbns.pop();
        //GM_log(isbn);
	    updateStatusHTML("Searching for ISBN "+ isbn + " in " + libraryName + '...');
	    getBookStatus(libraryIsbnUrlPattern, isbn);
    } 
    else if (status > ERROR) {
        //GM_log("Final status: " + status);
        removeStatus();
    }
    else {
        //GM_log("No matches");
    	setStatusNoneFound();
    }
}

// connect to library server to get book status for isbn and then insert result 
// under the book title. call getBookStatuses when done
function getBookStatus(libraryUrlPattern, isbn){
    //GM_log('Searching: ' + libraryUrlPattern + isbn);

	var libraryAvailability = /Available/;
	var libraryOnOrder = /On Order/;
	var libraryDueBack = /Due (\d{2}-\d{2}-\d{4})/;
	var libraryInTransit = /In Transit/;
	var libraryElectronic = /Online Access/;
	var notFound = /No results found/;
    var locations = /<td colspan="2" class="brieflocation">(.*)<\/td>$\n<td>(.*)$\n<br\/>$\n<\/td>$\n.*$\n<span class="status">(.*)<\/span>/gim;

	GM_xmlhttpRequest({
		method:'GET',
		url: libraryUrlPattern + isbn,
		onload:function(results) {
			var page = results.responseText;
			var shortMsg = null;
			var longMsg = null;
			var color = null;
			var alt = null;
			var newStatus = status;
			
			if ( notFound.test(page) ) {
                newStatus = NO_MATCH;
			}
			else if ( libraryAvailability.test(page) ) {
			    alt = '';
			    var ctr = 0;
			    while (match = locations.exec(page)) {
			        if (ctr > 0) {
			            // Firefox bug: multiline tooltips not yet supported
			            //alt += "\n";
			            alt += ' ';
			        }
			        ctr++;
			        alt += ctr + '. ' + match[1] + ' (' + match[2] + '): ' + match[3];
			    }
			    shortMsg = "Available";
			    longMsg = "Available in " + libraryName;
			    color = "green";
			    newStatus = PHYSICAL;
			}
			else if ( libraryElectronic.test(page) ) {
			    shortMsg = "Digital";
			    longMsg = "Digital version available in " + libraryName;
			    color = "green";
			    newStatus = DIGITAL;
			}
			else if ( libraryOnOrder.test(page) ) {
				shortMsg = "Ordered";
				longMsg = "On order at " + libraryName;
				color = "#AA7700";
				newStatus = NOT_AVAILABLE;
			}                    
			else if ( libraryDueBack.test(page) ) {
				var due = page.match(libraryDueBack)[1];
				shortMsg = "Due " + due;
				longMsg = "Due back at " + libraryName + " on " + due;
				color = "#AA7700";
				newStatus = NOT_AVAILABLE;
			}
            else if ( libraryInTransit.test(page) ) {
				shortMsg = "Pending";
				longMsg = "In transit at " + libraryName;
				color = "#AA7700";
				newStatus = NOT_AVAILABLE;
			}
			else {
			    shortMsg = "Error";
			    longMsg = "Error checking " + libraryName;
			    color = "orange";
			    newStatus = ERROR;
			}
		    status = setLibraryHTML(libraryUrlPattern, isbn, shortMsg, longMsg, color, alt, newStatus);
			getBookStatuses();
		}
	});
}

function createStatusAndLibraryHTML() {
	var h1_node = titleNode.parentNode;
	var br = document.createElement('br');

	//the div for library status when found
	var uncLinkyDiv = document.createElement('div');
	uncLinkyDiv.id = 'uncLinkyLibraryHTML';
	//resize to 60% to get out of the enlarged h1 size and return back to normal
	uncLinkyDiv.style.fontSize = '60%';
	uncLinkyDiv.style.color = 'black';

	//How lame is this javascript DOM syntax?  Instead of having an insertAfter function, you have an
    //insertBefore and then pass in the .nextSibling attribute of the element.  Really inuitive guys.
	h1_node.insertBefore(uncLinkyDiv, titleNode.nextSibling);
	h1_node.insertBefore(br, titleNode.nextSibling);

	//the div for status as checks are occuring
	var uncStatusDiv = document.createElement('div');
	uncStatusDiv.id = 'uncLinkyStatusHTML';
	//resize to 60% to get out of the enlarged h1 size and return back to normal
	uncStatusDiv.style.fontSize = '60%';
	uncStatusDiv.style.color = 'brown';

	h1_node.insertBefore(uncStatusDiv, uncLinkyDiv);
}

function updateStatusHTML(text) {
	var uncStatusDiv = document.getElementById('uncLinkyStatusHTML');
	if (uncStatusDiv == null) { 
	    return; 
	}

	if (uncStatusDiv.firstChild) {
		uncStatusDiv.removeChild(uncStatusDiv.firstChild);
	}
	
	uncStatusDiv.appendChild(document.createTextNode(text));
}

// replace book status
function setLibraryHTML(libraryUrlPattern, isbn, shortMsg, longMsg, color, toolTip, newStatus) {
    if (newStatus < status) {
        return status;
    }
    
	var uncLinkyDiv = document.getElementById('uncLinkyLibraryHTML');
	if (uncLinkyDiv == null) { 
	    //GM_log("Null uncLinkyDiv");
	    return status; 
	}

    // remove all children if that status of this item is better than the
	// previous one
	if (newStatus > status && uncLinkyDiv.hasChildNodes()) {
	    while (uncLinkyDiv.childNodes.length >= 1) {
            uncLinkyDiv.removeChild(uncLinkyDiv.firstChild);       
        }
    }

	if (toolTip == null || toolTip.length == 0) {
	    toolTip = longMsg;
	}

	var link = document.createElement('a');
	link.setAttribute('title', toolTip );
	link.setAttribute('href', libraryUrlPattern+isbn);
	link.setAttribute('target', "_blank");
	link.setAttribute('alt', longMsg);
	link.style.color = color;
	link.appendChild(document.createTextNode(longMsg));
	
	uncLinkyDiv.appendChild(link);
	return newStatus;
}

//none found
//add link to search by title
function setStatusNoneFound() {
    //GM_log("none found");
	var title = getTitle();

	var uncStatusDiv = document.getElementById('uncLinkyStatusHTML');
	if (uncStatusDiv == null) { return; }

	var link = document.createElement('a');
	link.setAttribute('title', title );
	link.setAttribute('href', libraryTitleUrlPattern +encodeURIComponent(title));
	link.setAttribute('target', "_blank");
	link.style.color = "red";

	var label = document.createTextNode('Not found. Search by title in ' + libraryName + '...' );
	link.appendChild(label);

	//remove existing content
	uncStatusDiv.removeChild(uncStatusDiv.firstChild);
	uncStatusDiv.appendChild(link);
}

function setStatusColor(color){
	var uncStatusDiv = document.getElementById('uncLinkyStatusHTML');
	if (uncStatusDiv == null) { return; }

	uncStatusDiv.style.color = color;
}

function removeStatus() {
	var uncStatusDiv = document.getElementById('uncLinkyStatusHTML');
	uncStatusDiv.removeChild(uncStatusDiv.firstChild);
}

//check if there is a ISBN in the URL
//URL looks like http://www.amazon.com/Liseys-Story-Stephen-King/dp/0743289412/ref=xarw/002-5799652-4968811
function getIsbn(url){
	try { 
		//match if there is a / followed by a 7-9 digit number followed by either another number or an x 
		//followed by a / or end of url 
		var isbn = url.match(/\/(\d{7,9}[\d|X])(\/|$)/)[1]; 
	} catch (e) { return 0; }

	return isbn;
}

function getTitle() {
	//remove words in parentheses and subtitles (anything after a colon)
	return titleNode.textContent.replace(/\(.+\)/, '').replace(/:.*/, '')
}

// Find the node containing the book title
function getTitleNode() {
	var titleNodeId = 'btAsinTitle';
    var titleNode = null;
    
    var nodes = document.evaluate("//span[@id='" + titleNodeId + "']", document, null, XPathResult.ORDERED_NODE_ITERATOR_TYPE, null);
    if (!nodes) {
	    return null;
    }
    
    var thisNode = nodes.iterateNext(); 
    // Get the last node
    while (thisNode) {
	    //GM_log(thisNode.textContent);
	    titleNode = thisNode;
	    thisNode = nodes.iterateNext();
    }

    if (titleNode == null) {
        //GM_log("can't find title node");
    } 
    else {
        //GM_log("Found title node: " + titleNode.textContent);
    }
	
	return titleNode;
}


}
)();
