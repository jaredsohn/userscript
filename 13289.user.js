// ==UserScript==
// @name           GMailGadgetRemoveNewMessage
// @namespace      at.rohan
// @description    GMail Gadget remove New Message
// @include        http://www.google.at/ig?hl=de
// ==/UserScript==
function RemoveNewMessageLink()
{
	var e=document.getElementsByTagName('a');			// there is no direct way
	for(i = 0; i < e.length; i++)						// to find the link
		if(e[i].href.indexOf('mail.google.com') != -1)	// so search all gmail links
			if(e[i].href.indexOf('view=comp') != -1)	// that having the new param
				e[i].style['display']='none';			// and hide it
}
for(var i = 1; i <= 3; i++)
	window.setTimeout(RemoveNewMessageLink, 3000*i);	// google gadget is loaded delayed




