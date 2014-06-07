// ==UserScript==
// @name           Pigskin Empire: Hide ESN Ticker Feed
// @copyright      2011, GiantsFan23
// @license        (CC) Attribution Share Alike; http://creativecommons.org/licenses/by-sa/3.0/
// @version        6.24.11
// @include        http://*pigskinempire.com/home.aspx*
// @description    Removes the ESN ticker feed from homepage.
// ==/UserScript==


window.setTimeout(function() { findRemoveTicker(); }, 100);

function findRemoveTicker()
{
	var ticker = document.getElementsByClassName("roundbox");
	var i = 0;
	
	while(i < ticker.length)
	{
		if(ticker[i].innerHTML.match(/embed/))
		{
			ticker[i].style.display = "none";
		}
	i++;
	}
}


