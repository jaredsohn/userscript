// ==UserScript==
// @name           Torrentz One-Click uTorrent List
// @namespace      tz_oc
// @description    Provides a button on Torrentz pages that copies the uTorrent-compatible trackers list to clipboard (requires flash)
// @include        http://www.torrentz.eu/*
// @include        http://torrentz.eu/*
// ==/UserScript==
//
// Uses Clippy (https://github.com/mojombo/clippy/) to copy the text - Requires flash
// (If using Flashblock or similar addon, add torrentz.com to the whitelist)

//Ensure page is a torrent page by checking if the vote box is present
if(document.getElementById('vote-box')) {
	//Create a new info div
	var newDiv = document.createElement('div');
	newDiv.id = 'tz_oc';
	newDiv.className = 'info';
	
	//Create a span that the clippy button will be inserted into later
	var clippySpan = document.createElement('span');
	clippySpan.id = 'tz_oc_clippy';
	
	//Build the div and add text
	newDiv.appendChild(document.createTextNode('Copy uTorrent trackers list to clipboard: '));
	clippySpan.appendChild(document.createTextNode('(loading...)'));
	newDiv.appendChild(clippySpan);
	
	//Find the search bar and insert the div above it
	var searchBar = document.getElementsByTagName("form")[0];
	document.body.insertBefore(newDiv, searchBar);
	
	//Insert the clippy button
	insertButton(clippySpan);
}

function insertButton(element) {
	//Build the announce URL
	var url = 'http://torrentz.eu/announce_' + window.location.pathname.substring(1);
	if(window.XMLHttpRequest) { //if XMLHttpRequest is available
		var req = new XMLHttpRequest(); //Make a new request
		
		//Open and send the request to the url
		req.open("GET", url, true);
		req.send();
		
		req.onreadystatechange=function(){ //When request completed
			if(req.readyState == 4 && req.status == 200) { //If all is okay
				element.innerHTML = clippy(req.responseText, '#d4ffd4'); //Add the clippy with the tracker list
			} else { //If all is not okay
				element.innerHTML = '(Error: could not find tracker list)'; //Show error
			}
		}
	} else { //XMLHttpRequest not available
		element.innerHTML = '(Error: Could not initialise XMLHttpRequest)'; //Show error
	}
}

function clippy(text, bgcolor) {
	//Insert the clippy button with given text and bgcolor
	return '<object classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" width="110" height="14" id="clippy">' + 
	       '<param name="movie" value="https://github.com/mojombo/clippy/raw/master/build/clippy.swf"/>' +
	       '<param name="allowScriptAccess" value="always" />' + 
	       '<param name="quality" value="high" />' + 
	       '<param name="scale" value="noscale" />' + 
	       '<param name="FlashVars" value="text=' + text + '">' + 
	       '<param name="bgcolor" value="' + bgcolor + '">' + 
	       '<embed src="https://github.com/mojombo/clippy/raw/master/build/clippy.swf" width="110" height="14" name="clippy" quality="high" allowScriptAccess="always" type="application/x-shockwave-flash" pluginspage="http://www.macromedia.com/go/getflashplayer" FlashVars="text=' + text + '" bgcolor="' + bgcolor + '" />' + 
	       '</object>'
}