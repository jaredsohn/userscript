// ==UserScript==
// @name          Add Google Voice to the Google Menu Bar
// @namespace     http://knwd.us
// @version       0.03a
// @description   Adds a link to Google Voice in the Google menu bar
// @include       *
// ==/UserScript==

function addVoice()
{
	if(document.getElementById("gbz"))
	{
		// Create the LI that will contain the link to Google Voice, then fill it with HTML to match the style of the other links
		listItem = document.createElement("li");
		listItem.setAttribute("class", "gbt");
		listItem.innerHTML = '<a target="_blank" class="gbzt" href="https://www.google.com/voice/b/0"><span class="gbtb2"></span><span class="gbts">Voice</span></a>';

		// Get the OL containing the links to various Google Services
		menuOpt = document.getElementById("gbz").getElementsByTagName("ol")[0];
		// Get the OL containing the links in the "more" dropdown
		subMenuOpt = document.getElementById("gbd").getElementsByTagName("ol")[0];
		// Calculate the nth position that will put the Voice link to the right of the "more" link
		// (numMenuItems includes all of the submenu items, so we have to remove those from the count
		// to get an accurate position)
		var numMenuItems = menuOpt.getElementsByTagName("li").length;
		var numSubMenuItems = subMenuOpt.getElementsByTagName("li").length;
		var position = (numMenuItems-numSubMenuItems-1);
		// Insert a link to Google Voice just before the "more" link
		menuOpt.insertBefore(listItem, menuOpt.getElementsByTagName("li")[position]);
	}
}

setTimeout(addVoice, 2500);