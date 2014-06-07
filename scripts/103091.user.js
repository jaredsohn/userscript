// ==UserScript==
// @name           downloads
// @namespace      downloads
// @description    Create download links for ftvstream videos
// @include        http://ftvstream.com/*
// @include 	   http://www.ftvstream.com/*
// ==/UserScript==

//Author jamdown

//Get Content of body tag
var div = document.getElementsByTagName("body")[0];

	//Get all table elements
	var table = div.getElementsByTagName("table");
	//Loop through all tables on the page
	for (var c=0; c < table.length; c++)
	{
		//Check if tables class is thumb as these ones hold the images we want links to
		if (table[c].className == "thumb") {
			var thisImg = table[c].getElementsByTagName("img")[0];
			
			//Get the link we are after
			var thisimgSrc = thisImg.getAttribute("src");
			
			//Create a new row in this table for our download link
			var tr = document.createElement("TR")
			var td = document.createElement("TD")
			
			//Create new link object
			var link = document.createElement("a");
			var linkText = document.createTextNode("Download");
			
			//Create and set our new download link
			link.setAttribute("href", "http://media.ftvstream.com/videos/"+thisimgSrc.substring(34,thisimgSrc.lastIndexOf('/'))+".mp4");
			link.setAttribute("class", "style2");
			
			//Append all to page
			link.appendChild(linkText);
			td.appendChild(link)
			tr.appendChild(td);
			table[c].appendChild(tr);
		}
	}