// IMDB Madigan Library Search 1.2
// Jeffrey Bower
// Original Script - Sean LeBlanc - IMDB Jefferson Lookup 1.0

// This puts a link into a search on Madigan lib from the movie page.

// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "IMDB - Madigan Library Search 1.0", and click Uninstall.

//
// ==UserScript==
// @name          IMDB - Madigan Library Search 1.0
// @namespace     http://userscripts.org/users/51482
// @description	  While viewing a title on IMDB, it will place a link to a search for said title in the Madigan Library.

// @include       http://*.imdb.*
// @include       http://imdb.*
// ==/UserScript==

// @Version       1.2
// @Firefox       1.5+
// @GmVersion     0.6.4
// @Author        Jeffrey Bower
// @Email         pct.edu | Jeffrey Bower
// TODO

var dbg = false;
var available = new Array();
var placeHold = "";

var titleXPath1 = "//div[@id='tn15title']";
//var titleXPath2 = "//div[@class='content']//b[@class='sans']";

var itemAvailabilityDiv = getItemAvailabilityDiv();

if (!itemAvailabilityDiv) {
	throw new Error('Could not get item availability stub');
}

function trim(str, chars) {
    return ltrim(rtrim(str, chars), chars);
}

function ltrim(str, chars) {
    chars = chars || "\\s";
    return str.replace(new RegExp("^[" + chars + "]+", "g"), "");
}

function rtrim(str, chars) {
    chars = chars || "\\s";
    return str.replace(new RegExp("[" + chars + "]+$", "g"), "");
}

function getCookie(c_name)
{
if (document.cookie.length>0)
  {
  c_start=document.cookie.indexOf(c_name + "=");
  if (c_start!=-1)
    { 
    c_start=c_start + c_name.length+1 ;
    c_end=document.cookie.indexOf(";",c_start);
    if (c_end==-1) c_end=document.cookie.length
    return unescape(document.cookie.substring(c_start,c_end));
    } 
  }
return ""
}

function setCookie(c_name,value,expiredays)
{
var exdate=new Date();
exdate.setDate(exdate.getDate()+expiredays);
document.cookie=c_name+ "=" +escape(value)+((expiredays==null) ? "" : "; expires="+exdate.toGMTString());
}

// Get title:
var title
var noTitle = false;
// Remove junk from title as best we can:
//title = parseTitle(title);

if(document.getElementById('tn15crumbs') != null){
	title = document.getElementById('tn15crumbs').getElementsByTagName('b')[0].innerHTML
	title = title.split("(");
	if(title[0] != null){
		setCookie('title',title[0],365);
	}
}
else{
	noTitle = true;
}
//slog("Parsed title: '" + title + "'.");

if(title != ""){
(function() {
	var isbn = getCookie('title')
	var flagME = false;
	//alert("ok, we've looked for the spot at amazon.com to drop content");
		if (isbn)  {
			// search all locations and find the book 
			// Step 1: find the book (do they ahve it anywhere)
			//alert("and finding the isbn worked: " + isbn);
			var table_content = '';
			GM_xmlhttpRequest( { 
				method:"POST", 
				url:'http://proteus.pct.edu/uhtbin/cgisirsi/X/0/0/123?searchdata1="' + isbn + '"',
				data:'',
						onload:function(responseDetails) {
					var content = responseDetails.responseText;
					var arrContent = content.split("\n");
					
					for (var i=0; i < arrContent.length; i++) {
						if ( arrContent[i].match(/Material/)) {
							i += 23
							var found=0;
							//rows = rows + this_row;
							table_content = arrContent[i];
							available[0] = table_content
							available[0] = trim(available[0])
							var counter = 1;
									while(arrContent[i+10].match(/holdingslist/)){
										i += 21
										table_content = arrContent[i];
										available[counter] = table_content
										available[counter] = trim(available[counter])
										counter++;
									}
							i = arrContent.length;      
							flagME = true;
						}
					}
					for (var i=0; i < arrContent.length; i++) {
						if ( arrContent[i].match(/Place Hold/)) {
							//i += 23
							var temp = arrContent[i].split('"')
							temp = temp[1]
							temp = temp.split('"')
							temp = temp[0]
							placeHold = "http://proteus.pct.edu" + temp;
							
							i = arrContent.length;      
						}
					}
					if(!flagME){
						available[0] = "Title Unavailable"
						itemType = "DVD";
						var mediaUrl = 'http://proteus.pct.edu/uhtbin/cgisirsi/X/0/0/60/30/X';
						url = mediaUrl
						insertItemSearchText(itemAvailabilityDiv, "Madigan Library Search Results", url, itemType);
					}
					else{
						itemType = "DVD";
						var mediaUrl = 'http://proteus.pct.edu/uhtbin/cgisirsi/X/0/0/123?searchdata1="';
						url = mediaUrl + isbn + '"';
						insertItemSearchText(itemAvailabilityDiv, "Madigan Library Search Results", url, itemType);
						/*title found*/
					}		
				}	
			});
		}	
	//alert(table_content)
})();
}


function slog(logthis) {
	if (dbg) GM_log(logthis);
}

function insertItemSearchText(stubDiv, libName, libUrl, itemType) {
	clearText(stubDiv);
	insertText(stubDiv,
		   "<u><a href='" + libUrl + "' title='"+libName+" information for this item'> " + libName + " </a></u>", '')
}

// Simplify making a FIRST_ORDERED_NODE_TYPE XPath call

function xpathFirst(query, node) {
    if (!node) {
	node = document;
    }

    var result = document.evaluate(query, node, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null );

    if (!result) {
	return;
    }

    return result.singleNodeValue;
}

