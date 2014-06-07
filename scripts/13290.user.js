// Block web pages - replace content with "Get back to work!" text - user script
// version 0.1
// 2007-10-10
// Copyright (c) 2007, Bjoern Guenzel
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
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
// select "Block", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Block
// @namespace     http://net.blinker.greasemonkey/block
// @description   Replace the page contents with the words "Get back to work!"
// @include       http://news.ycombinator.com/*
// @include	  http://www.xing.com/net/*

// ==/UserScript==

var isDebugging = false;

function debug(message){
	if(isDebugging){
		GM_log(message);
	}
}

function removeChildNodes(elem){
	while(elem.hasChildNodes()){
		var child = elem.firstChild;
		debug("remove child: "+child);
		elem.removeChild(child);
	}
}

debug("starting block");

var bodies = document.getElementsByTagName('body');

debug("bodies: "+bodies);

if(bodies && bodies.length > 0){
	var i = 0;
	
	for(i = 0;i<bodies.length;i++){
		var body = bodies[i];
		
		if(body.hasChildNodes()){
			//remove all children
			debug("has child nodes");
			removeChildNodes(body);
			debug("removed");
		}
		
		var textContainer = document.createElement("span");
		var blockText = document.createTextNode("Get back to work!");
		textContainer.appendChild(blockText);
	
		body.appendChild(textContainer);
		textContainer.setAttribute("style","color: black; font-size: 20px;font-family: sans-serif;");
		body.setAttribute("style","background-color: white;text-align: left;padding: 20px;margin: 0px;");
	}
}