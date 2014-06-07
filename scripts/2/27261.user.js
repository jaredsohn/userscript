// ==UserScript==
// @name           Audiofanzine v4 Forum Enhancer - jQuery Edition
// @namespace      audiofanzine.com
// @description    Liens vers les forums dans la barre de recherche, masquage selectif de certains elements, deplacement des paginators, revamping de la colonne Auteurs
// @version        0.32
// @date           2010-02-27
// @include        http://*.audiofanzine.com/*
// ==/UserScript==

// Retrouvez la derniere version de ce script sur http://userscripts.org/scripts/show/27261

// Integration du framework jQuery depuis le site AFv4, donc normalement en cache dans le navigateur
// Methode 1, ne fonctionne plus :
// http://wiki.greasespot.net/Code_snippets#jQuery_in_Greasemonkey_scripts_using_the_metadata_key_.40require
// Methode 2, pas reussi non plus et oblige a mettre tout le code dans le script.addEventListener('load', function() ...) :
// http://11heavens.com/using-greasemonkey-to-load-and-use-jQuery
// Methode 3, similaire aux deux precedentes, mais semble fonctionner :
// http://www.vinch.be/blog/2007/02/06/faites-profiter-greasemonkey-de-la-puissance-de-jquery
// http://joanpiedra.com/jquery/greasemonkey/

