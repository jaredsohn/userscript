// Ravelry Remove Ignored Threads
// version 0.4
// 2009-01-24
// Copyright (c) 2009, Tibbi Scott
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// ----------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "Ravelry Remove Ignored Threads", and click Uninstall.
//
// ----------------------------------------------------------------------
//
// Removes Ignored Threads when browsing "Any" threads
//
// (version 2 will have a call to append next page to the current page)
//
// ----------------------------------------------------------------------
//
// ==UserScript==
// @name           Ravelry remove ignored threads
// @namespace      http://userscripts.org
// @description    Remove ignored thread when browsing "Any" threads
// @include        http://www.ravelry.com/discuss/browse
// @include        http://www.ravelry.com/discuss/browse?*&status=any*
// @include        http://www.ravelry.com/discuss/browse?*&status=unread*
// ==/UserScript==
//
// ----------------------------------------------------------------------
//
// find proper tds, blank them out
//
// ----------------------------------------------------------------------

/*
	Developed by Robert Nyman, http://www.robertnyman.com
	Code/licensing: http://code.google.com/p/getelementsbyclassname/
*/
var getElementsByClassName = function (className, tag, elm){
	if (document.getElementsByClassName) {
	getElementsByClassName = function (className, tag, elm) {
		elm = elm || document;
		var elements = elm.getElementsByClassName(className),
		nodeName = (tag)? new RegExp("\\b" + tag + "\\b", "i") : null,
		returnElements = [],
		current;
		for(var i=0, il=elements.length; i<il; i+=1){
		current = elements[i];
		if(!nodeName || nodeName.test(current.nodeName)) {
			returnElements.push(current);
		}
		}
		return returnElements;
	};
	}
	else if (document.evaluate) {
	getElementsByClassName = function (className, tag, elm) {
		tag = tag || "*";
		elm = elm || document;
		var classes = className.split(" "),
		classesToCheck = "",
		xhtmlNamespace = "http://www.w3.org/1999/xhtml",
		namespaceResolver = (document.documentElement.namespaceURI === xhtmlNamespace)? xhtmlNamespace : null,
		returnElements = [],
		elements,
		node;
		for(var j=0, jl=classes.length; j<jl; j+=1){
		classesToCheck += "[contains(concat(' ', @class, ' '), ' " + classes[j] + " ')]";
		}
		try	{
		elements = document.evaluate(".//" + tag + classesToCheck, elm, namespaceResolver, 0, null);
		}
		catch (e) {
		elements = document.evaluate(".//" + tag + classesToCheck, elm, null, 0, null);
		}
		while ((node = elements.iterateNext())) {
		returnElements.push(node);
		}
		return returnElements;
	};
	}
	else {
	getElementsByClassName = function (className, tag, elm) {
		tag = tag || "*";
		elm = elm || document;
		var classes = className.split(" "),
		classesToCheck = [],
		elements = (tag === "*" && elm.all)? elm.all : elm.getElementsByTagName(tag),
		current,
		returnElements = [],
		match;
		for(var k=0, kl=classes.length; k<kl; k+=1){
		classesToCheck.push(new RegExp("(^|\\s)" + classes[k] + "(\\s|$)"));
		}
		for(var l=0, ll=elements.length; l<ll; l+=1){
		current = elements[l];
		match = false;
		for(var m=0, ml=classesToCheck.length; m<ml; m+=1){
			match = classesToCheck[m].test(current.className);
			if (!match) {
			break;
			}
		}
		if (match) {
			returnElements.push(current);
		}
		}
		return returnElements;
	};
	}
	return getElementsByClassName(className, tag, elm);
};


// start of remove ignored threads function

function blankOutIgnoredThreads() {

	// find the last ignored td
	var allClickableTds = getElementsByClassName("clickable"), i = allClickableTds.length, tdRemovedThread = " ", i = --i;

	//var k = 6;
	var j, h;
	jl=allClickableTds.length
	for(j=1; j<jl; j+=1){
		//alert (allClickableTds[j].innerHTML);
		thisTd = allClickableTds[j].getElementsByTagName('img')[0];
		if (thisTd && thisTd.title == "Ignoring this thread") { 
			// test alert
			// alert("Remove: " + thisTd.title);
			allClickableTds[j].innerHTML = ""; 
		}
	}
}


blankOutIgnoredThreads();

