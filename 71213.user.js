// ==UserScript==
// @name           Flickr Insert 'View on Fluidr' on Upload
// @namespace      badmonkeh.com
// @description    Inserts a 'View in Fluidr' link into your photos descriptions after you upload them (on the upload page)
// @include        http://www.flickr.com/photos/upload/edit/*
// @author         Christian Froehlich
// ==/UserScript==

plink = document.getElementById("personmenu_your_photos_link");
userName = plink.href.split('/')[4];

query = window.location.search.substring(1);
idStr = query.split("=")[1];
ids = idStr.split(",");
for (i = 0; i < ids.length; i++) {
	descArea = document.getElementById("description_" + ids[i]);
	if (descArea != null) {
		link = "Best <a href=\"http://www.fluidr.com/photos/";
		link += userName + "/" + ids[i] + "\">Viewed on Fluidr</a> ";	
		link += "(<a href=\"http://userscripts.org/scripts/show/71213\">?</a>)";
		descArea.innerHTML += "\n\n\n\n" + link;	
	}	
}