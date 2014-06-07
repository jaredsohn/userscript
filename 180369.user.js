// ==UserScript==
// @name          Amazon New York Public Library Linky
// @version       1.1
// @description	  slightly modified version of - v1.3 Search the Seattle Public Library Catalog from Amazon book listings by fatknowledge.
// @include       http://*.amazon.*
// ==/UserScript==

// Based on work by Carrick Mundell http://userscripts.org/scripts/show/1396
// Searches by title and other improvements added by Arthaey Angosii
// Updated for 2013 Amazon and NYPL layout changes by Gareth Price

(function(){
	var libraryIsbnUrlPattern = 'http://catalog.nypl.org/search~S1/?searchtype=i&searcharg='
	var libraryTitleUrlPattern = 'http://catalog.nypl.org/search~S1/?searchtype=t&searcharg='
	var libraryName = 'New York Public Library';

	var isbn = getIsbn(window.location.href);
	
	var isbns = new Array();
	var isbnsIndex = -1;
	var foundCount = 0;
    
    // Set to true to output additional debug info
    var DEBUG = true;
	if(DEBUG) GM_log('New York Public Library Linky');
    
    // Output status text while searching. If false, just shows final status.
    var VERBOSE = false;
    
	if (isbn!=0){
		createStatusAndLibraryHTML();
		if(VERBOSE) updateStatusHTML('Searching ' + libraryName + '...');

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
			if(DEBUG) GM_log(responseDetails.responseText);	
	        var parser = new DOMParser();
	        var dom = parser.parseFromString(responseDetails.responseText,
	            "application/xml");

	        var isbnsDom = dom.getElementsByTagName('isbn');
//	old line... limiting to only three        for (var i = 0; i < isbnsDom.length; i++){
//				if (isbnsDom.length > 3) {isbnsDom.length = 3;}
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
	if(DEBUG) GM_log("getBookStatuses"+isbnsIndex+ " " + isbns.length);

	if (isbnsIndex < isbns.length){
		if(VERBOSE) updateStatusHTML("Searching for ISBN "+ isbns[isbnsIndex] + " in " + libraryName + '...');
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
	if(DEBUG) GM_log('Searching: '+libraryUrlPattern + isbn);	

	var libraryAvailability = /AVAILABLE/;
	var libraryOnOrder = /ON ORDER/;
	var libraryInProcess = /(IN PROCESS|being processed|IN TRANSIT)/;
	var libraryDueBack = /DUE ([\d\-]+)/;
	var libraryHolds = /(HOLD|holds)/;
	var libraryElectronic = /(online|electronic) resource/;
    var libraryUseIn = /USE IN LIBRARY/;
    var libraryMultipleVersions = /(\d+) Found/;

	var notFound = /No matches found/;

	GM_xmlhttpRequest
		({
		method:'GET',
		url: libraryUrlPattern + isbn,
		onload:function(results) {
			page = results.responseText;
			if ( notFound.test(page) ){
				getBookStatuses();
			}
			
			else if ( libraryAvailability.test(page) )
				{
				setLibraryHTML(
					libraryUrlPattern, isbn,
					"On the shelf now!",
					"Available now at " + libraryName,
					"green" 
//					"#2bff81" //light green
					);
			   foundCount++;
  			   getBookStatuses();
				}
			else if ( libraryUseIn.test(page) )
				{
				setLibraryHTML(
					libraryUrlPattern, isbn,
					"On the shelf now!",
					"Available in reference section at "+ libraryName,
					"green" 
//					"#2bff81" //light green
					);
			   foundCount++;
  			   getBookStatuses();
				}				
//if there are holds
			else if ( libraryHolds.test(page) ) {
				//5 holds on first copy returned of 7 copies
				var holds = /\d{1,} holds/;
				var holdsStr = page.match(holds);

                if(!holdsStr) {
                	holdsStr = 'On hold';
                }
                
				setLibraryHTML(
					libraryUrlPattern, isbn,
					"Holds!",
					holdsStr + " at " + libraryName,
					"#AA7700"  // dark yellow
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
					);
			   foundCount++;
  			   getBookStatuses();
				}                    
			else if ( libraryDueBack.test(page) )
				{
				var due = page.match(libraryDueBack)[1];
				setLibraryHTML(
					libraryUrlPattern, isbn,
					"Due back " + due,
					"Due back on " + due + " at "+ libraryName,
					"#AA7700"  // dark yellow
					);
			   foundCount++;
  			   getBookStatuses();
				}
			else if ( libraryMultipleVersions.test(page) )
				{
				var versions = page.match(libraryMultipleVersions)[1];
				setLibraryHTML(
					libraryUrlPattern, isbn,
					"Multiple versions",
					versions + " version(s) listed at " + libraryName,
					"green"  // dark yellow
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
    
    if(!title_node) {
        if(DEBUG) GM_log("can't find title node");
        return null;
    }
    
	var h1_node = title_node.parentNode;
	var br = document.createElement('br');

	//the div for library status when found
	var splLinkyDiv = document.createElement('div');
	splLinkyDiv.id = 'splLinkyLibraryHTML';
	//resize to 12px to get out of the enlarged h1 size and return back to normal
	splLinkyDiv.style.fontSize = '12px';
	splLinkyDiv.style.color = 'black';

	//How lame is this javascript DOM syntax?  Instead of having an insertAfter function, you have an insertBefore
	//and then pass in the .nextSibling attribute of the element.  Really inuitive guys.
	h1_node.insertBefore(splLinkyDiv, title_node.nextSibling);
	h1_node.insertBefore(br, title_node.nextSibling);

	//the div for status as checks are occuring
	var splStatusDiv = document.createElement('div');
	splStatusDiv.id = 'splLinkyStatusHTML';
	//resize to 12px to get out of the enlarged h1 size and return back to normal
	splStatusDiv.style.fontSize = '12px';
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

	var label = document.createTextNode('Not found. Search by title at ' + libraryName );
	link.appendChild(label);

	//remove existing content
   	if (splStatusDiv.firstChild){
		splStatusDiv.removeChild(splStatusDiv.firstChild);
    }
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
	return title.textContent.replace(/\(.+\)/, '').replace(/:.*/, '');
}

// Find the node containing the book title
function getTitleNode()
{
	// Amazon has a number of different page layouts that put the title in different tags
    // This is an array of xpaths that can contain an item's title
    var titlePaths = [
    	"//span[@id='btAsinTitle']/node()[not(self::span)]",
        "//h1[@id='title']/node()[not(self::span)]"
    ];
    
    for(var i in titlePaths) {
    	var nodes = document.evaluate(titlePaths[ i ], document, null, XPathResult.UNORDERED_NODE_ITERATOR_TYPE, null);

		var thisNode = nodes.iterateNext(); 
		var titleNode;
		// Get the last node
		while(thisNode){
			if(DEBUG) GM_log( thisNode.textContent );
			titleNode = thisNode;
            
            if(titleNode) {
            	break;
        	}
            
			thisNode = nodes.iterateNext();
		}
    }

	if (titleNode == null || !nodes) {
        GM_log("can't find title node");
		return null;
	} else {
       if(DEBUG) GM_log("Found title node: " + titleNode.textContent);
	}
	return titleNode;
}


}
)();