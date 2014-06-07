// ==UserScript==
// @name Zeus Mod
// @description Affiche la signature des flottes posées
// @author Zeus/minipous (salon privé:Olympe/parler)
// @include http://genesis.exile.fr/game/fleets-standby.asp*
// @include http://genesis.exile.fr/game/ranking-alliances.asp*
// @include http://genesis.exile.fr/game/overview.asp
// @include http://genesis.exile.fr/game/map.asp?*
// ==/UserScript==

// Remerciement : Arkane (relecture), Reality (Debug)

// plusieurs configurations sont possibles, à vous de voir si vous voulez tout avoir
// ou juste certaines options.

//FAS:flottes au sol, cette option permet de faire un résumé des flottes au sol sur la page fleets-standby
//CM:cette option ajoute une colonne dans la table des alliances, avec le ratio colonies / membres
//PI:affichage de la puissance indus en temps réel et le gain par rapport à J-1

// mettez 1 pour activer ou 0 pour désactiver une option
var option = {
    "FAS": 1,
    "CM": 1,
    "PI": 1,
    "CTT": 1
};

var reg = /\d+\d*/g;
String.prototype.trim = function () {
    res = this.replace(/^\s*|\s*$|\s+/g, "");
    res = res.replace(/^[\s(&nbsp;)]+/g, '').replace(/[\s(&nbsp;)]+$/g, '');
    res = res.replace('&nbsp;', '');
    return res;
}


//FAS:flottes au sol, cette option permet de faire un résumé des flottes au sol sur la page fleets-standby
if (option["FAS"] && unsafeWindow.location.href.match('fleets-standby')) {

    var tot = 0;
    var Militaire = 0;
    var Utilitaire = 0;

    var tab_vaisseau = {
        "Sonde": [5, 'U', 0],
        "Cargo I": [80, 'U', 0],
        "Cargo V": [195, 'U', 0],
        "Cargo X": [375, 'U', 0],
        "Barge d'invasion": [135,'M',0],
        "Recolteur": [85,'U',0],
        "Vaisseau de colonisation": [330, 'U', 0],
        "Vaisseau mère de combat": [2750, 'M', 0],
        "Chasseur": [10, 'M', 0],
        "Intercepteur": [12, 'M', 0],
        "Prédateur":[0,'M',0],
        "Corvette lourde": [22, 'M', 0],
        "Corvette à tir multiple": [25, 'M', 0],
        "Frégate d'assaut": [70, 'M', 0],
        "Frégate à missiles": [125, 'M', 0],
        "Frégate à canon ionique": [0, 'M', 0],
        "Croiseur d'élite": [0, 'M', 0],
        "Croiseur de combat": [300, 'M', 0],
        "Croiseur": [170, 'M', 0],
        "Vaisseau radar": [0, 'M', 0],
        "Vaisseau de brouillage": [0, 'M', 0],
        "D: Laboratoire": [0, 'U', 0],
        "D: Usine d\'automates": [0, 'U', 0],
        "D: Atelier": [0, 'U', 0],
        "D: Centre de recherche": [0, 'U', 0],
        "D: Caserne militaire": [0, 'U', 0],
        "D: Hangar à minerai": [0, 'U', 0],
        "D: Hangar à hydrocarbure": [0, 'U', 0],
        "D: Usine de synthèse": [0, 'U', 0]
    };

    function Compter(vaisseau) {

        var regex = /\d+\d*/g;
        v = "";
        v = vaisseau.trim();
        GM_log(v);
        nb_v = v.match(regex);
        GM_log(nb_v);

        for (var key in tab_vaisseau) {
            if (vaisseau.match(key)) {
                nombre = parseInt(nb_v) + parseInt(tab_vaisseau[key][2]);
                tab_vaisseau[key][2] = nombre;
                break;
            }
        }

    }

    tableau = document.getElementById('fleets').getElementsByTagName('table')[0].getElementsByTagName('tbody')[0];

    var allDivs, thisDiv;
    allDivs = document.evaluate("//tr[@class='smallitem']/td/div", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);


    for (var i = 0; i < allDivs.snapshotLength; i++) {
        thisDiv = allDivs.snapshotItem(i);
        var fly = thisDiv.innerHTML;
        Compter(fly);
    }

    my_tr = document.createElement('tr');
    my_td_right = document.createElement('td');

    for (var key in tab_vaisseau) {
        if (tab_vaisseau[key][2] > 0) {

            var div_vaisseau = document.createElement('div');
            div_vaisseau.innerHTML = key + ' x' + tab_vaisseau[key][2] + ':(' + tab_vaisseau[key][2] * tab_vaisseau[key][0] + ')';
            if (tab_vaisseau[key][1] == 'U') {
                div_vaisseau.style['color'] = 'Cyan';
                Utilitaire = tab_vaisseau[key][2] * tab_vaisseau[key][0] + Utilitaire;
            }
            else {
                div_vaisseau.style['color'] = 'red';
                Militaire = tab_vaisseau[key][2] * tab_vaisseau[key][0] + Militaire;
            }
            my_td_right.appendChild(div_vaisseau);
            tot = tab_vaisseau[key][2] * tab_vaisseau[key][0] + tot;

        }
    }

    my_td_left = document.createElement('td');
    my_td_left.innerHTML = '- résumé -'
    my_tr.className = 'smallitem';
    my_tr.appendChild(my_td_left);
    my_tr.appendChild(my_td_right);
    tableau.parentNode.appendChild(my_tr);

    my_td_left = document.createElement('td');
    my_td_right = document.createElement('td');
    my_tr = document.createElement('tr');
    my_text = document.createTextNode('total:' + tot + ' --> [U:' + Utilitaire + '|M:' + Militaire + ']');
    my_td_right.appendChild(my_text);
    my_tr.appendChild(my_td_left);
    my_tr.appendChild(my_td_right);
    tableau.parentNode.appendChild(my_tr);

}

