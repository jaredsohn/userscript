// ==UserScript==
// @name          TRL Catalog Search for Goodreads 
// @description	  v2.0.3 Automatically searches the Timberland Regional Library Catalog from Goodreads book pages.  
// @namespace	  http://userscripts.org/users/133850
// @include       http://*www.goodreads.com/book/show*
// @license       GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// ==/UserScript==

// Created by Brian Vander Veen
// http://www.nerdbrarian.com

// Library-specific variables. Change as needed.
var libraryName = 'TRL';
var ISBNSearchPattern = 'http://cat.trl.org/uhtbin/cgisirsi.exe/x/SC/0/5?srchfield1=GENERAL&library=ALL%20&searchdata1=';
var NotFound = /found no matches in any library/;
var AUandTIPattern1 = 'http://cat.trl.org/uhtbin/cgisirsi.exe/x/0/0/57/5?searchdata1=';
var AUandTIPattern2 = '&srchfield1=AU&searchoper1=AND&search_type1=AUTHOR&searchdata2=';
var AUandTIPattern3 = '&srchfield2=TI&search_type2=TITLE&library=ALL&user_id=WEBSERVER';
var MultipleFound = /search\sfound\n\s+<em>\d+<\/em>\n\s+titles/;
var SingleItemFound = /record\n\s+1\n\s+of\n\s+1\n\s+for search/;



// Fetch ISBN from the Goodreads page by cycling through the meta tags

var i=0;
for (i=0;i<=10;i++)
{
var metaContent = document.getElementsByClassName('infoBoxRowItem')[i].innerHTML;
var ISBNExp = /[\dX]{10}/;
var ISBNTest = ISBNExp.test(metaContent)
	if (ISBNTest == true)
	{
	var ISBN = metaContent.match(/[\dX]{10}/)[0];
	break;
	}
}

// If the ISBN is available on the Goodreads page, create the target DIV and call the searchISBN function.
if (ISBN != null)
{
	createDiv();
}
function createDiv()
{
	var detailDiv = document.getElementById('details');
	var newDiv = document.createElement('div');
	var searchingLibText = document.createTextNode('Searching ' + libraryName + ' catalog for ISBN ' + ISBN + '...');

	newDiv.setAttribute('id', 'LibSearch');
	newDiv.appendChild(searchingLibText);
	detailDiv.appendChild(newDiv);

	searchISBN();
}

// Search for the item ISBN on the library catalog.
function searchISBN()
{
	GM_xmlhttpRequest
		({
		method:'GET',
		url: ISBNSearchPattern + ISBN ,
		onload:function(results)
			{
			searchResult = results.responseText;
			if ( NotFound.test(searchResult) )
				{
				ISBNNotFound();
				}
			else 
				{
				ISBNFound();
				}
			}
		});
}

// A little necessary widget for ignoring whitespace in Firefox while navigating the DOM 
function get_nextsibling(n)
{
x=n.nextSibling;
while (x.nodeType!=1)
  {
  x=x.nextSibling;
  }
return x;
}

// If the ISBN is not found, create link for combined author and title search.
function ISBNNotFound()
{
	
	// Fetch title and author from page. Remove parenthetical notations from title. Encode author and title as URIs.

	var snibbet = document.getElementsByClassName('authorName');
	var author = snibbet[0].firstChild.innerHTML;
	var author = encodeURI(author);

	var plange = document.getElementById('bookTitle');;
	var title = plange.innerHTML;
	var titleparts = title.split('(')
	var title = titleparts[0];
	var titleparts = title.split(':')
	var title = titleparts[0];
	var title = encodeURI(title);
	
	//Try a combined author and title search on the catalog and see if you get zero, one, or multiple results.	
	
	var LibSearchDiv = document.getElementById('LibSearch');
	LibSearchDiv.innerHTML = 'ISBN ' + ISBN + ' not found. Searching '+ libraryName + ' catalog by author and title...';
	
		GM_xmlhttpRequest
		({
		method:'GET',
		url: AUandTIPattern1 + author + AUandTIPattern2 + title + AUandTIPattern3 ,
		onload:function(results)
			{
			searchResult = results.responseText;
			if ( NotFound.test(searchResult) )
				{
				AUTINotFound(author,title);
				}
			else if ( SingleItemFound.test(searchResult) )
				{
				AUTIFoundOne(author,title);
				}
			else if ( MultipleFound.test(searchResult) )
				{
				AUTIFoundMultiple(author,title);
				}
			else 
				{
				ScriptError(author,title);
				}
			}
		});
	
	
}

