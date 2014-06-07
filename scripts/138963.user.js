// ==UserScript==
// @name        onlyu-open-all-cards
// @namespace   http://userscripts.org
// @description open all the cards when searching in onlyu (hebrew dating site)
// @include     http://www.onlyu.co.il/i_partner_search.asp*
// @version     2
// ==/UserScript==

//used innerHTML.indexOf("OpenCard1.gif") to find the element

function openCard(n)
{
	idx = n * 2 + 1;
	elem = document.body.children[15].children[0].children[0].children[0].children[7].children[0].children[0].children[0].children[idx].children[0].children[0].children[0].children[1].children[0].children[0].children[0].children[5]
	elem.click();
}

for (i = 1; i <= 12; i++)
	openCard(i);