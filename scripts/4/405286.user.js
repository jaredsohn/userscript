// ==UserScript==
// @name        paizo_new_highlight
// @namespace   www.crewstopia.com
// @description Highlight Paizo "new" posts in "My Campaigns"
// @include     http://paizo.com/people/CaroCogitatus/campaigns
// @version     1
// @grant       none
// ==/UserScript==

//window.alert('paizo_new_highlight');

var links = document.getElementsByTagName("a");
//alert("links = " + links);
for (var ii = 0; ii < links.length; ii++)
{
	if (links[ii].text.endsWith(" new"))
	{
		links[ii].style.color = "Red";
		links[ii].style.fontWeight = "bold";
		links[ii].style.fontSize = "larger";
	}
}