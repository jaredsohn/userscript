// ==UserScript==
// @namespace	http://pardus.at/
// @name		Universal Pardus Mapping
// @description	Universal Pardus Mapping Script
// @include	http://*.pardus.at/*
// @match	http://*.pardus.at/*
// @author	Nhyujm@Orion.Pardus.at
// @version	0.2
// ==/UserScript==

// == Notes ==
//
// Versoin 0.2 - June 1, 2010 - Updated Script for AJAX calls
// Version 0.1 - May 10, 2010  - Started Project
// == End Notes ==

// == User Options ==
// use this section to turn portions of the mapper on and off by changing the values between 'true' and 'false'
//
var enableArtemis = true;  // Activates the Script for the Artemis Universe
var enableOrion = true;		// Activates the Script for the Orion Universe
var enablePegasus = true;	// Activates the Script for the Pegasus Universe

// == End User Options ==

// Global Variable Declaration
var g = {
	server : null,		// Server to Send Information To
	uni : null,			// Current Pardus Universe
	currentVersion : null,	// Current Version of Script
	usw : null,			// unsafeWindow variable
	debug : true,		// Debug Info
	testing : true,		// Load information to the Test Site
}

function createCookie(name,value,days,min) {
// Function to create a cookie
	if (min) {
		var date = new Date();
		date.setTime(date.getTime()+(min*60*1000));
		var expires = "; expires=" + date.toGMTString();
	} else if (days) {
		var date = new Date();
		date.setTime(date.getTime()+(days*24*60*60*1000));
		var expires = "; expires=" + date.toGMTString();
	} else { var expires = ""; }
	document.cookie = name + "=" + value + expires + "; path=/";
}
function readCookie(name) {
// Function to read a cookie returns null if cookie not found
	var nameEQ = name + "=";
	var ca = document.cookie.split(';');
	for(var i = 0;i < ca.length; i++) {
		var c = ca[i];
		while (c.charAt(0) === ' ') { c = c.substring(1,c.length); }
		if (c.indexOf(nameEQ) === 0) { return c.substring(nameEQ.length,c.length); }
	}
	return null;
}
function removeCookie(name) {
// Function to delete a cookie
	createCookie(name,"",-1,0);
}
function largeAlert() {
	var box = document.getElementById('debugAlert');
	if (box.style.height == '40px') {
		box.style.height='300px';
	} else {
		box.style.height='40px';
	}
}
function removeAlert() {
// Function to remove the debugAlert Box
	if (document.getElementById('debugAlert')) {
		var box = document.getElementById('debugAlert');
		box.parentNode.removeChild(box);
	}
}
function debugAlert(message) {
// Function Creates the debugAlert Box
	var divtag = document.createElement('div');
	divtag.id = 'debugAlert';
	divtag.style.width='600px';
	divtag.style.height='20px';
	divtag.style.position='fixed';
	divtag.style.left='0px';
	divtag.style.right='0px';
	divtag.style.bottom='0px';
	divtag.style.margin='0px auto';
	divtag.style.border='2px solid #823C3A';
	divtag.style.borderBottomWidth='0px';
	divtag.style.backgroundImage="url(data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%01%00%00%00%01%08%06%00%00%00%1F%15%C4%89%00%00%00%2BtEXtCreation%20Time%00%8Cr%2030%20wrz%202009%2017%3A12%3A41%20%2B0100%BD1W%A9%00%00%00%07tIME%07%D9%09%1E%10%09%0C%80a%F1%88%00%00%00%09pHYs%00%00.%23%00%00.%23%01x%A5%3Fv%00%00%00%04gAMA%00%00%B1%8F%0B%FCa%05%00%00%00%0DIDATx%DAc%B0%94%97%7F%0A%00%02i%01%5D%BB%02N%CC%00%00%00%00IEND%AEB%60%82)";
	divtag.style.padding='5px';
	divtag.style.color='#CFCCBD';
	divtag.style.zIndex = 100;
	if (message.replace) { divtag.textContent=message.replace(RegExp('(<wbr>)','g'),''); }
	divtag.innerHTML=message;
	divtag.addEventListener('mouseover', function () { largeAlert(); }, false);
	divtag.addEventListener('mouseout', function () { largeAlert(); }, false);
	divtag.addEventListener('click', function () { removeAlert(); }, false);
	document.body.appendChild(divtag);
}
function getXMLHttpObject() {
// Function to Create the AJAX Object
	var http;
	if (window.opera) {
		http = new opera.XMLHttpRequest();
	} else {
		if (window.XMLHttpRequest) {
			http = new XMLHttpRequest();
		}
		if (window.ActiveXObject) {
			http = new ActiveXObject('Microsoft.XMLHTTP');
		}
	}
	
	this.Post = function (url) {
		if (url === undefined) { return; }
		if (g.debug) { debugAlert(url); }
		url = url.replace(RegExp('(<wbr>)','g'),'');
		http.open('GET',url,true);
		http.onreadystatechange = function () {
			if (http.readyState == 4) {
				if (http.status == 200) {
					debugAlert(http.responseText);
				}
			}
		}
		http.send(null);
	}
}
function getUserLoc(doc) {
// Function :		getUserLoc
// Inputs :		doc - HTML Document
// Description : 	Gets the users current location from the script tag.  Stores the location as a cookie userloc.
// Returns : 		Null
	// Lets Find out your Current Location in the Padusian Universe
	var script = doc.getElementsByTagName('script');
	for(var i =0;i < script.length;i++) {
		if (script[i].innerHTML.match(/userloc =/)) {
			var scr = script[i].innerHTML;
			scr = scr.substring(scr.indexOf('userloc =') + 10);
			scr = scr.substring(0,scr.indexOf(';'));
			return parseInt(scr,10);
		}
	}
	return null;
}
function trim(str) {
// Function :		trim
// Input :		str - String
// Description :	Removes white space before and after a string
// Returns :		String
	return str.replace(/(?:(?:^|\n)\s+|\s+(?:$|\n))/g,"").replace(/\s+/g," ");
}
function getImage(e,i) {
// Function :		getImage
// Input :		e - HTML element
//			i - Integer - Defaults to 0 if not specified.
// Description :	Gets the ith image filename from a HTML Element.
// Returns :		String
	if (i === undefined) { var i = 0; }
	if (e) {
		if (e.nodeName.match(/IMG/)) {
			var img = e.src
		} else {
			var img = e.getElementsByTagName('img')[i].src;
		}
		return img.substring(img.lastIndexOf('/')+1,img.lastIndexOf('.'));
	}
	return null;
}
function mapUpdateType(doc) {
	navScreen(doc);
	if (g.usw.ajax) {
		if (g.usw.checkToDo !== undefined) {
			var local_checkToDo = g.usw.checkToDo;
			g.usw.checkToDo = function () {
				local_checkToDo();
				removeAlert();
				navScreen(doc);
			}
		}
	}
}
function navScreen(doc) {
// Function :		navScreen
// Inputs :		doc - HTML Document
// Description :	This function takes all the images from "navarea" Table and sends them to the Web Site. 
//			For each tile on the nav screen the function determins if the following exist :
//			bg - Background Image
//			fg - Foreground Image (Buildings)
//			npc - NPC Image
//			wormhole - Is the user at a wormhole
// Transmits :	Current Pardusian Universe
//			Current Users Location
//			Current Version of the Script
//			bg,fg,npc,wormhole - For Each Tile
// Returns :		Nothing
	if (g.usw.ajax && g.usw.res !== undefined) {
		var imgTags = doc.getElementById('navtransition').childNodes[0].getElementsByTagName('img');
		// Get User Location
		var userloc = g.usw.userloc;
	} else {
		var imgTags = doc.getElementById('navarea').getElementsByTagName('img');
		// Get User Location
		var userloc = getUserLoc(doc);
	}
	var flyclose = 0;
	// What Sector are we in
	var sector = doc.getElementById('sector').textContent;
	// Coordinates in the Sector
	var coords = doc.getElementById('coords').textContent;
	var x = coords.substring(1,coords.indexOf(','));
	var y = coords.substring(coords.indexOf(',')+1,coords.indexOf(']'));
	try {
		if (readCookie('update') === null || !readCookie('oldloc').match(userloc) || g.debug) {
			createCookie('update',1,0,5);
			createCookie('oldloc',userloc,0,0);
			// List of all Img Tags in the 'navarea'
			var postData = g.server + "include/navScreen.php?uni=" + g.uni + "&version=" + g.currentVersion + "&id=" + userloc + "&mapdata=";
			for (var i=0;i < imgTags.length;i++) {
				// Gets the <TD> element for the current tile
				var tdTag = imgTags[i].parentNode.parentNode;
				// Gest the <A> element for the curretn tile 
				var aTag = imgTags[i].parentNode;
				// List of Images that we don't care about so we skip this loop
				if (imgTags[i].src.match(/energymax|sb_black|nodata/)) { continue; }
				// Are we in the middle of the Nav Screen
				if (i == Math.floor(imgTags.length/2)) {
					// Since we are use the cookie userloc instead of the <a> element
					var nav = userloc;
					// If our ship is visible there is no <a> tag so adjust the <td> tag
					if (imgTags[i].src.match(/ships/)) { tdTag = imgTags[i].parentNode; }	
				} else {
					// Get tile location usint the <a> tag onclick element
					if (g.usw.ajax) { var nav = parseInt(aTag.getAttribute('onclick').replace('navAjax(','').replace(')',''),10); }
					else { var nav = parseInt(aTag.getAttribute('onclick').replace('nav(','').replace(')',''),10); }
				}
				var bg = "";
				var fg = "";
				var npc = "";
				// Is our img a background image
				if (imgTags[i].src.match(/backgrounds/)) {
					bg = getImage(imgTags[i]);
				} else {
					// Get the background image from the <td> elements style
					bg = tdTag.style.backgroundImage;
					bg = bg.substring(bg.lastIndexOf('/')+1,bg.lastIndexOf('.'));
					// Is our img a foregournd image
					if (imgTags[i].src.match(/foregrounds/)) {
						fg = getImage(imgTags[i]);
					}
					// Is our img a NPC image
					if (imgTags[i].src.match(/opponents/)) {
						npc = getImage(imgTags[i]);
					}
				}
				// Check to see if we are actually flying close to a sb
				if (bg.match('sb_')) { flyclose = 1; }
				postData += "<wbr>~" + nav + "," + bg + "," + fg + "," + npc;
				// If we are on a wormhole lets see if we are on a monster or an actual jump
				if (fg.match(/wormhole/) && (i == Math.floor(imgTags.length/2)) && (doc.getElementById('commands').getElementsByTagName('b')[0].textContent.match("Jump to") !== null)) {
					// We are at a jump, get the target
					postData += "," + trim(doc.getElementById('commands').getElementsByTagName('b')[0].textContent.replace('Jump to',''));
				}	
			}
			if (flyclose) { 
				// We are flying close to a SB, get the Name and the current coordinates
				postData += "&sb=" + doc.getElementById('sector').textContent;
				postData += "&x=" + x + "&y=" + y;
			}
		}
		var httpRequest = new getXMLHttpObject();
		if (g.debug) { postData += "&debug=1"; }
		httpRequest.Post(postData);
	} catch(ex) { debugAlert(ex); }
}

function UniversalPardusMappingScript() {
// Function :		UniversalPardusMappingScript
// Inputs :		None
// Description :	Main function that sets up default variables and calls sub functions based on
//			Current page being displayed and Current Pardusian Universe
// Returns :		Nothing
	g.currentVersion = 0.2;
	g.server = "http://mapper.pardus-alliance.com/UniversalPardusMappingScript/";
	// Load Document data into short variables
	var doc = document;
	var loc = doc.location.href;

	if (!loc.match(/artemis.pardus.at|orion.pardus.at|pegasus.pardus.at/)) { return; }
	// See if we have loaded the msgframe
	if (getUserLoc(doc) === null) { return; }
	
	if (loc.match('main.php')) {
		g.usw = this['unsafeWindow'] || window;
		g.uni = loc.substring(loc.indexOf('//')+2,loc.indexOf('.'));
		mapUpdateType(doc);
	}
}
// Begin
UniversalPardusMappingScript();