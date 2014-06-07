/*	

	GDocsPDFViewSecure, a GreaseMonkey Script - version 0.1
	Copyleft 2009 Houdoken

	This software is licensed under the GPL license 
	http://www.gnu.org/copyleft/gpl.html
	
	Based on Secure Wiki script by Banzoo

*/

// ==UserScript==
// @name          GDocs PDF-View Secure
// @namespace     gDocsPDFViewSecure
// @description	  Forces Google Docs Download link, Print link & PDF-viewer iframe to use https
// @include       http://docs.google.com/fileview*
// @include       https://docs.google.com/fileview*

// ==/UserScript==

//Secure a given link
function fixlink(link){
	var original = ''; 
	original = original + link;
	original = original.replace(/^http\:\/\/(.+)/, "$1");
	var newurl='https://' + original;
	return newurl;
}

//Check whether a given link need to be fixed or not
function needtofix(link){
	var linkslash = link.split('/');
	
	if (linkslash[0]=='http:')
		return true;
	return false;
}

if (needtofix(location.href))
	location.replace( fixlink(location.href) );

var gviewEl;
var printEl;
var downloadEl;

gviewEl = document.getElementById('gview');
printEl = document.getElementById('document-link-print');
downloadEl = document.getElementById('document-link-download');

if (needtofix(gviewEl.src))
	gviewEl.src = fixlink(gviewEl.src);
if (needtofix(printEl.href))
	printEl.href = fixlink(printEl.href);
if (needtofix(downloadEl.href))
	downloadEl.href = fixlink(downloadEl.href);


