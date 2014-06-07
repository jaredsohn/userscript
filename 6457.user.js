// ==UserScript==
// @name           Microsiervos Hace uno dos tres años fuera ...
// @namespace      
// @description    Script para que no se vean los post de microsiervos tipo "En Microsiervos, hace un año, dos, tres..." desde Google Reader
// @include        http://www.google.com/reader/view*
// @author 				 Limon18 (limon18@gmail.com)
// ==/UserScript==

var MICROSIERVOS_123_TEXT = "En Microsiervos, hace un";

function quita123()
{
	var allTags, aTag;
	allTags = document.getElementsByTagName('h2');
	
	for (var i = 0; i < allTags.length; i++) {
	    aTag = allTags[i];
	    
	    if (aTag.className == "entry-title") 
			{
				if (aTag.firstChild && aTag.firstChild.tagName == "A") // Expanded View
				{
					aLink = aTag.firstChild;
					if (aLink.firstChild && aLink.firstChild.tagName == "SPAN" && aLink.firstChild.innerHTML.indexOf(MICROSIERVOS_123_TEXT)!=-1)
					{
						aTag.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.removeChild(aTag.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode);
					}
				}
				else if (aTag.innerHTML.indexOf(MICROSIERVOS_123_TEXT)!=-1) // List View
				{
					aTag.parentNode.parentNode.parentNode.parentNode.parentNode.removeChild(aTag.parentNode.parentNode.parentNode.parentNode);
				}
			}
	}
}

setInterval(quita123,3000);

