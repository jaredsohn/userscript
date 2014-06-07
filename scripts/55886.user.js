// ==UserScript==
// @name          Amazon KCLS Library Linky
// @namespace     http://fatknowledge.blogspot.com
// @description	  v1.3.2 Search the King County Library System Catalog from Amazon book listings.  
// @include       http://*.amazon.*
// ==/UserScript==

// Based on work by Carrick Mundell http://userscripts.org/scripts/show/1396
// Searches by title and other improvements added by Arthaey Angosii

(function(){
//	GM_log('Amazon KCLS Library Linky');	

	var libraryName = 'the KCLS';
	var libraryIsbnUrlPattern = 'http://catalog.kcls.org/search/i?'
	var libraryTitleUrlPattern = 'http://catalog.kcls.org/search/t?'

//library statuses, text may need to be changed for other libraries
//check that the text on the result page of your library matches the text below
//other changes in getBookStatus() might be needed as well (for example to handle states not listed below)
	var libraryNotFound = /No matches found;/;
	var libraryCheckedIn = /CHECK SHELF/;
	var libraryOnOrder = /copy ordered/;
	var libraryInProcess = /In Process/;
	var libraryHolds = /holds? on first copy/;
	var libraryElectronic = /Downloadable File/;
	var libraryDueBack =  /DUE (\d{2}\-\d{2}\-\d{2})/;

	var isbn = getIsbn(window.content.location.href);
	
	var isbns = new Array();
	var isbnsIndex = -1;
	var foundCount = 0;

	if (isbn!=0){
		createStatusAndLibraryHTML();
		updateStatusHTML('Searching ' + libraryName + '...');

		getStatusAllISBNs(isbn);
	}
	return;


//get all ISBNs for this book and write to global var isbns
//then call getBookStatuses
function getStatusAllISBNs(isbn) {
	var wbUrl = 'http://labs.oclc.org/xisbn/' + isbn;
	GM_xmlhttpRequest({
	    method: 'GET',
	    url: wbUrl,
	    headers: {
	        'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey/0.3',
	        'Accept': 'application/atom+xml,application/xml,text/xml',
	    },
	    onload: function(responseDetails) {
//			GM_log(responseDetails.responseText);	
	        var parser = new DOMParser();
	        var dom = parser.parseFromString(responseDetails.responseText,
	            "application/xml");

	        var isbnsDom = dom.getElementsByTagName('isbn');
	        for (var i = 0; i < isbnsDom.length; i++){
				isbns[i] = isbnsDom[i].textContent;
			}

			getBookStatuses();
	        
	    }
	});	
}

//loop through all the isbns
//this gets called back after each search to do next isbn
function getBookStatuses(){
	isbnsIndex++;
//	GM_log("getBookStatuses"+isbnsIndex+ " " + isbns.length);

	if (isbnsIndex < isbns.length){
		updateStatusHTML("Searching for ISBN "+ isbns[isbnsIndex] + " in " + libraryName + '...');
		getBookStatus(libraryIsbnUrlPattern, isbns[isbnsIndex]);
	//when done going through isbns, update the status
	} else {
		if (foundCount==0){
			setStatusNoneFound();
		} else if (foundCount==1){
			removeStatus();
		} else {
			setStatusColor("black");
			updateStatusHTML(foundCount+ ' versions found:');
		}
	}
}


//connect to library server to get book status for isbn and then insert result under the book title
//call getBookStatuses when done
function getBookStatus(libraryUrlPattern, isbn){
//	GM_log('Searching: '+libraryUrlPattern);	


	GM_xmlhttpRequest
		({
		method:'GET',
		url: libraryUrlPattern + isbn,
		onload:function(results) {
			page = results.responseText;
			if ( libraryNotFound.test(page) ){
				getBookStatuses();
			}
			//if there are holds
			else if ( libraryHolds.test(page) ) {
				//9 holds on first copy returned of 3 copies
				var holds = /\d{1,} holds? on first copy returned of \d{1,} cop/;
				var holdsStr = page.match(holds);

				setLibraryHTML(
					libraryUrlPattern, isbn,
					"Holds!",
					holdsStr + "ies in " + libraryName,  //put ies here to handle singular copy case
					"#AA7700"  // dark yellow
//					"#ffffac"  //light yellow
					);
			   foundCount++;
  			   getBookStatuses();
			}
			else if ( libraryCheckedIn.test(page) )
				{
				setLibraryHTML(
					libraryUrlPattern, isbn,
					"On the shelf now!",
					"Available now in " + libraryName,
					"green" 
//					"#2bff81" //light green
					);
			   foundCount++;
  			   getBookStatuses();
				}
			else if ( libraryOnOrder.test(page) )
				{
				setLibraryHTML(
					libraryUrlPattern, isbn,
					"On order!",
					"On order at " + libraryName,
					"#AA7700"  // dark yellow
//					"#ffffac"  //light yellow
					);
			   foundCount++;
  			   getBookStatuses();
				}                    
			else if ( libraryInProcess.test(page) )
				{
				setLibraryHTML(
					libraryUrlPattern, isbn,
					"In process!",
					"In process (available soon) at "+ libraryName,
					"#AA7700"  // dark yellow
//					"#ffffac"  //light yellow
					);
			   foundCount++;
  			   getBookStatuses();
				}                    
			else if ( libraryDueBack.test(page) )
				{
				var due = page.match(libraryDueBack)[1]
				setLibraryHTML(
					libraryUrlPattern, isbn,
					"Due back " + due,
					"Due back on " + due+ " at "+ libraryName,
					"#AA7700"  // dark yellow
//					"#ffffac"  //light yellow
					);
			   foundCount++;
  			   getBookStatuses();
				}
			else if ( libraryElectronic.test(page) )
				{
				setLibraryHTML(
					libraryUrlPattern, isbn,
					"On the e-shelf now!",
					"Digital version available now at "+ libraryName,
					"green" 
//					"#2bff81" //light green
					);
			   foundCount++;
  			   getBookStatuses();
				}
			else
				{
				setLibraryHTML(
					libraryUrlPattern, isbn,
					"Error",
					"Error checking at "+ libraryName, 
					"orange"
					);
			   foundCount++;
  			   getBookStatuses();
				}
			}
		});
}



function createStatusAndLibraryHTML() {
	var title_node = getTitleNode();
	var h1_node = title_node.parentNode;
	var br = document.createElement('br');

	//the div for library status when found
	var splLinkyDiv = document.createElement('div');
	splLinkyDiv.id = 'splLinkyLibraryHTML';
	//resize to 60% to get out of the enlarged h1 size and return back to normal
	splLinkyDiv.style.fontSize = '60%';
	splLinkyDiv.style.color = 'black';

	//How lame is this javascript DOM syntax?  Instead of having an insertAfter function, you have an insertBefore
	//and then pass in the .nextSibling attribute of the element.  Really inuitive guys.
	h1_node.insertBefore(splLinkyDiv, title_node.nextSibling);
	h1_node.insertBefore(br, title_node.nextSibling);

	//the div for status as checks are occuring
	var splStatusDiv = document.createElement('div');
	splStatusDiv.id = 'splLinkyStatusHTML';
	//resize to 60% to get out of the enlarged h1 size and return back to normal
	splStatusDiv.style.fontSize = '60%';
	splStatusDiv.style.color = 'brown';

	h1_node.insertBefore(splStatusDiv, splLinkyDiv);
//	h1_node.insertBefore(br, title_node.nextSibling);

}


function updateStatusHTML(text) {
	var splStatusDiv = document.getElementById('splLinkyStatusHTML');
	if (splStatusDiv == null) { return; }

	if (splStatusDiv.firstChild){
		splStatusDiv.removeChild(splStatusDiv.firstChild);
	}
	splStatusDiv.appendChild(document.createTextNode(text));
}

//add status of book below previous ones
function setLibraryHTML(libraryUrlPattern, isbn, title, linktext, color) {
	var splLinkyDiv = document.getElementById('splLinkyLibraryHTML');
	if (splLinkyDiv == null) { return; }

	var link = document.createElement('a');
	link.setAttribute('title', title );
	link.setAttribute('href', libraryUrlPattern+isbn);
	link.setAttribute('target', "_blank");
	link.style.color = color;

	var label = document.createTextNode( linktext );
	link.appendChild(label);

	//append to existing content
	splLinkyDiv.appendChild(link);
	splLinkyDiv.appendChild(document.createElement('br'));
}

//none found
//add link to search by title
function setStatusNoneFound() {
	var title = getTitle();

	var splStatusDiv = document.getElementById('splLinkyStatusHTML');
	if (splStatusDiv == null) { return; }

	var link = document.createElement('a');
	link.setAttribute('title', title );
	link.setAttribute('href', libraryTitleUrlPattern +encodeURIComponent(title));
	link.setAttribute('target', "_blank");
	link.style.color = "red";

	var label = document.createTextNode('Not found. Search by title in ' + libraryName + '...' );
	link.appendChild(label);

	//remove existing content
	splStatusDiv.removeChild(splStatusDiv.firstChild);
	splStatusDiv.appendChild(link);
}

function setStatusColor(color){
	var splStatusDiv = document.getElementById('splLinkyStatusHTML');
	if (splStatusDiv == null) { return; }

	splStatusDiv.style.color = color;

}

function removeStatus(){
	var splStatusDiv = document.getElementById('splLinkyStatusHTML');
	splStatusDiv.removeChild(splStatusDiv.firstChild);
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

function getTitle(){
	var title = getTitleNode();
	if (title==null) { return null; }

	//remove words in parentheses and subtitles (anything after a colon)
	return title.textContent.replace(/\(.+\)/, '').replace(/:.*/, '')
}

// Find the node containing the book title
function getTitleNode()
{
	var titleNodeId = 'btAsinTitle';

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

	if (titleNode == null) {
        GM_log("can't find title node");
		return null;
	} else {
       // GM_log("Found title node: " + titleNode.textContent);
	}
	return titleNode;
}


}
)();