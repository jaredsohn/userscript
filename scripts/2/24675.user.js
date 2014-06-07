// ==UserScript==
// @name		Clubic essential annexe1
// @namespace	
// @description	Annexe1 de Clubic essential: partie articles
// @include	http://www.clubic.com/actualite*
// @version	0.9.0.2b
// @author		Madcat
// ==/UserScript==

/////////////////////////////////////  FONCTIONS ///////////////////////////////////// 

//  Document.getElementById
function $(id) {
	return document.getElementById(id);
}

// Retire le(s) élement(s) d'id ou de class elmt
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

// Ajoute une feuille de style
function addGlobalStyle(css) {
	var head, style; head = document.getElementsByTagName('head')[0];
	if (!head) { return; } 
	style = document.createElement('style'); 
	style.type = 'text/css'; 
	style.innerHTML = css; 
	head.appendChild(style); 
}


////////////////////////////////// FIN FONCTIONS /////////////////////////////////// 



///////////////////////////////////// ELEMENTS ///////////////////////////////////// 

alldiv = document.getElementsByTagName('div');

if ($('h_content').parentNode.id == 'cartouche_menu') { // definition de hcontent avec test de la présence d'un doublon et destruction du 1er hcontent s'il y a doublon
	$('h_content').parentNode.removeChild($('h_content'));
	hcontent = $('h_content');
	}
else {
	hcontent=$('h_content');
	}

hcontentdivs=hcontent.getElementsByTagName('div');

// i=0; while (hcontentdivs[i].className != 'editorial') {i++}
// editorial=hcontentdivs[i];

homepagev = $('homepagev2');
hhomepage = $('h_homepage');
hconteneur = $('h_conteneur');
hleft = $('h_left');
titreActu = hcontent.getElementsByTagName('h1')[0];
comm = $('commentaire');
if (comm != null) {commBar = comm.parentNode.firstChild}

if (commBar.className != 'title' && $('commentaires')) { // recherche du bon commBar quand il s'agit d'un article Clubic
	x=$('commentaires').childNodes; y = 0;
	while (x[y].className != 'title') {y++}
	commBar = x[y];
	}
	
i=0; while (i<alldiv.length && alldiv[i].className != 'editorial') {i++}
edito=alldiv[i];

liensEdito = edito.getElementsByTagName('a');
//alert (liensEdito.length); // debug
liensComm = comm.getElementsByTagName('a');
//alert (liensComm.length); // debug

////////////////////////////////// FIN ELEMENTS //////////////////////////////////



////////////////////////////////// MISE EN PAGE //////////////////////////////////

l = window.innerWidth; // largeur partie visible
h = window.innerHeight; // hauteur partie visible

//document.body.style.overflow = 'hidden';
if (GM_getValue('marge_haute_article', 0) == 0) {GM_setValue('marge_haute_article', 0)}
homepagev.style.marginTop = GM_getValue('marge_haute_article', 0) + 'px';
hconteneur.style.borderStyle = 'none';
hhomepage.style.width = l-30 + 'px'; // 890px
hhomepage.style.cssFloat = 'left';
hconteneur.style.width = 'inherit';
hleft.style.width = '99%';
hcontent.style.width = '100%';

if (titreActu.parentNode != hcontent) {titreActu.parentNode.style.width = l-30 + 'px'}
if (comm != null) {comm.style.width = l-30 + 'px'; commBar.style.width = l-35 + 'px'}

addGlobalStyle ('.message_nav_page { width: ' + (l-30) + 'px ! important;}');
addGlobalStyle ('h1.titre { width: ' + (l-30) + 'px ! important;}');
addGlobalStyle ('div.cadre { width: ' + (l-30) + 'px ! important;}');
addGlobalStyle ('.cadre_forum { width: ' + (l-30) + 'px ! important;}');
addGlobalStyle ('.message_total { width: ' + (l-30) + 'px ! important;}');
addGlobalStyle ('.message_total_team { width: ' + (l-30) + 'px ! important;}');
addGlobalStyle ('.message_total .message { width: ' + (l-30) + 'px ! important;}');
addGlobalStyle ('.message_total_team .message { width: ' + (l-30) + 'px ! important;}');
addGlobalStyle ('.message .message_contenu { width: ' + (l-165) + 'px ! important;}');
addGlobalStyle ('.message .message_contenu .message_txt { width: ' + (l-175) + 'px ! important;}');
addGlobalStyle ('.layer_reponse { width: ' + (l-30) + 'px ! important;}');

//////////////////////////////// FIN MISE EN PAGE ////////////////////////////////



//////////////////////////////// COEUR DU SCRIPT ////////////////////////////////

// Retrait des élements de la liste 'aretirer'
var aretirer = ['header', 'cartouche_menu', 'll2', 'btn_corporate_selected', 'btn_corporate', 'bottom'];
for (j=0;j<aretirer.length;j++) {retire(aretirer[j])}

// Retrait de 'à voir aussi' + bandeau pub + 'top logiciels'
for (i=0;i<alldiv.length;i++) {if (alldiv[i].style.width == '300px') {alldiv[i].parentNode.removeChild(alldiv[i])}}

// Retrait des DIV situées après l'édito
sib=edito.nextSibling;
var divAfterEdito = new Array;
while (sib.nextSibling) {
	if (sib.tagName == 'DIV') {
		divAfterEdito.push(sib); sib=sib.nextSibling
	} 
	else {
		sib=sib.nextSibling
	}
}
for (i=0; i<divAfterEdito.length; i++) {
	divAfterEdito[i].parentNode.removeChild(divAfterEdito[i])
}

// Fin des modifs, la page redevient visible
document.body.style.visibility = 'visible';

// Les liens de l'édito ne pointant pas vers une news s'ouvriront dans un nouvel onglet
for (i=0; i<liensEdito.length; i++) {
	if (liensEdito[i].href.substr(22,9) != 'actualite') {
		liensEdito[i].target = '_blank';
	}
}

// Les liens de la partie commentaires s'ouvriront dans un nouvel onglet
for (i=0; i<liensComm.length-2; i++) { // -2 => exclu le bouton d'envoi de message et le lien de retour en haut de page
	p = liensComm[i].parentNode.className;
	if (!((p == 'message_nav_chiffre_sel') || (p == 'message_nav_chiffre') || (p == 'message_nav_page_presui'))) {
		liensComm[i].target = '_blank';
	}
}
//////////////////////////////// FIN  COEUR DU SCRIPT ////////////////////////////////