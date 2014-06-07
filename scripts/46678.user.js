// ==UserScript==
// @name         Dropdown List Expander
// @namespace    http://www.samliew.com
// @description  Dropdown List Expander script by samliew
// Documentation 
// Last updated: 14 Apr 2009
// 
// What this script does:
//    Expands all select fields (dropdown lists) on mouseover, so you have one less click to make.
// 
// @include    *
// ==/UserScript==

// Start
try{

// Useful functions
body= document.getElementsByTagName("body")[0];
head= document.getElementsByTagName("head")[0];
function documentSrcReplace(find, replace){
	var re= new RegExp(find, "gi");
	body.innerHTML= (body.innerHTML).replace(re, replace);
}

// Add function to page
e= document.createElement('script');
e.type= "text/javascript";
var temp= "function ts(s,m){if(!s.options){return;}if(m){s.size=s.options.length;}else{s.size='';}}";
e.innerHTML= temp;
head.appendChild(e);

// Apply actions to select fields
documentSrcReplace("<select ", "<select onmouseover='ts(this,true)' onmouseout='ts(this,false)' ");

// End
}catch(e){}
