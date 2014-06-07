// ==UserScript==
// @name           ProxyLoadIMG
// @namespace      http://stackoverflow.com/users/982924/rasg
// @author         RASG
// @version        2012.06.14
// @description    [PT] Carrega imagens atraves de um proxy aleatorio. [EN] Load images through a random proxy.
// @include        *
// @exclude        *intranet*
// ==/UserScript==

/* [PT] SOMENTE IMAGENS SAO CARREGADAS PELO PROXY. LINKS PERMANECEM INTACTOS. */
/* [EN] ONLY IMAGES ARE LOADED THROUGH THE PROXY. LINKS REMAIN UNTOUCHED. */

var imagens =  ['.bmp', '.gif', '.img', 'imgur.com', '.jpeg', '.jpg', '.png'];
var matriz =   ['https://cache-001.appspot.com/','https://cache-003.appspot.com/','https://cache-017.appspot.com/','https://meme-darwin.appspot.com/'];
var proxy =    matriz[Math.floor(Math.random() * matriz.length)];
var temproxy = 0;
var url =      window.location.href;

for (j in matriz)
    if (url.indexOf(matriz[j]) > -1)
        temproxy = 1;

if (temproxy == 0) {
    for (var i=0,link; (link=document.links[i]); i++) {
        for (h in imagens) {
            if (link.href.indexOf(imagens[h]) > -1) {
                link.href = link.href.replace(location.protocol + '//', proxy);
                //GM_log(link.href);
            }
        }
    }
}

/* SUBSTITUI OS 'img src' */
if (temproxy == 0) {
    for (var x=0; x<document.images.length; x++) {
        imagem = document.images[x];
        imagem.src = imagem.src.replace(location.protocol + '//', proxy);
    }
}