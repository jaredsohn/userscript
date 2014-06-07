// ==UserScript==
// @name           Imgur proxy
// @description	   Load images through a random proxy. Inspired by RASG ProxyLoadIMG
// @version		   6.16.2012.22:00
// @include		   http://http://www.masalaboard.com/*
// ==/UserScript==

var imagens =  ['imgur.com'];
var matriz =   ['https://cache-001.appspot.com/','https://cache-003.appspot.com/','https://cache-017.appspot.com/'];
var proxy =    matriz[Math.floor(Math.random() * matriz.length)];
var temproxy = 0;
var url =      window.location.href;

for (j in matriz)
    if (url.indexOf(matriz[j]) > -1)
        temproxy = 1;

if (temproxy == 0) {
    for (var i=0,link; (link=document.links[i]); i++) {
        for (h in imagens) {
            if (link.href.indexOf("imgur.com")!=-1) {
                link.href = link.href.replace(location.protocol + '//', proxy);
                //GM_log(link.href);
            }
        }
    }
}

if (temproxy == 0) {
var imgs = document.getElementsByTagName('img');
for (var i = 0; i < imgs.length; ++i) {
    var img = imgs[i];
    if (img.src && img.src.indexOf('http://imgur.com/') == 0) {
        img.src = img.src.replace(location.protocol + '//', proxy);
        img.src = img.src + '.jpg';
    }
    if (img.src && (img.src.indexOf('http://i.imgur.com/') == 0 || img.src.indexOf('pzy.be') == 0 )) {
        img.src = img.src.replace(location.protocol + '//', proxy);
    }
    if (img.src && img.src.indexOf('http://www.imgur.com/') == 0) {
        img.src = img.src.replace(location.protocol + '//', proxy);
    }
}

} 