// ==UserScript==
// @name           3.7 包子頭 圖檔
// @namespace      請先安裝程式檔 再安裝圖案檔 才有作用
// @description    程式原作者 Uchari
// @version        
// @include        http://www.plurk.com/*
// ==/UserScript==

var smilies = '';
/* Smilies definition begins ====================== */

smilies += '<a title="包子頭" href="http://s641.photobucket.com/albums/uu133/mark5468/bozto/">bo1.gif,bo2.gif,bo3.gif,bo4.gif,bo5.gif,bo6.gif,bo7.gif,bo8.gif,bo9.gif,bo10.gif,bo11.gif,bo12.gif,bo13.gif,bo14.gif,bo15.gif,bo16.gif,bo17.gif,bo18.gif,bo19.gif,bo20.gif,bo21.gif,bo22.gif,bo23.gif,bo24.gif,bo25.gif,bo26.gif,bo27.gif,bo28.gif,bo29.gif,bo30.gif</a>';

/* Smilies definition ends ====================== */

/* Initialize */
var smilies_holder = document.createElement('div');
smilies_holder.id = 'smilies_holder';
smilies_holder.style.display = 'none';

if (!document.getElementById('smilies_holder')) {
  document.documentElement.appendChild(smilies_holder);
} 
smilies_holder = document.getElementById('smilies_holder');

/* Put the smilies holder */
var container = document.createElement('p')
container.innerHTML = smilies;
smilies_holder.appendChild(container);