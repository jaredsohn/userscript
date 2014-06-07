// Cheezburger Analytics removal user script
// version 2010-03-01 ALPHA
// Copyright (c) 2010, Who Else
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
// select the script from the list, and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Remove cheezburger-analytics.com tracking
// @namespace     http://userscripts.org/users/135069
// @description   Script will Remove cheezburger-analytics.com tracking
// @version       2010-03-01 ALPHA
// @unwrap
// @include       http*://*thisisphotobomb.com/*
// @include       http*://*icanhascheezburger.com/*
// @include       http*://*ihasahotdog.com/*
// @include       http*://*roflrazzi.com/*
// @include       http*://*totallylookslike.com/*
// @include       http*://*punditkitchen.com/*
// @include       http*://*graphjam.com/*
// @include       http*://*onceuponawin.com/*
// @include       http*://*failblog.org/*
// @include       http*://*engrishfunny.com/*
// @include       http*://*tofulator.com/*

// ==/UserScript==
(function() {

 // -- Basic Setting Variables -- start
 var removeiFrametag 	= 1;
 var removeScript 	= 1;
 var debugalerts	= 0;
 // -- Basic Setting Variables -- end 


 var exs = "";
 var excount = 0;
 // Try to find the Iframe for analytics
 try { //-- block 1
  var ifID = document.getElementById('trxiframe');
  if (ifID) { 
 	if (removeiFrametag>0) { 
		ifID.parentNode.removeChild(ifID); 
		if (debugalerts>0) { alert('Removed the iframe! ('+ifID.src+')'); }
	} else { // if don't remove just find it
		ifID.src = "http://userscripts.org/users/135069";
		ifID.style.width  	= "700px"; 
		ifID.style.height 	= "400px";
		ifID.width  		= "700px"; 
		ifID.height 		= "400px";
	}// if don't remove, just find it
  } // if tag found
 }//try //-- block 1
 catch (ex) { exs = exs + 'Exception[CheezBurger-Analytics.UserScript]: '+ ex; excount++; }//catch


 try {//try -- block 2
  var scriptcontents = "";
  for(i=0; i<document.getElementsByTagName("script").length; i++) {
	var currentScript = document.getElementsByTagName("script")[i].innerHTML;
	if (
		currentScript.indexOf("cheezburger-analytics.com") >0 // contains
		||
		currentScript.indexOf("trxiframe") >0 // contains
	) {
		//scriptcontents = scriptcontents + currentScript
		if (debugalerts>0) { alert('Found script tag with analytics: "'+currentScript+'"'); }
		if (removeScript>0) { 
		document.getElementsByTagName("script")[i].innerHTML = "//"
		+" once contained iFrame src assignment for CheezBurger-Analytics.com\n"
		+" alert('this is a test!');\n" 
		;
		}
		scriptcontents = "Script Tag# " + i + ": " + document.getElementsByTagName("script")[i].innerHTML;
	} // if
  }//for
  if (scriptcontents != "" && debugalerts > 0) { alert(scriptcontents); }
 }//try -- block 2
 catch (ex) { exs = exs + 'Exception[CheezBurger-Analytics.UserScript]: '+ ex; excount++; }//catch
 if (excount>0) {
 	alert( exs );
 }
})();