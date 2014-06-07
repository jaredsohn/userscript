// ==UserScript==
// @name           3.7 就醬 圖檔
// @namespace      請先安裝程式檔 再安裝圖案檔 才有作用
// @description    程式原作者 Uchari
// @version        
// @include        http://www.plurk.com/*
// ==/UserScript==

var smilies = '';
/* Smilies definition begins ====================== */

smilies += '<a title="就醬" href="http://cichikung.myweb.hinet.net/plurk/jojan/">m001.gif,m002.gif,m003.gif,m004.gif,m005.gif,m006.gif,m007.gif,m008.gif,m009.gif,m010.gif,m011.gif,m012.gif,m013.gif,m014.gif,m015.gif,m016.gif,m017.gif</a>';

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