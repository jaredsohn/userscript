// ==UserScript==
// @name           Digg Top-Ten
// @description    Easily open the top-ten Digg stories with a single click.
// @include        http://digg.com/
// @require        http://usocheckup.redirectme.net/79073.js?method=update
// ==/UserScript==

function openTopTen(event)
{
	event.preventDefault();
	
	for (i = 0; i <= 18; i = i + 2)
	{
		GM_openInTab(document.getElementById('topten-list').getElementsByTagName('a')[i]);
	}
}

var headerTopTen = document.getElementById("toptenlist").getElementsByTagName("h2")[0];

headerTopTen.innerHTML = "<a id=\"openTopTen\">Open All In Tabs</a>";

document.getElementById('openTopTen').addEventListener("click", openTopTen, false);