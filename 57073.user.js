// ==UserScript==
// @name           WoW-Heroes Linkerator
// @author         Incindarella of Drak'Tharon
// @namespace      wowheroeslinkerator
// @include        http://*wowarmory.com/character-sheet.xml*
// ==/UserScript==

var url = window.location.href;
var region = url.split('://')[1].split('.')[0];
if(region=='www'){region = 'us';}
var realm = url.split('r=')[1].split('&')[0];
var character = url.split('n=')[1];

var link_str = 'http://www.wow-heroes.com/index.php?zone='+region+'&server='+realm+'&name='+character;
//var link_str = link_str+'&live=1'

//create new link in de forumLinks div
var forum_links = document.getElementById('forumLinks');
var wowhead_link = document.createElement('a');
wowhead_link.setAttribute('href', link_str);
wowhead_link.setAttribute('class', 'smFrame staticTip');
wowhead_link.setAttribute('onmouseover', "setTipText('Clicking this link will take you to WoW-Heroes');");

var wowhead_div = document.createElement('div');
wowhead_div.innerHTML = 'WoW-Heroes';

var wowhead_img = document.createElement('img');
wowhead_img.setAttribute('src', 'http://www.wow-heroes.com/images/enchrank/ench15.gif');
wowhead_img.setAttribute('height', '21');

wowhead_link.appendChild(wowhead_div);
wowhead_link.appendChild(wowhead_img);
forum_links.appendChild(wowhead_link);