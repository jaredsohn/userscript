// --------------------------------------------------------------------
// This is a Greasemonkey user script.  To install it, you need
// Greasemonkey 0.3 or later: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "Flickr SPi-V preview", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Flickr Emoticons
// @namespace     Dany Chasez
// @description   Insert cute emoticons to Flickr Comments. ^_^ 
// @include       http://*.flickr.com/*
// @include       http://flickr.com/*
// @include       http://www.flickr.com/*
// ==/UserScript==

m = document.getElementById("message");
if(m!==null){	
  	var newDiv = document.createElement("div");  
	var br = document.createElement("br");
	newDiv.setAttribute("style","width:500px;overflow:auto;padding-top:10px;");
	var t = document.createTextNode("Click on the smileys to insert. Insertion point is always at the endmost.");
	newDiv.appendChild(t);
	newDiv.appendChild(br);
	newDiv.appendChild(br);	
	newSmiley(0001,0050); //old smileys
	m.parentNode.insertBefore(newDiv,m);	
}

function newSmiley(x1,x2){
	var root = "http://i574.photobucket.com/albums/ss181/danychasez/flickremoticons/";	
	for(x=x1;x<=x2;x++){
		var s = document.createElement("img");
		srcGIF=root+x+".gif";
		s.setAttribute("src",srcGIF);							   
		js = 'mx=document.getElementById("message");'+
			 'mx.value += \'<img src="'+srcGIF+'"/> \'';	
		s.setAttribute("onclick",js);
		newDiv.appendChild(s);
	}
}