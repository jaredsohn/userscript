// ==UserScript==
// @name           Tvguide.co.uk Ratorr
// @namespace      http://userscripts.org/users/lorriman
// @description    makes ratings visible without need to hover mouse
// @include        http://www.tvguide.co.uk*
// @version .2
// ==/UserScript==

function injectText(link,text){
	span=document.createElement('span');
	span.style.fontsize='smaller';
	link.appendChild(span);
	span.appendChild(document.createTextNode(" (" + text+')'));	
}

var links = document.links;
	
for (i = 0; i < links.length; i++) {  			
	link=links[i];
	rating=/Rating:\s([0-9\.]{1,4})\s/i(link.title);
	if(rating){
		injectText(link,rating[1]);
	}	
}

