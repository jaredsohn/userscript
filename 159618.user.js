// ANONYMOUS PLURK REMOVER 0.1
// CodeBastard Redgrave <cbredgrave@gmail.com>
//
// Removes those god damn annoying Anonymous plurks from your timeline
//
// --------------------------------------------------------------------
//
// loosely based on this script, and released on the same license:
//
// Plurk comment hide
// version 0.1 BETA!
// 2010-6-22
// Copyright (c) 2010, Alvin Woon
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
// To uninstall, go to Tools/Manage User Scripts,
// select "Unstyle", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Hide Anonymous Plurks
// @namespace     http://codebastard.com
// @description   Hides ALL anonymous plurks 
// @include       http://plurk.com/*
// @include       http://www.plurk.com/*
// @grant		  none
// ==/UserScript==

var user = ['Anonymous', 'anonymous'];

(function init(){
	var j;
	
	for (j in user){
		var str = "//a[@href='/" + user[j] + "']";
		user[j] = str;
	}
	
	var pattern = user.join(" | ");
	
	document.body.addEventListener('DOMNodeInserted', function() {
	  var findPattern = pattern, i, resultLinks = document.evaluate(findPattern, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	  
	  for(i=0; i<resultLinks.snapshotLength; i++){
	  
		var wholeplurk = resultLinks.snapshotItem(i).parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode;
		
		if(wholeplurk.className && wholeplurk.className.indexOf('cboxAnchor') > -1){
	  		wholeplurk.style.display = 'none';
			
	  	}
		
		
	  }
	  
	}, false);
}());