var GM_JQ = document.createElement("script");
GM_JQ.src = "http://static.audiofanzine.com/scripts/jquery/jquery.js?1260372067";
GM_JQ.type = "text/javascript";
document.getElementsByTagName("head")[0].appendChild(GM_JQ);
// Check if jQuery's loaded
function GM_wait() {
    if (typeof unsafeWindow.jQuery == 'undefined') { window.setTimeout(GM_wait, 100); }
    else { jQ$ = unsafeWindow.jQuery; letsJQuery(); }
}
GM_wait();
// All your GM code must be inside this function
function letsJQuery() {
    // alert(jQ$); // check if the dollar (jquery) function works

    /* votre script ici */

    // Gestion du Menu GM ----------------------------------------------

    // Ajoute dans le menu de GM la commande permettant de saisir son ID
    GM_registerMenuCommand(GM_getValue("posteurIdGM") ? "AFv4 - Désactiver les liens en barre de recherche pour votre identifiant (" + GM_getValue("posteurIdGM") + ")" : "AFv4 - Activer les liens en barre de recherche pour votre identifiant", togglePosteurIdGM);
    // Ajoute dans le menu de GM la commande permettant d'activer ou de desactiver toutes les options
    // GM_registerMenuCommand(GM_getValue("removeAllGM") ? "AFv4 - Tout Afficher" : "AFv4 - Tout Masquer", toggleAllGM);
    // Ajoute dans le menu de GM la commande permettant de supprimer ou pas l'en-tete "Audiofanzine"
    GM_registerMenuCommand(GM_getValue("removeAFHeaderGM") ? "AFv4 - Afficher l\'en-tête \"Audiofanzine\" et les menus déroulants" : "AFv4 - Masquer l\'en-tête \"Audiofanzine\" et les menus déroulants", toggleRemoveAFHeaderGM);
    // Ajoute dans le menu de GM la commande permettant de supprimer ou pas l'en-tete "Categorie"
    GM_registerMenuCommand(GM_getValue("removeCategoryGM") ? "AFv4 - Afficher l\'en-tête \"Catégorie\"" : "AFv4 - Masquer l\'en-tête \"Catégorie\"", toggleRemoveCategoryGM);
    // Ajoute dans le menu de GM la commande permettant de supprimer ou pas les liens "Consultez vos sujets"
    GM_registerMenuCommand(GM_getValue("removeForumSearchLinksGM") ? "AFv4 - Afficher les liens \"Consultez vos sujets\"" : "AFv4 - Masquer les liens \"Consultez vos sujets\"", toggleRemoveForumSearchLinksGM);
    // Ajoute dans le menu de GM la commande permettant d'activer ou pas le revamping des forums
    GM_registerMenuCommand(GM_getValue("revampeForumsGM") ? "AFv4 - Rétablir l\'apparence des forums" : "AFv4 - Modifier l\'apparence des forums", toggleRevampeForumsGM);

    // Test des booleens
    if (GM_getValue("posteurIdGM") != '0') {
        topBarJQ();
    }
    // Test des options individuelles du menu GM
    GM_getValue("removeAFHeaderGM") ? removeAFHeader() : GM_setValue("removeAFHeaderGM", false);
    GM_getValue("removeCategoryGM") ? removeCategoryHeader() : GM_setValue("removeCategoryGM", false);
    GM_getValue("removeForumSearchLinksGM") ? removeForumSearchLinks() : GM_setValue("removeForumSearchLinksGM", false);
    GM_getValue("revampeForumsGM") ? revampeForums() : GM_setValue("revampeForumsGM", false);

    // Debug
    // debugBooleens("Après ");
    // Fin Debug
    
    function rechargePage() {
        // Debug
        // debugBooleens("Avant");
        // Fin Debug
        window.location.reload();
    }

    function debugBooleens(s) {
        alert(s + " rechargement de page : \r\nremoveAllGM = " + GM_getValue("removeAllGM") + "\r\nremoveAFHeaderGM = " + GM_getValue("removeAFHeaderGM") + "\r\nremoveCategoryGM = " + GM_getValue("removeCategoryGM") + "\r\nremoveForumSearchLinksGM = " + GM_getValue("removeForumSearchLinksGM") + "\r\nrevampeForumsGM = " + GM_getValue("revampeForumsGM"));
    }

    // Fonction pour autoriser la saisie de l'identifiant numerique de l'utilisateur AF
    // On pourrait recuperer cette valeur directement dans la page en parsant l'URL du lien vers le profil utilisateur
    // source : http://userscripts.org/scripts/show/10458 (Google Extra)
    function togglePosteurIdGM() {
        if (GM_getValue("posteurIdGM", true)) {
            GM_setValue("posteurIdGM", prompt("Entrez votre identifiant numérique sur Audiofanzine.\n\nIl s\'agit de la valeur \'u\' pour User dans le lien vers votre fiche Membre :\n\nhttp://fr.audiofanzine.com/membres/a.play,u.??.html", "0"));
        }
        rechargePage();
    }

    // Fonction pour activer ou de desactiver toutes les options
    function toggleAllGM() {
        GM_setValue("removeAllGM", !(GM_getValue("removeAllGM")));
        rechargePage();
    }

    // Fonction pour activer/desactiver l'affichage de l'en-tete "Audiofanzine" (gain de place vertical dans les forums)
    function toggleRemoveAFHeaderGM() {
        GM_setValue("removeAFHeaderGM", !(GM_getValue("removeAFHeaderGM")));
        rechargePage();
    }

    // Fonction pour activer/desactiver l'affichage de l'en-tete "Categorie" (gain de place vertical dans les forums)
    function toggleRemoveCategoryGM() {
        GM_setValue("removeCategoryGM", !(GM_getValue("removeCategoryGM")));
        rechargePage();
    }

    // Fonction pour activer/desactiver l'affichage des liens "Consultez vos sujets" (gain de place vertical dans les forums)
    function toggleRemoveForumSearchLinksGM() {
        GM_setValue("removeForumSearchLinksGM", !(GM_getValue("removeForumSearchLinksGM")));
        rechargePage();
    }

    // Fonction pour activer/desactiver le revamping des forums
    function toggleRevampeForumsGM() {
        GM_setValue("revampeForumsGM", !(GM_getValue("revampeForumsGM")));
        rechargePage();
    }

    // Fin Gestion du Menu GM ------------------------------------------

    function topBarJQ() {
        // Version jQuery
        var cible = jQ$("#topbar div.left li.last");
        cible.before("<li><a href=\"http://fr.audiofanzine.com/forums/a.search,mode.poster,u." + GM_getValue("posteurIdGM") + ".html\" title=\"Tous\">Tous</a></li>");
        cible.before("<li><a href=\"http://fr.audiofanzine.com/forums/a.search,mode.author,u." + GM_getValue("posteurIdGM") + ".html\" title=\"Créés\">Créés</a></li>");
        cible.before("<li><a href=\"http://fr.audiofanzine.com/forums/a.search,mode.monitor,u." + GM_getValue("posteurIdGM") + ".html\" title=\"Surveillés\">Surveillés</a></li>");
        cible.before("<li><a href=\"http://fr.audiofanzine.com/forums/a.search,mode.flag,u." + GM_getValue("posteurIdGM") + ".html\" title=\"Flagués\">Flagués</li>");  
    }
       
    // Suppression de l'en-tete "Audiofanzine" pour gagner de la place, ainsi que des menus deroulants, qui deviennent decales sans l'en-tete
    function removeAFHeader() {
        try {
            jQ$("#header").remove()
            jQ$("#menu-container").remove();
        }
        catch (e) {
            GM_log(e);
        }
    }

    // Suppression de l'en-tete "Categorie" pour gagner de la place
    // Supprime egalement les elements <h2 class="title blue"> presents sous le div="mainContent"
    function removeCategoryHeader() {
        try {
            jQ$("#categoryLogo").remove();
            // Suppression du commentaire en <dfn>
            jQ$("dfn").remove();
        }
        catch (e) {
            GM_log(e);
        }
        // Suppression des <h2 class="title blue">
        try {
            jQ$("h2.title").remove();
        }
        catch (e) {
            GM_log(e);
        }
    }

    // Suppression des liens Tous | Crees | Surveilles | Flagues en tete de forum (puisqu'on a ces liens en barre de recherche)
    function removeForumSearchLinks() {
        try {
            jQ$("#forumSearchLinks").remove();
        }
        catch (e) {
            GM_log(e);
        }
    }

    // Fonction pour revamper la colonne "Auteurs" dans le forum, la rendant plus proche de vBulletin

    function revampeForums() {
        // Aligne le "paginator" du haut a gauche et les "forumButtons" a droite sur la meme ligne
        jQ$("ul.paginator").eq(0).css("text-align", "left").css("width", "199px").css("float", "left");
        jQ$("ul.forumButtons").eq(0).css("width", "768px");
        // Aligne le "paginator" du bas a droite et les "forumButtons" a gauche sur la meme ligne (balises dans l'ordre inverse)
        jQ$("ul.forumButtons").eq(1).css("float", "left").css("width", "540px");
        jQ$("ul.paginator").eq(1).css("text-align", "right").css("width", "199px");
        // Decale le bouton "Retirer le drapeau" sur la droite
        // jQ$("li.leftButton").css("float", "left");
        // jQ$("li.rightButton").css("float", "left");
        // Supprime l'image du potard pour ne garder que le libelle du grade
        jQ$("div.forumGrade > img").remove();
        // Suppression des grades et remplacement par le nombre de posts
        for (i = 0; i <= jQ$("div.userAvatar").size() - 1; i++) {
            // alert("jQ$ est ok :\r\n" + jQ$ + "\r\n" + jQ$("div.userAvatar").size() + "\r\n" + i);
            // Recupere le nombre de posts de l'utilisateur courant dans l'attribut "alt" de l'image de l'avatar
            var nbPosts = jQ$("div.userAvatar").eq(i).find('img').attr("alt");
            // ...et supprime le " au compteur" (part de 0 jusqu'a la longueur de la chaine - 12)
            nbPosts = nbPosts.substr(0, nbPosts.length - 12);
            // Nettoie le forumGrade des espaces inutiles et ne garde qu'Admin ou Modo
            forumGrade = jQ$("div.forumGrade").eq(i).text();
            if (forumGrade.replace(/^\s+|\s+$/g, '') == "Administrateur du site" || forumGrade.replace(/^\s+|\s+$/g, '') == "Modérateur thématique") {
                jQ$("p.user_sLogin").eq(i).append("<br/>" + forumGrade).css("padding", "2px").css("margin", "0").css("background-color", "#800000").css("border", "1px solid #400000");
            }
            else {
                jQ$("p.user_sLogin").eq(i).append("<br/>");
            }
            jQ$("p.user_sLogin").eq(i).append("<br/>" + nbPosts);
            jQ$("div.forumGrade").eq(i).empty();
            jQ$("div.userAvatar").eq(i).css("text-align", "left");
        };
    };
};