// ==UserScript==
// @name           Rentabilité
// @namespace      spaccon
// @description    Calcul de Rentabilité
// @include        http://*.spaccon.*/game/rc.php?session=*&rc=*&w=*
// @include        http://*.spaccon.*/game/ship_send3.php?session=*
// @include        http://*.spaccon.*/game/menu_g.php?session=*
// @include        http://*.spaccon.*/game/message.php?session=*&action=read&type=3
// @include        http://*.spaccon.*/game/info_compte.php?session=*
// ==/UserScript==

//Ajoute des points dans les nombres pour l'affichage (@copyright vulca)
function addPoints(nombre)
{
    nombre = parseInt(nombre);
    
    var signe = '';
    if (nombre < 0)
    {
        nombre = Math.abs(nombre);
        signe = '-';
    }
    
    var str = nombre.toString(), n = str.length;
    
    if (n <4)
        return signe + nombre;
    else 
        return  signe + (((n % 3) ? str.substr(0, n % 3) + '.' : '') + str.substr(n % 3).match(new RegExp('[0-9]{3}', 'g')).join('.'));
}


//Fonction qui créer le bbcode
function createBbCode(nom, valeur)
{
    couleur = GM_getValue(univers + 'color').split(',');
    
    bbCode = '[quote][align=center]'
       + '[u][color=' + couleur[0] + ']'+ nom[0] + ' :[/color][/u]\n'
       + '[color=' + couleur[1] + ']'   + nom[1] + ' : ' + valeur[0] + '[/color]\n'
       + '[color=' + couleur[2] + ']'   + nom[2] + ' : ' + valeur[1] + '[/color]\n'
       + '[color=' + couleur[3] + ']'   + nom[3] + ' : ' + valeur[2] + '[/color]\n'
       + '[color=' + couleur[4] + ']'   + nom[5] + ' : ' + valeur[4] + '[/color]\n'
       + '[/align][/quote]';
       
    return bbCode;
}

//Fonction appellée par le menu de gauche
function action_menu()
{
    //Noeuds de textes
    textNodes = [
        'Rentabilité',
        'Acier',
        'Silicium',
        'Deutéride',
        'Nombre de Raid',
        'Renta / Raid'
    ];
    
    //On récupère les ressources via GM
    ressources = [
        addPoints(GM_getValue(univers + 'a')),
        addPoints(GM_getValue(univers + 's')),
        addPoints(GM_getValue(univers + 'd')),
        GM_getValue(univers + 'rc').split(',').length - 2
    ];
    
    rentaParRaid = (GM_getValue(univers + 'a') + GM_getValue(univers + 's') + GM_getValue(univers + 'd')) / parseInt(ressources[3]);
    ressources[4] = addPoints(parseInt(rentaParRaid));
    
    //On crée le BBCode
    bbCode = createBbCode(textNodes, ressources);

    //On commence le tableau avec "Rentabilité"
    span1 = creer_element('span', textNodes[0]);
        
    //Lien pour l'export BBCode
    link = creer_element('a', '+', {id: 'getBbCode', href: '#', title: 'Obtenir le BBCode correspondant'});
    span2 = creer_element('span', [link], {style: 'float:right;'});
    
    //Première cellule ...
    newTd = creer_element('td', [span1, span2], {class: 'c', colspan: 2});
    // ... et ligne
    newTr = creer_element('tr', [newTd]);      
    
    //On ajoute le tout au tableau avant la boucle
    newTable = creer_element('table', [newTr], {width: 150});
    
    for (i = 1; i <= ressources.length; i++)
    {
        newTd1 = creer_element('td', textNodes[i]);
        newTd2 = creer_element('td', ressources[i - 1], {align: 'right'});                
        newTr = creer_element('tr', [newTd1, newTd2]);
            
        newTable.appendChild(newTr);
    }
    
    //On affiche l'input option
    newInput = creer_element('input', '', {id: 'option', type: 'submit'});
        newInput.value = 'Options';
    
    newTd = creer_element('td', [newInput], {colspan: 2, align: 'center'});
    newTr = creer_element('tr', [newTd]);
        newTable.appendChild(newTr);
    
    //On affiche le tableau
    blankArea = creer_element('p', '');
    document.getElementsByTagName('center')[0].appendChild(blankArea);
    document.getElementsByTagName('center')[0].appendChild(newTable);
    
    //On crée le span pour le pseudo
    span = creer_element('span', 'Nouveau pseudo ?  ', {id: 'newPseudo'});
        document.getElementsByTagName('center')[0].appendChild(span);
    
    //On crée le span pour le reset
    span = creer_element('span', '  Réinitialiser ?', {id: 'reset'});
        document.getElementsByTagName('center')[0].appendChild(span);
    
    // On ajoute le trigger pour le BBCode
    document.getElementById('getBbCode').addEventListener('click', function()
    {
        alert('BBCode à copier / coller sur un forum : \n\n' + bbCode);
    }, false);
    
    //On ajoute le trigger du pseudo
    document.getElementById('newPseudo').addEventListener('click', function()
    {
        if(confirm('Avez vous changé de pseudo ? (OK pour confirmer)'))
        {
            GM_setValue(univers + 'pseudo', 0);
            alert('Veuillez retourner sur la Vue générale pour prendre en compte votre nouveau pseudo');
        }
    }, false);
    
    //Trigger du reset
    document.getElementById('reset').addEventListener('click', function()
    {
        if(confirm('Souhaitez vous réinitialiser le compteur ? (OK pour confirmer)'))
        {
            GM_deleteValue(univers + 'time');
            alert('Compteurs réinitialisés. Veuillez retourner sur la vue générale pour prendre votre pseudo.');
        }
    }, false);
    
    //Trigger pours les options
    document.getElementById('option').addEventListener('click', afficher_option, false);
    
}

