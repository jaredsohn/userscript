// ==UserScript==
// @name        ForumCdR
// @namespace   Badration
// @description Les images du forum CdR sont remplacées
// @include        http://*campagne-de-russie.com/jeu.php*
// @version     1.0.6
// ==/UserScript==



// Adresse de l'image qui va remplacer les grenadiers russes
var gre_rus = "http://img97.xooimage.com/files/8/3/4/gre_rus-413f23b.gif";

// Adresse de l'image qui va remplacer l'infanterie russe
var inf_rus = "http://img95.xooimage.com/files/2/b/0/inf_rus-413f2b1.gif";

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

