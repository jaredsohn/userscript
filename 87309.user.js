// ==UserScript==
// @name           TeleramaTv++
// @namespace      sputnick
// @description    Interface allegee, login automatique, affichage de la grille correspondant a l'heure courante et theme noir.
// @include        http://television.telerama.fr/tele/grille.php
// @version        20130204
// ==/UserScript==

// VARIABLES A RENSEIGNER
var authz = 'true'      // 0 : pour desactiver l'authentification (pas de grille Telerama personnalisee), mettre false, laisser tel quel sinon
var login = 'xxxx';     // 1 : renseigner votre login ou mail ici avec celui enregistre sur le site telerama
var passw = 'xxxx';     // 2 : meme chose avec le mot de passe
var bgcol = 'black';    // optionnel : couleur du fond compatible avec les CSS (notation symbolique ou #RGB)
                        // 3 : vous pouvez effacer les 3 lignes suivantes ensuite
if (login === 'xxxx' && authz === 'true') {
	alert("Vous devez adapter les login/pass dans <profil firefox>/gm_scripts/teleramatv/teleramatv.user.js pour acceder a votre grille personnalisee ou bien vous devez desactiver l'authentification dans ce meme fichier. Voir les commentaires inclus.");
}


// LOGIN
if (document.getElementById('login') && authz === 'true') {
    try {
        document.getElementById('login').value=login;

        document.getElementById('pass').value=passw;
    
        document.getElementById('formidentifiant').submit();
    } catch(err) {
    }
}

location.href="javascript:(function(){ changerMaintenant(); })()"
    
// BODY CONTENT
var arr = ["t12-progtv", "t12-surheader", "t12-header", "t12-surmenu", "t12-menu", "fil", "listeurl", "t12-hcarrou", "t12-foot", "t12-foot-copy"];
for (i=0; i<arr.length; i++) {
    try {
        document.getElementById(arr[i]).parentNode.removeChild(document.getElementById(arr[i]));
    } catch(err) {
    }   
}

// CSS CONTENT
document.body.style.setProperty('background-color', bgcol, null);
document.getElementById("t12-gene").style.setProperty('background-color', bgcol, null);
document.body.style.backgroundImage="none";