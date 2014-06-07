// ==UserScript==
// @name           Zandagort CSS Hack
// @namespace      http://
// @description    Css hack, munkahelyekre.
// @copyright      kisPocok
// @version        1.0
// @include http://s*.zandagort.hu/
// @include http://s*.zandagort.hu


// ==/UserScript==

// current software version
function $(name) {
    return document.getElementById(name);
}

var main = {
	name: 'Zandagort CSS Hack',
	version: '1.0',
	author: 'kisPocok',
	run: function() {
		/*
		console.log(this.name);
		console.log('Author: ', this.author);
		console.log('Version: ', this.version);
		*/
		
		this.transform();
	},
	transform: function() {
		$('jatek_body').style.color='black';
		$('jatek_body').style.backgroundColor='white';
		$('jatek_body').style.backgroundImage='none';
		$('belso_keret').style.backgroundImage='none';
		$('fejlec').style.display='none';
		$('lablec').style.display='none';
		$('belso_keret').style.backgroundColor='white';
		// Aktiv bolygo kepenek elrejtese
		$('aktiv_bolygo_alapadatai').style.backgroundColor='white';
		$('aktiv_bolygo_neve').style.backgroundColor='white';
		
		
		// Bolygo lista modositasok
		$('bolygo_lista').style.top='20px';
		$('bolygo_lista').style.left='0px';
		$('bolygo_lista').style.width='210px';
		$('bolygo_lista').style.height='240px';
		
		// Flotta lista modositasok
		$('flotta_lista').style.left='0px';
		$('flotta_lista').style.top='35px';
		$('flotta_lista').style.width='210px';
		$('flotta_lista').style.height='200px';
		
		// Bal oldali menuk hattereinek eltuntetese
		$('bolygo_lista_kont').style.backgroundImage='none';
		$('flotta_lista_kont').style.backgroundImage='none';
		
		// Menu atalakitasa szovegesse
		$('menu_egyeb').style.backgroundImage='none';
		$('menu_egyeb_birod').innerHTML = 'Birodalom';
		$('menu_egyeb_szovetseg').innerHTML = 'Szövetség';
		//$('olvasatlan_kommentek_szama').innerHTML = '';
		//$('olvasatlan_cset_jelzo').innerHTML = '';
		$('menu_egyeb_terkep').innerHTML = 'Térkép';
		$('menu_egyeb_felder').innerHTML = 'Felderítés';
		$('menu_egyeb_komm').innerHTML = 'Levelek';
		//$('olvasatlan_levelek_szama').innerHTML = '';
		$('menu_egyeb_profil').innerHTML = 'Profil';
		$('menu_egyeb_help').innerHTML = 'Help';
		
		// Uzenet jelzo athelyezese
		$('olvasatlan_kommentek_szama').style.left='100px';
		$('olvasatlan_kommentek_szama').style.top='58px';
		
		// Chat hatter
		$('szov_cset_csat').style.backgroundColor='white';
		$('szov_cset_uj_hozzaszolas').style.backgroundColor='white';
		$('szov_cset_online').style.backgroundColor='white';
		// Chat border
		$('szov_cset_csat').style.border='1px solid #ccc';
		$('szov_cset_uj_hozzaszolas').style.border='1px solid #ccc';
		$('szov_cset_online').style.border='1px solid #ccc';
		
	}
}

main.run();