// ==UserScript==
// @name           PCiV5.1
// @namespace      PCiToRoot
// @include        http://www.pcinpact.com/*
// @include        http://www.pcinpact.com/news/*
// ==/UserScript==

GM_addStyle("#content_left {min-height: 0 !important;} #bloc_commentaires {width: 984px !important; margin-left: 8px !important;} #titre_commentaire {width: 960px !important;} .pager {width: 984px !important;} .commentaire {min-height: 145px !important;} .commentaire_image {width: 120px !important;} .commentaire_avatar {height: 120px !important; line-height: 50px !important; width: 50px !important;} .commentaire_avatar img {line-height: 50px !important; max-height: 50px !important; max-width: 120px !important;} .commentaire_entete, .commentaire_entete_team {padding-left: 138px !important; width: 844px !important;} .commentaire_supprime > div {width: 844px !important;} .commentaire_content {margin-left: 137px !important; width: 840px !important;} .acceuiltest_separateur {width: 984px !important;} #commentaireFrm_entete {width: 960px !important;} #commentaireFrm_form {width: 790px !important;} #commentaire_Frm form {margin-top: 0 !important;} #commentaire_Frm textarea {width: 756px !important;} .commentaire_content textarea {width: 782px !important;}");

(function () {
    var bloc_commentaires = document.getElementById('bloc_commentaires');
    var content_left = document.getElementById('content_left');
    var layout = document.getElementById('content');
	document.getElementsByClassName('pseudo_socialbar inactive')[0].innerHTML ='root';
    document.getElementsByClassName('img_avatar_socialbar bg_color_opposee')[0].getElementsByTagName('img')[0].setAttribute('src', 'http://static.pcinpact.com/images/bd/avatar/1.jpg');
	document.getElementById('breves_entete').style.display='none';
    document.getElementById('prixdunet_content').style.display='none';
    document.getElementById('prixdunet_entete').style.display='none';
    document.getElementById('vosprefere').style.display='none';
    document.getElementById('sidebar_social').style.display='none';
   
    content_left.removeChild(bloc_commentaires);
    layout.appendChild(bloc_commentaires);
})()



