// ==UserScript==
// @name        Open University of Catalonia Library - LibraryLookup
// @description Check book availability in Open University of Catalonia Library.  When you look at a book on Amazon.com, this script will check the Open University of Catalonia Library catalog, then show you in the best link to get the book.
// @include     http://www.amazon.*
// @include     http://books.google.*
// ==/UserScript==

(function(){
//	GM_log('Amazon UOC's Library Linky');	

	var libraryName = 'UOCs Library';
	var libraryIsbnUrlPattern = 'http://cataleg.uoc.edu/search~S1*eng?/i';
	var libraryTitleUrlPattern = 'http://cataleg.uoc.edu/search~S1*eng?/t';
	
	
	
	
	//Please
	 var prefix = 'http://cataleg.uoc.edu/search~S1*cat/?searchtype=i&searcharg=';
     var suffix = '&searchscope=1&sortdropdown=-&SORT=D&extended=1&SUBMIT=Cerca';
	//------------


	
	
	
	//library statuses, text may need to be changed for other libraries
//check that the text on the result page of your library matches the text below
//other changes in getBookStatus() might be needed as well (for example to handle states not listed below)
	var libraryNotFound = /No matches found/;
//	var libraryCheckedIn = /Checked In/;
	var libraryOnOrder = /On Order/;
	var libraryInProcess = /In Process/;
	var libraryHolds = /holdsInfoAdvanced/;
	var libraryElectronic = /Electronic Resource/;
	var libraryDueBack = /(\d{2}\/\d{2}\/\d{4})/;
	
	var libraryCheckedInPaper = /bibItems/;
	var libraryCheckedInPaperAvailable = /&nbsp;AVAILABLE/; 	
	var libraryCheckedIn = /bibDetail/;
	var libraryCheckedInLibUseOnly = /LIB USE ONLY/;
	var libraryCheckedInMissing = /MISSING/; 
	var libraryCheckedInLostAndPaid = /LOST&nbsp;AND&nbsp;PAID/; 
	var libraryCheckedInTransfer = /IN&nbsp;TRANSFER/; 
	var libraryCheckedInTechnicalProc = /TECHNICAL&nbsp;PROC/;
	var libraryCheckedInDue = /DUE/; 
	var libraryCheckedInCatalogation = /&nbsp;CATALOGATION/; 	

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
	
	isbns[0]=isbn;
	getBookStatuses();

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

 var prefix = 'http://cataleg.uoc.edu/search~S1*eng/?searchtype=i&searcharg=';
 var suffix = '&searchscope=1&sortdropdown=-&SORT=D&extended=1&SUBMIT=Cerca';



	GM_xmlhttpRequest
		({
		method:'GET',
		url: prefix + isbn + suffix,
		onload:function(results) {
			page = results.responseText;
			
			//Book not found
			if ( libraryNotFound.test(page) ){
				
				getBookStatuses();
			}
			
			//Find state table <bibItems> is paper edition
			
			else if ( libraryCheckedInPaper.test(page) )
				{

					//The book is available in the library (state = AVAILABLE)
					if ( libraryCheckedInPaperAvailable.test(page) )
					{

					setLibraryHTML(
						libraryUrlPattern, isbn,
						"On the shelf now!",
						"Available now in " + libraryName + " in paper edition",
						"green" 
	//					"#2bff81" //light green
						);
				   foundCount++;
				   getBookStatuses();
					}
					
					//The book is available in the library (state = CATALOGATION)
					else if ( libraryCheckedInCatalogation.test(page) )
					{

					setLibraryHTML(
						libraryUrlPattern, isbn,
						"On the shelf now!",
						"Available now in " + libraryName + " in paper edition",
						"green" 
	//					"#2bff81" //light green
						);
				   foundCount++;
				   getBookStatuses();
					}
					
					
					
					//The book is available in the library (state = DUE)
					else if ( libraryCheckedInDue.test(page) )
						{

						setLibraryHTML(
							libraryUrlPattern, isbn,
							"On the shelf now!",
							"Available now in " + libraryName + " in paper edition",
							"green" 
		//					"#2bff81" //light green
							);
					   foundCount++;
					   getBookStatuses();
						}
					
					//The book is in the library but can not be reservate (state = LIB USE ONLY)
					else if ( libraryCheckedInLibUseOnly.test(page) )
					{
					setLibraryHTML(
						libraryUrlPattern, isbn,
						"On the shelf now!",
						"The book is in " + libraryName + " but can not be reservate",
						"green" 
	//					"#2bff81" //light green
						);
				   foundCount++;
				   getBookStatuses();
					}
					//The book is in the library but can not be reservate (state = MISSING)
					else if ( libraryCheckedInMissing.test(page) )
					{
					setLibraryHTML(
						libraryUrlPattern, isbn,
						"On the shelf now!",
						"The book is in " + libraryName + " but can not be reservate",
						"green" 
	//					"#2bff81" //light green
						);
				   foundCount++;
				   getBookStatuses();
					}
					//The book is in the library but can not be reservate (state = LOST AND PAID)
					else if ( libraryCheckedInLostAndPaid.test(page) )
					{
					setLibraryHTML(
						libraryUrlPattern, isbn,
						"On the shelf now!",
						"The book is in " + libraryName + " but can not be reservate",
						"green" 
	//					"#2bff81" //light green
						);
				   foundCount++;
				   getBookStatuses();
					}
					//The book is in the library but can not be reservate (state = IN TRANSFER)
					else if ( libraryCheckedInTransfer.test(page) )
					{
					setLibraryHTML(
						libraryUrlPattern, isbn,
						"On the shelf now!",
						"The book is in " + libraryName + " but can not be reservate",
						"green" 
	//					"#2bff81" //light green
						);
				   foundCount++;
				   getBookStatuses();
					}
					//The book is in the library but can not be reservate (state = TECHNICAL PROC)
					else if ( libraryCheckedInTechnicalProc.test(page) )
					{
					setLibraryHTML(
						libraryUrlPattern, isbn,
						"On the shelf now!",
						"The book is in " + libraryName + " but can not be reservate",
						"green" 
	//					"#2bff81" //light green
						);
				   foundCount++;
				   getBookStatuses();
					}
					
					
					
					
				}				
			
			
			
			
			
			//The book is digital version in the library 
			else if ( libraryCheckedIn.test(page) )
				{

				setLibraryHTML(
					libraryUrlPattern, isbn,
					"On the shelf now!",
					"Digital version available now at " + libraryName ,
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