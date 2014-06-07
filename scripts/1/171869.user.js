// ==UserScript==
// @name        Temps restant
// @namespace   http://dev.webnaute.net
// @description Affiche à droite de l'activité le temps restant avant la mise à jour
// @include     http://www.lesroyaumes.com/EcranPrincipal.php*
// @include     http://*.nativekingdoms.com/EcranPrincipal.php*
// @include     http://*.shogunkingdoms.com/EcranPrincipal.php*
// @exclude     *?l=6*
// @version     2
// ==/UserScript==
//
//
var s0 = document.getElementsByClassName("zone_caracteristiques2")[0];
var s;
if (s0) {
    s = s0.getElementsByClassName("caracteristique")[0];
} else {
    s = document.getElementsByClassName("caracteristique01")[0].
                 getElementsByClassName("texte")[0];
}

function update_s(s,maj) {
    var d = new Date();
    var h = 23 - d.getHours() + maj;
    var m = 59 - d.getMinutes();

    while (m < 0) { m += 60; --h; }
    h %= 24;
    s.innerHTML = '<div class="element elementLeft caracteristique03"></div>' +
'<div class="element elementRight elementPetit">Reste '+h+':'+(m<10?"0":"") + m+'</div>' ;
}

if (unsafeWindow.typeJeu == "RR") {
    update_s(s,4);
} else if (unsafeWindow.typeJeu == "SK") {
    update_s(s,15);
} else if (unsafeWindow.typeJeu == "TN") {
    update_s(s,11);
} else if (unsafeWindow.typeJeu != undefined) {
    s.innerHTML = '<div class="element elementLeft caracteristique03"></div>' +
'<div class="element elementRight elementPetit">Jeu '+unsafeWindow.typeJeu+' inconnu</div>' ;
}


