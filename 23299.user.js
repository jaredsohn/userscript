// ==UserScript==
// @name          Clubic's screenshots v1.03
// @namespace
// @description   Redirige les pages "plein écran" associées aux miniatures vers la photo seule.
// @include       http://www.clubic.com/afficher-en-plein-ecran*
// @version       1.03
// @author        Madcat
// ==/UserScript==


imgs = document.getElementsByTagName('img');
i=0;
while (!((/http:\/\/img.clubic.com\/photo/.test(imgs[i].src)) && (imgs[i].className != 'avatar'))) { i++ }
window.location.href = imgs[i].src;