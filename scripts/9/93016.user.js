// ==UserScript==
// @name           Espionner
// @namespace      spaccon
// @author         Darka Maul <honjoutaka@gmail.com>
// @description    Rend un peu plus confortable une des options de la cartho alliance du mode confort.
// @include        http://*.spaccon.net/game/alliance.php?session=*&page=cartography&a=viewuser&login=*
// ==/UserScript==

// On récupère la session et on créer les urls
url = location.href;
session = url.substring(url.indexOf('=')+1, url.indexOf('&'));

baseUrl = url.substring(0, url.lastIndexOf('/') + 1);
urlSpy = baseUrl + 'galaxy_action.php?session=' + session + '&action=spy&number_ship_8=5&id=';
urlGal = baseUrl + 'galaxie.php?session=' + session + '&galaxy=';

//On récupère le tableau des planètes
tableEspio = document.getElementsByTagName('table')[1];
listePlanete = tableEspio.childNodes[1].childNodes;

//On ajoute une colonne pour l'affichage des planètes et des lunes
listePlanete[0].childNodes[3].setAttribute('colspan', '2');
listePlanete[0].childNodes[5].setAttribute('colspan', '2');

nombrePlanete = (listePlanete.length - 2) / 2;
for (i = 1; i <= nombrePlanete; i++)
{
    ligne = i * 2;
    
    textePlanete = listePlanete[ligne].childNodes[3].textContent;
    coordoPlanete = textePlanete.split(':');
    
    //On rajoute les 0 dans les coordonnées
    coordoPlanete[1] = (coordoPlanete[1].length < 3) ? ((coordoPlanete[1].length < 2) ? '00'+coordoPlanete[1] : '0'+coordoPlanete[1]) : coordoPlanete[1];
    coordoPlanete[2] = (coordoPlanete[2].length < 2) ? '0'+coordoPlanete[2] : coordoPlanete[2];
    
    //On créer l'URL et le texte avec l'image (pour espionner)
    lastSpyUrl = urlSpy + coordoPlanete[2] + '&coordtospy=' + coordoPlanete[0] + coordoPlanete[1] + coordoPlanete[2];
    finalText = '<a href="#" id="lien' + i +'"><img name="' + lastSpyUrl + '" src="http://skins.spaccon.net/evasion/img/e.gif" /></a>';
    
    // On creer l'élement et on l'affiche (pour espionner la planète)
    newElement = document.createElement('th');
    newElement.innerHTML = ' ' + finalText;
    listePlanete[ligne].insertBefore(newElement, listePlanete[ligne].childNodes[5]);
    
    //On créer le trigger associé
    document.getElementById('lien' + i).addEventListener('click', espionner, true);
    
    //On s'occupe du lien clickable galaxie
    lastGalUrl = urlGal + coordoPlanete[0] + '&system=' + coordoPlanete[1];
    text = listePlanete[ligne].childNodes[3].innerHTML; // on stocke le texte
    
    newLink = document.createElement('a');
        newLink.setAttribute('href', lastGalUrl);
        newLink.innerHTML = '[' + listePlanete[ligne].childNodes[3].innerHTML + ']';

    cellule = listePlanete[ligne].childNodes[3];
        cellule.innerHTML = '';
        cellule.appendChild(newLink);
       
    //La lune (on affiche si elle existe)
    texteLune = listePlanete[ligne].childNodes[6].innerHTML;
    newElement = document.createElement('th');
    if (!texteLune.match('&nbsp'))
    {
        lastSpyUrlMoon = lastSpyUrl + '&moon=true';
        finalText = '<a href="#" id="moon' + i +'"><img name="' + lastSpyUrlMoon + '" src="http://skins.spaccon.net/evasion/img/e.gif" /></a>';

        // On creer l'élement et on l'affiche (pour espionner la planète)
        newElement = document.createElement('th');
        newElement.innerHTML = ' ' + finalText;
        listePlanete[ligne].insertBefore(newElement, listePlanete[ligne].childNodes[7]);

        //Trigger associé
        document.getElementById('moon' + i).addEventListener('click', espionner, true);
    }
    else
    {
        newElement.innerHTML = '&nbsp';
        listePlanete[ligne].insertBefore(newElement, listePlanete[ligne].childNodes[7]);
    }
}

function espionner(e)
{
    checkUrl = 'http://cdn1.iconfinder.com/data/icons/diagona/icon/10/102.png'; //image en cas de succès
    failedUrl = 'http://cdn1.iconfinder.com/data/icons/diagona/icon/10/101.png'; // ou d'échec
    
    a = document.getElementById(e.currentTarget.id).parentNode;
    GM_xmlhttpRequest({
        method: 'GET',
        url: e.target.name,
        onload: function (response)
        {
            rapport = response.responseText;
            if (rapport.match('alert')) // Message d'erreur
                a.innerHTML = '<img src="' + failedUrl + '" />';
            else
                a.innerHTML = '<img src="' + checkUrl + '" />';
        }
    });

    return false;
}