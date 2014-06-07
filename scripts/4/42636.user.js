// -----------------------------------------------------------------
// 
// This is a Greasemonkey user script.
// 
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
// 
// To uninstall, go to Tools/Manage User Scripts,
// select the script, and click Uninstall.
// 
// --------------------------------------------------------------------
// 
// ==UserScript==
// @name          Google Maps Print Preview Fixer
// @namespace     http://maps.google.com
// @description   Google Maps Print Preview Fixer script by samliew
// Last updated:  18 Feb 2009
// 
// What this script does:
// - (under testing)
// 
// @include       http://maps.google.com/maps?f=d*
// @exclude       http://maps.google.com/
// 
// ==/UserScript==


// Useful functions
function getElementsByClassName(className, tag, elm){
	var testClass = new RegExp("(^|\\s)" + className + "(\\s|$)");
	var tag = tag || "*";
	var elm = elm || document;
	var elements = (tag == "*" && elm.all)? elm.all : elm.getElementsByTagName(tag);
	var returnElements = [];
	var current;
	var length = elements.length;
	for(var i=0; i<length; i++){
		current = elements[i];
		if(testClass.test(current.className)){
			returnElements.push(current);
		}}
	return returnElements;
}
function $() {
	var elements = new Array();
	for (var i = 0; i < arguments.length; i++) {
		var element = arguments[i];
		if (typeof element == 'string')
			element = document.getElementById(element);
		if (arguments.length == 1)
			return element;
		elements.push(element);
	}
	return elements;
}


// IDs of elements to be removed
var ids = new Array("pnc","header");

// Classes of elements to be removed
var cls = new Array("phl","phn","legal","pl_ctls");


// Remove elements by ID
for(i=0;i<ids.length;i++){ try{
   var e=document.getElementById(ids[i]);
   e.parentNode.removeChild(e);
}catch(e){}}


// Remove elements by classname
for(i=0;i<cls.length;i++){ try{
   var e=document.getElementsByClassName(cls[i]);
   for(j=e.length;j>=0;j--){ try{
      e[j].parentNode.removeChild(e[j]);
   }catch(e){}}
}catch(e){}}


// Removes GoogleMaps logo
e=document.getElementsByTagName('img')[0];
e.parentNode.removeChild(e);


// Remove loading notice
e=document.getElementById('loadmessagehtml');
e.parentNode.removeChild(e);


/*
// Increase width of data table (doesn't work)
var e=document.getElementById("header_start");
e.width="500px";
e.style.width="500px";
var e=document.getElementById("header_duration");
e.width="500px";
e.style.width="500px";
var e=document.getElementsByClassName("phh")[0];
e.style.width="100%";
var e=document.getElementsByClassName("printsummary")[0];
e.width="100%";
e.style.width="100%";
*/

// Remove more whitespace
var e=document.getElementById("ph").childNodes[0].childNodes[0].childNodes[1];
e.parentNode.removeChild(e);


// End