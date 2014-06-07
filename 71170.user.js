// ==UserScript==
// @name           Toronto Public Libary status from Goodreads book details
// @namespace      http://userscripts.org/users/92501
// @description    Inserts link on Goodreads book pages to check status at Toronto Public Library in a popup
// @include        http://www.goodreads.com/book/show/*
// @include        http://www.torontopubliclibrary.ca/components/elem_bib-branch-holdings.jspf?itemId=*
// @version        0.2.3
// ==/UserScript==

function get(url, cb) {
  GM_xmlhttpRequest({
    method: "GET",
     url: url,
     onload: function(xhr) { cb(xhr.responseText) }
  })
}

// Get URL parameters. Swiped from http://www.netlobo.com/url_query_string_javascript.html

function gup( name )
{
  name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
  var regexS = "[\\?&]"+name+"=([^&#]*)";
  var regex = new RegExp( regexS );
  var results = regex.exec( window.location.href );
  if( results == null )
    return "";
  else
    return results[1];
}

function insertAfter(newNode, node) {
  return node.parentNode.insertBefore(newNode, node.nextSibling);
}

// Taken from Dustin Diaz-  http://www.dustindiaz.com/getelementsbyclass/
function getElementsByClass(searchClass,node,tag) {
	var classElements = new Array();
	if ( node == null )
		node = document;
	if ( tag == null )
		tag = '*';
	var els = node.getElementsByTagName(tag);
	var elsLen = els.length;
	var pattern = new RegExp("(^|\\s)"+searchClass+"(\\s|$)");
	for (i = 0, j = 0; i < elsLen; i++) {
		if ( pattern.test(els[i].className) ) {
			classElements[j] = els[i];
			j++;
		}
	}
	return classElements;
}

if (document.domain == "www.goodreads.com") {

// Retrieve ISBN from Goodreads page.

var rowItems = getElementsByClass("infoBoxRowItem");
var isbn13 = "";
var re  = new RegExp("(\(ISBN13: <span itemprop=\"isbn\">)([0-9]{13})<\/span>\)");

var isbnRow = null;

for (var i = 0; i < rowItems.length; i++) {
	var m = re.exec(rowItems[i].innerHTML);
	if (m != null) {
		isbn13 = m[3];
		isbnRow = rowItems[i];
		break;
	}
}

// unsafeWindow.console.log("isbn13: " + isbn13);

var searchByIsbn = get("http://www.torontopubliclibrary.ca/search.jsp?advancedSearch=true&Ntt=" + isbn13, createOnClick);

var infoBox = document.getElementById("infoBox");
var linkTitle = document.createElement("div");
var linkContents = document.createElement("div");
linkTitle.setAttribute("class","infoBoxRowTitle");
linkTitle.appendChild(document.createTextNode("Toronto Public Library lookup"));

linkContents.setAttribute("class", "infoBoxRowItem");
var linkToPopup = document.createElement("a");
linkContents.appendChild(document.createTextNode("Waiting for results to be returned..."));
insertAfter(linkTitle, isbnRow);
insertAfter(linkContents, linkTitle);

var tplId = "Not found";

}

function createOnClick(response) {
	// /detail.jsp?Entt=RDM2542067&amp;R=2542067
	var re = new RegExp('Entt=.*&amp;R=([^\"]*)\"');
	var matches = re.exec(response);
	if (matches == null) {
		linkContents.innerHTML = "Not found in TPL based on isbn13 search, try another isbn13 of the same book.";
	} else {
		tplId = matches[1];
		linkToPopup.appendChild(document.createTextNode("TPL Lookup (popup)"));
		linkToPopup.setAttribute("onClick","window.open('http://www.torontopubliclibrary.ca/components/elem_bib-branch-holdings.jspf?itemId=" + tplId + "&numberCopies=1', 'tpl_lookup', 'status = 0, toolbar = 0, scrollbars = 1, height = 300, width = 550, resizable = 1, scrollable = 1');");
		linkContents.innerHTML = "";
		linkContents.appendChild(linkToPopup);
	}
}

if (document.domain == "www.torontopubliclibrary.ca") {

// We don't get a proper HTML page, so stick the <link> tag in the table. 
// Ugly, I know.
var firstTable = document.getElementsByTagName('table')[0];
var elementsCSS = document.createElement("link");
elementsCSS.setAttribute("rel", "stylesheet");
elementsCSS.setAttribute("type","text/css");
elementsCSS.setAttribute("href","/css/elements.css");
firstTable.appendChild(elementsCSS);

// Hokay. Sho. Grab the http://www.torontopubliclibrary.ca/detail.jsp?R= 
// page in order to get the item ID, so we can create the Place Hold link.
// R is the city's item id, which is distinct from call number or isbn.
var itemId = gup("itemId");
get("http://www.torontopubliclibrary.ca/detail.jsp?R=" + itemId, placehold_callback);
var holdURL = "";

}

// Stuff the place hold link everywhere. It doesn't pick the right library though.
function placehold_callback(response) {
var re = new RegExp('href=\"(/placehold([^\"]*))\"');
	var matches = re.exec(response);
	holdURL = "http://www.torontopubliclibrary.ca" + matches[1].replace(/&amp;/g,"&");
	
	var holdLinkRow = document.createElement("tr");
	var holdLinkCell = document.createElement("td");
	var holdLink = document.createElement("a");
	holdLink.setAttribute("href", holdURL);
	holdLink.setAttribute("onClick", "window.moveTo(0,0); window.resizeTo(screen.width,screen.height);");
	holdLink.appendChild(document.createTextNode("Place a hold"));
	
	holdLinkCell.appendChild(holdLink);
	holdLinkRow.appendChild(holdLinkCell);
	
	var rows = document.getElementsByTagName('tr');
	var th = document.getElementsByTagName('tr')[0];
	var holdHeader = document.createElement("th");
	holdHeader.appendChild(document.createTextNode("Place Hold?"))
	th.appendChild(holdHeader);
	
	for (var i = 1; i < rows.length; i++) {
		rows[i].appendChild(holdLinkCell.cloneNode(true));
	}
}
