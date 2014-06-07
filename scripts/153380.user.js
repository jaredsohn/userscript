// ==UserScript==
// @name        SFR WiFi Hotspot
// @namespace	F4rf3lu
// @description	Auto (re)login on SFR WiFi public hotspot (based on userscripts.org/scripts/review/100650)
// @include     http*://hotspot.wifi.sfr.fr/*
// @version     1.0
// @grant	GM_getValue
// @grant	GM_setValue
// ==/UserScript==

var re = false,
ask = function (n) {
	if (GM_getValue('login') && GM_getValue('pw') && (n === false)) {
		return true;
	} else {
		GM_setValue('login', window.prompt('Identifiant ?'));
		GM_setValue('pw', window.prompt('Mot de passe ?'));
		return true;
	}
},
con = function () {
	var res = (re || location.href.indexOf('?') === -1) ? '' : location.href.match(/res=([^&]+)/)[1] ;
	switch (res) {
		case 'already': window.alert('Déjà connecté !'); return; break;
		case 'success': re = true; GM_setValue('tr', 0); window.setTimeout(con, 7210000); break;
		case 'failed': default: var ne = (GM_getValue('tr') > 3) ? true : false;
			if (ask(ne)) {
				var inp = document.getElementsByTagName('input');
				for (var i in inp) {
					switch (inp[i].name) {
						case 'username': inp[i].value = GM_getValue('login'); break;
						case 'password': inp[i].value = GM_getValue('pw'); break;
						case 'conditions': inp[i].checked = true; break;
						case 'save': inp[i].checked = true; break;
						case 'connexion': inp[i].click(); break;
					}
				}
			} re = false; var tr = GM_getValue('tr', 0); GM_setValue('tr', ++tr);
	}
};
window.setTimeout(con, 0);
unsafeWindow.redirectUserURL = function () {
	var userurl = new String(unescape(location.href.match(/userurl=([^&]+)/)[1])).split(';')[0];
	document.getElementById('contenuBox').getElementsByTagName('div')[0].getElementsByTagName('p')[1].innerHTML = '<span style="font-size:12px;line-height:15px;">'+new Date().toString()+'<br />Pour une reconnexion automatique laissez cette page ouverte. Pour accéder à la page demandée précédemment cliquez sur le lien suivant : <a href="'+userurl+'" target="_blank">'+userurl+'</a></span>';
};
