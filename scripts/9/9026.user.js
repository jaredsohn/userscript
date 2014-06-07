// ==UserScript==
// @name           Amazon TLC Library Linky
// @namespace      http://www.tlcdelivers.com
// @description    Search any given TLC Library.Solution catalog from Amazon book listings
// @include        http://*.amazon.*
// @creator     Pat Markland |pmarkland<at>yahoo<dot>com|
// @source      http://userscripts.org/scripts/show/9026
// @identifier  http://userscripts.org/scripts/source/9026.user.js
// @version     1.2
// @date        2007-05-11
// ==/UserScript==

// Version History:
// v1.0 - 5/3/2007 - Adds a link to all Amazon.com book pages. Clicking will do a ISBN Browse search at given library
// v1.1 - 5/4/2007 - Added automatic version checker
// v1.2 - 5/4/2007 - Removed automatic version checker

// Adapted by Pat Markland (pmarkland@yahoo.com) from 
// Christina Schulman (http://www.epiphyte.net) and Christopher Holdredge's script
// for the Rochester area (Monroe County NY) Library Catalogs, which was adapted from
// Ed Vielmetti's Ann Arbor library script (http://www.superpatron.com)
// Originally based on LibraryLookup by Jon Udell.

// This script is fairly simple to modify for any given TLC Library.Solution system. If your library is listed below,
// simply uncomment its line (remove the \\ on the left) and comment out (or delete) all others. If it is not listed, 
// it only requires change to the 3 'my...' variables below as follows:
// 1. myLibraryName --> name of the library system (for display only)
// 2. myLibraryUrl --> URL for the library system, before the '/TLCScripts' part.
// 3. myLibraryConfig --> value of the 'Config' variable in the URL query string

// Values for myLibraryUrl and myLibraryConfig can be obtained by searching the library's PAC and looking at the URL in the browser

// TLC libraries
//var myLibraryName = 'Anne Arundel County Public Schools', myLibraryUrl = 'http://opac.aacps.org', myLibraryConfig = 'pac';
//var myLibraryName = 'Atlanta Public Schools', myLibraryUrl = 'http://aps.tlcdelivers.com', myLibraryConfig = 'ysm';
//var myLibraryName = 'Chesterfield County', myLibraryUrl = 'http://chesterfield.lib.sc.us', myLibraryConfig = 'ysm';
//var myLibraryName = 'Corvallis-Benton County', myLibraryUrl = 'http://library.ci.corvallis.or.us', myLibraryConfig = 'YSM';
//var myLibraryName = 'Culpeper County', myLibraryUrl = 'http://pac.cclva.org', myLibraryConfig = 'PAC';
//var myLibraryName = 'Hawaii Pacific University ', myLibraryUrl = 'http://lib.hpu.edu', myLibraryConfig = 'pac';
//var myLibraryName = 'Livonia Public Schools', myLibraryUrl = 'http://204.39.65.123', myLibraryConfig = 'ysm';
//var myLibraryName = 'Handley Regional', myLibraryUrl = 'http://www.hrl.lib.state.va.us.', myLibraryConfig = 'pac';
var myLibraryName = 'Martinsburg/Berkeley County', myLibraryUrl = 'http://martsubhub.lib.wv.us', myLibraryConfig = '1ysm';
//var myLibraryName = 'Siskiyou County', myLibraryUrl = 'http://catalog.co.siskiyou.ca.us', myLibraryConfig = 'pac';
//var myLibraryName = 'Weber (UT) School District', myLibraryUrl = 'http://wcsd-websvr.weber.k12.ut.us', myLibraryConfig = 'ysm';

var libraryUrlPattern = myLibraryUrl + '/TLCScripts/interpac.dll?Browse&Config='+myLibraryConfig+'&SearchType=3&SearchField=4096&SearchData=';
var libraryHrefTitle = 'Check the '+myLibraryName+' libraries for this title';

function LibraryLookup(){};
LibraryLookup.ISBN = null;
LibraryLookup.InsertLink = function(isbnUrl, hrefTitle, aLabel, color){
    var bookdiv = thisNode.parentNode;
    var title = thisNode.firstChild.nodeValue;

    var newTitle = document.createElement('b');
    newTitle.setAttribute('class','sans');

    var titleText = document.createTextNode(title);
    newTitle.appendChild(titleText);
    
    var br = document.createElement('br');

    var link = document.createElement('a');
    link.setAttribute ( 'title', hrefTitle );
    link.setAttribute('href', isbnUrl);
    link.setAttribute('style','color: ' + color);

    var label = document.createTextNode( aLabel );

    link.appendChild(label);
    

	// cms: If bookdiv is null, re-evaluate the origTitle node
	// 		to pick up its parent node again.  Another linky
	//		script running on the same page may have caused
	//		the node to change.
	if (bookdiv == null) {
		thisNode = document.evaluate("//b[@class='sans']", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null ).singleNodeValue;
		bookdiv = thisNode.parentNode;
	}
	if (bookdiv != null) {
		bookdiv.insertBefore(newTitle, thisNode);
		bookdiv.insertBefore(br, thisNode);
		bookdiv.insertBefore(link, thisNode);
		bookdiv.removeChild(thisNode);
	}	
}

LibraryLookup.DoLookup = function(){
	try{
	    LibraryLookup.ISBN = window.content.location.href.match(/\/(\d{7,9}[\d|X])\//)[1];
    }catch (e){ 
	    return;
    }
/*    
	GM_xmlhttpRequest({
		method:'GET',
		url: libraryUrlPattern + LibraryLookup.ISBN,
		onload:function(results){
			var page = results.responseText;
		}
	});
*/
    LibraryLookup.InsertLink(libraryUrlPattern + LibraryLookup.ISBN, 'ISBN: ' + LibraryLookup.ISBN, libraryHrefTitle, 'green');
}

var nodes = document.evaluate("//b[@class='sans']", document, null, XPathResult.ANY_TYPE, null);
if(!nodes){
	return;
}

var thisNode = nodes.iterateNext(); 
var title;
while(thisNode) {
    if(thisNode.firstChild.nodeValue != null){
        title = thisNode.firstChild.nodeValue;
        break;
    }
  thisNode = nodes.iterateNext();
}

if(title == null){
    return;
}

LibraryLookup.DoLookup();