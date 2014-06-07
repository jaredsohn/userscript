// ==UserScript==
// @name           Wowhead Item Comparison
// @namespace      itemcomparison
// @include        http://*wowarmory.com/character-sheet.xml*
// ==/UserScript==

//get all div tags wilt the class gearItem
var gear_items = document.getElementsByClassName('gearItem'); 
var link;
var item_id_ar = new Array();
for (var i=0;i<gear_items.length;i++)
{
	//peal item id's from the item links
	link = gear_items[i].getElementsByTagName('a');
	item_id = link[0].id.split('&')[0].split('=')[1];
	item_id_ar.push(item_id);
}
var compare_str = 'http://www.wowhead.com/?compare='+item_id_ar.join(':');

//create new link in de forumLinks div
var forum_links = document.getElementById('forumLinks');
var wowhead_link = document.createElement('a');
wowhead_link.setAttribute('href', compare_str);
wowhead_link.setAttribute('class', 'smFrame staticTip');
wowhead_link.setAttribute('onmouseover', "setTipText('Clicking this link will take you to Wowhead Item Comparison');");

var wowhead_div = document.createElement('div');
wowhead_div.innerHTML = 'Wowhead Item Comparison';

var wowhead_img = document.createElement('img');
wowhead_img.setAttribute('src', 'http://bardecaravan.nl/armory-wowhead.gif');

wowhead_link.appendChild(wowhead_div);
wowhead_link.appendChild(wowhead_img);
forum_links.appendChild(wowhead_link);