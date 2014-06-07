// This script will  create a link at the bottom of abstract pages where the PMID is located that functions the same as the yellow 'find it' button
//-------------------------------------------------------------------------------------
// Ferris State University PubMed Button
// version 2.0
// 2009-10-10
// --------------------------------------------------------------------------------------------
//
// This is a Greasemonkey user script.  To install it, you need
// Greasemonkey 0.5.3 or later: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "Ferris State University PubMed Button", and click Uninstall.
//
// --------------------------------------------------------------------

// ==UserScript==
// @name          Ferris State University PubMed Button
// @namespace     www.google.com
// @description   Replaces the yellow 'find it' button.
// @include       http://www.ncbi.nlm.nih.gov/*
// @include       http://preview.ncbi.nlm.nih.gov/*
// ==/UserScript==

//Create an array 
var allPageTags = new Array(); 

function getElementByClass(theClass) {
//Populate the array with all the page tags
var allPageTags=document.getElementsByTagName("*");
//Cycle through the tags using a for loop
for (i=0; i<allPageTags.length; i++) {
//Pick out the tags with our class name
if (allPageTags[i].className==theClass) {
//Manipulate this in whatever way you want
//allPageTags[i].innerHTML='wakka wakka'
//return allPageTags[i].innerHTML;
return allPageTags[i];
}
}
} 

var txt=getElementByClass("pmid").innerHTML;
var txtlist = txt.split(" ");
var UID=txtlist[1]
var oldstuff=getElementByClass("pmid").innerHTML
var newstuff="<a href=http://0-www.ncbi.nlm.nih.gov.libcat.ferris.edu/entrez/utils/fref.fcgi?PrId=mifsulib&itool=AbstractPlus-otool&uid="+UID+"&nlmid=0414762&db=pubmed&url=http://0-161.57.201.8.libcat.ferris.edu/sfx_local?sid=Entrez:PubMed&id=pmid:"+UID+">"+oldstuff+"</a>"

getElementByClass('pmid').innerHTML=newstuff
