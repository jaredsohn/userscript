// ==UserScript==
// @name        Wykopowa lista idiotów
// @description Zamienia kolor przy idiotach i oszołomach wszelkiej maści. Na piękny różowy! 
// @include     http://*.wykop.pl/*
// @include     http://wykop.pl/*
// @version     1.4.6
// @run-at	document-end
// ==/UserScript==

//var idioci =;
if (typeof $ == 'undefined') {
	if (unsafeWindow.jQuery) {
		var $ = unsafeWindow.jQuery;
		$(document).ready(maine_functione);
	} else {
		addJQuery(maine_functione);
	}
} else {
	$(document).ready(maine_functione);
}
function maine_functione()
{
	var new_color = "#ff748c";
	var idioci = {
'RafiRK': true, 'jasiulec': true, 'gav': true, 'Paralotnia': true, 'mohairberetka': true, 'pinius': true, 'Krol_Julian': true, 'foksio': true, 'cameel': true, 'unclefucker': true, 'bialaowca': true, 'aifeme': true, 'Cubensis': true, 'Kambodzanin': true, 'lekarz_psychoterapeuta': true, 'UlfNitjsefni': true, 'Adam787': true, 'sfx-pl': true, 'scape': true, 'mave': true, 'Krzysiek1203_88': true, 'Frozeno': true, 'rpawelek': true, 'Mohammed_Socjal': true, 'dyktek': true, 'mateuszo': true, 'eacki8': true, 'Emtebe': true, 'FlaszGordon': true, 'Tleilaxianin': true, 'diarrhoea': true, 'cryan': true, 'MasterSoundBlaster': true, 'Ruler': true, 'zurawinowa': true, 'PrzeciwkoAntyPolonizmowi': true, 'dusiciel386': true, 'MasterSoundBlaster': true, 'nasedo': true, 'sklaffe': true, 'KosmicznyDzem': true, 'ppj': true, 'Oskarek89': true, 'empeash': true, 'FapinoTrololo': true, 'Floyt': true, 'pandapl': true, 'neewho': true, 'marwiec': true, 'Derpin': true, 'zakowskijan72': true, 'miki4ever': true, 'Pompidoub': true, 'Khaine': true, 'Masakrator2142': true, 'Gierwazjo': true, 'muuzyk': true, 'OlgierdStopa': true, 'Cbatman': true, 'j5ska': true, 'Kiler7777': true, 'Piotszak': true, 'leonidas1104': true, 'mhrok87': true, 'pandemiacore': true, 'Skurvensen': true, 'Skrzetuski': true, 'zdunek89': true, 'iwadrian': true, 'Mnieczyslaw': true, 'gbiernat': true, 'ocobiega12': true, 'kolbi': true, 'JeSemSeWykopek': true, 'ihatebugs': true, 'SpokojnyLudzik': true, 'Cymes': true, 'Postronny': true, 'Dolan': true, 'blue1986pl': true, 'LibertyPrime': true, 'Yamaneko_pl': true, 'romo86': true, 'mikroblog': true, 'Asadow': true, 'foksio': true, 'Fox_Mulder': true, 'Machabeusz': true, 'sinusik': true, 'Nightmare16': true, 'Rauhvin': true, 'AdekJadek': true, 'mmaryan': true, 'Rumpertumski': true, 'benzenhauer': true
                 }
	$('a[title^="profil"] img').each(function (i,el) {
		if (el.alt in  idioci)
		{
			var $el = $(el);
			var li = $el.closest('li');
			el.style['opacity'] = '0.86';
			el.parentNode.style['background'] = 'none repeat scroll 0 0 ' + new_color;
			var czas = li.find('time').get(0);
			czas.innerHTML = '(Idiota) ' + czas.innerHTML;
			li.find('header strong').get(0).style['color'] = new_color;
		}
	}); 
}


function addJQuery(callback) {
	var script = document.createElement("script");
	script.textContent = "$(document).ready(" + callback.toString() + ");";
	document.body.appendChild(script);
};