//CM:cette option ajoute une colonne dans la table des alliances, avec le ratio colonies / membres
if (option["CM"] && unsafeWindow.location.href.match('ranking-alliances')) {
    var allDivs, thisDiv;
    allDivs = document.evaluate("//tr[@class='header']/td", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

    my_td_left = document.createElement('td');
    my_text = document.createTextNode('C/M');
    my_td_left.appendChild(my_text);
    allDivs.snapshotItem(2).parentNode.insertBefore(my_td_left, allDivs.snapshotItem(2));


    allDivs = document.evaluate("//table[@class='default']/tbody/tr/td", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

    allDivs.snapshotItem(5).setAttribute('colspan', '5');
    allDivs.snapshotItem(allDivs.snapshotLength - 1).setAttribute('colspan', '5');

    for (var i = 6; i < allDivs.snapshotLength; i++) {
        var s = allDivs.snapshotItem(i).innerHTML;
        if (s.indexOf("/") > 0 && !s.match("href")) {
            var nb_membres = parseInt(s.substring(0, s.indexOf("/")));
            var nb_colo = parseInt(allDivs.snapshotItem(i + 1).innerHTML);
            my_td_left = document.createElement('td');
            my_text = document.createTextNode((nb_colo / nb_membres).toFixed(2));
            my_td_left.appendChild(my_text);
            allDivs.snapshotItem(i + 1).parentNode.insertBefore(my_td_left, allDivs.snapshotItem(i + 1));
        }
    }
}

// fonction de Draak145


function formatNumber(num) {
    var str = (num + "").split("."),
        dec = str[1] || "",
        num = str[0].replace(/(\d)(?=(\d{3})+\b)/g, "$1 ");
    return (dec) ? num + ',' + dec : num;
}

//PI:a ffichage de la puissance indus en temps réèl et le gain par rapport à J-1
if (option["PI"] && unsafeWindow.location.href.match('overview')) {

    var overview = document.getElementById('stats').getElementsByTagName('table')[0];

    for (i = 0; i < overview.getElementsByTagName('div').length; i++) {
        div = overview.getElementsByTagName('div')[i];

        if (div.getElementsByTagName('span')[0].firstChild.nodeValue == 'Minerai: ') var Minerai = parseInt(div.getElementsByTagName('span')[2].firstChild.nodeValue.trim().replace('+', ''));

        if (div.getElementsByTagName('span')[0].firstChild.nodeValue == 'Hydrocarbure: ') var Hydrocarbure = parseInt(div.getElementsByTagName('span')[2].firstChild.nodeValue.trim().replace('+', ''));

        if (div.getElementsByTagName('span')[0].firstChild.nodeValue == 'Energie: ') var Energie = parseInt(div.getElementsByTagName('span')[2].firstChild.nodeValue.trim().replace('+', ''));

        if (div.getElementsByTagName('span')[0].firstChild.nodeValue == 'Fonctionnaires: ') var Fonctionnaires = parseInt(div.getElementsByTagName('span')[2].firstChild.nodeValue.trim().replace('+', ''));

        if (div.getElementsByTagName('span')[0].firstChild.nodeValue == 'Puissance industrielle: ') {
            var puissance = parseInt(div.getElementsByTagName('span')[1].firstChild.nodeValue.trim().replace('(', ''));
            var Somme = Minerai + Hydrocarbure + Energie + Fonctionnaires;
            var gain = Somme - puissance;
            var PI = div.getElementsByTagName('span')[0].innerHTML
            div.getElementsByTagName('span')[0].innerHTML = PI + formatNumber(Somme) + ' (<span class="prod">+' + formatNumber(gain) + '</span>) / ';


        }
    }

}

var liste_planete = new Array();
var liste_flotte = new Array();

function add_planete(texte) {
    // exemple showmenu('planet.1','Planète','Terrain: 58<br>Espace: 9')
    var regex = /\d+\d*/g;
    taille = texte.match(regex);
    liste_planete.push(taille);

}

Array.prototype.in_array = function(p_val) {
	for(var i = 0, l = this.length; i < l; i++) {
		if(this[i] == p_val) {
			return true;
		}
	}
	return false;
}


function by(i, dir) {
    return function (a, b) {
        a = a[i];
        b = b[i];
        return a.toLowerCase() == b.toLowerCase() ? 0 : (a.toLowerCase() < b.toLowerCase() ? -1 * dir : dir)
    }
}

function add_flotte(texte) {
    // exemple showmenu('fleets.1','Flottes',descOrbit(1,125976,-3,0))
   // comming soon..
}

//CTT: affiche les planetes en mode texte a coté de la carte
if (option["CTT"] && unsafeWindow.location.href.match('map')) {

    allDivs = document.evaluate("//a[@class='none']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

    for (var i = 0; i < allDivs.snapshotLength; i++) {
        thisDiv = allDivs.snapshotItem(i);
        var tooltip = thisDiv.getAttribute("onmouseover");
        if (tooltip.match('planet')) { // traitement pour planete
            add_planete(tooltip);
        }
        if (tooltip.match('fleets')) { // traitement pour flottes
        // comming soon..
        }
        //GM_log(tooltip);
        //GM_log(thisDiv.innerHTML);
        //GM_log(thisDiv.onmouseover);
    }

    
   var inhab = new Array();
   var ally = new Array();
   var self = new Array();
   var friend = new Array();
   var enemy = new Array();
   
   allDivs = document.evaluate("//div[@class='planet']/table/tbody/tr/td[@class='planetname']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
    for (var i = 0; i < allDivs.snapshotLength; i++) {
        thisDiv = allDivs.snapshotItem(i);
        if (thisDiv.getElementsByTagName('span')[0])
        inhab.push(i+1);
        if (thisDiv.getElementsByClassName('ally')[0])
        ally.push(i+1);
        if (thisDiv.getElementsByClassName('self')[0])
        self.push(i+1);
        if (thisDiv.getElementsByClassName('friend')[0])
        friend.push(i+1);
        if (thisDiv.getElementsByClassName('enemy')[0])
        enemy.push(i+1);

    } 

    //liste_planete.multiSort(1);
    liste_planete.sort(by(1, -1));    

    for (var i = 0; i < liste_planete.length; i++) {
        my_td_left = document.createElement('tr');
        texte = liste_planete[i][0] + ' : ' + liste_planete[i][1] + ' / ' + liste_planete[i][2];
        my_text = document.createTextNode(texte);
        my_td_left.appendChild(my_text);
        if (inhab.in_array(liste_planete[i][0])) 
        my_td_left.style['color'] = 'white';
        else if (ally.in_array(liste_planete[i][0])) 
        my_td_left.style['color'] = '#00FF00';
        else if (self.in_array(liste_planete[i][0])) 
        my_td_left.style['color'] = '#7777FF';
        else if (friend.in_array(liste_planete[i][0])) 
        my_td_left.style['color'] = '#008000';
        else if (enemy.in_array(liste_planete[i][0])) 
        my_td_left.style['color'] = '#FF4444';
                
        my_td_left.style['background'] = 'black';

        document.getElementById('gal_open').parentNode.insertBefore(my_td_left, document.getElementById('gal_open'));
    }




}