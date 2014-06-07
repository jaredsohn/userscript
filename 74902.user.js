// ==UserScript==
// @name           CDR Forum Empire
// @namespace      cdr
// @license        GNU GPL v3 (http://www.gnu.org/copyleft/gpl.html)
// @description    Change l'apparence du forum de cdr
// @include        http://*campagne-de-russie.com/forum/*
// @version   1.0.0
// ==/UserScript==


// Adresse de l'image qui va remplacer le fond du forum
var background = "http://3ecorps.pursud.org/images/body_background2.jpg";

// Adresse de l'image qui va remplacer celle en bas à gauche sur la page d'accueil
var whosonline = "http://i87.servimg.com/u/f87/13/17/45/52/napole10.gif";

// Adresse de l'image qui va remplacer le logo en haut à gauche
var logo = "http://img7.xooimage.com/files/f/3/3/800px-vereshagin...._borodino-2d97c9.jpg";

function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

// Change l'apparence du forum
addGlobalStyle('.bodyline { background-image : url('+background+')  ! important; }');
addGlobalStyle('.adminboby { background-image : url('+background+')  ! important; }');

var imgs = document.getElementsByTagName('img');
for (i=0; i<imgs.length; i++)
{
    if (imgs[i].src=='http://www.campagne-de-russie.com/forum/templates/CDRussie/images/whosonline.gif')
        imgs[i].src=whosonline;
    else if (imgs[i].src=='http://www.campagne-de-russie.com/forum/templates/CDRussie/images/logo_CDRussie.gif')
        imgs[i].src=logo;
}