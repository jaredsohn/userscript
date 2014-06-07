// ==UserScript==
// @name          Amazon Library ITT Dublin Link
// @description	  Show the Library ITT Dublin holdings of books on their Amazon pages.
// @include       http://*.amazon.*
// ==/UserScript==


// Jan 2006 - adapted from SPL Linky by Ed Vielmetti
// April 2009 - updated to support multiple edition lookup by Wayne Eaker
// June 2010 - updated for Library ITT Dublin by Niamh Walker-Headon
// Oct 2010 - updated for Library ITT Dublin by Niamh Walker-Headon
// Written by Edward Vielmetti, emv@superpatron.com
// "Superpatron" weblog: http://vielmetti.typepad.com/superpatron
// adapted from SPL Linky
// adapted from AADL linky
// original from Jon Udell Library Lookup Project
// Availibiity shows only on error checking entry - so this version has been edited to allow for that. 


// Tested with for Firefox 3.0 and GreaseMonkey 0.8.2
// This script only supports items with an ISBN number, so it doesn't handle movies or music, though it will find audio books.

(

function()
{

var libraryUrlPattern = 'http://millennium.it-tallaght.ie/search/i?SEARCH=';
var libraryUrlPatternTrailer = '&submit=Search&searchscope=';
var libraryTitleUrlPattern ='http://millennium.it-tallaght.ie/search/t?SEARCH=';

var libraryName = 'Library ITT Dublin';
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
                        "On the shelf now!",
                        "Green"
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
                        "Error Determining Status",
                        "Orange"
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
	
	
	
	
  }
catch (e)
    { return; }
    
for(var i = 0; i < isbns.length; i++) {
	//alert('lookup ' + i);
	libraryLookup.doLookup(isbns[i]);
}
}
)();