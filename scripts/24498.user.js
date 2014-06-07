// ==UserScript==
// @name          Amazon UW Madison Libraries Linky
// @namespace     http://ebling.library.wisc.edu/
// @description	  Search the UW Madison Libraries from Amazon book listings.  Request items not owned through Ebling Library Purchase Request.
// @include       http://*.amazon.*
// ==/UserScript==

// This script is merely a trivial modification of script by http://fatknowledge.blogspot.com: http://userscripts.org/scripts/show/8432 Based on work by Carrick Mundell http://userscripts.org/scripts/show/1396

// Updated for change in UW Madioson libraries OPAC display.
// Updated for another round of Amazon display changes.
// Now handles the case for numerous books status' in the MadCat catalog and sends title and isbn to Ebling Library purchase request form for unowned items



(function(){
//	GM_log('Amazon UW Madison Libraries Linky');	
 
	var libraryUrlPattern = 'http://madcat.library.wisc.edu/cgi-bin/Pwebrecon.cgi?DB=local&CNT=25+records+per+page&CMD=isbn+';

	var libraryName = 'UW Madison Libraries';
	var isbn = get_isbn(window.content.location.href);
	if (isbn==0) { return;}
	else { getBookStatus(isbn); }


//check if there is a ISBN in the URL
//URL looks like http://www.amazon.com/Liseys-Story-Stephen-King/dp/0743289412/ref=xarw/002-5799652-4968811
function get_isbn(url){
	try { 
		//match if there is a / followed by a 7-9 digit number followed by either another number or an x 
		//followed by a / or end of url 
		var isbn = url.match(/\/(\d{7,9}[\d|X])(\/|$)/)[1]; 
	} catch (e) { return 0; }

	return isbn;
}

//connect to library server to get book status for isbn and then insert result under the book title
function getBookStatus(isbn){
	GM_log('Amazon UW Madison Libraries Linky Searching');	
var libraryAvailability = /Not Checked Out/;
var libraryEbling = /Ebling Library/;
var libraryBindery = /At Bindery/;
var libraryOnHold = /On hold/;
var libraryOverdue = /Overdue/;
var libraryRenewed = /Renewed/;
var libraryReturned = /Returned on/;
var libraryTransit = /In transit/;
var libraryClaimed = /1 Copy Claimed as of/;
var libraryPreOrder = /In the Pre-Order Process/;
var libraryBeingProcessed = /This Copy Being Processed as of/;
var libraryOnOrderNew = /1 Copy Ordered as of/;
var libraryInProcess = /In Process/;
var libraryDueBack = /Due/;
var libraryLost = /Lost/;
var libraryMissing = /Missing/;
var libraryStorage = /Storage/;
var notFound = /No Items/;
var libraryUrlPattern = 'http://madcat.library.wisc.edu/cgi-bin/Pwebrecon.cgi?DB=local&CNT=25+records+per+page&CMD=isbn+';
var purchaseUrlPattern = 'http://ebling.library.wisc.edu/services/collection/purchase_request.cfm?moreinfo=amazon+selection+isbn=';

	GM_xmlhttpRequest
		({
		method:'GET',
		url: libraryUrlPattern + isbn,
		onload:function(results) {
  page = results.responseText;

                if ( notFound.test(page) )

                    {

                    var due = page.match(notFound)[1]

					setLibraryHTMLOrder(

					isbn,

					"Not carried",

					"Request this book be purchased by the " + libraryName,

					"red"

				 );

                    }

                else if ( libraryAvailability.test(page) )

                    {

                    if ( libraryEbling.test(page) )

					{

			var library = 'Ebling Library';

			setLibraryHTML (

                        isbn,

                        "On the shelf now!",

                        "Available at the " + library + "!",

                        "black",

						"yellow"

						);

					}

					else

					{

					setLibraryHTML (

                        isbn,

                        "On the shelf now!",

                        "Available from " + libraryName + "!",

                        "red",

						"yellow"

						);

					}

                    }

				else if ( libraryTransit.test(page) )

                    {

                    setLibraryHTML (

                        isbn,

                        "In Transit!",

                        "In transit between two libraries.",

                        "#AA7700"  // dark yellow

                        );

                    }     

				else if ( libraryOnHold.test(page) )

                    {

                    setLibraryHTML (

                        isbn,

                        "On Hold for Another Patron!",

                        "This item is currently on hold for another library patron.",

                        "#AA7700"  // dark yellow

                        );

                    }  

				else if ( libraryOverdue.test(page) )

                    {

                    setLibraryHTML (

                        isbn,

                        "Overdue!",

                        "This item is checked out to another patron and is overdue.",

                        "#AA7700"  // dark yellow

                        );

                    } 

				else if ( libraryRenewed.test(page) )

                    {

                    setLibraryHTML (

                        isbn,

                        "Recently Renewed!",

                        "This item is checked out to another patron and has recently been renewed.",

                        "#AA7700"  // dark yellow

                        );

                    } 

                else if ( libraryClaimed.test(page) )

                    {

                    setLibraryHTML (

                        isbn,

                        "On order!",

                        "This item has been ordered by " + libraryName + " but it was not received by the expected date!",

                        "#AA7700"  // dark yellow

                        );

                    }               

   				else if ( libraryOnOrderNew.test(page) )

                    {

                    setLibraryHTML (

                        isbn,

                        "On order!",

                        "1 Copy Ordered for the " + libraryName + "!",

                        "#AA7700"  // dark yellow

                        );

                    }      

                else if ( libraryInProcess.test(page) )

                    {

                    setLibraryHTML (

                        isbn,

                        "In process!",

                        "In process (available soon) in the " + libraryName + "!",

                        "#AA7700"  // dark yellow

                        );

                    }                    

                else if ( libraryDueBack.test(page) )

                    {

                    setLibraryHTML (

						 isbn,

                        "Checked Out" ,

                        "Checked Out from the " + libraryName,

                        "#AA7700"  // dark yellow

                        );

                    }

                else if ( libraryStorage.test(page) )

                    {

                    setLibraryHTML (

                        isbn,

                        "In storage",

                        "In storage at the " + libraryName + ".",

                        "#AA7700"  // dark yellow

                        );

                    }

                else if ( libraryBindery.test(page) )

                    {

                    setLibraryHTML (

                        isbn,

                        "At Bindery",

                        "At the bindery.",

                        "#AA7700"  // dark yellow

                        );

                    }

				else if ( libraryBeingProcessed.test(page) )

                    {

                    setLibraryHTML (

                        isbn,

                        "Available Soon!",

                        "This title has been received by the library, but it is not yet on the library shelves.",

                        "#AA7700"  // dark yellow

                        );

                    }

                else if ( libraryMissing.test(page) )

                    {

                    setLibraryHTML (

                        isbn,

                        "Missing!",

                        "Missing from the " + libraryName + "!",

                        "red"

                        );

                    }

                else if ( libraryLost.test(page) )

                    {

                    setLibraryHTML (

                        isbn,

                        "Lost!",

                        "Lost from the " + libraryName + "!",

                        "red"

                        );

                    }

                else

                    {

                    setLibraryHTML (

                        isbn,

                        "Error",

                        "Error checking the " + libraryName,

                        "orange"

                        );


				}
			}
		});
}

//print status of book below book title
function setLibraryHTML(isbn, title, linktext, color) {
	GM_log(linktext);	

	var titleNode = getBookTitleNode();
	var div = titleNode.parentNode;
	var br = document.createElement('br');
	var link = document.createElement('a');
	link.setAttribute('title', title );
	link.setAttribute('href', libraryUrlPattern + isbn);
	link.setAttribute('style','color: ' + color);
	var label = document.createTextNode( linktext );
	link.appendChild(label);

	//How lame is this javascript DOM syntax?  Instead of having an insertAfter function, you have an insertBefore
	//and then pass in the .nextSibling attribute of the element.  Really inuitive guys.
	div.insertBefore(link, titleNode.nextSibling);
	div.insertBefore(br, titleNode.nextSibling);
}
function setLibraryHTMLOrder(isbn, title, linktext, color) {
	GM_log(linktext);	

	var titleNode = getBookTitleNode();
	var div = titleNode.parentNode;
	var bookTitle = document.getElementById('btAsinTitle');
	var book = bookTitle.innerHTML;
	var pUrl = window.content.location.href;

	var br = document.createElement('br');
	var link = document.createElement('a');
	link.setAttribute('title', title );

        link.setAttribute('href', 'http://ebling.library.wisc.edu/services/collection/purchase_request.cfm?moreinfo=amazon+selection+isbn=' + isbn + '&title=' + book + '&pUrl=' + pUrl);
	link.setAttribute('style','color: ' + color);

	var label = document.createTextNode( linktext );
	link.appendChild(label);

	//How lame is this javascript DOM syntax?  Instead of having an insertAfter function, you have an insertBefore
	//and then pass in the .nextSibling attribute of the element.  Really inuitive guys.
	div.insertBefore(link, titleNode.nextSibling);
	div.insertBefore(br, titleNode.nextSibling);
}
//find the node associated with the title of the booklast one
function getBookTitleNode(){
	var iterator = document.evaluate("//span[@id='btAsinTitle']", document, null, XPathResult.UNORDERED_NODE_ITERATOR_TYPE, null );

	//get the last node
	try {
	  var thisNode = iterator.iterateNext();
	  
	  while (thisNode) {
	//    GM_log( thisNode.textContent );
		titleNode = thisNode;
		thisNode = iterator.iterateNext();
	  }	

	} catch (e) {
	  dump( 'Error: Document tree modified during iteration ' + e );
	}

	if ( !titleNode)  {GM_log("can't find title node"); return; }
	return titleNode;
}

}
)();