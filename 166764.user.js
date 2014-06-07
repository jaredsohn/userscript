// ==UserScript==
// @name        Je vais a la mine et c'est ma joie
// @namespace   http://dev.webnaute.net
// @description Aller automatiquement à la mine
// @include     http://www.lesroyaumes.com/EcranPrincipal.php?l=8*
// @include     http://www.kraljestva.com/EcranPrincipal.php?l=8*
// @version     1
// ==/UserScript==

var long_timeout = 0;
var glob_timeout = 0;
unsafeWindow.disabled_by_user = 0;

// Dans combien de temps on clique
function calcule_timeout()
{
    var d = new Date;
    var timeout;
    var timeout_h = 0;
    var next_t = GM_getValue ("mine_auto", 0) - d.getTime() / 1000;
    var activite = document.getElementsByClassName('elementActivite')[0];
    var temps_restant = document.getElementById('chrono');
    if (temps_restant == undefined) {
        if (activite && activite.getElementsByClassName('styleErreurInterligneSimple')[0]) {
            // Pas de temps restant, pas d'activité : on clique dans 30 secondes
            return next_t > 30 ? next_t : 30;
        } else {
            // Activité non désynchro :attendre demain
            var ts = 18800 + 86400 * (1 + Math.floor((d.getTime()/1000 - 15200) / 86400));
            return ts - d.getTime() / 1000;
        }
    }

    // Temps restant trouvé : on l'analyse
    if (temps_restant.innerHTML != undefined) {
        var temps_str = temps_restant.innerHTML;
        timeout = 0;
        for (i = 0 ; i < temps_str.length ; ++i) {
            var c = temps_str.charAt(i);
            if (c == ':') { timeout_h = timeout ; timeout = 0; }
            else timeout = timeout * 10 + parseInt (c);
        }
    }
    timeout = timeout_h * 3600 + timeout * 60 + 30; 
                                 // passer en secondes et attendre
                                 // 30 seconds après expiration
    // Délai au bout duquel il faut se reconnecter
    if (timeout > 180) long_timeout = 1;
    var d_fin = new Date;
    if (next_t > timeout) timeout = next_t;
    d_fin.setTime (d.getTime() + timeout * 1000);
    if (d_fin.getHours() == 4) timeout += 3600;
    return timeout;
}

function check_revolte()
{
    var d = new Date();
    if (d.getHours() != 3) return false;
    if (unsafeWindow.textePage[2]['Texte'].match(/mairie est m/)) { // La mairie a le statu quo et ...
        if (!unsafeWindow.textePage[2]['Texte'].match (/Milice de/) && // il n'y a pas de milicien
            !unsafeWindow.textePage[2]['Texte'].match (/Groupe de ma/)) { // ni de maréchal
            if (d.getMinutes() < 55) {
                var remaining = (56 - d.getMinutes()) * 60000;
                long_timeout = 1;
                setTimeout(mine_auto, remaining);
                return true;
            }
            document.getElementsByClassName("zone_nbre_joueurs")[0].innerHTML = '<form id="revoltezmoi" xmlns="http://www.w3.org/1999/xhtml" method="post" action="Action.php?action=49"><input type="hidden" value="n" name="comte"/><input type="submit" value="Se révolter (une journée de travail)" name="revolte" class="boutonActionJour"/></form>';
            document.getElementById("revoltezmoi").submit();
        } 
    }
    return false;
}

function mine_auto()
{
    if (long_timeout) {
        // s'il faut se reconnecter on le fait
        location.href = "/ConnexionKC.php?l=" + unsafeWindow.loginJoueur + "&redirActivite=EcranPrincipal.php?l=8%26a=1";
        return;
    }
    // recherche de la meilleure mine ou à défaut du RMI
    var meilleur_tarif = 0.0;
    var meilleur_form = undefined;
    var durees = document.getElementsByName("duree");
    for (var i = 0 ; i < durees.length ; ++i) {
        if (durees[i].value != 1) continue;
        var tarif = durees[i].nextSibling.firstChild.firstChild.nextSibling.firstChild.nextSibling.data.replace(/,/,".");
        if (tarif > meilleur_tarif) {
            meilleur_tarif = tarif;
            meilleur_form = durees[i].parentNode;
        }
    }
    // Rien trouvé on n'est peut-être pas sur la page Mine. On y retourne
    if (meilleur_form == undefined) {
        location.href = "/EcranPrincipal.php?l=8&a=1";
        return;
    }
    var d = new Date(); // retenir l'heure du dernier clic pour ne pas 
                        // recharger trop souvent la page (90 secondes de délai)
    var ts = 90 + d.getTime() / 1000;
    GM_setValue ("mine_auto", "" + ts); // Forcer l'enregistrement en string
    meilleur_form.submit();
}

if (document.location.search.match(/mine=1$/) ) {
    GM_setValue ("mine_auto", "1");
    location.href = "/EcranPrincipal.php?l=8&a=1";
    return;
} else if (document.location.search.match(/mine=0$/) ) {
    GM_deleteValue ("mine_auto");
    location.href = "http://lesroyaumes.com/EcranPrincipal.php?l=8&a=1";
    return;
} else if (document.location.search.match(/mine=demain/) ) {
    d = new Date;
    var ts = 18800 + 86400 * (1 + Math.floor((d.getTime()/1000 - 15200) / 86400));
    GM_setValue ("mine_auto", "" + ts);
}

if (GM_getValue ("mine_auto", 0) != 0) {
    if (check_revolte() == false) {
        glob_timeout = calcule_timeout();
        unsafeWindow.textePage[1]['Texte'] =
            '<a href="?l=8&a=1&mine=0">Ne plus aller automatiquement à la mine</a><br><a href="?l=8&a=1&mine=demain">Ne retourner à la mine que demain</a><br>(prochain tour à la mine dans ' + Math.floor(glob_timeout /60) + " minutes environ)"
            + unsafeWindow.textePage[1]['Texte'];
        setTimeout (mine_auto, glob_timeout * 1000);
    } else {
         unsafeWindow.textePage[1]['Texte'] = 'Révolte en cours<br/><br/>' + unsafeWindow.textePage[1]['Texte'];
    }
} else {
    unsafeWindow.textePage[1]['Texte'] = 
        '<a href="?l=8&a=1&mine=1">Aller automatiquement à la mine</a>' 
        + unsafeWindow.textePage[1]['Texte'];
}
