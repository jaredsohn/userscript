// ==UserScript==
// @name        ForumCdR
// @namespace   Badration
// @description Les images du forum CdR sont remplacées
// @include        http://*campagne-de-russie.com/forum/*
// @version     1.0.6
// ==/UserScript==



// Adresse de l'image qui va remplacer le fond du forum
var background = "http://img.xooimage.com/files8/1/1/a/body_background-210b85.jpg";

// Adresse de l'image qui va remplacer celle en bas à gauche sur la page d'accueil
var whosonline = "http://img97.xooimage.com/files/a/3/e/napoleon-4126171.jpeg";

// Adresse de l'image qui va remplacer le logo en haut à gauche
var logo = "http://img96.xooimage.com/files/5/f/f/forumcdrkoutouzov-41262e9.jpg";

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

