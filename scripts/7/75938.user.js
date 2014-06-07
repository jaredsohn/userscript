/// ==UserScript==
// @name           Projector Search Mucker
// @namespace       http://www.google.com/
// @description    Replaces search result
// ==/UserScript==
(function()
{	
	
	//Now change these variables to say and point to where you want them.
	var searchUrl = "http://www.dellcorporate.com/k193023";
	var searchTitle = "How do I <strong>output video</strong> from my Dell Netbook to my HDTV?";
	var searchDescription =  "Detailed instructions on connecting your netbook to an HDTV.";
	
	var allLIs=document.getElementsByTagName("li");
	
	//Loop through all tags using a for loop
	for (i=0; i<allLIs.length; i++) {
		var liTag = allLIs[i];
		//Get all tags with the specified class name.
		if (liTag.className=="g w0") {
			var h3Tag = liTag.childNodes[0];
			var aTag = h3Tag.childNodes[0];
			
			aTag.innerHTML = searchTitle;
			
			aTag.href = searchUrl;
			
			var descriptionDiv = liTag.childNodes[2];
			descriptionDiv.innerHTML = searchDescription;
			descriptionDiv.innerHTML += "<strong>&nbsp;...</strong>";
			
			descriptionDiv.innerHTML += "<br/><cite>"+searchUrl+"</cite>";
			
			break;
		}
	}
}
)();