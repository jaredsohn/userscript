// ==UserScript==
// @name           autoOpenSpoilers
// @namespace      b0tting
// @include        http://forum.rpg.net/showthread.php?*
// ==/UserScript==

// For the sake of sanity, I assume that the word "image" is hidden in the title, so that this 
// script will not trigger on pages such as the video games forum 
if(document.title.toLowerCase().indexOf("image") > -1) {
	// Let's scroll through all of the BUTTONs on this page and see if there's a spoiler one
	allButtons = document.getElementsByTagName("input");
	for(i = 0; i < allButtons.length; i++) {
		if(allButtons[i].type == "button") {
			if(allButtons[i].value == "Show") {
				// Now let's not click when it's a quoted post with pics, because those
				// should burn in the hell they crawled out of and take their creator with them. 
				// I could be a couple of quotes down, but I can recognize the top post because it has an ID field.
				// If I end up there I know I'm done. 
				myParent = allButtons[i].parentNode;
				notAQuote = true;
				while(myParent.id.indexOf("post_message_") == -1 && notAQuote) {
					notAQuote = (myParent.innerHTML.indexOf("Originally Posted by") == -1);
					myParent = myParent.parentNode;
				}
				
				if(notAQuote) {
					allButtons[i].click();
				}
			}
		}
	}
}