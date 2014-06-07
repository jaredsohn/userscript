// ==UserScript==
// @name           3.7 小橘 圖檔
// @namespace      請先安裝程式檔 再安裝圖案檔 才有作用
// @description    程式原作者 Uchari
// @version        
// @include        http://www.plurk.com/*
// ==/UserScript==

var smilies = '';
/* Smilies definition begins ====================== */

smilies += '<a title="小橘" href="http://s.blog.xuite.net/_image/emotion/hastart/">m1.gif,m2.gif,m3.gif,m4.gif,m5.gif,m6.gif,m7.gif,m8.gif,m9.gif,m10.gif,m11.gif,m12.gif,m13.gif,m14.gif,m15.gif,m16.gif,m17.gif,m18.gif,m19.gif,m20.gif,m21.gif,m22.gif,m23.gif,m24.gif,m25.gif,m26.gif,m27.gif,m28.gif,m29.gif,m30.gif,m31.gif,m32.gif,m33.gif,m34.gif,m35.gif,m36.gif,m37.gif,m38.gif,m39.gif,m40.gif,m41.gif,m42.gif,m43.gif,m44.gif,m45.gif,m46.gif,m47.gif,m48.gif,m49.gif,m50.gif,m51.gif,m52.gif,m53.gif,m54.gif,m55.gif,m56.gif,m57.gif,m58.gif,m59.gif,m60.gif,m61.gif,m62.gif,m63.gif,m64.gif,m65.gif,m66.gif,m67.gif,m68.gif,m69.gif,m70.gif,m71.gif,m72.gif,m73.gif,m74.gif,m75.gif,m76.gif,m77.gif,m78.gif,m79.gif,m80.gif,m81.gif,m82.gif,m83.gif,m84.gif,m85.gif,m86.gif,m87.gif,m88.gif,m89.gif,m90.gif</a>';

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