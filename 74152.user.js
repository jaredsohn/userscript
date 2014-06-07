// ==UserScript==
// @name		Clubic Essential V2 Annexe 1
// @namespace
// @description	Annexe nécessaire au bon fonctionnement de Clubic Essential V2
// @exclude		http://www.clubic.com/actualites-informatique/
// @include		http://www.clubic.com/*
// @include		http://pro.clubic.com/*
// @version		0.9.0.3b
// @author		Madcat
// ==/UserScript==

// FONCTIONS GLOBALES
function xpath(expr, ref, type) {
	ref = (ref ? ref : document);
	type = (type ? type : XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE);
	return document.evaluate(expr, ref, null, type, null);
}

function $(id) {
	return document.getElementById(id);
}

function create(elmt) {
	return document.createElement(elmt)
}

function retire(elmt) {
	if (elmt) {
		elmt.parentNode.removeChild(elmt);
	}
}

//GM_log(screen.width);
var manualWidth = (screen.width -414);

//var manualWidth = 800;

if (window.location.href.indexOf('/actualite-') != -1 || window.location.href.indexOf('/article-') != -1 || window.location.href.indexOf('/telecharger-fiche') != -1) {


	// STYLES
	document.body.marginLeft = 0 + 'px';
	GM_addStyle("body {background: none; overflow-x: hidden;}"); //overflow: hidden;
	GM_addStyle(".block_central {width: " + manualWidth + "px !important;}");
	GM_addStyle(".comments {margin-top: 50px !important;}");
	GM_addStyle("#actu {width: auto !important;}");
	GM_addStyle("#article {width: auto !important;}");
	GM_addStyle(".contenu_block_central {width: auto !important;}");
	GM_addStyle("#clubic {margin: 0; width: " + manualWidth + "px;}");
	GM_addStyle("#txt {width: 100% !important;}");
	
	
	GM_addStyle(".message_total {width: inherit !important;}");
	GM_addStyle(".message_total_team {width: inherit !important;}");
	GM_addStyle(".message {width: inherit !important;}");
	
	GM_addStyle(".message_header {width: 100%;}");
	
	var largeurForum = 0;
	if (document.getElementsByClassName('message')[0]) {
		largeurForum = document.getElementsByClassName('message')[0].offsetWidth;
	}
	GM_addStyle(".message_contenu {float: left !important; width:" + (largeurForum-138) + "px !important;}");
	GM_addStyle(".message_redux {width: " + (largeurForum - 20) + "px !important;}");
	GM_addStyle(".message_contenu_moderer {float: left !important; width:" + (largeurForum - 170) + "px !important; margin-left: 25px;}");
	GM_addStyle(".message_txt {width: " + (largeurForum-150) + "px !important; margin-left: 5px;}");
	GM_addStyle(".message_date {margin-left: 10px;}");
	
	
	// COEUR DE SCRIPT
	
	
	var titre = document.getElementsByTagName('h1')[0];
	if (titre) {
		titre.style.background = 'none';
		if (titre.innerHTML.substring(0,2) == '//') {
			titre.innerHTML = titre.innerHTML.substring(2);
		}
	}
	

	retire($('header'));
	retire($('user_barre'));
	retire(document.getElementsByClassName('block_right')[0]);
	retire(document.getElementsByClassName('breadcrumb')[0]);
	retire(document.getElementsByClassName('incitation_groupe')[0]);
	retire(document.getElementsByClassName('pagination')[0]);
	retire(document.getElementsByClassName('socialBar')[0]);
	retire($('alpha_glossaire'));
	retire($('footer_all'));
	retire($('annonce_pub'));
	retire($('pub_dart_MBR_T_728x90'));
	retire($('banniere'));
	
	var allDivs = document.getElementsByTagName('div');

	for (i=0; i < allDivs.length; i++) {
		if (allDivs[i].className) {
			if (allDivs[i].className.indexOf('selection') != -1) {
				if (allDivs[i].parentNode.className) {
					if (allDivs[i].parentNode.className != "editorial") {
						retire(allDivs[i].parentNode);
						break;
					}
				}
				else {
					retire(allDivs[i].parentNode);
					break;
				}
			}
		}
	}
	
	if (document.getElementsByClassName('goMsgReste')[0]) {
		GM_log('filtrage détecté !');
	}
}

document.body.style.visibility = 'visible';




