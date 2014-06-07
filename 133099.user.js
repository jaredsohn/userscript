// ==UserScript==
// @name           Sokker transfer comparision v5
// @include        http://online.sokker.org/player/*
// @include        http://online.sokker.org/
// @include        http://online.sokker.org/?lang*
// @description    Compare transfers at sokker.org.  By http://db.sokker-deutschland.de. - Edited by http://agancheva.info
// ==/UserScript==
// 
// 
// 
// @version 5

// ==/UserScript==


var myurl=document.URL;


//test if jQuery is loaded and load script - jQuery is from page and page is player page
if (myurl.match(/player/)&&typeof unsafeWindow.jQuery !== "undefined") {
	var $$=unsafeWindow.jQuery;
	function returnHome(){
		var  home_link=$$('a[href^="country/ID_country/"]:eq(1)').prop('href');
		return home_link.substring(home_link.indexOf('country/ID_country/')+19);
	}
	function getPlayerName() {
			var fullname=$$('div.topContent').find('h1').html();
			return $$.trim(fullname.substr(0,fullname.indexOf('[')));	
	}
	function getPlayerPid(){
			var fullname=$$('div.topContent').find('h1').html();
			return $$.trim(fullname.substring(fullname.indexOf('[')+1,fullname.indexOf(']')));	
	}
	function getPlayerAge(pid){
		return  $$('a.linkStyle1[href="player/PID/'+pid+'"]').next().html();				
	}
	function getPlayerHeight(pid){
		var spans=  $$('a.linkStyle1[href="player/PID/'+pid+'"]').parent().parent().next().find('div.content').find('strong:eq(6)');//next().find('div.content').find('span')		
		return spans.html();
	}
	function getPlayerCountry(pid){
		var spans=  $$('a.linkStyle1[href="player/PID/'+pid+'"]').parent().parent().next().find('div.content').find('strong:eq(1)').find('a');//next().find('div.content').find('span')		
		return spans.html();
	}
	function getPlayerValue(pid){
		var spans=  $$('a.linkStyle1[href="player/PID/'+pid+'"]').parent().parent().next().find('div.content').find('strong:eq(2)');//next().find('div.content').find('span')		
		var fd = spans.html().match(/\d/g);
		
		return fd.join('');
		
	}
	function getPlayerParam(param){
		var param_num=-1;
		switch(param){
			case 'frm':param_num=0;break;
			case 'sta':param_num=2;break;
			case 'kee':param_num=3;break;
			case 'pac':param_num=4;break;
			case 'def':param_num=5;break;
			case 'tec':param_num=6;break;
			case 'pla':param_num=7;break;
			case 'pas':param_num=8;break;
			case 'str':param_num=9;break;
		}
		var el = $$('span.skillNameNumber:eq('+param_num+')').html();
		
		return el.substring(1,el.indexOf(']'));	
	}
	function getPrice(pid){
		var aux = $$('form[action^="player/PID/'+pid+'/sl"]').find('p:eq(0)').html();
		var pos_start = aux.indexOf('<br>')+4;
		var pos_end = aux.indexOf('<br>',aux.indexOf('<br>')+1);
		var str = aux.substring(pos_start,pos_end).match(/\d/g);
		return str.join('')+' ';
	}
	function getTeam(pid){
		return $$.trim($$('form[action^="player/PID/'+pid+'/sl"]').find('p:eq(0)').find('a').html());
	}
	function getLanguage() {
		var splitted_variables = unescape(window.document.cookie).split(";");
	
		for (var i = 0; i < splitted_variables.length; i++) {
			var variable_value = splitted_variables[i].split("=");
		        if ((variable_value.length == 2) && (variable_value[0].match(/lang/))) {
					
				 return unescape(variable_value[1]);
			
	        	} 
		}
		// no language found - return the default language
		return "en";
	}
	function init_language() {
		var lang_str="";
	
		for (var n=0;n<ValidLanguages.length;n++) {
			if (n==0) {
				lang_str+=ValidLanguages[n];
			}
			else {
				lang_str+=", "+ValidLanguages[n];
			}
		}
	
		var lang = new Object();
		switch (getLanguage()) {
	
		case "bg":
	
	lang["\u0442\u0440\u0430\u0433\u0438\u0447\u043D\u043E"] = 0;
	lang["\u0431\u0435\u0437\u043D\u0430\u0434\u0435\u0436\u0434\u043D\u043E"] = 1;
	lang["\u043D\u0435\u0437\u0430\u0434\u043E\u0432\u043E\u043B\u0438\u0442\u0435\u043B\u043D\u043E"] = 2;
	lang["\u043B\u043E\u0448\u043E"] = 3;
	lang["\u0441\u043B\u0430\u0431\u043E"] = 4;
	lang["\u0441\u0440\u0435\u0434\u043D\u043E"] = 5;
	lang["\u0430\u0434\u0435\u043A\u0432\u0430\u0442\u043D\u043E"] = 6;
	lang["\u0434\u043E\u0431\u0440\u043E"] = 7;
	lang["\u0441\u0442\u0430\u0431\u0438\u043B\u043D\u043E"] = 8;
	lang["\u043C\u043D\u043E\u0433\u043E \u0434\u043E\u0431\u0440\u043E"] = 9;
	lang["\u043E\u0442\u043B\u0438\u0447\u043D\u043E"] = 10;
	lang["\u043F\u0440\u0435\u043A\u0440\u0430\u0441\u043D\u043E"] = 11;
	lang["\u0438\u0437\u043A\u043B\u044E\u0447\u0438\u0442\u0435\u043B\u043D\u043E"] = 12;
	lang["\u043D\u0435\u0432\u0435\u0440\u043E\u044F\u0442\u043D\u043E"] = 13;
	lang["\u0431\u0440\u0438\u043B\u044F\u043D\u0442\u043D\u043E"] = 14;
	lang["\u043C\u0430\u0433\u0438\u0447\u0435\u0441\u043A\u043E"] = 15;
	lang["\u043D\u0435\u0437\u0435\u043C\u043D\u043E"] = 16;
	lang["\u0431\u043E\u0436\u0435\u0441\u0442\u0432\u0435\u043D\u043E"] = 17;
	lang["\u0441\u0432\u0440\u044A\u0445\u0431\u043E\u0436\u0435\u0441\u0442\u0432\u0435\u043D\u043E"] = 18;
			lang["entry"]="изпрати трансфер: ";
			lang["compare"]="сравни трансфер: ";
			lang["test"]="1";
			lang["sprache"] = "bg";
			break;
	
		case "bs":
	
			lang["tragic"] = 0;
			lang["hopeless"] = 1;
			lang["unsatisfactory"] = 2;
			lang["poor"] = 3;
			lang["weak"] = 4;
			lang["average"] = 5;
			lang["adequate"] = 6;
			lang["good"] = 7;
			lang["solid"] = 8;
			lang["very good"] = 9;
			lang["excellent"] = 10;
			lang["formidable"] = 11;
			lang["outstanding"] = 12;
			lang["incredible"] = 13;
			lang["brilliant"] = 14;
			lang["magical"] = 15;
			lang["unearthly"] = 16;
			lang["divine"] = 17;
			lang["superdivine"] = 18;
			lang["entry"]="unesi transfer: ";
			lang["compare"]="uporedi tranfer: ";
			lang["test"]="1";
			lang["sprache"] = "bs";
			break;
	
	
	
			case "ca":
			lang [ "tr\u00e0gica"] = 0;
			lang [ "tr\u00e0gic"] = 0;
			lang [ "terrible"] = 1;
			lang [ "deficient"] = 2;
			lang [ "pobre"] = 3;
			lang [ "d\u00e8bil"] = 4;
			lang [ "regular"] = 5;
			lang [ "acceptable"] = 6;
			lang [ "bona"] = 7;
			lang [ "bo"] = 7;
			lang [ "s\u00f2lida"] = 8;
			lang [ "s\u00f2lid"] = 8;
			lang [ "molt bona"] = 9;
			lang [ "molt bo"] = 9;
			lang [ "excel\u00b7lent"] = 10;
			lang [ "formidable"] = 11;
			lang [ "destacada"] = 12;
			lang [ "destacat"] = 12;
			lang [ "incre\u00efble"] = 13;
			lang [ "brillant"] = 14;
			lang [ "m\u00e0gica"] = 15;
			lang [ "m\u00e0gic"] = 15;
			lang [ "extraterrestre"] = 16;
			lang [ "divina"] = 17;
			lang [ "div\u00ed"] = 17;
			lang [ "superdivina"] = 18;
			lang [ "superdiv\u00ed"] = 18;				
			lang [ "entry"] = "Introduir transferència: ";
			lang [ "compare"] = "Comparar jugador: ";
			lang["test"]="1";
			lang["test"]="1";
			lang["sprache"] = "ca";
			break;
	
	
		case "de":
			lang["tragisch"] = 0;
			lang["hoffnungslos"] = 1;
			lang["ungen\u00fcgend"] = 2;
			lang["armselig"] = 3;
			lang["schwach"] = 4;
			lang["durchschnittlich"] = 5;
			lang["akzeptabel"] = 6;
			lang["gut"] = 7;
			lang["zuverl\u00e4ssig"] = 8;
			lang["sehr gut"] = 9;
			lang["ausgezeichnet"] = 10;
			lang["eindrucksvoll"] = 11;
			lang["\u00fcberragend"] = 12;
			lang["unglaublich"] = 13;
			lang["bravour\u00f6s"] = 14;
			lang["magisch"] = 15;
			lang["\u00fcberirdisch"] = 16;
			lang["g\u00f6ttlich"] = 17;
			lang["g\u00f6ttlich (max)"] = 18;
			lang["entry"]="Transfereintrag: ";
			lang["compare"]="Transfervergleich: ";
			lang["test"]="1";
			lang["sprache"] = "de";
			break;
	
	
		case "en":
			lang["tragic"] = 0;
			lang["hopeless"] = 1;
			lang["unsatisfactory"] = 2;
			lang["poor"] = 3;
			lang["weak"] = 4;
			lang["average"] = 5;
			lang["adequate"] = 6;
			lang["good"] = 7;
			lang["solid"] = 8;
			lang["very good"] = 9;
			lang["excellent"] = 10;
			lang["formidable"] = 11;
			lang["outstanding"] = 12;
			lang["incredible"] = 13;
			lang["brilliant"] = 14;
			lang["magical"] = 15;
			lang["unearthly"] = 16;
			lang["divine"] = 17;
			lang["superdivine"] = 18;
			lang["entry"]="submit transfer: ";
			lang["compare"]="compare transfer: ";
			lang["sprache"] = "en";	
			lang["test"]="1";
			break;
			
			
			case "el":
			lang['\u03C4\u03C1\u03B1\u03B3\u03B9\u03BA\u03CC\u03C2'] = 0;
			lang['\u03BC\u03AC\u03C4\u03B1\u03B9\u03BF\u03C2'] = 1;
			lang['\u03B1\u03C0\u03BF\u03B3\u03BF\u03B7\u03C4\u03B5\u03C5\u03C4\u03B9\u03BA\u03CC\u03C2'] = 2;
			lang['\u03C6\u03C4\u03C9\u03C7\u03CC\u03C2'] = 3;
			lang['\u03B1\u03B4\u03CD\u03BD\u03B1\u03BC\u03BF\u03C2'] = 4;
			lang['\u03BC\u03AD\u03C4\u03C1\u03B9\u03BF\u03C2'] = 5;
			lang['\u03B5\u03C0\u03B1\u03C1\u03BA\u03AE\u03C2'] = 6;
			lang['\u03BA\u03B1\u03BB\u03CC\u03C2'] = 7;
			lang['\u03B1\u03C1\u03BA\u03B5\u03C4\u03AC \u03BA\u03B1\u03BB\u03CC\u03C2'] = 8;
			lang['\u03C0\u03BF\u03BB\u03CD \u03BA\u03B1\u03BB\u03CC\u03C2'] = 9;
			lang['\u03AC\u03C1\u03B9\u03C3\u03C4\u03BF\u03C2'] = 10;
			lang['\u03C4\u03C1\u03BF\u03BC\u03B5\u03C1\u03CC\u03C2'] = 11;
			lang['\u03C3\u03C0\u03BF\u03C5\u03B4\u03B1\u03AF\u03BF\u03C2'] = 12;
			lang['\u03B5\u03BA\u03C0\u03BB\u03B7\u03BA\u03C4\u03B9\u03BA\u03CC\u03C2'] = 13;
			lang['\u03AD\u03BE\u03BF\u03C7\u03BF\u03C2'] = 14;
			lang['\u03BC\u03B1\u03B3\u03B9\u03BA\u03CC\u03C2'] = 15;
			lang['\u03C5\u03C0\u03B5\u03C1\u03C6\u03C5\u03C3\u03B9\u03BA\u03CC\u03C2'] = 16;
			lang['\u03B8\u03B5\u03CA\u03BA\u03CC\u03C2'] = 17;
			lang['\u03B5\u03BE\u03C9\u03C0\u03C1\u03B1\u03B3\u03BC\u03B1\u03C4\u03B9\u03BA\u03CC\u03C2'] = 18;
			lang['entry']='εισαγωγή μεταγραφής:';
			lang['compare']='σύγκριση μεταγραφής:';
			lang["sprache"] = "el";	
			lang["test"]="1";
			break;
	
			case "es":
			lang["tr\u00e1gico"] = 0;
			lang["tr\u00e1gica"] = 0;
			lang["terrible"] = 1;
			lang["deficiente"] = 2;
			lang["pobre"] = 3;
			lang["d\u00e9bil"] = 4;
			lang["regular"] = 5;
			lang["aceptable"] = 6;
			lang["bueno"] = 7;
			lang["buena"] = 7;
			lang["s\u00f3lido"] = 8;
			lang["s\u00f3lida"] = 8;
			lang["muy bueno"] = 9;
			lang["muy buena"] = 9;
			lang["excelente"] = 10;
			lang["formidable"] = 11;
			lang["destacado"] = 12;
			lang["destacada"] = 12;
			lang["incre\u00edble"] = 13;
			lang["brillante"] = 14;
			lang["m\u00e1gico"] = 15;
			lang["m\u00e1gica"] = 15;
			lang["sobrenatural"] = 16;
			lang["divino"] = 17;
			lang["divina"] = 17;
			lang["superdivino"] = 18;
			lang["superdivina"] = 18;
			lang["entry"]="Introducir transferencia: ";
			lang["compare"]="Comparar jugador: ";
			lang["sprache"] = "es";	
			lang["test"]="1";
			break;
	
	
			case "fr":
	lang["tragique"] = 0;
	lang["d\u00e9sesp\u00e9rant"] = 1;
	lang["d\u00e9cevant"] = 2;
	lang["m\u00e9diocre"] = 3;
	lang["faible"] = 4;
	lang["moyen"] = 5;
	lang["ad\u00e9quat"] = 6;
	lang["bon"] = 7;
	lang["honorable"] = 8;
	lang["tr\u00e8s bon"] = 9;
	lang["excellent"] = 10;
	lang["formidable"] = 11;
	lang["exceptionnel"] = 12;
	lang["incroyable"] = 13;
	lang["brillant"] = 14;
	lang["magique"] = 15;
	lang["extra-terrestre"] = 16;
	lang["divin"] = 17;
	lang["ultime"] = 18;
	lang["entry"]="transfert entré: ";
	lang["compare"]="compare transfert: ";
	lang["sprache"] = "fr";	
	lang["test"]="1";
			break;
	
	
			
		case "hu":	
			lang["tragikus"] = 0;
			lang["rem\u00e9nytelen"] = 1;
			lang["felejthet\u0151"] = 2;
			lang["pocs\u00e9k"] = 3;
			lang["gyenge"] = 4;
			lang["\u00e1tlagos"] = 5;
			lang["megfelel\u0151"] = 6;
			lang["j\u00f3"] = 7;
			lang["er\u0151s"] = 8;
			lang["nagyon j\u00f3"] = 9;
			lang["nagyszer\u0171"] = 10;
			lang["f\u00e9lelmetes"] = 11;
			lang["kiv\u00e1l\u00f3"] = 12;
			lang["hihetetlen"] = 13;
			lang["brili\u00e1ns"] = 14;
			lang["var\u00e1zslatos"] = 15;
			lang["mennyei"] = 16;
			lang["isteni"] = 17;
			lang["fel\u00fclm\u00falhatatlan"] = 18;
			lang["entry"]="átigazolás beküldése: ";
			lang["compare"]="hasonló átigazolások keresése: ";
			lang["sprache"] = "hu";	
			lang["test"]="1";
			break;		
	
		case "it":
			lang["tragico"] = 0;
			lang["tragica"] = 0;
			lang["tremendo"] = 1;
			lang["tremenda"] = 1;
			lang["insoddisfacente"] = 2;
			lang["scarso"] = 3;
			lang["scarsa"] = 3;
			lang["debole"] = 4;
			lang["medio"] = 5;
			lang["media"] = 5;
			lang["accettabile"] = 6;
			lang["buono"] = 7;
			lang["buona"] = 7;
			lang["solido"] = 8;
			lang["solida"] = 8;
			lang["ottimo"] = 9;
			lang["ottima"] = 9;
			lang["eccellente"] = 10;
			lang["formidabile"] = 11;
			lang["straordinario"] = 12;
			lang["straordinaria"] = 12;
			lang["incredibile"] = 13;
			lang["splendido"] = 14;
			lang["splendida"] = 14;
			lang["magico"] = 15;
			lang["magica"] = 15;
			lang["sovrumano"] = 16;
			lang["sovrumana"] = 16;
			lang["divino"] = 17;
			lang["divina"] = 17;
			lang["superdivino"] = 18;
			lang["superdivina"] = 18;
			lang["entry"]="inserisci trasferimento: ";
			lang["compare"]="confronta trasferimento: ";
			lang["sprache"] = "it";	
			lang["test"]="1";
			break;	
			
		case "mt":
			lang["tragic"] = 0;
			lang["hopeless"] = 1;
			lang["unsatisfactory"] = 2;
			lang["poor"] = 3;
			lang["weak"] = 4;
			lang["average"] = 5;
			lang["adequate"] = 6;
			lang["good"] = 7;
			lang["solid"] = 8;
			lang["very good"] = 9;
			lang["excellent"] = 10;
			lang["formidable"] = 11;
			lang["outstanding"] = 12;
			lang["incredible"] = 13;
			lang["brilliant"] = 14;
			lang["magical"] = 15;
			lang["unearthly"] = 16;
			lang["divine"] = 17;
			lang["superdivine"] = 18;
			lang["entry"]="Da\u0127\u0127al it-transfer: ";
			lang["compare"]="Paragun tat-trasferimenti: ";
			lang["sprache"] = "mt";	
			lang["test"]="1";
			break;
			
		case "nl":
			lang["tragisch"] = 0;
			lang["hopeloos"] = 1;
			lang["waardeloos"] = 2;
			lang["slecht"] = 3;
			lang["zwak"] = 4;
			lang["matig"] = 5;
			lang["redelijk"] = 6;
			lang["goed"] = 7;
			lang["solide"] = 8;
			lang["zeer goed"] = 9;
			lang["uitstekend"] = 10;
			lang["formidabel"] = 11;
			lang["uitmuntend"] = 12;
			lang["wonderbaarlijk"] = 13;
			lang["briljant"] = 14;
			lang["magisch"] = 15;
			lang["buitenaards"] = 16;
			lang["goddelijk"] = 17;
			lang["supergoddelijk"] = 18;
			lang["entry"]="voeg transfer toe: ";
			lang["compare"]="vergelijk transfer: ";
			lang["sprache"] = "nl";
			lang["test"]="1";
			break;
			
					
	case "pl":
			lang["tragiczna"] = 0;
			lang["tragiczne"] = 0;
			lang["tragiczny"] = 0;
			lang["beznadziejna"] = 1;
			lang["beznadziejne"] = 1;
			lang["beznadziejny"] = 1;
			lang["niedostateczna"] = 2;
			lang["niedostateczne"] = 2;
			lang["niedostateczny"] = 2;
			lang["mierna"] = 3;
			lang["mierne"] = 3;
			lang["mierny"] = 3;
			lang["s\u0142aba"] = 4;
			lang["s\u0142abe"] = 4;
			lang["s\u0142aby"] = 4;
			lang["przeci\u0119tny"] = 5;
			lang["przeci\u0119tna"] = 5;		
			lang["przeci\u0119tne"] = 5;
			lang["dostateczna"] = 6;
			lang["dostateczne"] = 6;
			lang["dostateczny"] = 6;		
			lang["dobra"] = 7;
			lang["dobre"] = 7;
			lang["dobry"] = 7;
			lang["solidna"] = 8;
			lang["solidne"] = 8;
			lang["solidny"] = 8;
			lang["bardzo dobra"] = 9;
			lang["bardzo dobre"] = 9;
			lang["bardzo dobry"] = 9;
			lang["celuj\u0105ca"] = 10;
			lang["celuj\u0105ce"] = 10;
			lang["celuj\u0105cy"] = 10;
			lang["\u015bwietny"] = 11;
			lang["\u015bwietne"] = 11;
			lang["\u015bwietna"] = 11;
			lang["znakomity"] = 12;
			lang["znakomite"] = 12;
			lang["znakomita"] = 12;
			lang["niesamowity"] = 13;
			lang["niesamowite"] = 13;
			lang["niesamowita"] = 13;
			lang["ol\u015bniewaj\u0105ca"] = 14;
			lang["ol\u015bniewaj\u0105ce"] = 14;
			lang["ol\u015bniewaj\u0105cy"] = 14;
			lang["magiczna"] = 15;
			lang["magiczne"] = 15;
			lang["magiczny"] = 15;
			lang["nieziemski"] = 16;
			lang["nieziemskie"] = 16;
			lang["nieziemska"] = 16;
			lang["boski"] = 17;
			lang["boskie"] = 17;
			lang["boska"] = 17;
			lang["nadboski"] = 18;
			lang["nadboske"] = 18;
			lang["nadboska"] = 18;
			lang["entry"]="Dodaj transfer: ";
			lang["compare"]="Por\u00f3wnaj transfer: ";
					
			lang["sprache"] = "pl";
			lang["test"]="1";
			break;
	
	case "ro":
	lang["tragic"] = 0;
	lang["f\u0103r\u0103 speran\u0163\u0103"] = 1;
	lang["insuficient"] = 2;
	lang["foarte slab"] = 3;
	lang["slab"] = 4;
	lang["mediu"] = 5;
	lang["adecvat"] = 6;
	lang["bun"] = 7;
	lang["solid"] = 8;
	lang["foarte bun"] = 9;
	lang["excelent"] = 10;
	lang["formidabil"] = 11;
	lang["remarcabil"] = 12;
	lang["incredibil"] = 13;
	lang["briliant"] = 14;
	lang["magic"] = 15;
	lang["extraterestru"] = 16;
	lang["divin"] = 17;
	lang["divin+"] = 18;
	lang["entry"]="adaug\u0103 transfer: ";
	lang["compare"]="compar\u0103 transfer: ";
	lang["sprache"] = "ro";
	lang["test"]="1";
	break;	
	
	
	case "tr":
			lang["felaket"] = 0;
			lang["berbat"] = 1;
			lang["yetersiz"] = 2;
			lang["k\u00f6t\u00fc"] = 3;
			lang["zay\u0131f"] = 4;
			lang["vasat"] = 5;
			lang["yeterli"] = 6;
			lang["iyi"] = 7;
			lang["kaliteli"] = 8;
			lang["\u00e7ok iyi"] = 9;
			lang["\u00fcst\u00fcn"] = 10;
			lang["m\u00fckemmel"] = 11;
			lang["muhte\u015fem"] = 12;
			lang["ola\u011fan\u00fcst\u00fc"] = 13;
			lang["g\u00f6rkemli"] = 14;
			lang["sihirli"] = 15;
			lang["d\u00fcnya d\u0131\u015f\u0131"] = 16;
			lang["tanr\u0131sal"] = 17;
			lang["s\u00fcpertanr\u0131sal"] = 18;
			lang["supertanr\u0131sal"] = 18;
			lang["entry"]="Transfer Kay\u0131t: ";
			lang["compare"]="Transfer K\u0131yaslama: ";		
	
			lang["sprache"] = "tr";
			lang["test"]="1";
			break;
	
	case "ru":
			lang["\u0443\u0436\u0430\u0441\u043d\u043e"] = 0;
			lang["\u0431\u0435\u0437\u043d\u0430\u0434\u0435\u0436\u043d\u043e"] = 1;
			lang["\u043d\u0435\u0443\u0434\u043e\u0432\u043b\u0435\u0442\u0432\u043e\u0440\u0438\u0442\u0435\u043b\u044c\u043d\u043e"] = 2;
			lang["\u043f\u043b\u043e\u0445\u043e"] = 3;
			lang["\u0441\u043b\u0430\u0431\u043e"] = 4;
			lang["\u0441\u0440\u0435\u0434\u043d\u0435"] = 5;
			lang["\u043f\u0440\u0438\u0435\u043c\u043b\u0435\u043c\u043e"] = 6;
			lang["\u0445\u043e\u0440\u043e\u0448\u043e"] = 7;
			lang["\u0441\u043e\u043b\u0438\u0434\u043d\u043e"] = 8;
			lang["\u043e\u0447\u0435\u043d\u044c \u0445\u043e\u0440\u043e\u0448\u043e"] = 9;
			lang["\u043e\u0442\u043b\u0438\u0447\u043d\u043e"] = 10;
			lang["\u0443\u0434\u0438\u0432\u0438\u0442\u0435\u043b\u044c\u043d\u043e"] = 11;
			lang["\u0432\u043f\u0435\u0447\u0430\u0442\u043b\u044f\u044e\u0449\u0435"] = 12;
			lang["\u043d\u0435\u0432\u0435\u0440\u043e\u044f\u0442\u043d\u043e"] = 13;
			lang["\u0431\u043b\u0435\u0441\u0442\u044f\u0449\u0435"] = 14;
			lang["\u0447\u0443\u0434\u0435\u0441\u043d\u043e"] = 15;
			lang["\u0441\u0432\u0435\u0440\u0445\u044a\u0435\u0441\u0442\u0435\u0441\u0442\u0432\u0435\u043d\u043d\u043e"] = 16;
			lang["\u0431\u043e\u0436\u0435\u0441\u0442\u0432\u0435\u043d\u043d\u043e"] = 17;
			lang["\u043c\u0430\u043a\u0441\u0438\u043c\u0430\u043b\u044c\u043d\u043e"] = 18;
			lang["entry"]="\u0414\u043e\u0431\u0430\u0432\u0438\u0442\u044c \u0442\u0440\u0430\u043d\u0441\u0444\u0435\u0440: ";
			lang["compare"]="\u0421\u0440\u0430\u0432\u043d\u0438\u0442\u044c \u0442\u0440\u0430\u043d\u0441\u0444\u0435\u0440: ";
	
			lang["sprache"] = "ru";
			lang["test"]="1";
	break;			
		default:
			lang["test"]="Your current language setting is not supported by this script!\nSupported languages are: german, english and polnish.\nPlease use one of these languages to make this script work.";
		}
		return lang;
	
	}
	// Main...
	ValidLanguages = new Array("bs", "ca", "en", "de", "es", "fr", "hu", "it", "mt", "nl", "pl", "ro", "ru", "tr", "uk");

	var lang = init_language();
	var home = returnHome();
	
	//compare link
	function fsok_addLink(lang) {
		
	var home = returnHome();
		var doc=document;
		var add = 3;
		var linkadd = 0;
		var spanadd = 1;
		var version="v4.3";
		var mylang=lang["sprache"];
		/****************************************************************************************/
		/* Collect information from the web page                                                */
		/****************************************************************************************/
		var playername=getPlayerName();
		var pid = getPlayerPid();
		var name = getPlayerName();
		var age = getPlayerAge(pid);
		var height = getPlayerHeight(pid);
		
		
		if($$('form[action^="player/PID/'+pid+'/sl"]').length>0){
			
			var preis = getPrice(pid);	
			var own = getTeam(pid); 
		}else{
			var preis='';
			var own='';
		}
		
	
		var val = getPlayerValue(pid);
		
		var frm = getPlayerParam('frm');
			
		var sta = getPlayerParam('sta');
		var kee = getPlayerParam('kee');
		
		var pac = getPlayerParam('pac');
		var def = getPlayerParam('def');
		
		var tec = getPlayerParam('tec');
		var pla = getPlayerParam('pla');
		var pas = getPlayerParam('pas');
		var str = getPlayerParam('str');
	

	
	
		/****************************************************************************************/
		/* Inject form                                        */
		/****************************************************************************************/
	
	
		var Transfer1 = doc.createElement("span"); //create the div section to add elements
		
		var elp = doc.createElement('p');
		elp.setAttribute("id","result1");
		doc.getElementsByTagName("div")[43].appendChild(elp);
	
		
	
		var Tform=" <br /><strong style=\"padding-left:20px\">"+lang["compare"]+"</strong><form action='http://db.sokker-deutschland.de/tv_transferliste.php' target='_blank' accept-charset='UTF-8' method='post' style='display:inline;'>";
		Tform=Tform+"<input name='name' type='hidden' value='"+name+"' />";
		if(preis!='')
		Tform=Tform+"<input name='c_preis' type='hidden' value='"+preis+"' />";
		if(own!='')
		Tform=Tform+"<input name='own' type='hidden' value='"+own+"' />";
		Tform=Tform+"<input name='home' type='hidden' value='"+returnHome()+"' />";
		Tform=Tform+"<input name='pid' type='hidden' value='"+pid+"' />";
		Tform=Tform+"<input name='age' type='hidden' value='"+age+"' />";
		Tform=Tform+"<input name='height' type='hidden' value='"+height+"' />";
		Tform=Tform+"<input name='val' type='hidden' value='"+val+"' />";
		Tform=Tform+"<input name='frm' type='hidden' value='"+frm+"' />";
		Tform=Tform+"<input name='sta' type='hidden' value='"+sta+"' />";
		Tform=Tform+"<input name='kee' type='hidden' value='"+kee+"' />";
		Tform=Tform+"<input name='pac' type='hidden' value='"+pac+"' />";
		Tform=Tform+"<input name='def' type='hidden' value='"+def+"' />";
		Tform=Tform+"<input name='tec' type='hidden' value='"+tec+"' />";
		Tform=Tform+"<input name='pla' type='hidden' value='"+pla+"' />";
		Tform=Tform+"<input name='pas' type='hidden' value='"+pas+"' />";
		Tform=Tform+"<input name='str' type='hidden' value='"+str+"' />";
		Tform=Tform+"<input name='lang' type='hidden' value='"+mylang+"' />";
		Tform=Tform+"<input name='version' type='hidden' value='"+version+"' />";
		Tform=Tform+"<input type='image' src='http://db.sokker-deutschland.de/media/ask.gif' alt='' />";
		Tform=Tform+"</form><br /><br />";
		Transfer1.innerHTML=Tform;
	
		$$('a.linkStyle1[href="player/PID/'+pid+'"]').parent().parent().next().find('div.content').parent().after(Transfer1);
		
	}
	//link to add to transferDB
	function fsok_addTransferFlag(lang) {
	
		var home = returnHome();
		var doc=document;
			var add = 3;
			var linkadd = 0;
			var spanadd = 1;
			/****************************************************************************************/
			/* Collect information from the web page                                                */
			/****************************************************************************************/
		
			var pid = getPlayerPid();
			var name = getPlayerName();
	
			var age = getPlayerAge(pid);
			var height = getPlayerHeight(pid);
			if($$('form[action^="player/PID/'+pid+'/sl"]').length>0){
				
				var preis = getPrice(pid);	
				var own = getTeam(pid); 
		}
			
			var country = getPlayerCountry(pid);
			if($$('form[action^="player/PID/'+pid+'/sl"]').length>0){
					
					var preis = getPrice(pid);	
					var own = getTeam(pid); 
			}
			
			
			var val = getPlayerValue(pid);
			
			
			
			var frm = getPlayerParam('frm');
			var sta = getPlayerParam('sta');
			var kee =getPlayerParam('kee');
			var pac = getPlayerParam('pac');
			var def = getPlayerParam('def');
			var tec = getPlayerParam('tec');
			var pla = getPlayerParam('pla');
			var pas = getPlayerParam('pas');
			var str = getPlayerParam('str');
	
	
			/****************************************************************************************/
			/* Inject form                                        */
			/****************************************************************************************/
			var version="v4.3";
			var mylang=lang["sprache"];
			var Transfer = doc.createElement("span");
			var elp = doc.createElement('p');
			elp.setAttribute("id","result1");
			doc.getElementsByTagName("div")[43].appendChild(elp); 
	
			var Tform="  <strong style=\"padding-left:20px\">"+lang["entry"]+"</strong><form  target='_blank' action='http://db.sokker-deutschland.de/tv_enter_transfer.php' accept-charset='UTF-8' method='post' style='display:inline;'>";
			Tform=Tform+"<input name='preis' type='hidden' value='"+preis+"' />";
			Tform=Tform+"<input name='name' type='hidden' value='"+name+"' />";
			Tform=Tform+"<input name='country' type='hidden' value='"+country+"' />";
			Tform=Tform+"<input name='home' type='hidden' value='"+returnHome()+"' />";
			Tform=Tform+"<input name='own' type='hidden' value='"+own+"' />";
			Tform=Tform+"<input name='pid' type='hidden' value='"+pid+"' />";
			Tform=Tform+"<input name='age' type='hidden' value='"+age+"' />";
			Tform=Tform+"<input name='height' type='hidden' value='"+height+"' />";
			Tform=Tform+"<input name='val' type='hidden' value='"+val+"' />";
			Tform=Tform+"<input name='frm' type='hidden' value='"+frm+"' />";
			Tform=Tform+"<input name='sta' type='hidden' value='"+sta+"' />";
			Tform=Tform+"<input name='kee' type='hidden' value='"+kee+"' />";
			Tform=Tform+"<input name='pac' type='hidden' value='"+pac+"' />";
			Tform=Tform+"<input name='def' type='hidden' value='"+def+"' />";
			Tform=Tform+"<input name='tec' type='hidden' value='"+tec+"' />";
			Tform=Tform+"<input name='pla' type='hidden' value='"+pla+"' />";
			Tform=Tform+"<input name='pas' type='hidden' value='"+pas+"' />";
			Tform=Tform+"<input name='str' type='hidden' value='"+str+"' />";
			Tform=Tform+"<input name='lang' type='hidden' value='"+mylang+"' />";
			Tform=Tform+"<input name='version' type='hidden' value='"+version+"' />";
			Tform=Tform+"<input type='image' src='http://db.sokker-deutschland.de/media/add.jpg' alt='' />";
			Tform=Tform+"</form>";
			Transfer.innerHTML=Tform;
			$$('a.linkStyle1[href="player/PID/'+pid+'"]').parent().parent().next().find('div.content').parent().after(Transfer);
			
		}
	
	
		if (lang["test"]=="1")
		{
		
		fsok_addLink(lang);
		
			if($$('form[action^="player/PID/'+getPlayerPid()+'/sl"]').length>0&&$$('form[action^="player/PID/'+getPlayerPid()+'/sl"]').find('p:eq(1)').length==0){
				fsok_addTransferFlag(lang);
			}
		
		
		}
}