// ==UserScript==
// @name        Pokebip - Forum
// @namespace   Linking13   
// @description Script permettant de donner une autre apparence au forum.
// @include     http://www.pokebip.com/pokemon/fora/*
// @version     1
// ==/UserScript==

var body = document.body;
var page = body.getElementsByClassName('page')[0];

body.style.margin = "0 auto";
if(body) {
    body.style.background = "url(http://i.imgur.com/peyWyns.png) fixed, url(http://i.imgur.com/CWwqJyF.jpg) fixed";
}
else {
    body.style.background = "none";
}

// contenu de la page
var page = body.getElementsByClassName('page')[0];
if(page) {
    page.style.width = "1200px";
    page.style.margin = "0 auto";
    page.style.marginBottom = "20px";
    page.style.padding = "0";
    page.style.border = "none";
}
else {
    body.style.background = "black";
}

// Modififion de la banniere
// (parce que les nouvelles bannieres ont ete faites avec les pieds)
var banniere = body.getElementsByClassName('titre')[0];
banniere.style.width = "1200px";
banniere.style.margin = "0 auto";
banniere.style.padding = "0";
banniere.style.height = "200px";
banniere.style.background = "url(http://i.imgur.com/tbyH4gL.png) no-repeat, #3c3c3c";
banniere.style.border = "none";
banniere.innerHTML = "";

// barre de navigation du haut
var barre = body.getElementsByClassName('barre')[0];
barre.style.width = "1200px";
barre.style.margin = "auto 0";
barre.style.marginTop = "-200px";
barre.style.padding = "0";
barre.style.border = "none";
barre.style.float = "left";
barre.style.position = "fixed";
barre.style.height = "31px";
barre.style.background = "url(http://i.imgur.com/peyWyns.png), url(http://i.imgur.com/jN764g8.png)";
barre.style.textAlign = "center";

// On enleve la version portable du forum
document.getElementById('lien-skin').innerHTML = "";

var barreliens = body.getElementsByClassName('barre-liens')[0];
barreliens.style.color = "black";
barreliens.style.textAlign = "center";

// On ajoute du style de façon sale
var head = document.getElementsByTagName('head')[0];
head.innerHTML = head.innerHTML + "<style>#mahbar {list-style-type:none; margin:0; padding:0;}"+
                "#mahbar li {-moz-transition: all 0.5s ease;-webkit-transition: all 0.5s ease;-o-transition: all 0.5s ease;transition: all 0.5s ease;padding-bottom:2px;float:left; padding-right: 25px; height:100%; } " +
                "#mahbar img { vertical-align:middle; margin-right:10px;}" +
                "#mahbar a { color:#ffffff;font-weight:bold;text-transform:uppercase;letter-spacing:1px;}" +
                "#mahbar li:hover{text-shadow: 0px 1px 20px #00c6c9;padding-left: 40px; padding-right: 40px;border-bottom: 1px solid #00c6c9;}" +
                ".catdiv {background:none;}" +
                ".cat{background: none;}" +
                "h4{font-family:'Helvetica';font-size:17px;text-transform:uppercase;text-shadow: 1px 0 1px #fff;}" +
                "th{background:none;height:0px;display:none;}" +
                ".titles{font-family:'Helvetica';font-size:17px;text-transform:uppercase;text-shadow: 1px 0 1px #fff;}</style>";

// on change le contenu de la barre de navigation du haut
barreliens.innerHTML = "<div style=\"width:100%;\"><ul id=\"mahbar\">" +
                       "<li><a href=\"http://www.pokebip.com/pokemon/index.php\"><img src=\"http://i.imgur.com/bNQ5LHm.png\" /></li>" +
                       "<li><a href=\"http://www.pokebip.com/pokemon/fora/\"><img src=\"http://i.imgur.com/bERiWlF.png\" />Forum</a></li>" +
                       "<li><a href=\"http://www.pokebip.com/pokemon/pokedex/index.php\"><img src=\"http://i.imgur.com/3QaoL77.png\" />Pokédex</a></li>" +
                       "<li><a href=\"http://www.pokebip.com/pokemon/index.php?phppage=membres/index\"><img src=\"http://i.imgur.com/nqswqcN.png\" />Espace-Membre</a></li>" +
                       "</ul></div>";

var colonnes = body.getElementsByClassName('colonnes-forum')[0];
colonnes.style.width = "1200px";
colonnes.style.margin = "0 auto";
colonnes.style.padding = "0";
colonnes.style.border = "none";
colonnes.style.background = "url(http://i.imgur.com/de7ilmK.png) top repeat-x, url(http://i.imgur.com/xxoEeDp.png) bottom repeat-x, url(http://www.pokemontrash.com/web/bg.png), #c5cacc";

