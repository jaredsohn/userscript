// ==UserScript==
// @name           Crossfire goto message
// @namespace      crossfire.nu
// @author         LAZYMAN++
// @include        http://www.crossfire.nu/?x=message&mode=item&id=*
// @description    Takes you to your reply without having to click "here"
// ==/UserScript==

divs = document.getElementsByTagName("div");
for (i = 0; i < divs.length; i++) {
	if (divs[i].className == "constrainImages") { 
		constrainImages = divs[i]; 
		break;
		}
	}

urli = constrainImages.childNodes[7].href;
window.location = urli;