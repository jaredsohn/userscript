// ==UserScript==
// @author         HAHAHAHA	    
// @name           LAZYMAN++
// @include        http://www.crossfire.nu/?x=message&mode=item&id=*
// @description    TAKES YOU TO YOUR REPLY WITHOUT HAVING TO CLICK "HERE"
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
