// ==UserScript==
// @id             oprojekt exporter bbcode
// @name           oprojekt exporter bbcode
// @author       benneb
// @namespace      benneb
// @version        2.0
// @updateURL      http://userscripts.org/scripts/source/92002.meta.js
// @downloadURL    https://userscripts.org/scripts/source/92002.user.js
// @description    Permet d exporter  vos mines de oprojekt en bbcode pour les poster sur un forum
// @include        http://mines.oprojekt.net/*/mines/?id=*
// @include        http://oprojekt.net/fr/mines/?id=*
// ==/UserScript==

	function trim(string)
			{return string.replace(/(^\s*)|(\s*$)/g,'');} 
			
	function prodMetalbase(mm, speed){
		
		return 30*parseInt(mm)*Math.pow(1.1, parseInt(mm))*speed;
	}
	function prodCristalbase(mc, speed)
	{	
		return 20*parseInt(mc)*Math.pow(1.1, parseInt(mc))*speed;
	}
	function prodMetal(mm,speed, lvlplasma, geologue){
		
		var base = prodMetalbase(mm, speed);
		return Math.round(base*geologue)  +  Math.round(base*lvlplasma/100) ;
	}
	function prodCristal(mc,speed, lvlplasma, geologue)
	{	
		var base = prodCristalbase(mc, speed);
		return Math.round(base*geologue)  + Math.round(base*lvlplasma*0.66/100) ;
	}
	function prodDeut(md,speed, temperature, geologue)
	{	
		return Math.round(10 * parseInt(md) * (Math.pow(1.1,parseInt(md)) * (1.44 - (temperature * 0.004) ))*speed*geologue);
	}
	
	
	var corresPays = {  
		
	    'Deutschland': 'de',	'International': 'org',		'Frankreich': 'fr',		'Italy': 'it',		'Danmark': 'dk',
		'Nederland': 'nl',		'España': 'com.es',		'Turkey': 'tr',		'Romania': 'ro',		'Poland': 'pl',
		'Portugal': 'pt',		'Greece': 'gr',		'Sweden': 'se',		'Russia': 'ru',		'Brazil': 'br',
		'Slovenia': 'si',		'Czech': 'cz',		'Hungary': 'hu',		'Japan': 'jp',		'Mexico': 'mx',
		'Slovakia': 'sk',		'Taiwan': 'tw',		'Bulgaria': 'bg',		'Norway': 'no',		'USA': 'us',
		'Finland': 'fi',		'Balkan': 'ba',		'Argentinia': 'ar',		'Croatia': 'hr',		};
		
	var lang1 = document.getElementById('combo_0');
	if(lang1)
	{
		var lang =lang1.getElementsByTagName('option');
		for( var i = 0 ;i< lang.length ; i++)
		{
			if (lang[i].selected) var serv=  lang[i].innerHTML.split('(')[1].split(')')[0];
		}
	}
	else        var serv =corresPays[trim(document.getElementById('myForm').getElementsByTagName('table')[2].getElementsByTagName('td')[1].textContent)];
	
	var unis = document.getElementById('ajax_uni_select');
	if(unis)
	{
		unis = unis.getElementsByTagName('option');
		for( var i = 0 ;i< unis.length ; i++)
		{
			if (unis[i].selected) 
			{
				var num = unis[i].innerHTML.replace( /[^0-9-]/g, "");
				
				if( isNaN(parseInt(num)))
				{
					var serveur = corres[unis[i].innerHTML] ;
				}
				else 
				{
					var serveur = num ;
				}
			}
		}
	}
	else
	{
		var num = trim(document.getElementById('myForm').getElementsByTagName('table')[2].getElementsByTagName('td')[3].textContent);
				
		if( isNaN(parseInt(num)))
		{
			var serveur = corres[num.toLowerCase()];
		}
		else 
		{
			var serveur = num;
		}
	}
	
	text = 
		{
			planete : 'Planet',
			metal : 'metal',
			cristal : 'crystal',
			deuterium : 'deuterium',
			niveau : 'Level of Mines player',
			le : 'at',
			temperature : 'temperature of',
			plasma : 'tech plasma',
			pointsminesm : 'Points in the metal mines',
			pointsminesc : 'Points in the crystal mines',
			pointsminesd : 'Points in the deuterium mines',
			pointsmines : 'Points in the mines',
			parheure : 'Per hour',
			parjour : 'Per day',
			parsem : 'Per week',
			exportmine : 'Export your mines',
			Fondfonce : 'Dark background',
			Fondclair : 'Bright background'
		
		};
	if(serv == "ru")
	{	
		text = 
		{		
			planete : 	'Планета',
			metal : 	'металл',
			cristal : 	'кристалл',
			deuterium : 	'дейтерий',
			niveau :	'Уровень рудников игрока',
			le : 	'на',
			temperature :	'температура',
			plasma : 'tech plasma',
			pointsminesm :	'Очки в рудниках по добыче металла',
			pointsminesc : 	'Очки в рудниках по добыче кристалла',
			pointsminesd : 	'Очки в синтезаторах дейтерия',
			pointsmines :	'Очки во всех рудниках',
			parheure :	'В час',
			parjour :	'В день',
			parsem : 	'В неделю',
			exportmine :	'Занести свои рудники',
			Fondfonce : 	'Тёмный фон',
			Fondclair :	'Светлый фон'
		};
	}
	if(serv == "gr")
	{	
		text = 
		{
			planete:'Πλανήτης',
			metal:'μέταλλο',
			cristal:'κρύσταλλο',
			deuterium:'δευτέριο',
			niveau:'Επίπεδο Ορυχείων παίκτη',
			le:'στο',
			temperature:'θερμοκρασία από',
			plasma : 'tech plasma',
			pointsminesm:'Πόντοι στα ορυχεία μετάλλου',
			pointsminesc:'Πόντοι στα ορυχεία κρυστάλλου',
			pointsminesd:'Πόντοι στα ορυχεία δευτεριου',
			pointsmines:'Πόντοι στα ορυχεία',
			parheure:'Ανα ώρα',
			parjour:'Ανα ημέρα',
			parsem:'Ανα εβδομάδα',
			exportmine:'Εξαγωγή των ορυχείων σου',
			Fondfonce:'Σκούρο υπόβαθρο',
			Fondclair:'Ανοικτό υπόβαθρο '
		};
	}
	if(serv == "com.es")
	{	
		text = 
		{
			planete  	:'Planeta',
			metal  	:'metal',
			cristal  	:'cristal',
			deuterium  	:'deuterio',
			niveau 	:'Nivel de las Minas',
			le  	:'en',
			temperature:'temperatura de',
			plasma : 'tech plasma',
			pointsminesm:'Puntos en minas de metal',
			pointsminesc:'Puntos en minas de cristal',
			pointsminesd:'Puntos en minas de deuterio',
			pointsmines:'Puntos en las minas',
			parheure:'Por hora',
			parjour:'Por día',
			parsem:'Por semana',
			exportmine:'Exportar tus minas',
			Fondfonce:'Fondo oscuro',
			Fondclair:'Fondo claro'
		};
	}
	if(serv == "fi")
	{	
		text = 
		{
			planete : 	'Planeetta',
			metal : 	'metalli',
			cristal : 	'kristalli',
			deuterium : 	'deuterium',
			niveau :	'Pelaajan kaivosten taso',
			le : 	'jostakin',
			temperature :	'Lämpötila',
			plasma : 'tech plasma',
			pointsminesm :	'Metallikaivosten pisteet',
			pointsminesc : 	'Kristallikaivosten pisteet',
			pointsminesd : 	'Deuteriumikaivosten pisteet',
			pointsmines :	'Kaivosten pisteet',
			parheure :	'Tunnissa',
			parjour :	'Päivässä',
			parsem : 	'Viikossa',
			exportmine :	'Kaivosten tuotanto',
			Fondfonce : 	'Tumma taustaväri',
			Fondclair :	'Vaalea taustaväri'
		};
	}
	
	if(serv == "nl")
	{	
		text = 
		{	
			planete : 	'Planeet',
			metal : 	'Metaal',
			cristal : 	'Kristal',
			deuterium : 	'Deuterium',
			niveau :	'Niveau van mijnen',
			le : 	'Speler op',
			temperature :	'Temperatuur van',
			plasma : 'tech plasma',
			pointsminesm :	'Punten in metaalmijnen',
			pointsminesc : 	'Punten in kristalmijnen',
			pointsminesd : 	'Punten in deuteriumfabrieken',
			pointsmines :	'Punten in mijnen',
			parheure :	'Per uur',
			parjour :	'Per dag',
			parsem : 	'Per week',
			exportmine :	'Exporteer je mijnen',
			Fondfonce : 	'Donkere achtergrond',
			Fondclair :	'Lichte achtergrond'
		};
	}

	if(serv == "pt")
	{	
		text = 
		{
			planete : 	'Planeta',
			metal : 	'metal',
			cristal : 	'cristal',
			deuterium : 'deutério',
			niveau :	'Nível das Minas',
			le : 		'em',
			temperature :	'temperatura de',
			plasma : 'tech plasma',
			pointsminesm :	'Pontos em Minas de Metal',
			pointsminesc : 	'Pontos em Minas de Cristal',
			pointsminesd : 	'Pontos em Sintetizadores de Deutério',
			pointsmines :	'Pontos em Minas',
			parheure :	'Por hora',
			parjour :	'Por dia',
			parsem : 	'Por semana',
			exportmine :	'Exportar as tuas minas',
			Fondfonce : 	'Fundo Escuro',
			Fondclair :	'Fundo Brilhante'
		};
	}
	if(serv == "de")
	{
		text = 
		{
			planete : 'Planet',
			metal : 'Metal',
			cristal : 'Kristall',
			deuterium : 'Deuterium',
			niveau : 'Level der Mienen',
			le : 'Spieler auf',
			temperature : 'Temperatur von',
			plasma : 'tech plasma',
			pointsminesm : 'Punkte in Metall-Minen',
			pointsminesc : 'Punkte in Kristall-Minen',
			pointsminesd : 'Punkte in Deuterium-Minen',
			pointsmines : 'Punkte in Minen',
			parheure : 'pro Stunde',
			parjour : 'pro Tag',
			parsem : 'pro Woche',
			exportmine : 'Exportieren Sie Ihre Minen',
			Fondfonce : 'Dunkler Hintergrund',
			Fondclair : 'Heller Hintergrund'
		
		};
	}

	if(serv == "fr")
	{
		text = 
		{
			planete : 'Planète',
			metal : 'métal',
			cristal : 'cristal',
			deuterium : 'deuterium',
			niveau : 'Niveau des mines du joueur',
			le : 'le',
			temperature : 'température de',
			plasma : 'tech plasma',
			pointsminesm : 'Points dans les mines de métal',
			pointsminesc : 'Points dans les mines de cristal',
			pointsminesd : 'Points dans les mines de deut',
			pointsmines : 'Points dans les mines',
			parheure : 'Par Heure',
			parjour : 'Par Jour',
			parsem : 'Par Semaine',
			exportmine : 'Export de vos mines',
			Fondfonce : 'Fond foncé',
			Fondclair : 'Fond clair'
		
		};
	}	
	var UniSpeedFactor = 1;
	//vitesse des univers prises sur JumpGates Availability
	switch(serveur+"_"+serv)
	{
		// DE 
		case "50_de":  UniSpeedFactor	= 2 ; break;
		case "60_de":  UniSpeedFactor	= 2 ; break;
		case "70_de": UniSpeedFactor	        = 4 ; break;

		// DK
		case "10_dk":  UniSpeedFactor	= 2 ; break;

		// ES
		case "40_com.es":  UniSpeedFactor	= 2 ; break;
		case "50_com.es":  UniSpeedFactor	= 2 ; break;
		case "Fornax_com.es": UniSpeedFactor	= 4 ; break;

		// FR
		case "50_fr":  UniSpeedFactor	= 2 ; break;
		case "60_fr":  UniSpeedFactor	= 2 ; break;
		case "Fornax_fr": UniSpeedFactor	= 4 ; break;
		case "Gemini_fr": UniSpeedFactor	= 2 ; break;
		case "Leo_fr": UniSpeedFactor	= 2 ; break;

		//HU
		case "5_hu":  UniSpeedFactor	        = 2 ; break;

		//IT
		case "25_it": UniSpeedFactor        = 2 ; break;
		case "30_it": UniSpeedFactor        = 2 ; break;
		case "35_it": UniSpeedFactor        = 2 ; break;
		case "40_it": UniSpeedFactor        = 2 ; break;
		case "Electra_it": UniSpeedFactor      = 2 ; break;
		case "Draco_it": UniSpeedFactor        = 4 ; break;

		//NL
		case "10_nl": UniSpeedFactor        = 2 ; break;

		// ORG
		case "30_org": UniSpeedFactor        = 2 ; break;
		case "35_org": UniSpeedFactor        = 5 ; break;
		case "40_org": UniSpeedFactor        = 2 ; break;
		case "42_org": UniSpeedFactor        = 2 ; break;
		case "Electra_org": UniSpeedFactor      = 4 ; break;

		//RU
		case "10_ru" : UniSpeedFactor        = 2 ; break;
		case "Capela_ru": UniSpeedFactor        = 4 ; break;

		//PL
		case "50_pl":  UniSpeedFactor        = 2 ; break;
		case "60_pl":  UniSpeedFactor        = 2 ; break;

		//PT
		case "20_pt":  UniSpeedFactor        = 2 ; break;

		//TR
		case "50.tr_org":  UniSpeedFactor        = 2 ; break;

		//TW
		case "10_tw":  UniSpeedFactor        = 2 ; break;

		//US
		case "5_us":  UniSpeedFactor         = 2 ; break;
		case "Barym_us":  UniSpeedFactor        = 3 ; break;
	}
	
	if( document.getElementsByClassName('list1')[0].textContent.indexOf('(') > 0 )
	{
		var pseudo = document.getElementsByClassName('list1')[0].textContent.split(')')[0]+')';
	}
	else
	{
		var pseudo = trim(document.getElementsByClassName('list1')[0].textContent.split('Statistiques')[0]);
	}
	var plasma = document.getElementsByName("plasmaSt")[0].value;
	
	var resultat = "";
	var dateAjd = new Date(); 
	var resultat_fonce = "[u]"+text.niveau+" [b][color=#b9ffa3]"+pseudo+"[/color][/b] "+text.le+" "+dateAjd.toLocaleString()+" :[/u]\n\n";
	var resultat_clair = "[u]"+text.niveau+" [b][color=#6CCF4D]"+pseudo+"[/color][/b] "+text.le+" "+dateAjd.toLocaleString()+" :[/u]\n\n";
	var prod_m_total = 0;
	var prod_c_total = 0;
	var prod_d_total = 0;
	
	var point_m_total = 0;
	var point_c_total = 0;
	var point_d_total = 0;
	
	var numero_mine_metalHOF = "";
	var numero_mine_cristalHOF = "";
	var numero_mine_deutHOF = "";
	
	var point_mine = 0;
	
	var trs = document.getElementById('planetTable').getElementsByTagName('tr');
		
	for( i=2 ; i< trs.length-1 ; i++)
	{
		var trr = document.getElementById(trs[i].id);
		var tds = trr.getElementsByTagName('td');
		
		var mm = tds[1].getElementsByTagName('input')[0].value;
		var mc = tds[2].getElementsByTagName('input')[0].value;
		var md = tds[3].getElementsByTagName('input')[0].value;
		
		var temperature = tds[5].getElementsByTagName('input')[0].value;//document.getElementsByName(""+i+"t")[0].value;
		if(!(mm == 0 && mc == 0 && md == 0))
		{
			resultat_fonce += text.planete+" "+(i-2)+" : [color=#f9bd68][b]"+mm+"[/b] "+text.metal+"[/color] [b]/[/b] [color=#b7f1ff][b]"+mc+"[/b] "+text.cristal+"[/color] [b]/[/b] [color=#ffeb67][b]"+md+"[/b] "+text.deuterium+"[/color] [b]/[/b] "+text.temperature+" [color=#ff7373][b]"+temperature+"[/b]°C[/color]\n";
			resultat_clair += text.planete+" "+(i-2)+" : [color=#EB7B13][b]"+mm+"[/b] "+text.metal+"[/color] [b]/[/b] [color=#2794D8][b]"+mc+"[/b] "+text.cristal+"[/color] [b]/[/b] [color=#FEAD00][b]"+md+"[/b] "+text.deuterium+"[/color] [b]/[/b] "+text.temperature+" [color=#CF2626][b]"+temperature+"[/b]°C[/color]\n";
			numero_mine_metalHOF += ""+mm+"/";
			numero_mine_cristalHOF += ""+mc+"/";
			numero_mine_deutHOF += ""+md+"/";
			
			prod_m_total += prodMetal(mm,UniSpeedFactor, plasma, 1) + 30 * UniSpeedFactor;
			prod_c_total += prodCristal(mc,UniSpeedFactor, plasma, 1) + 15 * UniSpeedFactor;
			prod_d_total += prodDeut(md,UniSpeedFactor, temperature, 1);
			
			point_m_total += Math.floor((75 * (1 - Math.pow(1.5, mm) / (-(1.5-1))))/1000);//formule venant du forum
			point_c_total += Math.floor((72 * (1 - Math.pow(1.6, mc) / (-(1.6-1))))/1000);//formule venant du forum
			point_d_total += Math.floor((300 * (1 - Math.pow(1.5, md) / (-(1.5-1))))/1000);//formule venant du forum
		}
	}
	point_mine = point_m_total + point_c_total + point_d_total;
	function format(x) {
		if (x==0) {return x;} else {
			var str = x.toString(), n = str.length;

			if (n <4) {return x;} else {
				return ((n % 3) ? str.substr(0, n % 3) + '.' : '') + str.substr(n % 3).match(new RegExp('[0-9]{3}', 'g')).join('.');
			}
		}
	}
	resultat_fonce += "\n"+text.pointsminesm+" : [b][color=#b9ffa3]"+format(point_m_total)+"[/color][/b]";
	resultat_fonce += "\n"+text.pointsminesc+" : [b][color=#b9ffa3]"+format(point_c_total)+"[/color][/b]";
	resultat_fonce += "\n"+text.pointsminesd+" : [b][color=#b9ffa3]"+format(point_d_total)+"[/color][/b]";
	resultat_fonce += "\n"+text.pointsmines+" : [b][color=#b9ffa3]"+format(point_mine)+"[/color][/b]\n";
	resultat_fonce += "\n"+text.plasma+" : [b][color=#b9ffa3]"+plasma+"[/color][/b]\n";
		
	resultat_fonce += "\n"+text.parheure+" : [color=#f9bd68][b]"+format(prod_m_total)+"[/b] "+text.metal+"[/color] [b]/[/b] [color=#b7f1ff][b]"+format(prod_c_total)+"[/b] "+text.cristal+"[/color] [b]/[/b] [color=#ffeb67][b]"+format(prod_d_total)+"[/b] "+text.deuterium+"[/color]\n\n";
	resultat_fonce += text.parjour+" : [color=#f9bd68][b]"+(format(prod_m_total*24))+"[/b] "+text.metal+"[/color] [b]/[/b] [color=#b7f1ff][b]"+(format(prod_c_total*24))+"[/b] "+text.cristal+"[/color] [b]/[/b] [color=#ffeb67][b]"+(format(prod_d_total*24))+"[/b] "+text.deuterium+"[/color]\n\n";
	resultat_fonce += text.parsem+" : [color=#f9bd68][b]"+(format(prod_m_total*24*7))+"[/b] "+text.metal+"[/color] [b]/[/b] [color=#b7f1ff][b]"+(format(prod_c_total*24*7))+"[/b] "+text.cristal+"[/color] [b]/[/b] [color=#ffeb67][b]"+(format(prod_d_total*24*7))+"[/b] "+text.deuterium+"[/color]\n\n";
	
	resultat_clair += "\n"+text.pointsminesm+" : [b][color=#6CCF4D]"+format(point_m_total)+"[/color][/b]";
	resultat_clair += "\n"+text.pointsminesc+" : [b][color=#6CCF4D]"+format(point_c_total)+"[/color][/b]";
	resultat_clair += "\n"+text.pointsminesd+" : [b][color=#6CCF4D]"+format(point_d_total)+"[/color][/b]";
	resultat_clair += "\n"+text.pointsmines+" : [b][color=#6CCF4D]"+format(point_mine)+"[/color][/b]\n";
	resultat_clair += "\n"+text.plasma+" : [b][color=#6CCF4D]"+plasma+"[/color][/b]\n";
		
	resultat_clair += "\n"+text.parheure+" : [color=#EB7B13][b]"+format(prod_m_total)+"[/b] "+text.metal+"[/color] [b]/[/b] [color=#2794D8][b]"+format(prod_c_total)+"[/b] "+text.cristal+"[/color] [b]/[/b] [color=#FEAD00][b]"+format(prod_d_total)+"[/b] "+text.deuterium+"[/color]\n\n";
	resultat_clair += text.parjour+" : [color=#EB7B13][b]"+(format(prod_m_total*24))+"[/b] "+text.metal+"[/color] [b]/[/b] [color=#2794D8][b]"+(format(prod_c_total*24))+"[/b] "+text.cristal+"[/color] [b]/[/b] [color=#FEAD00][b]"+(format(prod_d_total*24))+"[/b] "+text.deuterium+"[/color]\n\n";
	resultat_clair += text.parsem+" : [color=#EB7B13][b]"+(format(prod_m_total*24*7))+"[/b] "+text.metal+"[/color] [b]/[/b] [color=#2794D8][b]"+(format(prod_c_total*24*7))+"[/b] "+text.cristal+"[/color] [b]/[/b] [color=#FEAD00][b]"+(format(prod_d_total*24*7))+"[/b] "+text.deuterium+"[/color]\n\n";
		
	var ssig = document.getElementById("infocompte");
	ssig.innerHTML += text.exportmine+" :\n";
	ssig.innerHTML += "<table border='1' style='text-align:center'><tr><td>"+text.Fondfonce+"</td><td><textarea rows='8' cols='50' >"+resultat_fonce+resultat+"</textarea></td></tr></table>";
	ssig.innerHTML += "<table border='1' style='text-align:center'><tr><td>"+text.Fondclair+"</td><td><textarea rows='8' cols='50' >"+resultat_clair+resultat+"</textarea></td></tr></table>";