//Fonction pour créer rapidement des nouveaux élements
function creer_element(element, text, attributes)
{
    newElement = document.createElement(element);
    if (typeof text == 'string' || typeof text == 'number') {
        newElement.appendChild(document.createTextNode(text));
    } else if (typeof text == 'object') {
        for (child in text)
            newElement.appendChild(text[child]);
    }
    
    if (typeof attributes == 'object') {
        for (name in attributes)
            newElement.setAttribute(name, attributes[name]);
    }
    
    return newElement;
}

//On affiche les options après avoir clicker sur Options
function afficher_option()
{
    //Si on a pas déjà afficher les options une fois on crée la div
    if (document.getElementById('dispOption') == undefined) {
        couleurs = GM_getValue(univers + 'color').split(',');
       
        firstTd = creer_element('td', 'Options', {colspan: 2, align: 'center', class: 'c'});
        firstTr = creer_element('tr', [firstTd]);
        
        listeTr = [];
        listeTr[0] = firstTr;

        for (i = 1; i <= couleurs.length; i++)
        {
            td = creer_element('td', 'Couleur ' + i); //Td avec le nom de la couleur
            input = creer_element('input', '', {type: 'text', id: 'color'+i}); //Input
                input.value = couleurs[i - 1];              // avec la valeur actuelle
            tr = creer_element('tr', [td, input]);
            listeTr[i] = tr; //On l'ajoute à la liste des TR
        }
        
        input = creer_element('input', '', {id: 'validoption', type: 'submit'});
            input.value = 'Enregistrer';

        input2 = creer_element('input', '', {id: 'validoption2', type: 'submit', name: 'default'});
            input2.value = 'Default';
            
        td = creer_element('td', [input, input2], {colspan: 2, align: 'center'});
       
        listeTr[6] = creer_element('tr', [td]);
        table = creer_element('table', listeTr);
        
        div = creer_element('div', [table], {display: 'block', id: 'dispOption'});
            document.getElementsByTagName('center')[0].appendChild(div);
            
    } else //Sinon, on la réaffiche
        document.getElementById('dispOption').style.display = 'block';
        
    //On modifie les deux triggers
    document.getElementById('validoption').addEventListener('click', valid_option, false);
    document.getElementById('validoption2').addEventListener('click', valid_option, false);
    document.getElementById('option').removeEventListener('click', afficher_option, false);
}

