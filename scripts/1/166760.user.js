// ==UserScript==
// @name        Hé ho ! Hé ho ! On rentre du boulot !
// @description Ouvre une pop-up quand on a fini son travail, pour pouvoir y retourner plus rapidement
// @namespace   http://dev.webnaute.net
// @include     http://www.lesroyaumes.com/EcranPrincipal.php*
// @version     1
// ==/UserScript==

// Popup de fin
function fin_activite()
{
    var popup = window.open ("about:blank", "activite_window", "height=200 ,status=0,menubar=0,width=300");
    if (popup) {
        popup.document.write (unsafeWindow.loginJoueur + " a fini son travail !");
        popup.focus();
    } else { // Si un bloqueur de popup est installé
        alert (unsafeWindow.loginJoueur + " a fini son travail !");
    }
}

// Dans combien de temps on clique
function calcule_timeout()
{
    var d = new Date;
    var timeout;
    var timeout_h = 0;
    var temps_restant = document.getElementById('chrono');
    if (temps_restant == undefined) {
        // Pas de temps restant : pas d'activité
        return undefined;
    }
    if (temps_restant.innerHTML == undefined) {
        return undefined;
    }

    // Temps restant trouvé : on l'analyse
    var temps_str = temps_restant.innerHTML;
    timeout = 0;
    for (i = 0 ; i < temps_str.length ; ++i) {
        var c = temps_str.charAt(i);
        if (c == ':') { timeout_h = timeout ; timeout = 0; }
        else timeout = timeout * 10 + parseInt (c);
    }
    timeout = timeout_h * 3600 + timeout * 60 + 30; 
                                 // passer en secondes et attendre
                                 // 30 seconds après expiration
    return timeout * 1000;
}


var w_timeout = calcule_timeout();
if (w_timeout != undefined) {
    setTimeout (fin_activite, w_timeout);
}
