// ==UserScript==
// @name           3.7 哩哩貓 圖檔
// @namespace      請先安裝程式檔 再安裝圖案檔 才有作用
// @description    程式原作者 Uchari
// @version        
// @include        http://www.plurk.com/*
// ==/UserScript==

var smilies = '';
/* Smilies definition begins ====================== */

smilies += '<a title="哩哩貓" href="http://s641.photobucket.com/albums/uu133/mark5468/cat/">bo1.gif,bo2.gif,bo3.gif,bo4.gif,bo5.gif,bo6.gif,bo7.gif,bo8.gif,bo9.gif,bo10.gif,bo11.gif,bo12.gif,bo13.gif,bo14.gif,bo15.gif,bo16.gif,bo17.gif,bo18.gif,bo19.gif,bo20.gif,bo21.gif,bo22.gif,bo23.gif,bo24.gif,bo25.gif,bo26.gif,bo27.gif,bo28.gif,bo29.gif,bo30.gif,bo30.gif,bo31.gif,bo32.gif,bo33.gif,bo34.gif,bo35.gif,bo36.gif,bo37.gif,bo38.gif,bo39.gif,bo40.gif,bo41.gif,bo42.gif,bo43.gif,bo44.gif,bo45.gif,bo46.gif,bo47.gif,bo48.gif,bo49.gif,bo50.gif,bo51.gif,bo52.gif,bo53.gif,bo54.gif,bo55.gif,bo56.gif,bo57.gif,bo58.gif,bo59.gif,bo60.gif,bo61.gif,bo62.gif,bo63.gif,bo64.gif,bo65.gif,bo66.gif,bo67.gif,bo68.gif,bo69.gif,bo70.gif,bo71.gif,bo72.gif,bo73.gif,bo74.gif,bo75.gif,bo76.gif,bo77.gif,bo78.gif,bo79.gif,bo80.gif,bo81.gif,bo82.gif,bo83.gif,bo84.gif</a>';

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