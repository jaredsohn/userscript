// ==UserScript==
// @name          Amazon Colgate Library checker
// @namespace     http://www.jonbernard.org
// @description	Search the Colgate University Library Catalog from Amazon book listings.
// @include       http://*.amazon.*
// ==/UserScript==


var libraryUrlPattern = 'http://library.colgate.edu/search';
var libraryUrlPatternTrailer = '';
var libraryName = 'Colgate';
var libraryAvailability = /AVAILABLE/;
var libraryOnOrder = /ordered for Library System/;
var libraryInProcess = /being processed for Library System/;
var libraryHolds = /(\d+) holds on First Copy Returned/;
var libraryDue = /DUE (\d\d\-\d\d\-\d\d)/;
var libraryMultiple = /(\d+) results found. /;
var libraryPickup = /PICKUP AT CIRC/;
var notFound = /NO ENTRIES FOUND/;
var titleTagPattern = /([^)(]*)/;	
var origTitle;
var description;
var title;
var author;
var searchurl;

function insertLink(title, hrefTitle, aLabel, color)
{
    var div = origTitle.parentNode;
    var sometitle = origTitle.firstChild.nodeValue;

    var newTitle = document.createElement('b');
    newTitle.setAttribute('class','sans');

    var titleText = document.createTextNode(sometitle);
    newTitle.appendChild(titleText);
        
    var br = document.createElement('br');

    var link = document.createElement('a');
    link.setAttribute ( 'title', hrefTitle );
    link.setAttribute('href', searchurl);
    link.setAttribute('style','color: ' + color);

    var label = document.createTextNode( aLabel );

    link.appendChild(label);

    div.insertBefore(newTitle, origTitle);
    div.insertBefore(br, origTitle);
    div.insertBefore(link, origTitle);
    div.removeChild(origTitle);
}

function doLookup(title)
{
    function insertLinkT(href, label, color) { insertLink(title, href, label, color); }

    GM_xmlhttpRequest({
	  method: 'GET',
	  url: searchurl,
	  onload: function(results)
	  {
		page = results.responseText;
                if (notFound.test(page)) {
                    insertLinkT (
                        "Not carried",
                        "Not at " + libraryName,
                        "red"
                        );
                } else if (libraryHolds.test(page)) {
                    var holds = page.match(libraryHolds)[1];
		    var due = page.match(libraryDue)[1];
                    insertLinkT (
                        holds + " Holds",
                        holds + " Holds, " + "Due back at " + libraryName + " on " + due,
                        "#AA7700"  // dark yellow
                        );
                } else if (libraryAvailability.test(page)) {
                    insertLinkT (
                        "On the shelf now!",
                        "Available at " + libraryName,
                        "green"
                        );
		} else if (libraryOnOrder.test(page)) {
                    insertLinkT (
                        "On order!",
                        "On order at " + libraryName,
                        "#AA7700"  
                        );
		} else if (libraryInProcess.test(page)) {
                    insertLinkT (
                        "In process!",
                        "In process (available soon) at " + libraryName,
                        "#AA7700"  
                        );
		} else if (libraryDue.test(page)) {   
                    var due = page.match(libraryDue)[1];
		    insertLinkT (    
			"Due back",
                        "Due back at " + libraryName + " on " + due,
                        "#AA7700"
                        );
		} else if (libraryMultiple.test(page)) {   
		    var count = page.match(libraryMultiple)[1];
		    insertLinkT (    
			"Multiple results",
                        count + " matches at " + libraryName,
                        "#AA7700"
                        );
		} else if (libraryPickup.test(page)) {   
		    insertLinkT (    
			"Awaiting pickup",
				"Awaiting pickup at " + libraryName,
                        "#AA7700"
                        );
		} else {
		    insertLinkT (
                        "Error",
                        "Error checking " + libraryName,
                        "orange"
                        );
		}
	  }
	}
	)
}

origTitle = document.evaluate("//b[@class='sans']", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null ).singleNodeValue;
if (!origTitle) { return; }

//    var isbn = window.content.location.href.match(/\/(\d{7,9}[\d|X])\//)[1];  
description = document.getElementsByTagName('meta')[0].content.match(/Amazon.com: (.*): Books: (.*) by \2/);

title = description[1].toLowerCase().match(/[^(]+/)[0];
title = title.replace(/^the |^a |^an /, '');
title = title.replace(/,? \S+ edition/i,'');

author = description[2].split(',')[0].split(' ').pop();

searchurl = libraryUrlPattern + '/X?' + 't:' + '("' + title + '")' + '+and+' + 'a:' + '(' + author + ')' + '&m=a';

doLookup(title);