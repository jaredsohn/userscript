// ==UserScript==
// @name           Various Artists Helper :: Number of Tracks
// @namespace      idkwhattoputhere
// @include        http*://*what.cd/torrents.php*
// ==/UserScript==

// Various Artist Helper :: Number of Tracks
// By: Rain724 @ What.CD
// Description: Generates mutiple "Add Artist" boxes at once so
//              you do not need to click the [+] every time.
// Instructions: 1. Type in the number of tracks/artists in the
//                  "# of tracks" input box
//               2. Press the "Add Boxes" link to the right of the box.
//               3. Watch as the correct number of boxes you asked for
//				  gerentrate before your very eyes.
// Version: 1.0.1

var addField	= document.getElementsByClassName("sidebar")[0]
										.getElementsByClassName("box_addartists")[0]
										.getElementsByTagName("div")[1]; // Find correct div for placement

var hform = document.createElement("form");   // Create form
hform.method = "post";
hform.name = "nform";
var hbox  = document.createElement("input");  // Create textbox
hbox.type = "text";
hbox.name = "hbox";
hbox.value = "# of tracks";
hbox.addEventListener('click', hclear, false);
var hbutton = document.createElement("a");
hbutton.innerHTML = "&nbsp\;&nbsp\;Add Boxes";
hbutton.addEventListener('click', hrun, false);
hbutton.style.cursor = "pointer";
hform.appendChild(hbox);
hform.appendChild(hbutton);
addField.appendChild(hform);

function hrun() {
	var numValue	=           document.getElementsByClassName("sidebar")[0]
										.getElementsByClassName("box_addartists")[0]
										.getElementsByTagName("div")[1]
										.getElementsByTagName("form")[1]
										.getElementsByTagName("input")[0].value;
	var i;
	for (i=2;i<=numValue;i++)
		{
			unsafeWindow.AddArtistField();
		}
}

function hclear() {
	document.getElementsByClassName("sidebar")[0]
										.getElementsByClassName("box_addartists")[0]
										.getElementsByTagName("div")[1]
										.getElementsByTagName("form")[1]
										.getElementsByTagName("input")[0].value = "";
}