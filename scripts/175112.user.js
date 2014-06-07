// ==UserScript==
// @name        Ikarally Blocker script
// @namespace   http://www.ikarally.com/
// @description	Block ikariam messages
// @include     http://s*.ikariam.gameforge.com/*
// @grant       GM_xmlhttpRequest
// ==/UserScript==

// Indiquer ici l'ID des joueurs à ignorer
// Pour récupérer l'ID d'un joueur, ouvrir l'un des ses message, survoler le boutton "Répondre" et analyser l'URL en bas à gauche de l'écran
// Par exemple : http://s21-fr.ikariam.gameforge.com/index.php?view=sendIKMessage&receiverId=292&replyTo=109536&backgroundView=city&currentCityId=47800&templateView=diplomacyAdvisor&actionRequest=d70eef83bc163477aa14b0ee5fcca2b5
// l'ID du joueur ici est 292 (juste après le terme "receiverId")
// Ajouter cet ID au tableau ci dessous. Par exemple, pour ignorer les ID 5, 10 et 30 :
// var indesirables = [5, 10, 30]; 

var indesirables = []; 

unsafeWindow.ajax.Responder.IkaChangeView2 = unsafeWindow.ajax.Responder.changeView;
unsafeWindow.ajax.Responder.changeView = function(params) {
    var id = params[0];
    unsafeWindow.ajax.Responder.IkaChangeView2(params);
    if (id == 'diplomacyAdvisor') {
        for (var i =0 ; i< document.getElementsByClassName("subject").length ;i++) {
            var message = document.getElementsByClassName("subject")[i].parentNode.nextSibling.nextSibling.nextSibling.nextSibling;
            if (indesirables.indexOf(parseInt(message.getElementsByClassName("button")[0].href.split("&")[1].replace( /[^0-9-]/g, ""))) > -1) {
                message.style.display = 'none';
                message = message.previousSibling.previousSibling;
                message.style.display = 'none';
                message = message.previousSibling.previousSibling;
                message.style.display = 'none';
            }
    	}
    }
}
