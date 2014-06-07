// ==UserScript==
// @name           3.7 keroro 圖檔
// @namespace      請先安裝程式檔 再安裝圖案檔 才有作用
// @description    程式原作者 Uchari
// @version        
// @include        http://www.plurk.com/*
// ==/UserScript==

var smilies = '';
/* Smilies definition begins ====================== */

smilies += '<a title="keroro" href="http://a6677.myweb.hinet.net/msn/keroro/keroro"> (0).gif, (1).gif, (2).gif, (3).gif, (4).gif, (5).gif, (6).gif, (7).gif, (8).gif, (9).gif, (10).gif, (11).gif, (12).gif, (13).gif, (14).gif, (15).gif, (16).gif, (17).gif, (18).gif, (19).gif, (20).gif, (21).gif, (22).gif, (23).gif, (24).gif, (25).gif, (26).gif, (27).gif, (28).gif, (29).gif</a>';

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