//If both the ISBN and combined AU/TI search turned up nothing, report the item as not found.
function AUTINotFound(author,title)
{
var LibSearchDiv = document.getElementById('LibSearch');
var responseText = libraryName + ' status: Item not found.' 
LibSearchDiv.innerHTML = responseText;	
}

//If the AU/TI search found multiple results, create a link to the search page.
function AUTIFoundMultiple(author,title)
{
var LibSearchDiv = document.getElementById('LibSearch');
var AUTISearchURL = AUandTIPattern1 + author + AUandTIPattern2 + title + AUandTIPattern3;
var responseText = libraryName + ' status: Multiple editions or formats may be available.' 
LibSearchDiv.innerHTML = '<a href="' + AUTISearchURL + '" target="_blank" >' + responseText + '</a>';		
}

//If the AU/TI search found only one result, report the status of the item and create a link.
function AUTIFoundOne(author,title)
{
	// Tests the results page for various possible responses
	var OneCopyIn = /1 copy available at.*/
	var OneCopyTest = OneCopyIn.test(searchResult);
	if (OneCopyTest == true)
	{
		var copiesStr = searchResult.match(OneCopyIn).toString();
	}
	else
	{
		var CopiesIn = /\d+ copies available at.*/
		var CopiesTest = CopiesIn.test(searchResult);
			if (CopiesTest == true)
			{
			var copiesStr = searchResult.match(CopiesIn).toString();
			}
			else
			{
				var NoCopiesIn = /No copies currently available.*/
				var KnownWait = /Estimated wait is \d+ days/
				
				var NoCopiesTest = NoCopiesIn.test(searchResult);
				if (NoCopiesTest == true)
				{
					var copiesStr = searchResult.match(NoCopiesIn).toString();
					
					var KnownTest = KnownWait.test(searchResult);
					if (KnownTest == true) { var waitStr = searchResult.match(KnownWait).toString() + '.'; }
					else { var waitStr = ''; }
					
					var copiesStr = copiesStr + ' ' + waitStr;
				}
			}
	}
					
	// Display the item status and link to catalog.
	var LibSearchDiv = document.getElementById('LibSearch');				
	var responseText = libraryName + ' status: ' + copiesStr;
	var AUTISearchURL = AUandTIPattern1 + author + AUandTIPattern2 + title + AUandTIPattern3;
	LibSearchDiv.innerHTML = '<a href="' + AUTISearchURL + '" target="_blank" >' + responseText + '</a>';		
}

// If the AU/TI search turned up neither zero, one, or multiple results, then something is broken.
function ScriptError(author,title)
{
var LibSearchDiv = document.getElementById('LibSearch');
var responseText = 'Something\'s gone terribly wrong. Please report this page\'s URL to bcveen AT gmail DOT com, and I\'ll do my best to fix it. Thanks.'
LibSearchDiv.innerHTML = responseText;	
}

// If the ISBN is found, Get the number of copies checked in or the estimated wait time if there is none available.
// The method used here is specific to the TRL website and is unlikely to work unmodified with other libraries' catalogs.

function ISBNFound()
{
	// Tests the results page for various possible responses
	var OneCopyIn = /1 copy available at.*/
	var OneCopyTest = OneCopyIn.test(searchResult);
	if (OneCopyTest == true)
	{
		var copiesStr = searchResult.match(OneCopyIn).toString();
	}
	else
	{
		var CopiesIn = /\d+ copies available at.*/
		var CopiesTest = CopiesIn.test(searchResult);
			if (CopiesTest == true)
			{
			var copiesStr = searchResult.match(CopiesIn).toString();
			}
			else
			{
				var NoCopiesIn = /No copies currently available.*/
				var KnownWait = /Estimated wait is \d+ days/
				
				var NoCopiesTest = NoCopiesIn.test(searchResult);
				if (NoCopiesTest == true)
				{
					var copiesStr = searchResult.match(NoCopiesIn).toString();
					
					var KnownTest = KnownWait.test(searchResult);
					if (KnownTest == true) { var waitStr = searchResult.match(KnownWait).toString() + '.'; }
					else { var waitStr = ''; }
					
					var copiesStr = copiesStr + ' ' + waitStr;
				}
			}
	}
					
	// Display the item status and link to catalog.
	var LibSearchDiv = document.getElementById('LibSearch');				
	var responseText = libraryName + ' status: ' + copiesStr;
	var ISBNSearchURL = ISBNSearchPattern + ISBN;
	LibSearchDiv.innerHTML = '<a href="' + ISBNSearchURL + '" target="_blank" >' + responseText + '</a>';				
}