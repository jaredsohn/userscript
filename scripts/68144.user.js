// ==UserScript==
// @name		Amazon Wishlist UNC Chapel Hill Library Linky
// @namespace	http://didion.net
// @description v1.0 Search the UNC Chapel Hill Library Catalog from your Amazon wishlist.
// @copyright   Creative Commons Attribution-Noncommercial 3.0 United States License. http://creativecommons.org/licenses/by-nc/3.0/us/
// @author      John Didion
// @include		http://*.amazon.*/gp/registry/wishlist/*
// @include		http://*.amazon.*/registry/wishlist/*
// @include		http://*.amazon.*/wishlist/*
// @include		https://*.amazon.*/gp/registry/wishlist/*
// @include		https://*.amazon.*/registry/wishlist/*
// @include		https://*.amazon.*/wishlist/*
// ==/UserScript==

// Adapted from the SPL Linky Script by Fat Knowledge (http://userscripts.org/scripts/show/8435)

(function() {
	//GM_log('Amazon Wishlist Library Linky');

	var libraryUrlPattern = 'http://search.lib.unc.edu/search?Ntk=ISBN&Ntt=';
	var libraryName = 'UNC Chapel Hill Library';
    
    var libraryAvailability = /Available/;
	var libraryOnOrder = /On Order/;
	var libraryDueBack = /Due (\d{2}-\d{2}-\d{4})/;
	var libraryInTransit = /In Transit/;
	var libraryElectronic = /Online Access/;
	var notFound = /No results found/;
    var locations = /<td colspan="2" class="brieflocation">(.*)<\/td>$\n<td>(.*)$\n<br\/>$\n<\/td>$\n.*$\n<span class="status">(.*)<\/span>/gim;

    var NO_MATCH = -1;
    var ERROR = 0;
    var NOT_AVAILABLE = 1;
    var DIGITAL = 2;
    var PHYSICAL = 3;

    main();

function main() {
	// find all strong (bold) a hrefs in the list-items section of the html
	var items = document.evaluate('//strong/a[@href]', getElementsByAttribute(
	    document.body, "table", "class", "list-items")[0], null, 
	    XPathResult.ANY_TYPE, null);
	var item = items.iterateNext();

	while (item) {
	    // split the contents of the name attribute into array elements
		var asin = String(item).split('/');	
		if (!asin) continue;
		// grab the ASIN from the array
		asin = asin[5];					
		//GM_log(asin);
		
		getStatusForAllISBNs(item, asin);

        item = items.iterateNext();
	}
}

//get other ISBNs for book and look up status for each
function getStatusForAllISBNs(item, isbn) {
    var isbnKey = isbn + ".related";
    var isbnRelStr = GM_getValue(isbnKey);
    //GM_log('value for isbn ' + isbn + ': ' + isbnRelStr);
    if (isbnRelStr == undefined || isbnRelStr.length == 0) {
    	var wbUrl = 'http://xisbn.worldcat.org/webservices/xid/isbn/' + isbn;
    	//GM_log("Getting ISBNs from: " + wbUrl);
    	GM_xmlhttpRequest({
    	    method: 'GET',
    	    url: wbUrl,
    	    headers: {
    	        'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey/0.3',
    	        'Accept': 'application/atom+xml,application/xml,text/xml',
    	    },
    	    onload: function(responseDetails) {
    	        //GM_log(responseDetails.responseText);	
    	        var rt = responseDetails.responseText;
    	        rt = rt.replace(/isbn\s*/gi, "isbn");
    	        rt = rt.replace(/>\s*</gi, "><");
    	        //GM_log(rt);
	        
    	        var doc = new DOMParser().parseFromString(rt, "application/xml");
    	        var responseStatus = 
    	            doc.getElementsByTagName('rsp').item(0).getAttribute('stat');
    	        if (responseStatus == 'ok') {
    	            //GM_log('response ok');
                    var isbnNodes = doc.getElementsByTagName('isbn'); 
                    //GM_log("Num nodes: " + isbnNodes.length);
                    if (isbnNodes.length == 0) {
                        GM_setValue(isbnKey, '<none>');
                    }
                    else {
                        var isbns = new Array(isbnNodes.length);
                        for (var i = 0; i < isbnNodes.length; i++) {
                            isbns[i] = isbnNodes.item(i).firstChild.data;
                        }
                        var isbnStr = isbns.join(",");
                        GM_setValue(isbnKey, isbnStr);
                        //GM_log("Got ISBNs from xISBN: " + isbnStr);
                        getBookStatuses(item, isbns, isbn, NO_MATCH);
                    }
                }
                else {
                    GM_log("Non-ok response status for isbn " + isbn + ": " + responseStatus);
                }
    	    }
    	});
	}
	else if (isbnRelStr != '<none>') {
        //GM_log("Got isbns from cache: " + isbnRelStr);
        var isbns = isbnRelStr.split(",");
        getBookStatuses(item, isbns, isbn, NO_MATCH);
	}
}

//get book status for isbn and insert onto screen
function getBookStatuses(item, isbns, origIsbn, status) {
    if (!isbns || isbns.length == 0) {
        return;
    }
    
    var isbn = isbns.pop();
	//GM_log("ISBN: " + isbn);	
		
	GM_xmlhttpRequest
		({
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
			status = setLibraryHTML(
			    item, isbn, origIsbn, shortMsg, longMsg, color, alt, status, 
			    newStatus);
			if (status < PHYSICAL) {
			    getBookStatuses(item, isbns, origIsbn, status);
		    }
		}
	});
}

// print status of book below name
function setLibraryHTML(item, isbn, origIsbn, shortMsg, longMsg, color, toolTip, status, newStatus) {
    //GM_log("setLibraryHTML(" + isbn + ',' + origIsbn + ',' + shortMsg + ',' +
    //       longMsg + ',' + color + ',' + toolTip + ',' + status + ',' + newStatus);
           
    if (newStatus < status || newStatus < 0) {
        //GM_log('newStatus not better');
        return status;
    }

    // get the parent table
    var parent = item.parentNode.parentNode.parentNode;
    // remove any children of a lesser status
    if (newStatus > status) {
        var children = parent.getElementsByClassName("unclinky");
        if (children.length > 0) {
            for (var i = 0; i < children.length; i++) {
                parent.removeChild(children.item(i));
            }
        }
    }
    
    if (toolTip == null || toolTip.length == 0) {
	    toolTip = longMsg;
	}
    
    // setup row
	var row = document.createElement('tr');
	row.setAttribute('class', 'unclinky');

	// setup cell
	var cell = document.createElement('td');
	
	// setup link
	var link = document.createElement('a');
	link.setAttribute('title', toolTip);
	link.setAttribute('alt', longMsg);
	link.setAttribute('href', libraryUrlPattern + isbn);
	link.style.color = color;
	link.appendChild(document.createTextNode(longMsg));
	
	// add link to td and td to tr and tr to parent table
	cell.appendChild(link);
	row.appendChild(cell);
	parent.appendChild(row);
	
	return newStatus;
}

function getElementsByAttribute(oElm, strTagName, strAttributeName, strAttributeValue) {
	var arrElements = (strTagName == "*" && oElm.all) ? 
	    oElm.all : oElm.getElementsByTagName(strTagName);
	var arrReturnElements = new Array();
	var oAttributeValue = (typeof strAttributeValue != "undefined") ? 
	    new RegExp("(^|\s)" + strAttributeValue + "(\s|$)") : null;
	var oCurrent;
	var oAttribute;
	for (var i=0; i<arrElements.length; i++) {
		oCurrent = arrElements[i];
		oAttribute = oCurrent.getAttribute && oCurrent.getAttribute(strAttributeName);
		if (typeof oAttribute == "string" && oAttribute.length > 0) {
			if (typeof strAttributeValue == "undefined" 
			        || (oAttributeValue && oAttributeValue.test(oAttribute))) {
				arrReturnElements.push(oCurrent);
			}
		}
	}
	return arrReturnElements;
}

})();
