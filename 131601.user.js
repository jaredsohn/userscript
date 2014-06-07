// ==UserScript==
// @name           Bear411 Enhancements
// @description    Remove some of the needless limitations of the Bear411 site.
//                 enables pasting URLs into messages and allows right-clicks.
//                 Also highlights the viewable images with purple border,
//                 removes annoying "priority access" popups when clicking images,
//                 and unlocks the message history link.
// @match          *://www.bear411.com/*
// ==/UserScript==


// Determine which page this is
var pagename = document.location.pathname;
var page;
if(pagename.search(/profile/) >= 0) {
	page = "profile";
} else if(pagename.search(/getmessages/) >= 0) {
	page = "messenger";
}

// Allow right-click on all pages
document.body.oncontextmenu = "";
document.body.ondragstart = "";
document.oncontextmenu = "";
document.onmousedown = "";
document.onmouseup = "";


if(page == "profile") 
{
	var photosTable = document.getElementsByClassName("profile_photos_container")[0];
	var photoLinks = photosTable.getElementsByTagName("a");
	
	for(var i = 0; i < photoLinks.length; i++)
	{
		var image = photoLinks[i].getElementsByTagName("img")[0];
		// Remove class (shows the thumbs in their true aspect ratio)
		image.className = "";
		if(photoLinks[i].href.search(/javascript/) >= 0) {
			// This image is going to allow you to see the full-size
			// Give it a special border
			image.style.cssText = "border: 2px solid #A826D4";
		} else {
			// Its not going show full-size. Eliminate the annoying popup
			photoLinks[i].onclick = "";
			photoLinks[i].onmouseover= "";
		}
	}
} 
else if(page == "messenger")
{
	// Allow pasting in message box
	document.getElementById("message").onkeyup = "";
	document.getElementById("message").onblur = "";

	// Get username of the recepient
	var nickDiv = document.getElementsByClassName("msgheader_nick")[0];
	var username = nickDiv.childNodes[1].innerText;
	username = username.trim();
	username = username.toLowerCase();

	// Get all the font tags
	var fontItems = document.getElementsByTagName("font");
	var links;
	for(i = 0; i < fontItems.length; i++)
	{
		if(fontItems[i].innerText.substr(0, 7) == "MESSAGE") {
			links = fontItems[i].getElementsByTagName("a");
		}
	}

	if( username.length > 0 && links.length > 0 )
	{
		// Search for "MSG History" link, and replace it with the actual message history link
		for(i = 0; i < links.length; i++) {
			if(links[i].innerHTML.toLowerCase() == "msg history")
			{
				links[i].target = "_blank";
				links[i].onclick = "";
				links[i].href = "http://www.bear411.com/messenger/getmessages.php?action=hist&to=" + username;
			}
		}
	}
}
