// ==UserScript==
// @name        Wykopowa lista blipków
// @description Zamienia kolor na żółty przy blipkach. Lacznie: 335 blipkow. Przerobka Wykopowej listy lewaków/Wykopoczty/ZhanbionychPrzezZakopywanie.
// @include     http://*.wykop.pl/*
// @include     http://wykop.pl/*
// @version     1.6
// @run-at	document-end
// ==/UserScript==
//Instalacja:
//1. Sciagamy plik wykopowalistablipkow.js
//2. Przeciagamy do rozszerzen w naszej przegladarce lub instalujemy z dodatkami greasemonkey/tampermonkey
//3. CZARNOLISTO
//4. ?????
//5. PROFIT
//var blipek =;
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
	var new_color = "yellow";
	var blipek = {
'matemaciek': true, 'ilonapop': true, 'maluminse': true, 'lychnis': true, 'Anks': true, 'rocktechnika': true, 'kulkacurly': true, 'moonatyczka': true, 'jubal': true, 'kali187': true, 'kashmir86': true, 'motylkowa': true, 'olowekikredka': true, 'refresh': true, 'Opiniotworczy': true, 'bobiko': true, 'uerbe': true, 'gertruda12': true, 'eliwuu': true, 'maxx83': true, 'karciaa': true, 'szpro': true, 'weronika_b': true, 'glammaniara': true, 'wildrose': true, 'skysphinx': true, 'emayef': true, 'BPrawaPracy': true, 'shigella-deshige': true, 'koRnac': true, 'dfgg': true, 'cube': true, 'beawesome': true, 'paripl': true, 'kiciwzyci': true, 'pogodailza': true, 'muszi': true, 'joujoux': true, 'roaring': true, 'jabberwocky_blip': true, 'wariag': true, 'jansebastiantrach': true, 'luki122': true, 'Vizirek': true, 'uczimoo': true, 'afekt': true, 'Arcania': true, 'oleg': true, 'gopix': true, 'mkarweta': true, 'drau': true, 'catnip': true, 'milykotjakgarfield': true, 'aksu': true, 'kaeska': true, 'brzezinski': true, 'pawelyaho': true, 'Jarzyna': true, 'Qrix': true, 'radekj': true, 'eofek': true, 'pan-audytor': true, 'firefox': true, 'samtonazwij': true, 'jaworek0099': true, 'Morden': true, 'ozim13': true, 'terenowo': true, 'htsz': true, 'meak': true, 'ernio': true, 'gablotkaszkolna': true, 'zielarka': true, 'saphone': true, 'nadziana': true, 'rita82': true, 'morkil': true, 'shadow_no': true, 'salsablip': true, 'aanka': true, 'trainee': true, 'krzysztof-urbanowicz': true, 'fuckingperfect': true, 'praktycznyprzewodnik': true, 'topebooki': true, 'davmax': true, 'uniterka': true, 'b00g13': true, 'gazetaslupecka': true, 'marcingdansk': true, 'ktos90': true, 'sbd': true, 'AngelusPolska': true, 'maltez': true, 'shayera': true, 'duchowny11': true, 'gadunews': true, 'gornikkonin': true, 'koll': true, 'TheBBRcast': true, 'Varsovienne': true, 'winosk': true, 'alex273': true, 'mojsamochodpl': true, 'elanorion': true, '104filmy': true, 'biurco': true, 'QsX': true, 'strangelly': true, 'wybiorcze': true, 'fashionavenue': true, 'glucholazyonline': true, 'extremespace': true, 'psychatog': true, 'kawczyna': true, 'Mirmar': true, 'soyelle': true, 'Sithian': true, 'jamief651': true, 'czescjacek': true, 'dziadekfelek': true, 'system12': true, 'goldmoon': true, 'wolfik22': true, 'toppsycrett': true, 'dawidekoko': true, 'karpatka122': true, 'terenowo': true, 'meak': true, 'htsz': true, 'dominika716': true, 'ultrabuc': true, 'iammajkel': true, 'natchniuza': true, 'samtonazwij': true, 'terenowo': true, 'obobobo': true, 'SStefania': true, 'tychymiasto': true, 'motornitrzy': true, 'copperballs': true, 'martymka96': true, 'karlotta': true, 'keepcalmandreadabook': true, 'mkasinski': true, 'whatevermom': true, 'janedoe': true, 'piterw1974': true, 'winosk': true, 'glucholazyonline': true, 'nowywinternecie': true, 'jaracja': true, 'tarascobar': true, 'dookolapolski': true, 'suafkupl': true, 'centrumpr': true, 'emotek': true, 'waste': true, 'mjablonski': true, 'sistermoon': true, 'ewcikson': true, 'jennavain': true, 'cadaver': true, 'marta_aa1': true, 'albertoz': true, 'brandhedwarf': true, 'blotosmetek': true, 'spoilertv': true, 'mariposanegra': true, 'dariusrock': true, 'pastelka': true, 'inwestycjepl': true, 'mmazur': true, 'Pippo': true, '': true, 'wojciechowski-k': true, 'Widelka': true, 'ranczoholik': true, 'nmastalerz': true, 'xenakis': true, 'miah': true, 'piromanka': true, 'cichypsychol': true, 'luminainen': true, 'goshki': true, 'adam44': true, 'brandthedwarf': true, 'ChrisVW': true, 'tchinchirote': true, 'remax': true, 'wakasu ': true, 'tchinchirote ': true, 'bagienny': true, 'safjanowski': true, 'luminainen': true, 'goshki': true, 'wirus0': true, 'eskapizm': true, 'charta': true, 'bratbud': true, 'chato': true, 'asiek': true, 'ChrisVW': true, 'zrelatywizowana': true, 'pkierski': true, 'charunto': true, 'karpatka122': true, 'monia4848pysiu': true, 'kax0153': true, 'Mauro666': true, 'underley': true, 'natchniuza': true, 'moonatyczka': true, 'jubnos': true, 'frupifrupi': true, 'dominika716': true, 'iammajkel': true, 'ultrabuc': true, 'stan': true, 'swiatrozrywki': true, 'gandinaaa': true, 'kkizierowski': true, 'syrna': true, 'deerscantalk': true, 'blummchen': true, 'flyorfly': true, 'golgaa': true, 'deadlight': true, 'legalneinfo': true, 'drastik': true, 'takprzyokazji': true, 'metanowa': true, 'dragonheart': true, 'mikkaa': true, 'fortyck': true, 'piterj': true, 'moon5': true, 'Prisztina ': true, 'pauliina94': true, 'mayestico': true, 'suafkupl': true, 'roman_jmc': true, 'superfakty': true, 'remax': true, 'megustaa': true, 'm0rgul': true, 'andrzej-szymanski-944': true, 'flowerofthesun': true, 'jankowscyzabrze': true, 'szizolek': true, 'samoma': true, 'amane': true, 'rahn': true, 'meggy': true, 'roksanna17': true, 'kkrzysztof': true, 'lol24com': true, 'salivation': true, 'malenstwo91': true, 'andrzej-szymanski-944': true, 'DamBar': true, 'ibrahim-ogluzs': true, 'gornyslask': true, 'MojeGory': true, 'mazuma': true, 'ana13': true, 'mozzer': true, 'kasiazawadzka': true, 'em3studio': true, 'mexxio': true, 'kubasbn': true, 'myszaa': true, 'leviathan0712': true, 'sasiadka': true, 'ida27': true, 'filandia': true, 'slawomir-cwiek': true, 'sarenza': true, 'Zuzia-Zuzik': true, 'telefonia-halonet': true, 'wiktora': true, 'parafiadobiegniew': true, 'joni': true, 'korfed': true, 'dobranocka22': true, 'andrzej67': true, 'strategiacg': true, 'michalkortas': true, 'profundis': true, 'madsleepwalker': true, 'pasozyt7': true, 'semper': true, 'arbre': true, 'lunatikka': true, 'misia1614': true, 'seekanddestroy': true, 'ziutolinki': true, 'zebrabutypl': true, 'ibrd': true, 'longfashionallegro': true, 'kulkaa123': true, 'evangellion': true, 'hibii': true, 'fliper': true, 'tomoreno': true, 'amsterski': true, 'flesh100': true, 'mwgg': true, 'youngandreckless': true, 'carinacoma': true, 'paweljelonek': true, 'bejb-blip-pl': true, 'ewa-enervate': true, 'simplyaj': true, 'aellirenn': true, 'adnews': true, 'maluch_6': true, 'iriewoman': true, 'yafud': true, 'michalec': true, 'izabeel': true, 'beatkawawa': true, 'dolinaklaunow': true, 'delvis': true, 'xmoo': true, 'BDCC': true, 'BadBoy1313': true, 'EmiyaShirou': true, 'tak-toja': true, 'westwoodczyk': true, 'bogas33': true, 'siodmy': true, 'gelo45': true, '3mpty': true, 'sylnorma': true

                 }
	$('a[title^="profil"] img').each(function (i,el) {
		if (el.alt in  blipek)
		{
			var $el = $(el);
			var li = $el.closest('li');
			el.style['opacity'] = '0.66';
			el.parentNode.style['background'] = 'none repeat scroll 0 0 ' + new_color;
			var czas = li.find('time').get(0);
			czas.innerHTML = '(BLIP) ' + czas.innerHTML;
			li.find('header strong').get(0).style['color'] = new_color;
		}
	}); 
}


function addJQuery(callback) {
	var script = document.createElement("script");
	script.textContent = "$(document).ready(" + callback.toString() + ");";
	document.body.appendChild(script);
};