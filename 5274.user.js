// ==UserScript==
// @name            MUA At work
// @description     Changes makeupalley.com icon & title to be discreet at work
// @include         http://www.makeupalley.com/*
// ==/UserScript==



//-- title stuff - only change title if suspicious

var mainstring = document.title; 

if(mainstring.indexOf("MUA") != -1 || mainstring.indexOf("MakeupAlley") != -1 )
{
mainstring = "MSNBC News Discussion";
}


document.title = mainstring;

//-- favicon stuff

 
// Creates an html element 
	var link = document.createElement('link');
	
// Sets attributes of element
	link.setAttribute('rel', 'shortcut icon');
	link.setAttribute('href', '');


// Sets dimensions of icon. 16px x 16px is the standard size
	link.setAttribute('height', '16px');
	link.setAttribute('width', '16px');

// Retrieves the <head> tag
	var head = document.getElementsByTagName('head')[0];

// Appends the html from the link variable into the head  
	head.appendChild(link);
