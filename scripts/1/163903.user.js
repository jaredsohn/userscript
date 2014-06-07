// ==UserScript==
// @name        Lewackie pietno
// @description Lewaki/Liberalizm/Podejrzany/porzadni
// @include     http://*.wykop.pl/*
// @include     http://wykop.pl/*
// @version     1.42
// @grant       none
// @updateURL      http://userscripts.org/scripts/show/163903.meta.js
// @run-at	document-end
// ==/UserScript==

//var lewak =;
if (typeof $ == 'undefined') 
{
	if (unsafeWindow.jQuery) 
	{
		var $ = unsafeWindow.jQuery;
		$(document).ready(maine_functione);
	} else 
	{
		addJQuery(maine_functione);
	}
} else 
	{
	$(document).ready(maine_functione);
	}
function maine_functione()
{
	var lewak = 
	{
		'Blaskun': true, 'JestemKaspi': true, 'Floyt': true, 'stefan_pompka': true, 'ghostface': true, 'Ginden': true, 'Andr3v': true, 'Ryzowy_Potwor': true, 'wolfik92': true, 'fir3fly': true, 'Destr0': true, 'mq1': true, 'Aqwart': true, 'anonim1133': true, 'Farrahan': true, 'Ryu': true, 'DuPont': true, 'Farquart': true, 'FilipChG': true, 'histeryk_13': true, 'innuendoPL': true, 'John112': true, 'Johny_Locke': true, 'John_Finn': true, 'jrs2': true, 'Kamill': true, 'mq1': true, 'MQs': true, 'NapallnTheMorning': true, 'RageKage': true, 'Ragnarokk': true, 'relik39': true, 'Shaki': true, 'Smookie': true, 'sn4tch': true, 'stekelenburg2': true, 'Supercoolljuk2': true, 'szczepqs': true, 'tmb28': true, 'Tym': true, 'Unknown__user': true, 'wielooczek': true, 'WOiOwnik': true, 'Yahoo_': true, 'Dutch': true, 'FilipChG': true, 'oxygen88': true, 'Czajna_Seczen': true, 'Derp': true, 'The_Apostate': true, 'ChceBycCzerwonyNieBordowy': true, 'knysha': true, 'ciepol': true, 'ostr': true, 'shepard': true, 'siema_andrzej': true 

	}
	$('a[title^="profil"] img').each(function (i,el) 
	{
		if (el.alt in  lewak)
		{
			var $el = $(el);
			var li = $el.closest('li');
			var nick = li.find('strong').get(0);
			nick.innerHTML =('<img src="http://dl.dropbox.com/u/85736209/gwiazda.png"><span style="background: url() no-repeat scroll 0% 0% transparent;">') + nick.innerHTML;
		}
	}); 
	var podejrzany = 
	{
		'aes_sedai': true, 'Vanr_': true, 'Baron_Al_von_PuciPusia': true, 'dondon': true, 'costom': true, 'Singel': true, 'kokaina': true, 'Rabusek': true 

	}
	$('a[title^="profil"] img').each(function (i,el) 
	{
		if (el.alt in  podejrzany)
		{
			var $el = $(el);
			var li = $el.closest('li');
			var nick = li.find('strong').get(0);
			nick.innerHTML =('<img src="http://www.euro.com.pl/upload_module/graphics/ico/pytajnik.png"><span style="background: url() no-repeat scroll 0% 0% transparent;">') + nick.innerHTML;
		}
	});
	var spoko = 
	{
		'MrocznySedes': true, 'hugerth': true, 'rafbur': true, 'Klopsztanga': true

	}
	$('a[title^="profil"] img').each(function (i,el) 
	{
		if (el.alt in  spoko)
		{
			var $el = $(el);
			var li = $el.closest('li');
			var nick = li.find('strong').get(0);
			nick.innerHTML =('<img src="https://www.cloudns.net/images/icons/status/ok.png"><span style="background: url() no-repeat scroll 0% 0% transparent;">') + nick.innerHTML;
		}
	});
	var liberalizm = 
	{
		'tockar': true, 'DOgi': true, 'gav': true, 'krzychol66': true, 'Piotrr80': true, 'motyw': true, 'fenis': true, 'Gacrux': true, 'banowany': true, 'miewamkoszmary': true, 'pasnik': true, 'Jam1911': true, 'Socyn': true, 'Saguaroniegazowana': true, 'Aleksander_Newski': true, 'wysuszony': true, 'el-em': true, 'Legol': true, 'krupek': true, 'qnebra': true, 'Kuba989': true, 'scape': true, 'bledzioch': true, 'LibertyPrime': true, 'White_owl': true, 'Masej': true, 'payner': true, 'szasznik': true, 'vader05': true, 'FlaszGordon': true, 'eacki8': true

	}
	$('a[title^="profil"] img').each(function (i,el) 
	{
		if (el.alt in  liberalizm)
		{
			var $el = $(el);
			var li = $el.closest('li');
			var nick = li.find('strong').get(0);
			nick.innerHTML =('<img src="http://www.albertus.pl/template/sklep/imagesNEW/star-on.png"><span style="background: url() no-repeat scroll 0% 0% transparent;">') + nick.innerHTML;
		}
	});
}


function addJQuery(callback) {
	var script = document.createElement("script");
	script.textContent = "$(document).ready(" + callback.toString() + ");";
	document.body.appendChild(script);
};