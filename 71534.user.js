// ==UserScript==
// @name           Search for Round Rock Public Library from Amazon
// @namespace      http://www.roundrocktexas.gov/library
// @description    v1.3 Search the Round Rock Public Library Catalog from Amazon book listings.
// @include        http://*.amazon.*
// ==/UserScript==

// Based on work by Fat Knowledge http://userscripts.org/scripts/show/8432
// Searches by title and other improvements added by Arthaey Angosii
// local edition cribbed from the Seattle Public Library Greasemonkey Script

(function(){
//	GM_log('Amazon Round Rock Public Library ');
//	Original version http://lib.round-rock.tx.us:8080/ipac20/ipac.jsp?
	var libraryName = 'the Round Rock Public Library';
	var libraryTitleUrlPattern = 'http://cat.round-rock.tx.us:8080/ipac20/ipac.jsp?index=ALLTITL&term='
	var libraryIsbnUrlPattern = 'http://cat.round-rock.tx.us:8080/ipac20/ipac.jsp?index=ISBNEX&term='
	

//library statuses, text may need to be changed for other libraries
//check that the text on the result page of your library matches the text below
//other changes in getBookStatus() might be needed as well (for example to handle states not listed below)
	
	var libraryNotFound = /Sorry, no matches found./;
	var libraryCheckedIn = /Checked In/;
	var libraryOnOrder = /On Order/;
	var libraryInProcess = /In Cataloging/;
	var libraryHolds = /Item being held/;
	
	var libraryDueBack = /(\d{2}\/\d{2}\/\d{4})/;
	var libraryNewlyArrived = /Newly arrived/;
	var libraryAskStaff = /Ask check-out staff if not on shelf/;
	var libraryItemMissing = /Item missing/;
	var libraryInTechServices = /In processing/;
	var libraryOnlineMaterials =/Online/;


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
				//23 active, 12 inactive
				var holds = /Item{1,}/;
				var holdsStr = page.match(holds);

				setLibraryHTML(
					libraryUrlPattern, isbn,
					"Item being held",
					holdsStr + " being held for patron at " + libraryName,
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


			
			else if ( libraryItemMissing.test(page) )
				{
				setLibraryHTML(
					libraryUrlPattern, isbn,
					"Item missing",
					"This item is currently missing from " + libraryName,
					"black" 
//					"#000000" //black
					);
			   foundCount++;
  			   getBookStatuses();
				}

			else if ( libraryOnOrder.test(page) )
				{
				setLibraryHTML(
					libraryUrlPattern, isbn,
					"On order",
					"On order at " + libraryName,
					"#AA7700"  // dark yellow
//					"#ffffac"  //light yellow
					);
			   foundCount++;
  			   getBookStatuses();
				} 

			else if ( libraryInTechServices.test(page) )
				{
				setLibraryHTML(
					libraryUrlPattern, isbn,
					"In processing",
					"This item will be available soon at " + libraryName,
					"#AA7700"  // dark yellow
//					"#ffffac"  //light yellow
					);
			   foundCount++;
  			   getBookStatuses();
				} 



			else if ( libraryAskStaff.test(page) )
				{
				setLibraryHTML(
					libraryUrlPattern, isbn,
					"Ask staff",
					"Recently returned. Ask staff if not on shelf at " + libraryName,
					"#AA7700"  // dark yellow
//					"#ffffac"  //light yellow
					);
			   foundCount++;
  			   getBookStatuses();
				}



			else if ( libraryNewlyArrived.test(page) )
				{
				setLibraryHTML(
					libraryUrlPattern, isbn,
					"Newly arrived!",
					"Newly arrived for processing at " + libraryName,
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
					"In cataloging!",
					"In cataloging (available soon) at "+ libraryName,
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
			

			else if ( libraryOnlineMaterials.test(page) )
				{
				setLibraryHTML(
					libraryUrlPattern, isbn,
					"Online",
					"Access this digital title with a card from " + libraryName,
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
					"Not found at "+ libraryName, 
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

	var nodes = document.evaluate("//span[@id='" + titleNodeId + "']", document, null, 

XPathResult.UNORDERED_NODE_ITERATOR_TYPE, null);
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