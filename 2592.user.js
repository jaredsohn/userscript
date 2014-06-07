// ==UserScript==
// @name          Amazon - AADL Link
// @description	  Show the Ann Arbor District Library's holdings of books on their Amazon pages.
// @include       http://*.amazon.*
// ==/UserScript==

// Jan 2006 - adapted from SPL Linky by Ed Vielmetti
// April 2009 - updated to support multiple edition lookup by Wayne Eaker

// Tested with for Firefox 3.0 and GreaseMonkey 0.8.2
// This script only supports items with an ISBN number, so it doesn't handle movies or music, though it will find audio books.

(

function()
{

var libraryUrlPattern = 'http://www.aadl.org/cat/seek/search/i?SEARCH=';
var libraryUrlPatternTrailer = '&submit=Search&searchscope=26&x=0&y=0';
var libraryName = 'the Ann Arbor District';
var libraryAvailability = /AVAILABLE/;
var libraryOnOrder = /copy ordered for Library System/;
var libraryInProcess = /In Process/;
var libraryHolds = /(\d+) holds on first copy returned/;
var libraryDue = /DUE (\d\d\-\d\d\-\d\d)/;
var notFound = /No matches found; nearby STANDARD NOS are/;

var libraryLookup = 
    {
    insertLink: function(isbn, edition, hrefTitle, aLabel, color )
        {
			var libraryStripe = document.getElementById('LibraryStripeContent');
        	var holdingDiv = document.createElement('div');
        	var link = document.createElement('a');
        	link.setAttribute ( 'title', hrefTitle );
        	link.setAttribute('href', libraryUrlPattern + isbn);
        	link.setAttribute('target','_blank');
        	link.setAttribute('style','float:left; margin-right: 15px; color: ' + color);

        	var label = document.createTextNode( edition + " (" + aLabel + ") " );
			link.appendChild(label);
			holdingDiv.appendChild(link);
			libraryStripe.insertBefore(holdingDiv,libraryStripe.childNodes[libraryStripe.childNodes.length-1]);

        },


    doLookup: function ( id )
        {
        	var isbn = id.split(':::')[0];
        	var edition = id.split(':::')[1];
          GM_xmlhttpRequest
            ({
            method:'GET',
            url: libraryUrlPattern + isbn + libraryUrlPatternTrailer,
            onload:function(results)
                {
                page = results.responseText;
               if ( notFound.test(page) )
                    {
                    
                    }
                else if ( libraryHolds.test(page) )
                    {
                    var holds = page.match(libraryHolds)[1]
                    var due = page.match(libraryDue)[1]
                    libraryLookup.insertLink (
                        isbn,
                        edition,
                        holds + " Holds",
                        holds + " Holds, " + "Due back on " + due,
                        "#AA7700"  // dark yellow
                        );
                    }
                else if ( libraryAvailability.test(page) )
                    {
                    libraryLookup.insertLink (
                        isbn + '',
                        edition,
                        "On the shelf now!",
                        "Available",
                        "green"
                        );
                    }
                else if ( libraryOnOrder.test(page) )
                    {
                    libraryLookup.insertLink (
                        isbn,
                        edition,
                        "On order!",
                        "On order",
                        "#AA7700"  // dark yellow
                        );
                    }                    
                else if ( libraryInProcess.test(page) )
                    {
                    libraryLookup.insertLink (
                        isbn,
                        edition,
                        "In process!",
                        "In process - available soon",
                        "#AA7700"  // dark yellow
                        );
                    }                    

                else if ( libraryDue.test(page) )
                    {   
                    var due = page.match(libraryDue)[1]
                    libraryLookup.insertLink (
                        isbn,
                        edition,
                        "Checked Out",
                        "Due back on " + due,
                        "#AA7700"
                        );
                    }
                else
                    {
                    libraryLookup.insertLink (
                        isbn,
                        edition,
                        "Error Determining Status",
                        "Book found, but can't determine status (Click for details)",
                        "red"
                        );
                    }
                }
            });
           
        }
  

    }

try 
  { 
    //alert('start');
	var primeStripe = document.getElementById('PrimeStripeContent');
	var libraryStripe = document.createElement('div');
	libraryStripe.setAttribute('style','width: 100%; background: #ddeeff;padding:10px;border-top:1px solid #aaa;border-bottom:1px solid #aaa;');
	libraryStripe.setAttribute('id','LibraryStripeContent');
	var heading = document.createElement('div');
	heading.setAttribute('style','float:left;font-weight:bold');
	heading.appendChild(document.createTextNode('Holdings of this Title at ' + libraryName +' Library: '));
	libraryStripe.appendChild(heading);
	var clearDiv = document.createElement('div');
	clearDiv.setAttribute('style','clear:both');
	libraryStripe.appendChild(clearDiv);
	libraryStripe.appendChild(clearDiv.cloneNode(true));
	primeStripe.parentNode.insertBefore(libraryStripe,primeStripe.nextSibling);
	
	
	var isbns = new Array();
	var mainISBN = window.content.location.href.match(/\/(\d{7,9}[\d|X])\//)[1];
	if(mainISBN) {
		isbns.push(mainISBN + ':::' + 'This Edition');
	} 
	
	
	
	var salesRank = document.getElementById('SalesRank');
	var otherEdDiv = salesRank.nextSibling.nextSibling;
	var otherLinks = otherEdDiv.getElementsByTagName('A');
	for(var i = 0; i < otherLinks.length; i++) {
		var matches = otherLinks[i].href.match(/\/(\d{7,9}[\d|X])\//);
		if(matches && otherLinks[i].innerHTML != 'All Editions') {
			isbns.push(matches[1] + ':::' + otherLinks[i].innerHTML);
		}
	}
  }
catch (e)
    { return; }
    
for(var i = 0; i < isbns.length; i++) {
	//alert('lookup ' + i);
	libraryLookup.doLookup(isbns[i]);
}
}
)();
