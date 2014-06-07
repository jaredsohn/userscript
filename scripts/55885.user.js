// ==UserScript==
// @name		Amazon Wishlist KCLS Library Linky
// @namespace	http://fatknowledge.blogspot.com
// @description v1.3.1 Search the King County Library System Catalog from your Amazon wishlist.
// @include		http://*.amazon.*/gp/registry/wishlist/*
// @include		http://amazon.*/gp/registry/wishlist/*
// ==/UserScript==

(function() {
//	GM_log('Amazon Wishlist KCLS Library Linky');

	var libraryUrlPattern = 'http://catalog.kcls.org/search/i?';
	var libraryName = 'the KCLS';

	// don't do anything unless the page is a wish list
	if (String(document.title).indexOf('Wishlist') == -1)	{return;}

	main();



function main(){
	
	// find all strong (bold) a hrefs in the list-items section of the html
	var items =document.evaluate('//strong/a[@href]', getElementsByAttribute(document.body, "table", "class", "list-items")[0], null, XPathResult.ANY_TYPE, null);
	
	var item = items.iterateNext();

	while (item) {

		asin = String(item).split('/');			// split the contents of the name attribute into array elements
		if (!asin) continue;
		asin = asin[5];							// grab the ASIN from the array
//		GM_log(asin);
		
		getStatusForAllISBNs(item, asin);
        item = items.iterateNext();
	}
}

//get other ISBNs for book and look up status for each
function getStatusForAllISBNs(item, isbn) {
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

	        var isbns = dom.getElementsByTagName('isbn');
	        for (var i = 0; i < isbns.length; i++){
//				GM_log(isbn+": "+items[i].textContent);
				getBookStatus(item,isbns[i].textContent);
			}
	        
	    }
	});	
}

//get book status for isbn and insert onto screen
function getBookStatus(item, isbn){
	var notFound = /No matches found;/;
	var libraryAvailability = /CHECK SHELF/;
	var libraryOnOrder = /copy ordered/;
	var libraryInProcess = /In Process/;
	var libraryHolds = /holds? on first copy/;
	var libraryElectronic = /Downloadable File/;
	var libraryDueBack = /DUE (\d{2}-\d{2}-\d{2})/;


	GM_xmlhttpRequest
		({
		method:'GET',
		url: libraryUrlPattern + isbn,
		onload:function(results) {
			page = results.responseText;
			if ( notFound.test(page) )
				{
				var due = page.match(notFound)[1]
/*				setLibraryHTML(
					item, isbn,
					"Not carried",
					"Not in " + libraryName,
					"red"
					);
*/				}
			//if there are holds
			else if ( libraryHolds.test(page) ) {
				//9 holds on first copy returned of 3 copies
				var holds = /\d{1,} holds? on first copy returned of \d{1,} cop/;
				var holdsStr = page.match(holds);

				setLibraryHTML(
					item, isbn,
					"Holds!",
					holdsStr + "ies at " + libraryName,
					"#AA7700"  // dark yellow
//					"#ffffac"  //light yellow
					);
			}
			else if ( libraryAvailability.test(page) )
				{
				setLibraryHTML(
					item, isbn,
					"On the shelf now!",
					"Available in " + libraryName,
					"green" 
//					"#2bff81" //light green
					);
				}
			else if ( libraryOnOrder.test(page) )
				{
				setLibraryHTML(
					item, isbn,
					"On order!",
					"On order at " + libraryName,
					"#AA7700"  // dark yellow
//					"#ffffac"  //light yellow
					);
				}                    
			else if ( libraryInProcess.test(page) )
				{
				setLibraryHTML(
					item, isbn,
					"In process!",
					"In process (available soon) at ",
					"#AA7700"  // dark yellow
//					"#ffffac"  //light yellow
					);
				}                    
			else if ( libraryDueBack.test(page) )
				{
				var due = page.match(libraryDueBack)[1]
				setLibraryHTML(
					item, isbn,
					"Due back " + due,
					"Due back at " + libraryName + " on " + due,
					"#AA7700"  // dark yellow
//					"#ffffac"  //light yellow
					);
				}
			else if ( libraryElectronic.test(page) )
				{
				setLibraryHTML(
					item, isbn,
					"On the e-shelf now!",
					"Digital version available in " + libraryName,
					"green" 
//					"#2bff81" //light green
					);
				}
			else
				{
				setLibraryHTML(
					item, isbn,
					"Error",
					"Error checking " + libraryName,
					"orange"
					);
				}
			}
		});
}

//print status of book below name
function setLibraryHTML(item, isbn, title, linktext, color) {
	// setup row
	var row = document.createElement('tr');
	//row.setAttribute('style','background: ' + color);

	// setup cell
	var cell = document.createElement('td');
	cell.innerHTML = '<a href="'+libraryUrlPattern + isbn+'" title="'+title+'" style="color : '+color+'"  target="_blank">'+linktext+'</a><br>';
	
	// add cell to row
	row.appendChild(cell);
	
	// add row to table
	item.parentNode.parentNode.parentNode.appendChild(row);
}


function getElementsByAttribute(oElm, strTagName, strAttributeName, strAttributeValue){
	var arrElements = (strTagName == "*" && oElm.all)? oElm.all : oElm.getElementsByTagName(strTagName);
	var arrReturnElements = new Array();
	var oAttributeValue = (typeof strAttributeValue != "undefined")? new RegExp("(^|\s)" + strAttributeValue + "(\s|$)") : null;
	var oCurrent;
	var oAttribute;
	for(var i=0; i<arrElements.length; i++){
		oCurrent = arrElements[i];
		oAttribute = oCurrent.getAttribute && oCurrent.getAttribute(strAttributeName);
		if(typeof oAttribute == "string" && oAttribute.length > 0){
			if(typeof strAttributeValue == "undefined" || (oAttributeValue && oAttributeValue.test(oAttribute))){
				arrReturnElements.push(oCurrent);
			}
		}
	}
	return arrReturnElements;
}


})();