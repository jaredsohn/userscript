// ==UserScript==
// @name          Temp 4chan fix
// @description	  fix broken dat.4chan.org references
// @include       http://*.4chan.org/*
// ==/UserScript==

imgs = document.getElementsByTagName("img");
for(var i=0; i<imgs.length; i++){
    imgs[i].src = imgs[i].src.replace("dat.4chan.org","66.207.165.178");
}

links = document.getElementsByTagName("a");
for(var i=0; i<links.length; i++){
    links[i].href = links[i].href.replace("dat.4chan.org","66.207.165.178");
}