// ==UserScript==
// @name		Clubic essential
// @namespace	
// @description	Refonte de la page principale en se focalisant sur l'actualité
// @include	http://www.clubic.com/
// @version	0.9.0.2b
// @author		Madcat
// ==/UserScript==

///////////////////////////////////// FONCTIONS /////////////////////////////////////

//  document.getElementById
function $(id) {
	return document.getElementById(id);
}

function getCookie (name) {
         if ( document.cookie) { // Le cookie est-il valide ?
                  index = document.cookie.indexOf( name);
                  if ( index != -1) {
                           nDeb = (document.cookie.indexOf( "=", index) + 1);
                           nFin = document.cookie.indexOf( ";", index);
                           if (nFin == -1) {nFin = document.cookie.length;}
                           return unescape(document.cookie.substring(nDeb, nFin));
                  }
         }
         return null;
}

// Retire tout element dont l'id (élement unique) ou la classe (dans ce cas il peut y en avoir plusieurs,
// et tous seront supprimés) équivaut à la variable elmt
function retire(elmt) {
	if ($(elmt) != null) {
		$(elmt).parentNode.removeChild($(elmt));
	}
	else {
		var elmts, thiselmt; elmts = document.evaluate( "//div[@class='"+elmt+"']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
		for (var i = 0; i < elmts.snapshotLength; i++) {
			thiselmt = elmts.snapshotItem(i); thiselmt.parentNode.removeChild(thiselmt);
		}
	}
}

// Surveillance des clics sur le panneau 'Actualités':
// -si on clique sur un lien: ouvre le lien cliqué, empêche 'l'ouverture par défaut' et met le lien actif en rouge
// -si on clique sur un bouton (toute l'actu / mon actu): 
function ouvreLien(e) {
	switch (e.target.nodeName.toUpperCase()) {
		case 'A':
			typeActu(); setLiens();
			for (i=0; i<liens.length; i++) {
				if (e.target == liens[i]) {
					e.stopPropagation(); e.preventDefault();
					blueLink();
					redLink(i);
					clucluData(i);
				}
			}
		break;
		case 'INPUT':
			if (e.target == boxMax) {
				actuType = 'max'; typeActu(); setLiens();
				redLink(isBoldMax); clucluData(isBoldMax);
				//alert('BoldPerso: ' + isBoldPerso + ' BoldMax: ' + isBoldMax); //debug
			}
			else if (e.target == boxPerso) {
				actuType = 'perso'; typeActu(); 
				delaySet = window.setTimeout(setLiens, 1000);
				delayBold = window.setTimeout(redLink, 1000, [isBoldPerso]);
				delayOuvre = window.setTimeout(clucluData, 1000, [isBoldPerso]);
				//alert('BoldPerso: ' + isBoldPerso + ' BoldMax: ' + isBoldMax); //debug
			}
		break;
	}
	// if (event.target.id == conteneur.id) {hleft.style.width = '0px'; hleft.style.visibility = 'hidden'; article.style.width = '1100px';}
}

// Détermine si actu = perso ou max
function typeActu() { 
	if (actuType == 'max' || actuType == null) {
		actu = actuMax 
	}
	else {
		actu = actuPerso
	}
}

// Crée la liste de liens d'actu
function setLiens() {
	try {
		liens = actu.getElementsByTagName('ul')[0].getElementsByTagName('a'); // alert(liens[0]); //debug
	}
	catch(err){
		delayLink = window.setTimeout(setLiens, 500)
	}
}

// Remet en bleu le lien qui devient inactif
function blueLink() {
	if (actuType == 'max') {
		liens[isBoldMax].style.color = 'rgb(0,0,128)'
	}
	else {
		liens[isBoldPerso].style.color = 'rgb(0,0,128)'
	}
}

//  Met en rouge le lien actif et le mémorise
function redLink(r) {
	if (actuType == 'max') {
		liens[r].style.color = 'rgb(199, 11, 11)'; isBoldMax = r
	}
	else {
		liens[r].style.color = 'rgb(199, 11, 11)'; isBoldPerso = r
	}
}

// Charge l'article dans la partie droite
function clucluData(d) {
	//alert(d); //debug
	//alert(isBoldPerso); //debug
	//alert(isBoldMax); //debug
	cluclu.data = liens[d];
	article.removeChild(cluclu); article.appendChild(cluclu);
	}
	
// Ajustement de la hauteur de homepagev
function heightAdjust() {
	if (h != window.innerHeight) {
		h = window.innerHeight; homepagev.style.height = h-80+glossaireOffset + 'px';
	}
}

function isVisible() {
	document.body.style.display = 'block';
}

/////////////////////////////////// FIN FONCTIONS ////////////////////////////////// 



///////////////////////////////////// ELEMENTS /////////////////////////////////////

homepagev = $('homepagev2');
hcontentR = $('h_contentright');

if ($('h_content').parentNode.id == 'cartouche_menu') { // definition de hcontent avec test de la présence d'un doublon et destruction du 1er hcontent s'il y a doublon
	$('h_content').parentNode.removeChild($('h_content'));
	hcontent = $('h_content');
	}
else {
	hcontent=$('h_content');
	}

hcontentdivs = hcontent.getElementsByTagName('div');
hhomepage = $('h_homepage');
conteneur = $('h_conteneur');
boxPerso = document.getElementById('checkbox_perso');
boxMax = document.getElementById('checkbox_max');
actuMax = $('h_flux_actuhitech_max');
actuPerso = $('h_flux_actuhitech_perso');
contdivs = conteneur.getElementsByTagName('div');
hleft = $('h_left');
header = $('header');
divPubLarge = hhomepage.getElementsByTagName('div')[0];
cartouche = document.getElementById('cartouche_menu');
cartoucheDivs = cartouche.getElementsByTagName('DIV');

var aretirer = ['h_pub_fine', 'h_pub_large', 'anepasmanquer_lr', 'h_contentleft', 'h_bloc_atelechargermax', 'h_bloc_atelechargerjv', 'h_right', 'btn_corporate_selected', 'btn_corporate', 'h_logo', 'bottom_link', 'corporate', 'videoGamesFlow', 'footer-contextuel', 'footer-groupe', 'footer_all', 'h_recherche', 'haut_dart_habillage', 'bas_dart_habillage'];
var actuType = getCookie('h_onglet');
var actu;
var liens;
var isBold = 0;
var isBoldPerso = 0;
var isBoldMax = 0;
var reso = screen.width + ' ' +screen.height;
var taillePerso = new Array;
var glossaireOffset = 0;
var offsetMenu = 0;
var menuMarginTop = 0;

// taillePerso:
// 1ère valeur: hleft. marginTop  ---> permet de centrer en hauteur le panneau de gauche (les news)
// 2ème valeur: article width --> taille de l'article ouvert dans la partie droite

////////////////////////////////// FIN ELEMENTS //////////////////////////////////



////////////////////////////////// MISE EN PAGE //////////////////////////////////

l = window.innerWidth; // largeur partie visible
h = window.innerHeight; // hauteur partie visible

switch (reso) {
	// 4/3
	case '1024 768':
		taillePerso.push(0, '580px');
	break; 
	case '1280 960':
		taillePerso.push(160, '837px');
	break;
	case '1360 1024': 
		taillePerso.push(200, '918px'); 
	break;
	case '1600 1200': 
		taillePerso.push(300, '1155px'); 
	break;
	
	// Wide
	case '1440 900':
		taillePerso.push(60, '995px');
	break;
	case '1680 1050':
		taillePerso.push(110, '1235px');
	break;
	case '1920 1200':
		taillePerso.push(180, '1475px');
	break;
		
	// Auto
	default: taillePerso.push((screen.height - 768)/2.4, screen.width - 444 + 'px'); // alert(taillePerso); // debug
}

// Retire glossaire hightech
if (GM_getValue('retire_glossaire_high_tech', 0) == 0) {GM_setValue('retire_glossaire_high_tech', 0)}
else {retire('bottom'); glossaireOffset = 20};

if (GM_getValue('menu_offset', 0) == 0) {GM_setValue('menu_offset', 0)}
else {offsetMenu = GM_getValue('menu_offset', 0)};

document.body.style.overflowX = 'hidden';
header.style.minHeight = '0px';
header.style.height = '24px';
hhomepage.style.width = l-20 + 'px'; // 1340px
conteneur.style.width = l-22 + 'px'; // 1338px
homepagev.style.height = h-80+glossaireOffset + 'px'; // 760px
hhomepage.style.height = '100%'; // 789px
conteneur.style.height = '100%'; // 789px
hleft.style.margin = '10px';

menuMarginTop = taillePerso[0]+offsetMenu
if (menuMarginTop < 0) {menuMarginTop = 0};
// if ((window.innerHeight-menuMarginTop) < 450) {menuMarginTop = window.innerHeight-450}; // trop chiant à régler ^^

hleft.style.marginTop = menuMarginTop + 'px';  //alert(hleft.style.marginTop) // debug
hleft.style.width = '400px'; // 400px
hleft.style.height = '360px'; // 500px

GM_addStyle ("#article {width: " + taillePerso[1] + "; height: 100%; float: right}"); //width: 918px; //580px 
GM_addStyle("#article object {width: inherit; height: 100%}");

//////////////////////////////// FIN MISE EN PAGE ////////////////////////////////



//////////////////////////////// COEUR DU SCRIPT ////////////////////////////////

// En cas de pub large
if (divPubLarge.id != 'header') {
	divPubLarge.parentNode.removeChild(divPubLarge)
}

// test si pub dans le cartouche et ajoute l'id à la liste aretirer
for (var i=0; i < cartoucheDivs.length; i++) {
    if (cartoucheDivs[i].id.indexOf('pub') != -1) {
        aretirer.push(cartoucheDivs[i].id)
    }
}

// Retrait des élements de la liste 'aretirer'
for (j=0;j<aretirer.length;j++) {retire(aretirer[j])}

// Retire toutes les DIV de h_content situées avant h_contentright sauf si class="clear_both"
var i=0, a=0, resultat = new Array, thisdiv = hcontentdivs[0];
while (thisdiv.id != "h_contentright") {
	if (thisdiv.className != "clear_both") {
		a=thisdiv.getElementsByTagName('div').length; 
		if (a == 0) {
			resultat.push(i); i++; thisdiv=hcontentdivs[i]
		}  
		else {
			resultat.push(i); i=i+a+1; thisdiv=hcontentdivs[i]
		}
	}
	else {
		i++; thisdiv=hcontentdivs[i]
	}
}

for (i=resultat.length-1; i>=0; i--) {
	a=resultat[i]; thisdiv=hcontentdivs[a]; thisdiv.parentNode.removeChild(thisdiv)
}

// Retire tous les éléments de h_homepage situés avant le header (évite un éventuel bandeau pub)

elmt = hhomepage.firstChild
while (elmt.id != 'header') {
	elmt.parentNode.removeChild(elmt); elmt = hhomepage.firstChild
}

// Crée la partie droite pour les news et y charge la 1ère news de la liste
typeActu(); setLiens();
var article = document.createElement("div");
article.id = 'article';
var cluclu = document.createElement("object");
cluclu.type = "text/html";
contdivs[22].parentNode.removeChild(contdivs[22]); //contdivs[22] -> clear_both
function clu() {
	cluclu.data = liens[0];
	article.appendChild(cluclu);
	conteneur.appendChild(article);
	redLink(0);
	}
if (actuType == 'max') {
	clu()
}
else {
delayCluclu = window.setTimeout(clu, 500)
}

// Fin des modifs, la page redevient visible
isVisible();

// Place un écouteur click sur la boîte contenant les liens d'actus (max et perso)
hcontentR.addEventListener('click', ouvreLien, true);

// Réajuste si nécessaire la hauteur de homepagev pour éviter l'apparition de scrollbars et pour que la page occupe toujours 100% de la hauteur disponible
testHauteur = window.setInterval (heightAdjust, 500);

//////////////////////////////// FIN  COEUR DU SCRIPT ////////////////////////////////

