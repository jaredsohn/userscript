// ==UserScript==
// @name           	Zelly's WetGenes Blocker
// @namespace      	Zelly
// @description    	Hides chat from specified users.
// @include        		http://play.4lfa.com/tv*
// @include        		http://wet.appspot.com/wetv*
// @version		1.02
// ==/UserScript==



var users = ['felony','jtab'];

//###########################################
//## Put the name of the users you want to ##
//## mute/block/ignore in the list above.  ##
//## Be sure to use capital letters and    ##
//## spell the name correctly.  It needs   ##
//## to be inside of quotes ('s) with      ##
//## commas separating them.  Enjoy!!      ##
//###########################################

function OnNodeInserted(event)
{
	if (event.target.className == 'wetspew_line')
		if (event.target.childNodes.length > 0)
			if (event.target.childNodes[0].childNodes.length > 1)
				if (event.target.childNodes[0].childNodes[1].className=='wetspew_name')
					if (users.indexOf(event.target.childNodes[0].childNodes[1].innerHTML) != -1)
						event.target.style.display='none';
}

document.addEventListener('DOMNodeInserted', OnNodeInserted, false);