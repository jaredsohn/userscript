// ==UserScript==
// @name           Unembed PDFs
// @namespace      
// @description    changes embedded PDFs to links to PDF
// @include        http://saybrook.embanet.com/*
// ==/UserScript==

// based off of 
// Citibank Unembed Statements
// by Alexander Zangerl
// http://userscripts.org/scripts/review/8221
// Released under the GPL Version 1, http://www.gnu.org/copyleft/gpl.html

// What does this thing do? 
// It changes the embedded-only PDF display of documents
// to downloadable PDFs.
//
// the embedded-to-link stuff
var embedded = document.getElementsByTagName('embed');
if (embedded) 
{
	for (var i=0; i<embedded.length; i++) 
	{
	   var obj=embedded[i];
	   var src=obj.getAttribute('src');

	   var newlink=document.createElement('a');
	   newlink.href=src;
	   newlink.innerHTML="Download PDF";
	   
	   
	   obj.parentNode.insertBefore(newlink,obj);
	   obj.parentNode.removeChild(obj);
	}
}

var embeddedobject = document.getElementsByTagName('object');
if (embeddedobject) 
{
	for (var i=0; i<embeddedobject.length; i++) 
	{
	   var obj=embeddedobject[i];
	   var src=obj.getAttribute('data');

	   var newlink=document.createElement('a');
	   newlink.href=src;
	   newlink.innerHTML="Download PDF";
	   
	   
	   obj.parentNode.insertBefore(newlink,obj);
	   obj.parentNode.removeChild(obj);
	}
}