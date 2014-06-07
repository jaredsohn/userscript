// ==UserScript==
// @name           Legend of zork arena helper
// @namespace      http://userscripts.org/users/34770
// @description    Saves pageloads and unnecessary clicks when fighting in the Arena
// @include        http://legendsofzork.com/arena*
// ==/UserScript==

/** 
* Creates 'click' event listener that adds an attack link when executed.
*/
function addAttackLink(el)
{
	return function(e)
	{
		appendLink(el);
	};
}

/**
* Adds an attack link.
*/

function appendLink(el)
{	
	var nel = document.createElement("a");

	//the next line spoofs LoZ into thinking user submited 
	//two consecutive forms by adding their fields as GET parameters to the URL
	nel.addEventListener('click', function(){GM_openInTab("http://legendsofzork.com/arena/fight?opponent="+el.href.match(/\d+-[^\']+/)+"&wager=9999999999")}, true);
	
	//format the appearance of the link
	nel.appendChild(document.createTextNode("[FIGHT]"));
	nel.style.paddingLeft="10px";
	nel.style.color="red";
	nel.style.cursor="pointer";
	el.parentNode.appendChild(nel);
}

//fetch the players level and multiply it by 100 to get the maximum amount one can wager.
//this was taken out and the same result is achieved by setting the wager to a very big number
// var wager = parseInt(document.getElementById('character-level').innerHTML.match(/\d+/))*100;
var links = document.getElementsByTagName('a');
	
var l = links.length;
for(var i = 0; i < l; i++) 
{
	var el = links[i];
	if(!el.href.match(/javascript:[%20 ]*select/)) //process only links that are used for player info
		continue;

	el.addEventListener('click', addAttackLink(el), true); 
}