//On valide les options
function valid_option(e)
{
    //Si on a clické sur défault
    if (e.target.name == 'default')
    {
        newColor = ['orangered', 'orange', 'coral', 'orangered', 'crimson'];
        for (i = 1; i <= 5; i++)
            document.getElementById('color' + i).value = newColor[i - 1];
    } else //Sinon
    {
        newColor = [];
        for (i = 1; i <= 5; i++)
            newColor[i - 1] = document.getElementById('color' + i).value;
    }
    
    GM_setValue(univers + 'color', String(newColor));
    
    document.getElementById('dispOption').style.display = 'none';
    
    //On modifie les triggers
    document.getElementById('validoption').removeEventListener('click', valid_option, false);
    document.getElementById('option').addEventListener('click', afficher_option, false);
    document.getElementById('validoption2').removeEventListener('click', valid_option, false);

}

//Fonction appellée si on est dans un rc
function action_rc()
{
    paramUrl = url.substr(url.indexOf('?') + 1);
    rcId = paramUrl.split('&')[1].split('=')[1];

    //On cherche si le combat n'a pas déjà été enregistré
    listeRc = GM_getValue(univers + 'rc');
    if (listeRc == undefined || listeRc.search(rcId) == -1)
    {
        //On récupère le pseudo
        pseudo = GM_getValue(univers + 'pseudo');
        if (pseudo == undefined || pseudo == 0) alert('Le script nécessite d\'être passé sur la vue générale avant');
        
        // On récupère le tableau du pillage
        table = document.getElementsByTagName('table');
        nombreTable = table.length;
        tableRessource = table[table.length - 3].firstChild;
        tablePertes = table[table.length - 4].firstChild;

        //On récupère les ressources pillées
        resPille = [0, 0, 0];
        for (var i = 4; i <= tableRessource.childNodes.length - 2; i += 2) {
            lignePillage = tableRessource.childNodes[i];
            if (lignePillage.textContent.search(pseudo) != -1)
            {
                resPille[0] += parseInt(lignePillage.childNodes[3].innerHTML.replace(/[^0-9-]/g, ''));
                resPille[1] += parseInt(lignePillage.childNodes[5].innerHTML.replace(/[^0-9-]/g, ''));
                resPille[2] += parseInt(lignePillage.childNodes[7].innerHTML.replace(/[^0-9-]/g, ''));
            }
        }
            
        //On recupère les pertes
        pertes = [0, 0, 0];
        for (var i = 4; i <= tableRessource.childNodes.length - 2; i += 2)
        {
            lignePertes = tablePertes.childNodes[i];
            if (lignePertes.textContent.search(pseudo) != -1)
            {
                pertes[0] += parseInt(lignePertes.childNodes[3].innerHTML.replace(/[^0-9-]/g, ''));
                pertes[1] += parseInt(lignePertes.childNodes[5].innerHTML.replace(/[^0-9-]/g, ''));
                pertes[2] += parseInt(lignePertes.childNodes[7].innerHTML.replace(/[^0-9-]/g, ''));
            }
        }

        //On ajoute les ressources pillées au totaux
            totalAcier = parseInt(GM_getValue(univers + 'a') + resPille[0] - pertes[0]);
                GM_setValue(univers + 'a', totalAcier);
            totalSili = parseInt(GM_getValue(univers + 's') + resPille[1] - pertes[1]);
                GM_setValue(univers + 's', totalSili);
            totalDeut = parseInt(GM_getValue(univers + 'd') + resPille[2] - pertes[2]);
                GM_setValue(univers + 'd', totalDeut);
                
        // ... et on ajoute le RC dans la liste des RC déjà compta
            listeRc = String(listeRc + rcId + ',');
                GM_setValue(univers + 'rc', listeRc);
    }

}

