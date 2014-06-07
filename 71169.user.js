// ==UserScript==
// @name           Better beta Toronto Public Library holdings results
// @namespace      http://userscripts.org/users/92501
// @description    Library used in my Goodreads and Amazon Toronto Public Library scripts
// @include        http://beta.torontopubliclibrary.ca/components/elem_bib-branch-holdings.jspf?itemId=*
// @version        0.1
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

// We don't get a proper HTML page, so stick the <link> tag in the table. 
// Ugly, I know.
var firstTable = document.getElementsByTagName('table')[0];
var elementsCSS = document.createElement("link");
elementsCSS.setAttribute("rel", "stylesheet");
elementsCSS.setAttribute("type","text/css");
elementsCSS.setAttribute("href","/css/elements.css");
firstTable.appendChild(elementsCSS);

// Hokay. Sho. Grab the http://beta.torontopubliclibrary.ca/detail.jsp?R= 
// page in order to get the item ID, so we can create the Place Hold link.
// R is the city's item id, which is distinct from call number or isbn.
var itemId = gup("itemId");
get("http://beta.torontopubliclibrary.ca/detail.jsp?R=" + itemId, placehold_callback);
var holdURL = "";

// Stuff the place hold link everywhere. It doesn't pick the right library though.
function placehold_callback(response) {
	var re = new RegExp('href=\"(/placehold([^\"]*))\"');
	var matches = re.exec(response);
	holdURL = "http://beta.torontopubliclibrary.ca" + matches[1].replace(/&amp;/g,"&");
	
	var holdLinkRow = document.createElement("tr");
	var holdLinkCell = document.createElement("td");
	holdLinkCell.setAttribute("colspan", "5");
	var holdLink = document.createElement("a");
	holdLink.setAttribute("href", holdURL);
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

