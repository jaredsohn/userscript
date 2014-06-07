// ==UserScript==

// @name           Put Alt Text in Title

// @namespace      http://www.gshi.org

// @description    Removes Alt-text descriptions from unloaded images, and adds them to the 'title' hover text. Won't mess up Alt-text displaying addons.

// @include        *

// ==/UserScript==

// Hack of "resize_inline_images" from http://prdesignz.com

// If you feel the need to steal some relatively stolen work, go for it.

// Edit:
// Alts can be null, empty strings, or what the script sets them to for not existing.

var state, newtitle; //, oldalt, oldtitle;
state = 1; // do not change this. State won't be adjusted correctly.

function altTextToTitle()
{
	var getImages;
	getImages = document.evaluate("//img", document, null, 6, null);
	for(i=0; i < getImages.snapshotLength; i++)
	{
		gI = getImages.snapshotItem(i);
		if((gI.getAttribute('alt') != null) && (gI.getAttribute('alt') != '') && (gI.getAttribute('alt') != '  '))
		{
			
			newtitle = gI.getAttribute('alt');

			if ((gI.getAttribute('title') != null) && (gI.getAttribute('alt') != gI.getAttribute('title'))) {
			newtitle = gI.getAttribute('title') + "\nALT:" + newtitle;
			}			

			gI.setAttribute('title',newtitle);
			gI.setAttribute('alt','  ');
		}
	}
}
window.addEventListener("load",altTextToTitle,false); 