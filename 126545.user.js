// ==UserScript==
// @name           Pokec.sk - skrytie zbytočných elementov
// @namespace      http://
// @description    Skrytie zbytočných elementov Stretko, Plus, Rádio, Archív ...
// @include        http://pokec-sklo.azet.sk/miestnost/*
// @include        http://www-pokec.azet.sk/miestnost/*
// @date           2012-02-23
// @author         Marvin-HOG (MaxSVK)
// @version        1.0
// ==/UserScript==


/* ************************************************************************** */
/* ************************************************************************** */
/* ************************************************************************** */
/* *********************** globalne pouzivane funkcie *********************** */


function addGlobalStyle(css) {
	var head, style;
	head = document.getElementsByTagName('head')[0];
	if(!head) {return;}
	style = document.createElement('style');
	style.type = 'text/css';
	style.innerHTML = css;
	head.appendChild(style);
}


/* ************************************************************************** */
/* ************************************************************************** */
/* ************************************************************************** */


addGlobalStyle(
	// stretko
	'.chcemSaStretnut, #stretkoSubMenu {display: none !important;}'+
	// reklamna lišta
	'#auto_reklama {display:none !important;}'+
	// funkcie plus
	'#plusSubMenu, #nahodneSmajliky, .extraPlus.nema_plus, .ako_aktivovat {display:none !important;}'+
	// radio
	'#pokecRadio {display:none !important;}'+
	// ponuka prepnut na stare sklo a archiv
	'.dalsie_info.info {display: none !important;}'
);

