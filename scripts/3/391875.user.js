// ==UserScript==
// @name          UHC Comment Hider
// @description   Show/hide button for those pesky UHC comments (hidden by default)
// @author        notanimposter
// @include       *.youtube.com/*
// @version       1.0
// ==/UserScript==
//This work is licensed under the
//Creative Commons Attribution-NonCommercial-ShareAlike 3.0
//United States License. To view a copy of this license,
//visit http://creativecommons.org/licenses/by-nc-sa/3.0/us/
//or send a letter to Creative Commons, 444 Castro Street,
//Suite 900, Mountain View, California, 94041, USA.
function hider_main () {
	var title = document.getElementById("eow-title").innerHTML.toLowerCase();
	if (~title.indexOf("uhc") || ~title.indexOf("ultra hardcore") || ~title.indexOf("ultra hard core") || ~title.indexOf("ultrahardcore")) {
		var pants = document.getElementById("watch-discussion");
		pants.style.display = "none";
		var button = document.createElement("button");
		button.setAttribute("type", "button");
		button.setAttribute("style", "align-items: flex-start !important; text-align: center !important; cursor: default !important; color: buttontext !important; padding: 2px 6px 3px !important; border: 2px outset buttonface !important; border-image-source: initial !important; border-image-slice: initial !important; border-image-width: initial !important; border-image-outset: initial !important; border-image-repeat: initial !important; background-color: buttonface !important; box-sizing: border-box !important;");
		button.onclick = function () {
			var comments = document.getElementById("watch-discussion");
			if (comments.style.display === "none") comments.style.display = "block";
			else comments.style.display = "none";
		};
		button.innerHTML = "Toggle spoilers";
		pants.parentNode.insertBefore(button, pants);
	}
}
hider_main();