var contenu = body.getElementsByClassName('contenu-forum')[0];
if(contenu) {
    contenu.style.margin = "0 auto";
    contenu.style.padding = "0";
}

var menubar = document.getElementById("menubar");
if(menubar) {
    menubar.style.margin = "0 auto";
    menubar.style.padding = "0";
    menubar.style.paddingLeft = "5px";
    menubar.style.paddingRight = "5px";
    menubar.style.width = "1190px";
}

// Couleur d'un post sur deux
var rowone = body.getElementsByClassName('row1');
var length = "<p class=\"breadcrumbs\"><a href=\"http://www.pokebip.com/pokemon/fora/\">Index du forum</a></p>".length;
if(rowone) {
    var rowi = 0;
    while(rowi < rowone.length) {
        rowi++;
    }
}

var rowtwo = body.getElementsByClassName('row2');
if(rowtwo) {
    var rowi = 0;
    while(rowi < rowtwo.length) {
        rowtwo[rowi].style.background = "#dedede"; // darker
        rowtwo[rowi].style.border = "none";
        rowi++;    
    }
}

// On enlève le background du tableau
var border = body.getElementsByClassName('tablebg');
var borderi = 0;
if(border) {
    while(borderi < border.length) {
        border[borderi].style.background = "none";
        borderi++;
    }
}

// Modification de la couleur des liens de la menubar
var menubarlinks = document.getElementById("menubar").getElementsByTagName("a");
var menubarlinksi = 0;
if(menubarlinks) {
    while(menubarlinksi < menubarlinks.length) {
        menubarlinks[menubarlinksi].style.color = "#000000";
        menubarlinks[menubarlinksi].style.textShadow = "0px 0px 3px #ffffff";
        menubarlinksi++;
    }
}

// On vire la date en haut, parce que ça sert à rien
var datebar = document.getElementById("datebar");
datebar.innerHTML = "";

// Modification de la légende pour les messages
var legend = body.getElementsByClassName("legend")[0];
if(legend) {
legend.innerHTML = "<tr><td width=\"20\" align=\"center\"></td><td><span class=\"gensmall\"><img src=\"http://i.imgur.com/W3wG2gT.png\"width=\"46\" " +
                    "height=\"25\" alt=\"Nouveaux messages\" title=\"Nouveaux messages\" />Nouveaux messages</span></td>" +
                    "<td>&nbsp;&nbsp;</td><td width=\"20\" align=\"center\"><img src=\"http://i.imgur.com/r8oYL24.png\" " +
                    "width=\"46\" height=\"25\" alt=\"Aucun message non lu\" title=\"Aucun message non lu\" /></td><td><span class=\"gensmall\">Aucun nouveau message</span></td> " + 
                    "<td>&nbsp;&nbsp;</td><td width=\"20\" align=\"center\"><img src=\"http://i.imgur.com/8O6qqWG.png\" width=\"46\" height=\"25\"" +
                    "alt=\"Aucun message non lu [ Verrouillé ]\" title=\"Aucun message non lu [ Verrouillé ]\" /></td><td><span class=\"gensmall\">Forum verrouillé</span></td></tr> ";
}   

