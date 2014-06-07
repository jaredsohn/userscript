// Copyright 2005, Tyler Karaszewski. You are free to use, modify, redistribute,
// etc. this script, as long as you leave this copyright notice in the header.

// Version 0.1.1 2005-03-26

// ==UserScript==
// @name          Google about.com remover
// @namespace     http://tylerkaraszewski.com/gmscripts/googleabout
// @description	  Removes results for any page at "about.com" from google results.
// @include       http://www.google.com/search*
// ==/UserScript==


removeAbout();
removeAboutP();
removeLinks();

function removeAbout(){
	var doc = document.evaluate("//table", document, null, XPathResult.ANY_TYPE,null);
	var table;
	while(table = doc.iterateNext()){
		if(checkNode(table)){
			table.parentNode.removeChild(table);
			doc = document.evaluate("//table", document, null, XPathResult.ANY_TYPE,null);
			continue;
		}
	}
}

function removeAboutP(){
	var doc = document.evaluate("//p", document, null, XPathResult.ANY_TYPE,null);
	var table;
	while(table = doc.iterateNext()){
		if(checkNode(table)){
			table.parentNode.removeChild(table);
			doc = document.evaluate("//p", document, null, XPathResult.ANY_TYPE,null);
			continue;
		}
	}
}

function removeLinks(){
	var doc = document.evaluate("//a", document, null, XPathResult.ANY_TYPE,null);
	while(a = doc.iterateNext()){
		var val = a.attributes.getNamedItem("href").nodeValue;
		if(val.match("about.com")){
			a.parentNode.removeChild(a);
			doc = document.evaluate("//a", document, null, XPathResult.ANY_TYPE,null);
		}
	}
}

function checkNode(node){
	var children = node.childNodes;
	if(children.length == 0){
		if(node.nodeValue != null && node.nodeValue.match("about.com")){
			return true;
		}
	}
	else{
		for(var ii = 0; ii < children.length; ii++){
			if(checkNode(children[ii])){
				return true;	
			}
		}	
	}
	return false;
}
