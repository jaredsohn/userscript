// ==UserScript==
// @name           Create New Bookmark Button!
// @namespace      delicious
// @author         Ian Chan
// @include        http://delicious.com/*
// @version        0.3
// ==/UserScript==

my_delicious = {
	// What I want the label to say
	title_txt : "+ Save New Bookmark", 
	
	// What is the style name of the button (from delicious)
	className : "btn btn-green-gray",
		
	// Where will the button take me
	action 	  : "/save",
	
	init : function () {
		// Grab the current add Button and clear it out
		var old = document.getElementById('actionSaveABookmark');
		var container = document.getElementById('actions-list');
		
		// Lets create a new Add button, and brand it!
		var div = document.createElement('div');
		var a 	= document.createElement('a');
		var span= document.createElement('span');
		
		// The containing button
		a.style.textDecoration = "none";
		a.style.display = "block";
		a.style.padding = "3px";
		a.style.paddingRight = "10px";
		a.style.paddingLeft = "6px";		
		a.href = my_delicious.action;
				
		// The label
		span.innerHTML = my_delicious.title_txt;
		
		// Stack it all together
		a.appendChild(span);		
		div.appendChild(a);
		
		// Lets make it look pretty
		div.className = my_delicious.className;
		div.style.marginLeft = "5px";
		div.style.marginRight = "10px";		
		div.style.marginTop = "5px";
		div.style.marginBottom = "8px";
		div.title = "Click to save a new bookmark";
		
		// Tada!
		container.replaceChild(div, old);
	},
}
my_delicious.init();