// ==UserScript==
// @name          Google Reader Bottom Link
// @description	  Adds a link to the original page in all items in Google Reader at the end of the items
// @namespace      http://jordi.degroof.googlepages.com/
// @include       http://www.google.tld/reader/*
// @include       https://www.google.tld/reader/*
// @include       http://www.google.com/reader/*
// @include       https://www.google.com/reader/*
// ==/UserScript==

var imgExternal= "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAMAAAC67D+PAAAAFVBMVEVmmcwzmcyZzP8AZswAZv////////9E6giVAAAAB3RSTlP///////8AGksDRgAAADhJREFUGFcly0ESAEAEA0Ei6/9P3sEcVB8kmrwFyni0bOeyyDpy9JTLEaOhQq7Ongf5FeMhHS/4AVnsAZubxDVmAAAAAElFTkSuQmCC";

var entries=document.getElementById("chrome");
if(entries)
	entries.addEventListener('DOMNodeInserted', function(event){nodeInserted(event);},true);
	
function nodeInserted(event){	
	if (event.target.tagName=="DIV"){
			if (event.target.className === "entry-actions"){
				// List mode
				var linkbar= event.target;
				var parent= event.target.parentNode;
			} else if (event.target.firstChild.className ==="card card-common"
			    ||  event.target.firstChild.className === "ccard-container card-common"){ 
				// Expanded mode
				var linkbar= event.target.getElementsByClassName("entry-actions")[0];
				var parent= event.target;
			} else
				return;

			var link = parent.getElementsByClassName("entry-title-link")[0].getAttribute('href');
			var site = parent.getElementsByClassName("entry-source-title-parent")[0].getElementsByTagName("A")[0].firstChild.nodeValue;
			var title = parent.getElementsByClassName("entry-title-link")[0].firstChild.nodeValue;
			
			var span = document.createElement("span");
			span.className = "original-article link";
			var a_link = document.createElement("a");
			a_link.href = link;
			a_link.title = site + ": " + title;
			a_link.setAttribute('style','text-decoration:none;padding-right:10px;margin-right:10px; background: url(' + imgExternal +') center right no-repeat;');
			a_link.appendChild(document.createTextNode("Original Article"));
			span.appendChild(a_link);
			linkbar.appendChild(span);
	}
}
