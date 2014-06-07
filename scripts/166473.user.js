// ==UserScript==
// @name        Filtre événements
// @namespace   http://dev.webnaute.net
// @description Filtrer les événements par type
// @include     http://www.lesroyaumes.com/EcranPrincipal.php?l=2*
// @version     1
// ==/UserScript==
//
//
unsafeWindow.toggleLines = function (obj)
{
    var visibility;
    if (obj.checked == true) {
        visibility = "block";
    } else {
        visibility = "none";
    }
    var elements = document.getElementsByClassName(obj.name);
    for (var elt = 0 ; elt < elements.length ; ++elt) {
        elements[elt].style.display = visibility;
    }
}


unsafeWindow.elementsTextuelsNavigation[3]['Nom'] = '&Eacute;v&eacute;nements : <input onchange="toggleLines(this)" type=checkbox checked name="travail"/>Travail <input onchange="toggleLines(this)" type=checkbox checked name="marche"/>March&eacute; <input onchange="toggleLines(this)" type=checkbox checked name="champ"/>Champs <input onchange="toggleLines(this)" type=checkbox checked name="depl"/>Déplacement <input onchange="toggleLines(this)" type=checkbox checked name="autres"/>Autres';

var evts = unsafeWindow.textePage[3]['Texte'].split('<div class="evenementLigne">');
var i;

var classif = new Array();
classif['ous avez achet'] = 'marche';
classif['ous avez vendu'] = 'marche';
classif['ous avez produit'] = 'propriete';
classif['ous avez r&eacute;colt'] = 'propriete';
classif['ous avez embauch'] = 'propriete';
classif['ous avez &eacute;t&eacute; embauch'] = 'travail';
classif['ous avez gagn'] = 'travail';
classif['ous avez re'] = 'travail'; // Salaire maréchaussée et armée
classif['avez frapp'] = 'deplacement';
classif['vous a port'] = 'deplacement';
classif['le combat contre'] = 'deplacement';
classif['tentative de r'] = 'deplacement';
classif['z racket'] = 'deplacement';


unsafeWindow.textePage[3]['Texte'] = evts[0];
for (i = 1 ; i < evts.length ; ++i) {
    var addclass = "";
    for (cl in classif) {
        if (evts[i].indexOf(cl) > 0) {
            addclass = classif[cl];
            break;
        }
    }
    if (addclass == "")  addclass = "autres";
    unsafeWindow.textePage[3]['Texte'] += 
        '<div class="evenementLigne '+addclass+'">'+evts[i];
}

