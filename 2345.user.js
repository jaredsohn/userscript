// GoogleReaderAllStarred
// version 0.5
// 2005-12-13
// Copyright (c) 2005, Ben Beckwith
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.  To install it, you need
// Greasemonkey 0.3 or later: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
// 
// --------------------------------------------------------------------
// There are a couple of extra ideas I had for this, but these may need
//  1.) Make it easy to post all to del.icio.us
//  2.) Automatic/batch unstar of all items
//
// --------------------------------------------------------------------
// Changes
// 0.5          bnb
//      Updated to work with the latest Reader
// 0.1.1	bnb
//	Updated script to work with the new GR XML file for starred items
// 0.1	bnb
// 	Initial Version
// 
// --------------------------------------------------------------------
//
//
// ==UserScript==
// @name          Google Reader All Starred
// @namespace     http://whitebucket.com/greasemonkey
// @description   Script to extract all links from google reader that have been starred.
// @include       http://*.google.com/reader/*
// @include	  http://google.com/reader/*
// @include	  http://reader.google.com/*
// ==/UserScript==


// Be informative for older versions of Greasemonkey
if (!GM_xmlhttpRequest) {
    alert('Please upgrade to the latest version of Greasemonkey.');
    return;
}

// The variable to hold the page output
var links = '';
// Get the userid from the script on the page
var uid = unsafeWindow["_USER_ID"];
// Page number variable for output
var pages;

// kick off the collection
function getAllStarred()
{	
    // Set the text for the message box
    document.getElementById('GRAS_MSG').innerHTML = 'Getting links.';
    // Show the message box
    document.getElementById('GRAS_DIV').style.display = 'block';
    
    // Initialize the page variable
    pages = 1;
    
    // Begin the new links page
    links = '<head><title>Google Reader Starred Entries</title></head><html>' +
	//	'<input type="button" value="Push to del.icio.us" id="GRAS_DELICIOUS">' +
	//      '<input type="button" value="Unstar items" id="GRAS_UNSTAR" onClick="alert(window.location.href)">' +
	'<br><div id="GRAS_ACTIONFORM"></div>' +
	'<ul>';
    
    // Make the initial request
    // The 'continuation' string isn't needed for the first request.
    googleRequest('');
}

// Perform the request for the starred item
// Param: c
//        This string is used as an offset if the initial
//        request didn't get all of starred items
//
function googleRequest(c){
    // Generate a request to get the list (xml) of starred items
    GM_xmlhttpRequest({
	    method: 'GET',
    		url: 'http://google.com/reader/atom/user/' + uid + '/state/com.google/starred?n=250'+c,
    		headers: {
		'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey/0.3',
		    'Accept': 'application/atom+xml,application/xml,text/xml',
		    },
    		onload: collectAllStarred
		});
}

// This function parses the response object to get the starred items.
// If it finds a continuation parameter, it will call googleRequest
// again until all of the starred items are collected.
function collectAllStarred(responseObj)
{
    document.getElementById('GRAS_MSG').innerHTML = 'Collecting links,  Set ' + pages++;
    // Create a new parser
    var dp = new XPCNativeWrapper(window, "DOMParser()");
    var parser = new dp.DOMParser();
    var DOM = parser.parseFromString(responseObj.responseText, "application/xhtml+xml");
    
    // Grab all of the entries
    var entries = DOM.getElementsByTagName('entry');
    
    // Loop through all of the entries
    for(var i = 0, len = entries.length; i < len; i++){
	// Grab the link URL
	var link = entries[i].getElementsByTagName('id')[0].getAttribute('gr:original-id');
	// Grab the item Title
	var title = entries[i].getElementsByTagName('title')[0].childNodes[0].nodeValue;
	// Grab the feed name
	var feedtitle = entries[i].getElementsByTagName('source')[0].getElementsByTagName('title')[0].textContent
	    // Add a new link to the page.
	    links += '<li><a href="' + link + '">' + title + ' from ' + feedtitle +'</a></li>\n';
	
	// Note that other fields can be displayed here as well.
    }
    
    // Check for continuation
    if(DOM.getElementsByTagName('continuation')[0]){
	googleRequest('&c=' + DOM.getElementsByTagName('continuation')[0].childNodes[0].nodeValue); 
    }else{
	// If there is no continuation, then we have finished and it is time to display the page
	
	// tidy up the page.
	links += "</ul></html>";
	
	// Write a new document (another window)
	var d = open().document;
	d.write(links);
	d.close();
	
	// Hide the message box		
	document.getElementById('GRAS_DIV').style.display = 'none';
    }
}

// function pushToDelicious()
// {
    
// }

// function showDeliciousForm()
// {
//     alert('Clicked');
//     document.getElementById('GRAS_ACTIONFORM').innerHTML = 
// 	'<FORM><label for="d_id">Your del.icio.us ID:</label><BR><input type="text" name="d_id" id="d_id">' +
// 	'<br><label for="d_pass">Your del.icio.us Password:</label><br><input type="text" name="d_pass" id="d_pass">' +
// 	'<br><label for="d_tags">Del.icio.us tags to use:</label><br><input type="text" name="d_tags" id="d_tags">' +
// 	'<br><input type="button" onClick="alert(window.location.href)" value="Go!">';
// }

// function unstarLinks()
// {
//     alert("When I wish upon a star....");
// }

// Add a small messagebox to indicate that the script is working
var msg = document.createElement("div");
msg.innerHTML = '<div id="GRAS_DIV" style="margin: 0 auto 0 auto; ' +
    'position: absolute; top: 5px; left: 5px; display: none;'+
    'border: 2px solid #000000; margin-bottom: 5px; ' +
    'font-size: small; background-color: #bb0000; ' +
    'color: #eeffff;"><p id="GRAS_MSG" style="margin: 2px 0 1px 0;"> ' +
    'YOUR TEXT HERE ' +
    '</p></div>';
// Add it at the end of the page.
document.body.appendChild(msg);

if(document.getElementById('broadcast-selector').parentNode) {
    // Create a list item to add to the regular google links
    var starlink = document.createElement("LI");
    // Add the text
    starlink.innerHTML='<a href="#">All Starred</a>';
    // Create a listener to handle the click event
    starlink.addEventListener('click',getAllStarred,false);
    // Add the link to the Google Reader page.
    document.getElementById('broadcast-selector').parentNode.appendChild(starlink);
}

// if(document.getElementById('GRAS_DELICIOUS')){
//     document.getElementById('GRAS_DELICIOUS').addEventListener('click',showDeliciousForm,false);
// }
// if(document.getElementById('GRAS_UNSTAR')){
//     document.getElementById('GRAS_UNSTAR').addEventListener('click',unstarLinks,false);
// }