// On change toutes les icônes du forum
var images = document.getElementsByTagName("img");
var x = 0;
while(x < images.length) { // new
    if(images[x].src == "http://www.pokebip.com/pokemon/fora/styles/subsilver2/imageset/forum_unread.gif") { // new
        images[x].src = "http://i.imgur.com/W3wG2gT.png";
    }
    else if(images[x].src == "http://www.pokebip.com/pokemon/fora/styles/subsilver2/imageset/forum_read.gif") { // no new
        images[x].src = "http://i.imgur.com/r8oYL24.png";
    }
    else if(images[x].src == "http://www.pokebip.com/pokemon/fora/styles/subsilver2/imageset/forum_read_locked.gif") { // locked
        images[x].src = "http://i.imgur.com/8O6qqWG.png";
    }
    else if(images[x].src == "http://www.pokebip.com/pokemon/fora/styles/subsilver2/theme/images/whosonline.gif") { // icone a gauche des membres co
        images[x].src = "http://i.imgur.com/O48x9qe.png";
    }
    else if(images[x].src == "http://www.pokebip.com/pokemon/fora/styles/subsilver2/imageset/fr/button_topic_reply.gif") { // icone répondre topic
        images[x].src = "http://i.imgur.com/3OWP5N5.png";
    }
    else if(images[x].src == "http://www.pokebip.com/pokemon/fora/styles/subsilver2/imageset/fr/button_pm_reply.gif") { // icone répondre mp
        images[x].src = "http://i.imgur.com/DfH3RoB.png";
    }
    else if(images[x].src == "http://www.pokebip.com/pokemon/fora/styles/subsilver2/imageset/fr/button_topic_new.gif") { // icone nouveau topic
        images[x].src = "http://i.imgur.com/bk5UapS.png";
    }
    else if(images[x].src == "http://www.pokebip.com/pokemon/fora/styles/subsilver2/imageset/fr/icon_user_online.gif") { // icone en ligne
        images[x].src = "http://i.imgur.com/MGjJhCz.png";
    }
    else if(images[x].src == "http://www.pokebip.com/pokemon/fora/styles/subsilver2/imageset/fr/icon_user_offline.gif") { // icone hors ligne
        images[x].src = "http://i.imgur.com/VJAVwc6.png";
    }
    else if(images[x].src == "http://www.pokebip.com/pokemon/fora/styles/subsilver2/imageset/fr/icon_post_edit.gif") { // icone editer post
        images[x].src = "http://i.imgur.com/CMX8iDg.png";
    }
    else if(images[x].src == "http://www.pokebip.com/pokemon/fora/styles/subsilver2/imageset/fr/icon_post_quote.gif") { // icone citer post
        images[x].src = "http://i.imgur.com/k3Hocsx.png";
    }
    else if(images[x].src == "http://www.pokebip.com/pokemon/fora/styles/subsilver2/imageset/fr/icon_contact_pm.gif") { // icone mp
        images[x].src = "http://i.imgur.com/L7Msefv.png";
    }
    else if(images[x].src == "http://www.pokebip.com/pokemon/fora/styles/subsilver2/imageset/fr/icon_user_profile.gif") { // icone profile
        images[x].src = "http://i.imgur.com/AVssRCI.png";
    }
    else if(images[x].src == "http://www.pokebip.com/pokemon/fora/styles/subsilver2/imageset/fr/icon_post_delete.gif") { // icone delete post
        images[x].src = "http://i.imgur.com/T0AU9u0.png";
    }
    else if(images[x].src == "http://www.pokebip.com/pokemon/fora/styles/subsilver2/imageset/fr/icon_post_info.gif") { // icone info sur post
        images[x].src = "http://i.imgur.com/eu96f6e.png";
    }
    else if(images[x].src == "http://www.pokebip.com/pokemon/fora/styles/subsilver2/imageset/fr/icon_post_report.gif") { // icone report post
        images[x].src = "http://i.imgur.com/UViAbKo.png";
    }
    else if(images[x].src == "http://www.pokebip.com/pokemon/fora/styles/subsilver2/imageset/fr/icon_user_warn.gif") { // icone averto
        images[x].src = "http://i.imgur.com/0OlFBqH.png";
    }
    else if(images[x].src == "http://www.pokebip.com/pokemon/fora/styles/subsilver2/theme/images/icon_mini_login.gif") { // icone deco
        images[x].src = "http://i.imgur.com/aYBlNVD.png";
        images[x].style.verticalAlign = "bottom";
    }
    else if(images[x].src == "http://www.pokebip.com/pokemon/fora/styles/subsilver2/theme/images/icon_mini_message.gif") { // icone Mps
        images[x].src = "http://i.imgur.com/k9Imvzt.png";
        images[x].style.verticalAlign = "bottom";
    }
    else if(images[x].src == "http://www.pokebip.com/pokemon/fora/styles/subsilver2/theme/images/icon_mini_faq.gif") { // icone faq
        images[x].src = "http://i.imgur.com/XIrdmey.png";
        images[x].style.verticalAlign = "bottom";
    }
    else if(images[x].src == "http://www.pokebip.com/pokemon/fora/styles/subsilver2/theme/images/icon_mini_search.gif") { // icone search
        images[x].src = "http://i.imgur.com/qI3U2QS.png";
        images[x].style.verticalAlign = "bottom";
    }
    else if(images[x].src == "http://www.pokebip.com/pokemon/fora/styles/subsilver2/theme/images/icon_mini_members.gif") { // icone membres
        images[x].src = "http://i.imgur.com/BBFIPQJ.png";
        images[x].style.verticalAlign = "bottom";
    }
    else if(images[x].src == "http://www.pokebip.com/pokemon/fora/styles/subsilver2/theme/images/icon_mini_profile.gif") { // icone profil
        images[x].src = "http://i.imgur.com/P7CV6Jc.png";
        images[x].style.verticalAlign = "bottom";
    }
    else if(images[x].src == "http://www.pokebip.com/pokemon/fora/styles/subsilver2/imageset/fr/button_topic_locked.gif") { // icone topic locked
        
    }
    x++;
}
// Modification du copyright
var copyright = body.getElementsByClassName("copyright")[0];
if(copyright)
    copyright.innerHTML = "<br/>Design réalisé par Linking13 - 2013 - <a href=\"http://www.pokebip.com/pokemon/fora/pokebip-cerulean-edition-t26153.html\">Voir le topic du design</a><br/> ";