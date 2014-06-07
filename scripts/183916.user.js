// ==UserScript==
// @name			Remove Bad Matches on OKCupid Search
// @description		Removes search results under a configurable match rating (default 75%) and ones you've already messaged. Now also removes anyone you've rated 3 stars or lower.
// @include			http://www.okcupid.com/match*
// @version			1.2
// ==/UserScript==

var min = GM_getValue("OkCMinimum", 75);
var box, matchE, match, contact, results, rating;
GM_registerMenuCommand('Set OkCupid Minimum', setMin,'o');

window.setInterval(removeLow,1000);

function removeLow()
{
	results=document.getElementsByClassName('match_card_wrapper user-not-hidden');
	for(var n=0; n<results.length; n++){
		box = results[n];
		matchE = box.getElementsByClassName('percentages');
		match = Number(matchE[0].textContent.split("%")[0]);
		contact = box.getElementsByClassName('bar last_contact');
		rating = box.getElementsByClassName('current-rating')[0].style.width.split("%")[0]/20;
		if( match < min || contact.length > 0 || (rating>0 && rating<4))
		{
			box.style.display = "none";
		}
	}
}

function setMin()
{
	var set = prompt("What minimum match % would you like to see? Refresh after setting to take effect.",min);
	if(!isNaN(parseFloat(set)) && isFinite(set))
	{
		GM_setValue("OkCMinimum", set);
	}
}