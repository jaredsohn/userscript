// ==UserScript==
// @name          Amazon North-Central Wisconsin Public Libraries Linky
// @namespace     http://www.selltothem.com
// @description	  v1.5.1 Search the North-Central Wisconsin Public Libraries Catalog from Amazon book listings.  
// @include       http://*.amazon.*
// ==/UserScript==

//updated to loop over a main array of Library Codes, each assigned a status.

// trivial modification of script by http://fatknowledge.blogspot.com: http://userscripts.org/scripts/show/8432

// Based on work by Carrick Mundell http://userscripts.org/scripts/show/1396
// Based on work by Steven Tannock http://userscripts.org/scripts/show/58190
// Modified to work on the North-Central Wisconsin libraries system by Nick Hall

(function(){
//	GM_log('Amazon North-Central Wisconsin Public Libraries Linky');	

	var libraryIsbnUrlPattern = 'http://vcat.wvls.lib.wi.us/ipac20/ipac.jsp?term=&index=LCCNEX&index=ISBNEX&term='
	var libraryTitleUrlPattern = 'http://vcat.wvls.lib.wi.us/ipac20/ipac.jsp?index=.TW&term='
	var libraryName = 'North-Central WI Libraries';
	var IsbnLookupUrl = 'http://xisbn.worldcat.org/webservices/xid/isbn/'


	var isbn = getIsbn(window.location.href);
	var isbns = new Array();
	var isbnsIndex = -1;
	var foundCount = 0;


	var codeArray = [
		['BEING HELD','bad']
		,['BINDERY','bad']
		,['CATALOGUING BINDERY','bad']
		,['CHECKED OUT','bad']
		,['CLAIMS RETURNED','bad']
		,['DAMAGED','bad']
		,['DISPLAY','bad']
		,['HOLIDAY','bad']
		,['IN CATALOGUING','bad']
		,['IN MENDS','bad']
		,['IN PROCESS','bad']
		,['IN TRANSIT','bad']
		,['INFORMATION','good']
		,['LOST\/DAMAGED','bad']
		,['MISSING','bad']
		,['NEWLY ACQUIRED','bad']
		,['ON ORDER','bad']
		,['STORAGE','bad']
		,['STORYTIME','bad']
		,['TRACE','bad']
		,['WORKROOM','bad']
		,['IN','good']
		,['CHECKED IN','good']
	];

	if (isbn!=0){
		createStatusAndLibraryHTML();
		updateStatusHTML('Searching ' + libraryName + '...');

		getStatusAllISBNs(isbn);
	}
	return;


//get all ISBNs for this book and write to global var isbns
//then call getBookStatuses
function getStatusAllISBNs(isbn) {

	var wbUrl = IsbnLookupUrl + isbn;
	GM_xmlhttpRequest({
	    method: 'GET',
	    url: wbUrl,
	    headers: {
	        'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey/0.3',
	        'Accept': 'application/atom+xml,application/xml,text/xml',
	    },
	    onload: function(responseDetails) {
			//GM_log(responseDetails.responseText);	
	        var parser = new DOMParser();
	        var dom = parser.parseFromString(responseDetails.responseText,
	            "application/xml");

	        var isbnsDom = dom.getElementsByTagName('isbn');
	        for (var i = 0; i < isbnsDom.length; i++){
				isbns[i] = isbnsDom[i].textContent;
				GM_log('Found ISBN: ' + isbns[i]);	
			}
			getBookStatuses();
	        
	    }
	});
}


//loop through all the isbns
//this gets called back after each search to do next isbn
function getBookStatuses(){
	isbnsIndex++;
	//GM_log("getBookStatuses"+isbnsIndex+ " " + isbns.length);

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
	//GM_log('Searching: '+libraryUrlPattern + isbn);
	var stringColor = "";
	var foundItem = false;
		
	GM_xmlhttpRequest
		({
		method:'GET',
		url: libraryUrlPattern + isbn,
		onload:function(results) {
			page = results.responseText;
			for (var i=0, len=codeArray.length; i<len; ++i) {
				var myString = new RegExp("<a([^>]*)>" + codeArray[i][0] + "</a>","i");
				if(myString.test(page)) {
					foundItem = true;
					if (codeArray[i][1] == 'bad')
						stringColor = "red";
					else
						stringColor = "green";
					setLibraryHTML(
						libraryUrlPattern, isbn,
						codeArray[i][0],
						codeArray[i][0] + " at " + libraryName,
						stringColor);
					foundCount++;
				}
			}	
			getBookStatuses();
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

	var link2 = document.createElement('a');
	link2.setAttribute('title', title );
	link2.setAttribute('href', libraryIsbnUrlPattern +encodeURIComponent(isbn));
	link2.setAttribute('target', "_blank");
	link2.style.color = "red";

	var label2 = document.createTextNode(' Or search by ISBN in ' + libraryName + '...' );
	link2.appendChild(label2);


	//remove existing content
	splStatusDiv.removeChild(splStatusDiv.firstChild);
	splStatusDiv.appendChild(link);
	splStatusDiv.appendChild(document.createElement('br'));
	splStatusDiv.appendChild(link2);
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
		var isbn = url.match(/\/(\d{7,9}[\d|X])(\/|\?|$)/)[1]; 
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