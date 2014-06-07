// ==UserScript==
// @name           3.7 張君雅 圖檔
// @namespace      請先安裝程式檔 再安裝圖案檔 才有作用
// @description    程式原作者 Uchari
// @version        
// @include        http://www.plurk.com/*
// ==/UserScript==

var smilies = '';
/* Smilies definition begins ====================== */

smilies += '<a title="張君雅" href="http://kevin357.myweb.hinet.net/2009/a01/">a0101.gif,a0102.gif,a0103.gif,a0104.gif,a0105.gif,a0106.gif,a0107.gif,a0108.gif,a0109.gif,a0110.gif,a0111.gif,a0112.gif,a0113.gif,a0114.gif,a0115.gif,a0116.gif,a0117.gif,a0118.gif,a0119.gif,a0120.gif,a0121.gif</a>';

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