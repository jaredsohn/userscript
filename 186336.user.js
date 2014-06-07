// ==UserScript==
// @name        stiddari.de - Original Images
// @description Change all images to the original
// @author      Gonçalo Pires
// @include     http://s1.stiddari.com*
// @grant       GM_getValue
// @grant       GM_setValue
// @version     2.2
// ==/UserScript==
//

function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

function img_update(lim,letter) {
    for (var i=1;i<lim;i++)
    { 
    document.body.innerHTML = document.body.innerHTML.replace('inc/stiddari/img/'+letter+i+'K.jpg', 'http://www.themob.pt/img/'+letter+i+'K.gif');
    }
}

// Overview
if (location.pathname.search('overview.php') != -1) {
    img_update('18','U')
    img_update('6','V')
}

// Habitações
if (location.pathname.search('konst.php') != -1) {
    img_update('16','B')
}

// Campo de Treino
if (location.pathname.search('off.php') != -1)  {
    img_update('18','U')
}

// Pesquisa
if (location.pathname.search('forsch.php') != -1)  {
    img_update('17','F')
}

// Segurança
if (location.pathname.search('deff.php') != -1) {
    img_update('6','V')
}


// ##### Infos ##### \\

// Campo de Treino
if ((location.pathname.search('info.php') != -1) || (getParameterByName("t") == 'u')){
document.body.innerHTML = document.body.innerHTML.replace('inc/stiddari/img/U' + getParameterByName("w") +'G.jpg', 'http://www.themob.pt/img/U' + getParameterByName("w") + 'K.gif');
}

// Segurança
if ((location.pathname.search('info.php') != -1) || (getParameterByName("t") == 'd')){
document.body.innerHTML = document.body.innerHTML.replace('inc/stiddari/img/V' + getParameterByName("w") +'G.jpg', 'http://www.themob.pt/img/V' + getParameterByName("w") + 'K.gif');
}

// Habitações
if ((location.pathname.search('info.php') != -1) || (getParameterByName("t") == 'g')){
document.body.innerHTML = document.body.innerHTML.replace('inc/stiddari/img/B' + getParameterByName("w") +'G.jpg', 'http://www.themob.pt/img/B' + getParameterByName("w") + 'K.gif');
}

// Pesquisa
if ((location.pathname.search('info.php') != -1) || (getParameterByName("t") == 'f')){
document.body.innerHTML = document.body.innerHTML.replace('inc/stiddari/img/F' + getParameterByName("w") +'G.jpg', 'http://www.themob.pt/img/F' + getParameterByName("w") + 'K.gif');
}