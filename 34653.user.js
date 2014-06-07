
// TrollHammer for WordPress blogs
// version 0.004 Beta
// September 20, 2009
// Copyright (c) 2009, Spies, Brigands, and Pirates
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.  To install it, you need
// Greasemonkey 0.8 or later: http://www.greasespot.net/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Grease Monkey/Manage User Scripts,
// select "TrollHammer", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name         TrollHammer
// @description   Adds an "Ignore User" link to user commments
// Change the @include below to match the base URL for the site.
// @include       http://proteinwisdom.com/*
// @include 	  http://powip.com/*
// ==/UserScript==

commentUsernameRE = /by (.+) on/; // Used to extract the commenter's name. This will need to change depending on which WordPress theme the site is using.
markAsTroll = '(TrollHammer this poster)'; // Put anything you want here..
resetTrollHammer = '(Reset TrollHammer)';  // And here... these are the text for the inserted hyperlinks
//trollHammered = '<span style="font-size: 50%"><img src="http://s5.tinypic.com/290v5z7.jpg" width="78" height="50"></span>'; // Displayed in lieu of a troll message.
trollHammered = '<span width="100%" style="font-size: 50%">(Trollhammered)</span>'; // Displayed in lieu of a troll message.

function setTrollExpiration(){ // Expire after one week. May need tuning.
		var date = new Date();
		date.setTime(date.getTime()+(7*24*60*60*1000));
	 	return  "; expires="+date.toGMTString() + ";";
}

function parseTrollHashes(){ // Get all the individual hashes out of the cookie
	trollhashes = trollcookie.split('&');
}


function readCookie(name) { // Used to isolate the troll cookie value from any other cookie values that may be present.
	var nameEQ = name + "=";
	var ca = document.cookie.split(';');
	for(var i=0;i < ca.length;i++) {
		var c = ca[i];
		while (c.charAt(0)==' ') c = c.substring(1,c.length);
		if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
	}
	return null;
}


function returnAttributes(at){
	var arr=[];
	var elem=document.getElementsByTagName('*'), i=0, e;
	while(e=elem[i++]){
		e[at]?arr[arr.length]=e[at]:null;
	}
	return arr;
}

function extractIdentifier(ele){ // Should work for most WordPress themes. May need tuning if the theme uses something other than comment-(commentnumber) as the id field.
	return ele["id"].substring(8);
}

function stripHTML(text){ // Get rid of any markup in the user name (e.g., hyperlink to the user's site)
	return text.replace(/(<([^>]+)>)/ig,"")
}

function extractUserName(comment){ // Extract the user's name from the comment. See the definition of commentUsernameRE to tune for different themes.
	usernamearr = comment.innerHTML.match(commentUsernameRE);
	if(usernamearr)
		return stripHTML(usernamearr[1]);
	//usernamearr = comment.innerHTML.match(commentUsernamePOWIP);
	//if(usernamearr)
	//	return stripHTML(usernamearr[1]);
	return null;
}


function hashTrollName(trollname){ // Generate a (hopefully) unique hash value for the troll's name. djb2 hash function. Assumes unsigned, but seems to work okay signed.
	var hash = 5381;
	for(var i = 0; i < trollname.length; i++){
		hash = ((hash << 5) + hash) + trollname.charCodeAt(i);
	}
    return hash;
   
}


function extractComments(){ // Get all of the comment elements from the page.
	var comments = [];
	allIds=returnAttributes('id');
	for(var i=0,j=0;i<allIds.length;i++){
		if(allIds[i].match(/comment-\d+/)){
			comments[j++] = allIds[i];
		}
	}
	return comments;
}


function pretrolled(comment,trollhash){ // Used to detect messages from pre-existing trolls.
	for(var j = 0; j < trollhashes.length; j++){
		if(trollhashes[j] == trollhash){
			return true;
		}
	}
	return false;
}


var trollexpires = setTrollExpiration(); // Cookie string to control expiration date

var trollhashes = []; // Contains hashes for preexisting trolls.
var trollcookie = readCookie("trollhammered");
if(trollcookie== null)
	trollcookie = "";
	
parseTrollHashes(); // trollhashes array now contains all of the values for pre-existing trolls. 

comments = extractComments();

// Grovel through all the comments, remove pre-existing trolls, and add links.

var commentContainer = comments[0].parentNode;

for(var i=0;i<comments.length;i++){
	var newtrollcookie;
	comment = document.getElementById(comments[i]);
	var commenthash = extractIdentifier(comment);
	var trollname = extractUserName(comment);
	if(trollname == null) // Probably a trackback/pingback, etc.
		continue;
	var trollhash = hashTrollName(trollname);
	comment['trollhash'] = trollhash; // Not used in this implementation -- may be used in the future.

	if(pretrolled(comment,trollhash)){ // Already marked as troll? Get rid of it and don't bother with the rest of the routine.
			//comment.style.display = "none";
			comment.innerHTML = trollHammered;
		continue;
	}

	if(trollcookie != "")
		newtrollcookie = trollcookie + "&" + trollhash;
	else newtrollcookie = trollhash;

	// We're all set to add the new hyperlinks.
	cookielink = "{document.cookie=" + '"trollhammered=' + newtrollcookie + trollexpires + ' path=/";alert("TrollHammered");window.location.reload();};'
	var newLink = document.createElement('a');
	newLink.style.fontSize = "50%";
	newLink.href= "javascript:" + cookielink;
	var newLinkText = document.createTextNode(markAsTroll);
	newLink.appendChild(newLinkText);
	comment.appendChild(newLink);
	var resetLink = document.createElement('a');
	resetLink.style.fontSize = "50%";
	resettroll = "{document.cookie=" + '"trollhammered=' + trollexpires + ' path=/";alert("TrollHammer cleared");window.location.reload();};';
	resetLink.href="javascript:" + resettroll;
	var resetLinkText = document.createTextNode(resetTrollHammer);
	resetLink.appendChild(resetLinkText);
	comment.appendChild(resetLink);
}


