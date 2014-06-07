// ==UserScript==
// @name           Castle Age Siege Remover
// @namespace      casr
// @description    Remove the &action=doObjective in CA links on forums and Facebook
// @require        http://jqueryjs.googlecode.com/files/jquery-1.3.2.min.js
// @include        http://174.37.115.166/*
// @include        http://www.facebook.com/*
// ==/UserScript==
$(function() {
	//Create an object of all links
	var links = $('a');
	//Parse each item in links object
	for (var a in links){
	//This will allow the for iteration to give the actual link objects that are
	//referred to with numeric indexes and not objects that jQuery appends
	//Object 'a' should be a number
		if(a == parseInt(a)){
			//Variable b is now the object that is links[a];
			var b = links[a];
			//Variable c is now variable b cast to jQuery so I can use built in jQuery functions
			var c = $(b);
			//Variable temp now contains the href of that link
			var temp = c.attr('href');
			//This should filter out any anchors in the page or any links without an href
			if(temp != undefined){
				//The correct scenario here is to use regex but I didn't have the patience
				//or time to do so, so I didn't plus I knew my links didn't apply to these caveats
					c.attr('href',temp.replace('&action=doObjective',''));
			}
		}
	}
});