//Fonction appellée lors de l'envoi d'une flotte
function action_fleet()
{
    //On récupère la consommation de la flotte
    table = document.getElementsByTagName('table')[1];
    ligneConso = table.lastChild.childNodes[10].textContent;
    conso = parseInt(ligneConso.replace(/[^0-9-]/g, ''));
    
    //On soustrait la conso aux benef de Deut
    GM_setValue(univers + 'd', GM_getValue(univers + 'd') - conso);
   
}

//Fonction appelée sur la page des rapports de recyclage
function action_recyclage()
{
    table = document.getElementsByTagName('table');
    bigTime = parseInt(GM_getValue(univers + 'time')); //On prend l'heure depuis la dernière fois qu'on a travaillé
    
    for (i = 2; i <= table.length - 2; i++) {
        texteRecyclage = table[i].lastChild.childNodes[6].childNodes[1].textContent;
        if (texteRecyclage.match('Vous avez récupéré'))
        {
            dateHeureRc = table[i].lastChild.childNodes[2].childNodes[3].textContent;
            heureRc = dateHeureRc.substring(22).split(':');
            dateRc = dateHeureRc.substring(11, 21).split('/');
            date = new Date(dateRc[2], (dateRc[1] - 1), dateRc[0], heureRc[0], heureRc[1], heureRc[2], 0);
   
            if (GM_getValue(univers + 'time') < date.getTime())
            {   
            
                //On modifie l'heure du dernier rapport analysé
                bigTime = (date.getTime() > bigTime) ? date.getTime() : bigTime;
                
                var patt1=/([0-9.])+/gi;
                listeNombre = texteRecyclage.match(patt1);
                
                unitesAcier = parseInt(listeNombre[listeNombre.length - 3].replace(/[^0-9-]/g, ''));
                unitesSili = parseInt(listeNombre[listeNombre.length - 2].replace(/[^0-9-]/g, ''));
                        
                GM_setValue(univers + 'a', GM_getValue(univers + 'a') + unitesAcier);
                GM_setValue(univers + 's', GM_getValue(univers + 's') + unitesSili);
            }
        }
    }
    
    GM_setValue(univers + 'time', String(bigTime));
}

//Fonction appelée sur l'overview
function action_info()
{
    pseudo = GM_getValue(univers + 'pseudo')
    if (pseudo == undefined || pseudo == 0)
    {
        table = document.getElementsByTagName('table')[2].lastChild;
        textePseudo = table.childNodes[2].childNodes[1].lastChild.innerHTML;
        textePseudo = textePseudo.substring(10);
        actuelPseudo = textePseudo.substring(0, textePseudo.length - 5);
        
        GM_setValue(univers + 'pseudo', actuelPseudo);
    }
}


//On récupère l'url de la page pour savoir quelle fonction appeler
url = location.href;
univers = url.substring(7, url.indexOf('.'));
page = url.substring(url.lastIndexOf('/') + 1, url.indexOf('?'));

if (GM_getValue(univers + 'time') == undefined)
{
    GM_setValue(univers + 'time', 0);
    GM_setValue(univers + 'a', 0);
    GM_setValue(univers + 's', 0);
    GM_setValue(univers + 'd', 0);
    GM_setValue(univers + 'rc', ',');
    GM_setValue(univers + 'pseudo', 0);
    GM_setValue(univers + 'color', String(['orangered', 'orange', 'coral', 'orangered', 'crimson']));
}

switch (page)
{
    case 'menu_g.php':      action_menu();      break;   
    case 'rc.php':          action_rc();        break;       
    case 'ship_send3.php':  action_fleet();     break;
    case 'message.php':     action_recyclage(); break;
    case 'info_compte.php': action_info();      break;
    default:                                    break;
}