// Simplify making an UNORDERED_NODE_SNAPSHOT_TYPE XPath call
// Return a snapshot list

function xpathAll(query, node) {
    if (!node) {
	node = document;
    }

    return document.evaluate(query, node, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
}

// Add global style to page

function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];

    if (!head) {
	throw new Error('Could not get head element.');
    }

    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

// This tries a few different
// ways to get title location:
function getTitleLocation() {
	slog("Searching for main title span with: " + titleXPath1);
	if(xpathFirst(titleXPath1) != null){
    	var mainTitleSpan = xpathFirst(titleXPath1);
	}
	else{
		var mainTitleSpan = xpathFirst("//div[@id='tn15main']")
	}
    return mainTitleSpan;
}


// Insert a div into the document that will be used for displaying item availability.
// Return this div.

function getItemAvailabilityDiv() {
	var	mainTitleSpan = getTitleLocation();


	slog("Getting parent node of main title span.");
    var parent = mainTitleSpan.parentNode;
	//alert(parent.innerHTML)


    itemAvailabilityDiv = document.createElement('div');


    switch (parent.nodeName.toUpperCase()) {

    case "FORM":
		var authorSpan = xpathFirst('span[starts-with(string(normalize-space()), "by")]', parent);

		if( !authorSpan ) {
		    throw new Error('Could not get author span.');
		}

		var nextBr = xpathFirst('following-sibling::br', authorSpan);

		if( !nextBr) {
		    throw new Error('Could not get next br after author span.');
		}
		parent.removeChild(nextBr);
		parent.insertBefore(itemAvailabilityDiv, authorSpan.nextSibling);
		return itemAvailabilityDiv;

		break;

    case "DIV":
		if(parent.lastChild.tagName == 'br') {
			//slog("Removing last child.");
	    	parent.removeChild(parent.lastChild);
		}
		
		for(i = 0; i < parent.getElementsByTagName("div").length; i++){
			//alert(parent.getElementsByTagName("div")[i].id)
            if(parent.getElementsByTagName("div")[i].id == "tn15title"){
				//parent.getElementsByTagName("div")[i].innerHTML = itemAvailabilityDiv
				//alert("Item: " + parent.getElementsByTagName("div")[i].innerHTML)
				//alert(parent.innerHTML)
				parent.getElementsByTagName("div")[i].insertBefore(itemAvailabilityDiv, null)
           	}
			else if(parent.getElementsByTagName("div")[i].id == "tn15main"){
				//parent.getElementsByTagName("div")[i].innerHTML = "";
				parent.getElementsByTagName("div")[i].insertBefore(itemAvailabilityDiv, parent.getElementsByTagName("div")[i+1])
			}
          }

		return itemAvailabilityDiv;

		break;

    default:
		throw new Error('Did not recognize the main title span\'s parent\'s nodetype');
    }
}

// Insert a new paragraph containing the specified text into the specified div node.
// If present, we set the class attribitue of this div to classAttr.

function insertText(stubDiv, text, classAttr) {
    var div = document.createElement('div');
	var div2 = document.createElement('div');

	div.setAttribute('class', 'strip toplinks');
	div.setAttribute('style', 'margin-top:10px;');
  	div.innerHTML = "<table width='100%;' height='25px' cellpadding='0' cellspacing='0'><tr><td><b>" + text + "</b></td></tr></table>";
	
	if(noTitle){
		div2.innerHTML = "<style type='text/css'>.strip {padding: 4px; background: #fafafa; border-top: 1px dotted #999; border-bottom: 1px dotted #999; margin-bottom: 1em;} .toplinks { padding-top: 0px; padding-bottom: 0px; margin-bottom: 4px;} .toplinks td { padding: 0px; width: 10em;} .toplinks a { text-decoration: none;} .toplinks a b { text-decoration: underline; white-space: nowrap;} .toplinks a b.faded { color: #b7b7b7; text-decoration: none;} .toplinks a img { border: 0px; vertical-align: middle;} </style>";
	}
	
	for(i = 0;  i < available.length; i++){
		if(available[i] != "Title Unavailable"){
			if(available[i] != "Checked Out"){
				if(available[i] != "Available online"){
					div2.innerHTML += "<table width='100%;' height='30px' cellpadding='0' cellspacing='0' style='padding-left:5px; padding-bottom:5px; border-bottom: 1px dotted #999'><tr><td><b>" + available[i] + " - <a href='" + url + "' target='_blank'>view</a> | <a href='" + placeHold + "' target='_blank'>place hold</a></b></td></tr></table>";
				}
			}
			else{
				div2.innerHTML += "<table width='100%;' height='30px' cellpadding='0' cellspacing='0' style='padding-left:5px; padding-bottom:5px; border-bottom: 1px dotted #999'><tr><td><b>" + available[i] + " - <a href='" + url + "' target='_blank'>view</a></b></td></tr></table>";
			}
		}
		else{
			div2.innerHTML += "<table width='100%;' height='30px' cellpadding='0' cellspacing='0' style='padding-left:5px; padding-bottom:5px; border-bottom: 1px dotted #999'><tr><td><b>" + available[i] + "</b></td></tr></table>";
		}
	}

    stubDiv.appendChild(div);
	stubDiv.appendChild(div2);
	itemAvailabilityDiv.setAttribute('class', '');
}

// Clear contents of the specified div node

function clearText(stubDiv) {
    stubDiv.innerHTML = '';
}

if (!GM_xmlhttpRequest || !GM_log) {
    alert('The Madigan Library Lookup script requires Greasemonkey 0.5.3 or higher.  Please upgrade to the latest version of Greasemonkey.');
    return;
}