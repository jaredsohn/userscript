// ==UserScript==
// @name          Amazon-Hennepin County Library Lookup
// @version       1.3
// @description	  slightly modified version of - v1.3 Search the Seattle Public Library Catalog from Amazon book listings by fatknowledge.
// @include       http://*.amazon.*
// ==/UserScript==

// revision history:
// Version 1.2 - Status now displayed when all copies being held. (3/22/07)
// Version 1.2.1 -Added Transit Request status. (3/22/07)
// Version 1.2.2 - Edited var origTitle to match change in Amazon CSS (4/14/08)
// Version 1.2.3 - Edited new index pallti to utl (9/1/2009)
// Version 1.3 - Updated for 2013 Amazon and NYPL layout changes by Gareth Price (12-30-2013)
// Thanks to Dale Brayden for his assistance

(function(){
var libraryIsbnUrlPattern = 'https://catalog.hclib.org/ipac20/ipac.jsp?index=ISBN&term='
var libraryURLPatternForLink = 'http://hzapps.hclib.org/pub/ipac/link2ipac.cfm?LinkyVersion=1.3&index=ISBN&term='
var libraryURLPatternForNoMatch = 'http://hzapps.hclib.org/pub/ipac/link2ipac.cfm?LinkyVersion=1.3&index=UTL&term='
var libraryName = 'Hennepin County';

	var isbn = getIsbn(window.location.href);
	
	var isbns = new Array();
	var isbnsIndex = -1;
	var foundCount = 0;
    
    // Set to true to output additional debug info
    var DEBUG = true;
	if(DEBUG) GM_log('Hennepin County Library Linky');
    
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

	var libraryAvailability = /Checked In/;
	var libraryOnOrder = /(\d+) Copies On Order/;
	var libraryInProcess = /Pending/; 
	var libraryTransitRequest = /Transit Request/;
	var libraryBeingHeld = /Being held/; 
	var libraryHolds = /Current Requests: (\d+)/;
	var libraryCopies = /Reservable copies: (\d+)/;
	var libraryDueBack = /(\d{2}\/\d{2}\/\d{4})/;
	var notFound = /Sorry, could not find anything matching/
	var libraryElectronic = /(online|electronic) resource/;
    var libraryUseIn = /USE IN LIBRARY/;
    var libraryMultipleVersions = /(\d+) Found/;
    // formats
    var cd = /sound disc/;
    var largeprint = /large print/;
    var audiobook = /Audiobook\s/;
    var ebook = /eBook\sdownload/;
    var eaudiobook = /Audiobook\sdownload/;

	GM_xmlhttpRequest
		({
		method:'GET',
		url: libraryUrlPattern + isbn,
		onload:function(results) {
			page = results.responseText;
            var libraryFormat = "Books";

            if ( eaudiobook.test(page) )
                { 
                var libraryFormat = "Audiobook downloads" 
                }
            else if ( audiobook.test(page) )
                {
                var libraryFormat = "Audiobooks";
                }
            else if ( cd.test(page) )
                { 
                var libraryFormat = "Compact Disc" 
                }
            else if ( largeprint.test(page) )
                { 
                var libraryFormat = "Large Print Books" 
                }
            else if ( ebook.test(page) )
                { 
                var libraryFormat = "eBook downloads" 
                };
                
			if ( notFound.test(page) ){
				getBookStatuses();
			}			
			else if ( libraryAvailability.test(page) )
				{
				var copies = page.match(libraryCopies)[1]
				setLibraryHTML(
					libraryUrlPattern, isbn,
					"On the shelf now!",
					libraryFormat + " available now at " + libraryName + " Library (owns " + copies + " copies)",
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
            else if ( libraryOnOrder.test(page) )
				{
				var CopiesOnOrder = page.match(libraryOnOrder)[1]
				var holds = page.match(libraryHolds)[1]
				setLibraryHTML(
					libraryUrlPattern, isbn,
					"On order!",
                    libraryFormat + " on order. Request from " + libraryName + " Library (" + CopiesOnOrder + " copies on order, " + holds + " requests)",
					"#AA7700"  // dark yellow
					);
			   foundCount++;
  			   getBookStatuses();
				}                    

			else if ( libraryHolds.test(page) ) {
                var holds = page.match(libraryHolds)[1]
                var copies = page.match(libraryCopies)[1]
				//var holdsStr = page.match(holds);

                //if(!holdsStr) {
                //	holdsStr = 'On hold';
                //}
                if (holds != 0) {var howmay = holds} else {var howmay = "there are no "};
                
				setLibraryHTML(
					libraryUrlPattern, isbn,
					holds + " Requests",
					"Currently " + howmay +  " requests on " + copies + " " + libraryFormat + ". Request from " + libraryName + " Library",
					"#AA7700"  // dark yellow
					);
			   foundCount++;
  			   getBookStatuses();
			}
			
			else if ( libraryBeingHeld.test(page) )
                    {
    	        var holds = page.match(libraryHolds)[1]
                var copies = page.match(libraryCopies)[1]
                setLibraryHTML(
                  libraryUrlPattern, isbn,
                  "All copies on request shelf",
                  "All " + libraryFormat + " on request shelf. Request from " + libraryName + " Library (currently " + holds + " requests on " + copies + " copies)",
                  "#AA7700"  // dark yellow
                  );
              }  
    		else if ( libraryInProcess.test(page) )
				{
				setLibraryHTML(
					libraryUrlPattern, isbn,
					"In process!",
					libraryFormat + "available soon at " + libraryName + " Library! (" + copies + " copies pending)" ,
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
					libraryFormat + " due back on " + due + " at "+ libraryName,
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
				if (libraryFormat != "Book")
				    { var digital = libraryFormat}
				else
				    { var digital = "Digital"};
				    
				setLibraryHTML(
					libraryUrlPattern, isbn,
					"On the e-shelf now!",
					digital + " available now at "+ libraryName,
					"green"
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
                    "Due back at " + libraryName + " Library on " + due,
                    "#AA7700"  // dark yellow
                    );
                }
            else if ( foundCount = 0)
				{
                setLibraryHTML(
                    libraryUrlPattern, isbn,
                    "Check for other editions",
                    "This edition not in " + libraryName + " Library. Click to check for other editions.",
                    "red"
                    );// do nothing;
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
	//splLinkyDiv.style.fontSize = '12px';
	//splLinkyDiv.style.color = 'black';
    splLinkyDiv.setAttribute('style','color:black\;' + 'background-color:#FFFF99\;' + 'font-size:12px;' + 'padding:3px;');
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
	link.setAttribute('href', libraryURLPatternForNoMatch + encodeURIComponent(TheTitle));
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