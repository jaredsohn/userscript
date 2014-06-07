// ==UserScript==
// @name       PCi5.5_To_Root
// @version    0.1
// @description  Amelioration de la version (bêta) 5.5 de PCInpact.com
// @match      http://beta.pcinpact.com/news/*
// @match      http://beta.pcinpact.com/*
// ==/UserScript==


// Changement du style global : A REORGANISER !!!!
GM_addStyle("#content_left_wrapper {width:984px !important;} #content_left {min-height: 0 !important;} #content_news {width : 984px !important;} #filtres {width : 968px !important} .actu_date {width : 960px !important;} #actu_entete {width : 971px !important;} #bloc_commentaires {width: 980px !important; margin-left: 8px !important;} #titre_commentaire {width: 960px !important;} .pager {width: 984px !important;} .commentaire {min-height: 145px !important;} .commentaire_image {width: 120px !important;} .commentaire_avatar {height: 50px !important; line-height: 50px !important; width: 50px !important;} .commentaire_avatar img {line-height: 50px !important; max-height: 50px !important; max-width: 120px !important;} .commentaire_entete, .commentaire_entete_team {padding-left: 138px !important; width: 840px !important;} .commentaire_supprime > div {width: 844px !important;} .commentaire_content {margin-left: 137px !important; width: 840px !important;} .acceuiltest_separateur {width: 984px !important;} #commentaireFrm_entete {width: 960px !important;} #commentaireFrm_form {width: 790px !important;} #commentaire_Frm form {margin-top: 0 !important;} #commentaire_Frm textarea {width: 756px !important;} .commentaire_content textarea {width: 782px !important;}");


// Style pour les breves avant les news sur la home
GM_addStyle("#breves {width : 984px !important;} #breves_content {width : 984px !important;} #breves_entete {width : 984px !important;} ");

(function () {
   
    
    // Changement du login en "root"
	document.getElementsByClassName('pseudo_socialbar inactive')[0].innerHTML ='root';
    // Changement de l'avatar
    document.getElementsByClassName('img_avatar_socialbar bg_color_opposee')[0].getElementsByTagName('img')[0].setAttribute('src', 'http://static.pcinpact.com/images/bd/avatar/1.jpg');
    
    // On cache la sidebar
    document.getElementById('sidebar').style.display='none';  
    
    // Si il y a les brèves et qu'il n'y a pas de commentaires c'est que l'on est sur la home
    if(null!=document.getElementById('breves') && null ==  document.getElementById('bloc_commentaires')){
        var mainCont = document.getElementById('content_left_wrapper');
        var news = document.getElementById('content_left');
        var breves = document.getElementById('breves');
        // On place les breves avant les news
        mainCont.removeChild(news);
        mainCont.appendChild(breves);
        mainCont.appendChild(news);
    }

})()