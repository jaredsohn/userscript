// ==UserScript==
// @name           Animextremist Modify
// @namespace      None
// @description    More Clean and Click next
// @include        http://www.animextremist.com/mangas-online/*
// @include        http://animextremist.com/mangas-online/*
// @grant       none
// ==/UserScript==

w = document.getElementById('wrapper');
nav = document.getElementById('nav');
nav.style.margin="0";
dp = document.getElementById('div-photo');
ph = document.getElementById('photo');
//ph.style.width="70%";

sn = document.getElementById('sub-nav');
sig = sn.getElementsByTagName('a');
link = document.createElement('a');
if (sig.length == 3){
    link.href = sig[2].href;
} else {
    link.href = sig[1].href;
}
link.appendChild(ph);
dp.appendChild(link);

padre = w.parentNode;
padre.removeChild(w);
padre.appendChild(nav);
padre.appendChild(dp);
padre.style.padding="0";

