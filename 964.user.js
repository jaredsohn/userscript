// ==UserScript==
// @name          Flickr SendTo via Radio
// @namespace     http://www.j-san.net/code/greasemonkey
// @description	Replaces the SendTo drop down select box with a list of radio buttons.
// @include       http://www.flickr.com/photo_sendto_group.gne*
// @include       http://www.flickr.com/photo_sendto_set.gne*
// @include       http://flickr.com/photo_sendto_group.gne*
// @include       http://flickr.com/photo_sendto_set.gne*
// ==/UserScript==

/* Version 0.1.1 */
/* On each of your flickr photo pages you're given the option to send the pic
 * to a group, or to a set. But the list of groups/sets is a drop down box. When 
 * you start to have a lot of groups or sets the drop down box becomes a pain 
 * to navigate. And you can't search it. I find a list of radio buttons much easier.
 */

(function() 
{
	var radiobits = document.createElement("div");
	var rbit;
	
	var selectbits = document.getElementsByName('set');
	var pagetype = 'set';
	if(selectbits.length <= 0) {
		selectbits = document.getElementsByName('group');
		pagetype = 'group';
	}
	selectbits = selectbits[0];
	var numbits = selectbits.childNodes.length;
	
	for(var i = 1; i < numbits; i++) {  //start at 1 to skip the "Select" option
	   rbit = document.createElement("input");
		rbit.setAttribute("name", pagetype);
		rbit.setAttribute("value", selectbits[i].attributes[0].nodeValue);
		rbit.setAttribute("type", "radio");
		radiobits.appendChild(rbit);
		radiobits.appendChild(document.createTextNode(selectbits[i].text));
		radiobits.appendChild(document.createElement("br"));
		
	}
	
	selectbits.parentNode.replaceChild(radiobits, selectbits);
})();



