// ==UserScript==
// @name          Madison Public Library Linky
// @namespace     ewhite@ssc.wisc.edu
// @description	  v1.1 Search the South Central Library System from Amazon book listings.  
// @include       http://*.amazon.*
// ==/UserScript==

// Based on work by Carrick Mundell http://userscripts.org/scripts/show/1396
// Now handles the case where books are on hold

(function(){
//	GM_log('Madison, WI, SCLS Public Library System');	
 
	var libraryUrlPattern = 'http://www.linkcat.info/ipac20/ipac.jsp?index=CISBN&term='
	var libraryName = 'The Madison Public Library';

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
	GM_log('Amazon Madison Public Library Linky Searching');	

	var libraryAvailability = /In Library/;
	var libraryOnOrder = /On Order/;
	var libraryInProcess = /In Transit/;
	var libraryDueBack = /(\d{2} \w{3} \d{2})/;
	var libraryHolds = /holds /;

	var notFound = /Sorry, could not find anything matching/;

	GM_xmlhttpRequest
		({
		method:'GET',
		url: libraryUrlPattern + isbn,
		onload:function(results) {
			var page = results.responseText;
			if ( notFound.test(page) )
				{
				var due = page.match(notFound)[1]
				setLibraryHTML(
					isbn,
					"Not carried",
					"Not in " + libraryName,
					"red"
					);
				}
			//if there are holds
			else if ( libraryHolds.test(page) ) {
				//23 active, 12 inactive
				var holds = /\d{1,} active, \d{1,} inactive/;
				var holdsStr = page.match(holds);

				setLibraryHTML(
					isbn,
					"Holds!",
					holdsStr + " holds at " + libraryName,
					"#AA7700"  // dark yellow
					);
			}
			else if ( libraryAvailability.test(page) )
				{
				setLibraryHTML(
					isbn,
					"On the shelf now!",
					"Available in " + libraryName,
					"green" 
					);
				}
			else if ( libraryOnOrder.test(page) )
				{
				setLibraryHTML(
					isbn,
					"On order!",
					"On order at " + libraryName,
					"#AA7700"  // dark yellow
					);
				}                    
			else if ( libraryInProcess.test(page) )
				{
				setLibraryHTML(
					isbn,
					"In process!",
					"In process (available soon) at ",
					"#AA7700"  // dark yellow
					);
				}                    
			else if ( libraryDueBack.test(page) )
				{
				var due = page.match(libraryDueBack)[1]
				setLibraryHTML(
					isbn,
					"Due back " + due,
					"Due back at " + libraryName + " on " + due,
					"#AA7700"  // dark yellow
					);
				}
			else
				{
				setLibraryHTML(
					isbn,
					"Error",
					"Error checking " + libraryName,
					"orange"
					);
				}
			}
		});
}

//print status of book below book title
function setLibraryHTML(isbn, title, linktext, color) {
	//GM_log(linktext);	

	var title_node = getTitleNode();
	var h1_node = title_node.parentNode;

	var br = document.createElement('br');

	var link = document.createElement('a');
	link.setAttribute('title', title );
	link.setAttribute('href', libraryUrlPattern + isbn);
	//resize to 60% to get out of the enlarged h1 size and return back to normal
	link.setAttribute('style','font-size: 60%; color: ' + color);

	var label = document.createTextNode( linktext );
	link.appendChild(label);

	//How lame is this javascript DOM syntax?  Instead of having an insertAfter function, you have an insertBefore
	//and then pass in the .nextSibling attribute of the element.  Really inuitive guys.
	h1_node.insertBefore(link, title_node.nextSibling);
	h1_node.insertBefore(br, title_node.nextSibling);
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

/* old way to get title

//find the node associated with the title of the book
//currently this is done by getting all objects that are <b class="sans"> and then taking the last one
function getBookTitleNode(){
	//find all node objects that are <b class="sans">
	var iterator = document.evaluate("//b[@class='sans']", document, null, XPathResult.UNORDERED_NODE_ITERATOR_TYPE, null );

	//get the last node
	try {
	  var thisNode = iterator.iterateNext();
	  
	  while (thisNode) {
	//    GM_log( thisNode.textContent );
		titleNode = thisNode;
		thisNode = iterator.iterateNext();
	  }	

	} catch (e) {
	  dump( 'Error: Document tree modified during iteraton ' + e );
	}

    //if there was only one instance of <b class='sans'> you could use this code
    //var titleNode = document.evaluate("count(//b[@class='sans'])", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null ).singleNodeValue;

	if ( !titleNode)  {GM_log("can't find title node"); return; }
	return titleNode;
}
*/

}
)();