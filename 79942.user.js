// ==UserScript==
// @name           Flickr Upload Insert View on Black
// @namespace      badmonkeh.com
// @description    Inserts a 'View on Black' link into your photos descriptions after you upload them
// @include        http://www.flickr.com/photos/upload/edit/*
// @author         Christian Froehlich
// ==/UserScript==
query = window.location.search.substring(1);
idStr = query.split("=")[1];
ids = idStr.split(",");
for (i = 0; i < ids.length; i++) {
	descArea = document.getElementById("description_" + ids[i]);
	if (descArea != null) {
		link = "please <a href=\"http://bighugelabs.com/flickr/onblack.php?id=";
		link += ids[i] + "&bg=white&size=large\">view on white</a> ";						
		link += "(<a href=\"http://userscripts.org/scripts/show/71216\">!</a>)";
		descArea.innerHTML += "\n\n\n\n" + link;	
	}	
}
