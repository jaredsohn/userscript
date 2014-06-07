// ==UserScript==
// @name           3.7 小夫 圖檔
// @namespace      請先安裝程式檔 再安裝圖案檔 才有作用
// @description    原作者 Uchari
// @version        
// @include        http://www.plurk.com/*
// ==/UserScript==

var smilies = '';
/* Smilies definition begins ====================== */

smilies += '<a title="小夫" href="http://i603.photobucket.com/albums/tt111/shadowgovtw/">ss2.gif,-2ss.gif,ss-4.gif,ss-3.gif,ss-5.gif,ss-2-1.gif,2ss.gif,ss.gif,ss-2.gif,-ss.gif,ss-1.gif,ss2-1.gif,54a1f866.gif,7236609a.gif,b1009fbf.gif,80f72a20.gif,5e237e7c.gif</a>';

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