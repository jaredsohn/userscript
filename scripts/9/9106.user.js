// ==UserScript==
// @name			Ugamela - Advance Options by vOidSenses adapted for Sey
// @namespace		
// @description 	adds adicional options to UGamela that you can edit in your options page
// @include	http://ugamela.com/*.php
// @exclude     http://www.ogame*.de/*
// ==/UserScript==

////////////////////////////////////////////
// ********Ugamela - Advance options**********
////////////////07 May 2007/////////////////
// 
// 
// 
// 
//
// Ogame.de translated by astefk
// Ugamela.com translated by elisma and fede
// OGame.fr translated by Thanatos and symbiont
// OGame.ba translated by Kotach86
// OGame.pl translated by sero
// OGame.ru translated by ADie
// OGame.nl translated by Chassisbot
// OGame.it translated by Emperor of Light
////////////////////////////////////////////

function xpath(query) {
	return document.evaluate(query, document, null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
}

function del(query){
	var elem = xpath(query);
	if(elem.snapshotLength > 0){
		elem.snapshotItem(0).parentNode.removeChild(elem.snapshotItem(0));
	}
}

function delall(query){
	var allelem = xpath(query);
	if(allelem.snapshotLength > 0){
		for (var i = 0; i < allelem.snapshotLength; i++ ) {
			var elem = allelem.snapshotItem(i);
				elem.parentNode.removeChild(elem);
		}
	}
}

function togglecheck(str){
	if(str == "1"){
		return "checked=\"checked\"";
	} else if(str == "0"){
		return "0";
	} 
}

function mystr2num(str){
	var allnums = str.split(".");
	var mystr = "";

	for(var i=0; i<allnums.length; i++){
		mystr = mystr +allnums[i];
	}

	return parseInt(mystr);
}

function reder(str){
	if(/font/.test(str) == true){
		var clean = />([0-9\.]+)</.exec(str);
		if(clean != null){ clean = RegExp.$1; return clean;} else {return "0";}	
	} else {
	return str;
	}
}

function resizer(w,h,c){
	if(Math.max(w,h) == c){ 
		return 52;
	} else {
		return (Math.round((Math.min(w,h)/Math.max(w,h))*52));
	}
}

function calcmaxnum(m,c,d,nm,nc,nd){ 
	var valor = Math.min(Math.floor(m/nm),Math.floor(c/nc),Math.floor(d/nd));
	return valor;
} 

function calctime(m,c,d,nm,nc,nd,mf,cf,df){
	var mmax = Math.floor(((nm - m)*3600)/mf);
	if(mmax>0){mmax=mmax;} else {mmax=0}
	var cmax = Math.floor(((nc - c)*3600)/cf);
	if(cmax>0){cmax=cmax;} else {cmax=0}
	var dmax = Math.floor(((nd - d)*3600)/df);
	if(dmax>0){dmax=dmax;} else {dmax=0}
	return Math.max(mmax,cmax,dmax);
}


function saver(){
	GM_setValue("colorm", (document.getElementById('metalcolor').value));
	GM_setValue("colorc", (document.getElementById('crystalcolor').value));
	GM_setValue("colord", (document.getElementById('deuteriumcolor').value));
	GM_setValue("colore", (document.getElementById('energycolor').value));
	
	GM_setValue("standardads", (document.getElementById('standard').value));
	GM_setValue("cilink", (document.getElementById('CIlink').value));
	GM_setValue("oclink", (document.getElementById('OClink').value));
	GM_setValue("topicons", (document.getElementById('TOPicons').value));
	
	GM_setValue("harvest", (document.getElementById('recycler').value));
	GM_setValue("moonspy", (document.getElementById('moonspy').value));
	GM_setValue("relvl", (document.getElementById('relvl').value));
	GM_setValue("maxships", (document.getElementById('maxships').value));
	GM_setValue("readytime", (document.getElementById('readytime').value));
	GM_setValue("calcships", (document.getElementById('calcships').value));
	GM_setValue("collapsedesc", (document.getElementById('collapsedesc').value));
	GM_setValue("advstor", (document.getElementById('advstor').value));
	
	if(notdetected){GM_setValue("langloca", (document.getElementById('selectlocation').selectedIndex)); GM_setValue("langstr", (document.getElementById('selectlocation').options[document.getElementById('selectlocation').selectedIndex].value));}
	window.parent.frames[0].location.href = window.parent.frames[0].location.href;
	window.location.href = window.location.href;
	
}

function checker(vartitle, vardefault){
	var temp = GM_getValue(vartitle);
	if (temp == undefined){ 
		return vardefault;
	} else {
		return temp;
	}
}
var notdetected = false;

var ruleslink = (window.parent.frames[0].document).evaluate("//a[contains(@href,'lang=') and contains(@href,'go=')]", (window.parent.frames[0].document), null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
if(ruleslink.snapshotLength > 0){
	var langstr = /lang.(\w+)/.exec(ruleslink.snapshotItem(0).href);
	if(langstr != null){ langstr = RegExp.$1; } else {langstr = checker("langstr","not"); notdetected = true;}
} else {
	langstr = checker("langstr","not");
	notdetected = true;
}
	
var X_mlg,X_clg,X_dlg,X_elg,X_lvl,langloca;

switch(langstr){
	case "org":
		langloca = "0"; X_mlg = /(Metal: )<b>([\.0-9]+)/; X_clg = /(Crystal: )<b>([\.0-9]+)/; X_dlg = /(Deuterium: )<b>([\.0-9]+)/; X_elg = /(Energy: )<b>([\.0-9]+)/; X_lvl = /\(level (\d+)/;
	break;
	case "br":
		langloca = "1"; X_mlg = /(Metal: )<b>([\.0-9]+)/; X_clg = /(Cristal: )<b>([\.0-9]+)/; X_dlg = /(Deut.rio: )<b>([\.0-9]+)/; X_elg = /(Energia: )<b>([\.0-9]+)/; X_lvl = /\(N.vel (\d+)/;
	break;
	case "de":
		langloca = "2"; X_mlg = /(Metall: )<b>([\.0-9]+)/; X_clg = /(Kristall: )<b>([\.0-9]+)/; X_dlg = /(Deuterium: )<b>([\.0-9]+)/; X_elg = /(Energie: )<b>([\.0-9]+)/; X_lvl = /\(Stufe (\d+)/;
	break;
	case "es":
		langloca = "3"; X_mlg = /(Metal: )<b>([\.0-9]+)/; X_clg = /(Cristal: )<b>([\.0-9]+)/; X_dlg = /(Deuterio: )<b>([\.0-9]+)/; X_elg = /(Energ.a: )<b>([\.0-9]+)/; X_lvl = /\(Nivel (\d+)/;
	break;
	case "fr":
		langloca = "4"; X_mlg = /(M.tal: )<b>([\.0-9]+)/; X_clg = /(Cristal: )<b>([\.0-9]+)/; X_dlg = /(Deut.rium: )<b>([\.0-9]+)/; X_elg = /(Energie: )<b>([\.0-9]+)/; X_lvl = /\(Niveau (\d+)/;
	break;
	case "pt":
		langloca = "5"; X_mlg = /(Titanio: )<b>([\.0-9]+)/; X_clg = /(Silicio: )<b>([\.0-9]+)/; X_dlg = /(Gashofa: )<b>([\.0-9]+)/; X_elg = /(Energia: )<b>([\.0-9]+)/; X_lvl = /\(N.vel (\d+)/;
	break;
	case "yu":
		langloca = "6"; X_mlg = /(Metal: )<b>([\.0-9]+)/; X_clg = /(Kristal: )<b>([\.0-9]+)/; X_dlg = /(Deuterij: )<b>([\.0-9]+)/; X_elg = /(Energija: )<b>([\.0-9]+)/; X_lvl = /\(Level (\d+)/;
	break;
	case "pl":
		langloca = "7"; X_mlg = /(Metal: )<b>([\.0-9]+)/; X_clg = /(Kryszta.: )<b>([\.0-9]+)/; X_dlg = /(Deuter: )<b>([\.0-9]+)/; X_elg = /(Energia: )<b>([\.0-9]+)/; X_lvl = /\(wybudowano (\d+)/;
	break;
	case "ru":
		langloca = "8"; X_mlg = /(\u041C\u0435\u0442\u0430\u043B\u043B: )<b>([\.0-9]+)/; X_clg = /(\u041A\u0440\u0438\u0441\u0442\u0430\u043B\u043B: )<b>([\.0-9]+)/; X_dlg = /(\u0414\u0435\u0439\u0442\u0435\u0440\u0438\u0439: )<b>([\.0-9]+)/; X_elg = /(\u042D\u043D\u0435\u0440\u0433\u0438\u044F: )<b>([\.0-9]+)/; X_lvl = /\(\u0443\u0440\u043E\u0432\u0435\u043D\u044C (\d+)/;
	break;
	case "nl":
		langloca = "9"; X_mlg = /(Metaal: )<b>([\.0-9]+)/; X_clg = /(Kristal: )<b>([\.0-9]+)/; X_dlg = /(Deuterium: )<b>([\.0-9]+)/; X_elg = /(Energie: )<b>([\.0-9]+)/; X_lvl = /\(Niveau (\d+)/;
	break;
	case "it":
		langloca = "10"; X_mlg = /(Metallo: )<b>([\.0-9]+)/; X_clg = /(Cristallo: )<b>([\.0-9]+)/; X_dlg = /(Deuterio: )<b>([\.0-9]+)/; X_elg = /(Energia: )<b>([\.0-9]+)/; X_lvl = /\(Livello (\d+)/;
	break;
	default:
		langloca = checker("langloca","0");
		notdetected = true;
		X_mlg = /(Metal: )<b>([\.0-9]+)/; X_clg = /(Crystal: )<b>([\.0-9]+)/; X_dlg = /(Deuterium: )<b>([\.0-9]+)/; X_elg = /(Energy: )<b>([\.0-9]+)/; X_lvl = /\(level (\d+)/;
}
					
var color_m = checker("colorm","#F1531E");
var color_c = checker("colorc","#54B0DC");
var color_d = checker("colord","#9AACCB");
var color_e = checker("colore","#F2D99D");

var standardads = checker("standardads","1");
var cilink = checker("cilink","0");
var oclink = checker("oclink","0");
var topicons = checker("topicons","0");

var relvl = checker("relvl","1");
var harvest = checker("harvest","1");
var moonspy = checker("moonspy","1");
var readytime = checker("readytime","1");
var maxships = checker("maxships","1");
var calcships = checker("calcships","1");
var collapsedesc = checker("collapsedesc","0");
var advstor = checker("advstor","1");

var L_res= new Array(); //1.
	L_res[0] = "Total number of researches"; //ogame.org
	L_res[1] = "??????"; //ogame.com.br
	L_res[2] = "Anzahl gesamter Forschungen"; //ogame.de
	L_res[3] = "N&uacute;mero total de investigaciones"; //Ugamela.com
	L_res[4] = "Nombre total de recherches "; //ogame.fr
	L_res[5] = "N&#xFA;mero total de pesquisas"; //ogame.com.pt
	L_res[6] = "Ukupan broj istrazivanja"; //ogame.ba
	L_res[7] = "Ca&#x0142;kowita liczba recykler&oacute;w"; //ogame.pl
	L_res[8] = "&#x412;&#x441;&#x435;&#x433;&#x43E;&#x20;&#x438;&#x441;&#x441;&#x43B;&#x435;&#x434;&#x43E;&#x432;&#x430;&#x43D;&#x438;&#x439;"; //ogame.ru
	L_res[9] = "Totaal aantal onderzoeken"; //ogame.nl
	L_res[10] = "Numero totale delle ricerche"; //ogame.it
	
var T_cs = new Array(); //26.
	T_cs[0] = "Cargo ships calculator"; //ogame.org
	T_cs[1] = "??????"; //ogame.com.br
	T_cs[2] = "Transporter berechnen"; //ogame.de
	T_cs[3] = "Calculadora de naves de carga"; //Ugamela.com
	T_cs[4] = "Calculateur de Transporteurs"; //ogame.fr
	T_cs[5] = "Calculadora de cargueiros"; //ogame.com.pt
	T_cs[6] = "Kalkulator transportera"; //ogame.ba
	T_cs[7] = "Kalkulator transportowc&oacute;w"; //ogame.pl
	T_cs[8] = "&#x41A;&#x430;&#x43B;&#x44C;&#x43A;&#x443;&#x43B;&#x44F;&#x442;&#x43E;&#x440;&#x20;&#x432;&#x43C;&#x435;&#x441;&#x442;&#x438;&#x442;&#x435;&#x43B;&#x44C;&#x43D;&#x43E;&#x441;&#x442;&#x438;&#x20;&#x43A;&#x43E;&#x440;&#x430;&#x431;&#x43B;&#x435;&#x439;"; //ogame.ru
	T_cs[9] = "Vrachtschipcalculator"; //ogame.nl
	T_cs[10] = "Calcolatore delle Navi Cargo"; //ogame.it

var T_pc = new Array(); //28.
	T_pc[0] = "Production calculator"; //ogame.org
	T_pc[1] = "??????"; //ogame.com.br
	T_pc[2] = "Produktion berechnen"; //ogame.de
	T_pc[3] = "Calculadora de producci&oacute;n"; //Ugamela.com
	T_pc[4] = "Calculateur de production"; //ogame.fr
	T_pc[5] = "Calculadora de produ&ccedil;&atilde;o"; //ogame.com.pt
	T_pc[6] = "Izracun proizvodnje"; //ogame.ba
	T_pc[7] = "??????"; //ogame.pl
	T_pc[8] = "&#x41A;&#x430;&#x43B;&#x44C;&#x43A;&#x443;&#x43B;&#x44F;&#x442;&#x43E;&#x440;&#x20;&#x43F;&#x440;&#x43E;&#x438;&#x437;&#x432;&#x43E;&#x434;&#x441;&#x442;&#x432;&#x430;"; //ogame.ru
	T_pc[9] = "Productiecalculator"; //ogame.nl
	T_pc[10] = "Calcolatore di produzione"; //ogame.it

var L_ret= new Array(); //16.
	L_ret[0] = "Time to be available"; //ogame.org
	L_ret[1] = "??????"; //ogame.com.br
	L_ret[2] = "Zeit bis n&ouml;tige Ress vorhanden sind"; //ogame.de
	L_ret[3] = "Tiempo hasta estar disponible"; //Ugamela.com
	L_ret[4] = "Temps pour &ecirc;tre disponible"; //ogame.fr
	L_ret[5] = "Tempo at&eacute; estar dispon&iacute;vel"; //ogame.com.pt
	L_ret[6] = "Preostalo vrijeme do mogucnosti izgradnje"; //ogame.ba
	L_ret[7] = "Pozosta&#x0142;y czas do gotowo&#x015B;ci"; //ogame.pl
	L_ret[8] = "&#x41E;&#x441;&#x442;&#x430;&#x43B;&#x43E;&#x441;&#x44C;&#x20;&#x434;&#x43E;&#x20;&#x434;&#x43E;&#x441;&#x442;&#x443;&#x43F;&#x43D;&#x43E;&#x441;&#x442;&#x438;"; //ogame.ru
	L_ret[9] = "Tijd wanneer beschikbaar"; //ogame.nl
	L_ret[10] = "Disponibile fra"; //ogame.it

var ogtitle = window.location.href;

var planetname = xpath("//select[@size='1']/option[@selected]");
if(planetname.snapshotLength > 0){
	var planetcoords = planetname.snapshotItem(0).innerHTML;
		planetcoords = /\[\d+:\d+:\d+\]/.exec(planetcoords);
}

if(/game.resources.php/.test(ogtitle) == true){
if((readytime == "1") || (advstor == "1")){
	var resfact = xpath("//th[@height='4']//parent::tr/following-sibling::tr/td");
	if(resfact.snapshotLength > 0){
		var metfact = />([0-9\.]+)</.exec(resfact.snapshotItem(0).innerHTML);
		if(metfact != null){var metfact = RegExp.$1; metfact = mystr2num(metfact);} else {metfact = 0;}
		var cryfact = />([0-9\.]+)</.exec(resfact.snapshotItem(1).innerHTML);
		if(cryfact != null){var cryfact = RegExp.$1; cryfact = mystr2num(cryfact);} else {cryfact = 0;}
		var deufact = />([0-9\.]+)</.exec(resfact.snapshotItem(2).innerHTML);
		if(deufact != null){var deufact = RegExp.$1; deufact = mystr2num(deufact);} else {deufact = 0;}
	
		GM_setValue((langstr+planetcoords+"met"), metfact);
		GM_setValue((langstr+planetcoords+"cry"), cryfact);
		GM_setValue((langstr+planetcoords+"deu"), deufact);
	}
}
if(advstor == "1"){

	var L_pch = new Array(); //29.
		L_pch[0] = "hours of production"; //ogame.org
		L_pch[1] = "??????"; //ogame.com.br
		L_pch[2] = "Produktion in Stunden"; //ogame.de
		L_pch[3] = "Horas de producci&oacute;n"; //Ugamela.com
		L_pch[4] = "Heures de production"; //ogame.fr
		L_pch[5] = "horas de produ&ccedil;&atilde;o"; //ogame.com.pt
		L_pch[6] = "sati proizvodnje"; //ogame.ba
		L_pch[7] = "??????"; //ogame.pl
		L_pch[8] = "&#x447;&#x430;&#x441;&#x43E;&#x432;&#x20;&#x43F;&#x440;&#x43E;&#x438;&#x437;&#x432;&#x43E;&#x434;&#x441;&#x442;&#x432;&#x430;"; //ogame.ru
		L_pch[9] = "uur inkomsten produceert"; //ogame.nl
		L_pch[10] = "ore di produzione"; //ogame.it
		
	var L_pcd = new Array(); //30.
		L_pcd[0] = "days of production"; //ogame.org
		L_pcd[1] = "??????"; //ogame.com.br
		L_pcd[2] = "Produktion in Tagen"; //ogame.de
		L_pcd[3] = "D&iacute;as de producci&oacute;n"; //Ugamela.com
		L_pcd[4] = "Jours de production"; //ogame.fr
		L_pcd[5] = "dias de produ&ccedil;&atilde;o"; //ogame.com.pt
		L_pcd[6] = "dani proizvodnje"; //ogame.ba
		L_pcd[7] = "??????"; //ogame.pl
		L_pcd[8] = "&#x434;&#x43D;&#x435;&#x439;&#x20;&#x43F;&#x440;&#x43E;&#x438;&#x437;&#x432;&#x43E;&#x434;&#x441;&#x442;&#x432;&#x430;"; //ogame.ru
		L_pcd[9] = "dagen inkomsten produceert"; //ogame.nl
		L_pcd[10] = "giorni di produzione"; //ogame.it

	var F_head = document.getElementsByTagName('head')[0];
	var F_script = document.createElement('script');
		F_script.type = 'text/javascript';
		F_script.innerHTML = 'function doter(str){'+
							'var tempval = (""+str).split(""); '+
							'var tempval2 = ""; '+
							'for(var i=0;i<tempval.length;i++){ '+
							'if(((tempval.length-(i+1))%3 == 0) && ((i+1)!=tempval.length)){tempval2 = tempval2+tempval[i]+"."; '+
							'} else { tempval2 = tempval2+tempval[i]; } } return tempval2; } '+
							'function hourly(){ '+
							'var metfact = '+metfact+'; var cryfact = '+cryfact+'; var deufact = '+deufact+';'+
							'var hourfact = document.getElementsByName("hourfact")[0].value; '+
							'document.getElementsByName("methour")[0].innerHTML = "<font color=\'#00FF00\'>"+doter(metfact*parseInt(hourfact))+"</font>";'+
							'document.getElementsByName("cryhour")[0].innerHTML = "<font color=\'#00FF00\'>"+doter(cryfact*parseInt(hourfact))+"</font>";'+
							'document.getElementsByName("deuhour")[0].innerHTML = "<font color=\'#00FF00\'>"+doter(deufact*parseInt(hourfact))+"</font>";'+
							'} '+
							'function daily(){ '+
							'var metfact = ('+metfact+'*24); var cryfact = ('+cryfact+'*24); var deufact = ('+deufact+'*24);'+
							'var dayfact = document.getElementsByName("dayfact")[0].value; '+
							'document.getElementsByName("metday")[0].innerHTML = "<font color=\'#00FF00\'>"+doter(metfact*parseInt(dayfact))+"</font>";'+
							'document.getElementsByName("cryday")[0].innerHTML = "<font color=\'#00FF00\'>"+doter(cryfact*parseInt(dayfact))+"</font>";'+
							'document.getElementsByName("deuday")[0].innerHTML = "<font color=\'#00FF00\'>"+doter(deufact*parseInt(dayfact))+"</font>";'+
							'}';
		F_head.appendChild(F_script);
		
	var resname = xpath("//font/parent::b/parent::i/b/font");
	var metname = resname.snapshotItem(0).innerHTML;
	var cryname = resname.snapshotItem(1).innerHTML;
	var deuname = resname.snapshotItem(2).innerHTML;

	var storzone = xpath("//form/table").snapshotItem(0);
	var stortab = document.createElement('table');
		stortab.width = "550";
		stortab.innerHTML = "<tr><td class='c' colspan='4'>"+T_pc[langloca]+":</td></tr>"+
							"<tr><th></th><th width='90'>"+metname+"</td><th width='90'>"+cryname+"</td><th width='90'>"+deuname+"</td></tr>"+
							"<tr><td class='c'><input type='text' size='2' name='hourfact' value='24' onkeyup='hourly();' onchange='hourly();'> "+L_pch[langloca]+"</td><td class='k' name='methour'><script type='text/javascript'>hourly();</script></td><td class='k' name='cryhour'></td><td class='k' name='deuhour'></td></tr>"+
							"<tr><td class='c'><input type='text' size='2' name='dayfact' value='7' onkeyup='daily();' onchange='daily();'> "+L_pcd[langloca]+"</td><td class='k' name='metday'><script type='text/javascript'>daily();</script></td><td class='k' name='cryday'></td><td class='k' name='deuday'></td></tr>";
	storzone.parentNode.insertBefore(stortab, storzone.nextSibling);
}	
}

if(/game\/options\.php/.test(ogtitle) == true){

var T_rc= new Array(); //2.
	T_rc[0] = "Resources Colors"; //ogame.org
	T_rc[1] = "??????"; //ogame.com.br
	T_rc[2] = "Farben der Rohstoffe"; //ogame.de
	T_rc[3] = "Color de los recursos"; //Ugamela.com
	T_rc[4] = "Couleurs des ressources"; //ogame.fr
	T_rc[5] = "Cores dos Recursos"; //ogame.com.pt
	T_rc[6] = "Boje resursa"; //ogame.ba
	T_rc[7] = "Kolor szcz&#x0105;t&oacute;w"; //ogame.pl
	T_rc[8] = "&#x426;&#x432;&#x435;&#x442;&#x430;&#x20;&#x440;&#x435;&#x441;&#x443;&#x440;&#x441;&#x43E;&#x432;"; //ogame.ru
	T_rc[9] = "Kleur voor de grondstoffen"; //ogame.nl
	T_rc[10] = "Colori delle risorse"; //ogame.it
	
var L_mc = new Array(); //3.
	L_mc[0] = "Metal color"; //ogame.org
	L_mc[1] = "??????"; //ogame.com.br
	L_mc[2] = "Farbe Metall"; //ogame.de
	L_mc[3] = "Color del Titanio"; //Ugamela.com
	L_mc[4] = "Couleur du m&eacute;tal"; //ogame.fr
	L_mc[5] = "Cor do metal"; //ogame.com.pt
	L_mc[6] = "Boja metala"; //ogame.ba
	L_mc[7] = "Kolor metalu"; //ogame.pl
	L_mc[8] = "&#x426;&#x432;&#x435;&#x442;&#x20;&#x43C;&#x435;&#x442;&#x430;&#x43B;&#x43B;&#x430;"; //ogame.ru
	L_mc[9] = "Kleur voor metaal"; //ogame.nl
	L_mc[10] = "Colore del Metallo"; //ogame.it
	
var L_cc = new Array(); //4.
	L_cc[0] = "Crystal color"; //ogame.org
	L_cc[1] = "??????"; //ogame.com.br
	L_cc[2] = "Farbe Kristall"; //ogame.de
	L_cc[3] = "Color del Silicio"; //Ugamela.com
	L_cc[4] = "Couleur du cristal"; //ogame.fr
	L_cc[5] = "Cor do cristal"; //ogame.com.pt
	L_cc[6] = "Boja kristala"; //ogame.ba
	L_cc[7] = "Kolor kryszta&#x0142;u "; //ogame.pl
	L_cc[8] = "&#x426;&#x432;&#x435;&#x442;&#x20;&#x43A;&#x440;&#x438;&#x441;&#x442;&#x430;&#x43B;&#x43B;&#x430;"; //ogame.ru
	L_cc[9] = "Kleur voor kristal"; //ogame.nl
	L_cc[10] = "Colore del Cristallo"; //ogame.it
	
var L_dc = new Array(); //5.
	L_dc[0] = "Deuterium color"; //ogame.org
	L_dc[1] = "??????"; //ogame.com.br
	L_dc[2] = "Farbe Deuterium"; //ogame.de
	L_dc[3] = "Color de la Gashofa"; //Ugamela.com
	L_dc[4] = "Couleur du deut&eacute;rium"; //ogame.fr
	L_dc[5] = "Cor do deut&eacute;rio"; //ogame.com.pt
	L_dc[6] = "Boja deuterija"; //ogame.ba
	L_dc[7] = "Kolor deuteru"; //ogame.pl
	L_dc[8] = "&#x426;&#x432;&#x435;&#x442;&#x20;&#x434;&#x435;&#x439;&#x442;&#x435;&#x440;&#x438;&#x44F;"; //ogame.ru
	L_dc[9] = "Kleur voor deuterium"; //ogame.nl
	L_dc[10] = "Colore del Deuterio"; //ogame.it
	
var L_ec = new Array(); //6.
	L_ec[0] = "Energy color"; //ogame.org
	L_ec[1] = "??????"; //ogame.com.br
	L_ec[2] = "Farbe Energie"; //ogame.de
	L_ec[3] = "Color de la energ&iacute;a"; //Ugamela.com
	L_ec[4] = "Couleur de l'&eacute;nergie"; //ogame.fr
	L_ec[5] = "Cor da energia"; //ogame.com.pt
	L_ec[6] = "Boja energije"; //ogame.ba
	L_ec[7] = "Kolor energii"; //ogame.pl
	L_ec[8] = "&#x426;&#x432;&#x435;&#x442;&#x20;&#x44D;&#x43D;&#x435;&#x440;&#x433;&#x438;&#x438;"; //ogame.ru
	L_ec[9] = "Kleur voor energie"; //ogame.nl
	L_ec[10] = "Colore dell'Energia"; //ogame.it
	
var R_rt = new Array(); //7.
	R_rt[0] = "One click to reset the color, double-click to erase the color"; //ogame.org
	R_rt[1] = "??????"; //ogame.com.br
	R_rt[2] = "Einfach-klick setzt die Farbe zur&uuml;ck, doppel-klick l&ouml;scht die Farbe"; //ogame.de
	R_rt[3] = "Un click para restaurar el color, doble-click para borrar color"; //Ugamela.com
	R_rt[4] = "Un clic pour r&eacute;initialiser la couleur, double-clic pour effacer la couleur"; //ogame.fr
	R_rt[5] = "Um clique para reiniciar a cor, duplo-clique para apagar a cor"; //ogame.com.pt
	R_rt[6] = "Jedan klik za resetiranje boje, dupli klik za brisanje boje"; //ogame.ba
	R_rt[7] = "Jedno klikni&#x0119;cie spowoduje reset kolor&oacute;w, podw&oacute;jne klikni&#x0119;cie zresetuje je"; //ogame.pl
	R_rt[8] = "&#x41E;&#x434;&#x438;&#x43D;&#x20;&#x43A;&#x43B;&#x438;&#x43A;&#x20;&#x434;&#x43B;&#x44F;&#x20;&#x441;&#x431;&#x440;&#x43E;&#x441;&#x430;&#x20;&#x446;&#x432;&#x435;&#x442;&#x430;&#x2C;&#x20;&#x434;&#x432;&#x43E;&#x439;&#x43D;&#x43E;&#x439;&#x20;&#x43A;&#x43B;&#x438;&#x43A;&#x20;&#x434;&#x43B;&#x44F;&#x20;&#x443;&#x434;&#x430;&#x43B;&#x435;&#x43D;&#x438;&#x44F;&#x20;&#x446;&#x432;&#x435;&#x442;&#x430;"; //ogame.ru
	R_rt[9] = "Klik &eacute;&eacute;nmaal om de kleur te resetten, tweemaal om de kleur te wissen"; //ogame.nl
	R_rt[10] = "Un click per ripristinare il colore, doppio click per cancellare il colore"; //ogame.it
	
var T_ar = new Array(); //8.
	T_ar[0] = "Advertisement Remover"; //ogame.org
	T_ar[1] = "??????"; //ogame.com.br
	T_ar[2] = "Werbung deaktivieren"; //ogame.de
	T_ar[3] = "Removedor de publicidad"; //Ugamela.com
	T_ar[4] = "Supprimeur de publicit&eacute;s"; //ogame.fr
	T_ar[5] = "Removedor de publicidade"; //ogame.com.pt
	T_ar[6] = "Uklanjanje reklama"; //ogame.ba
	T_ar[7] = "Usuwanie reklam"; //ogame.pl
	T_ar[8] = "&#x423;&#x434;&#x430;&#x43B;&#x435;&#x43D;&#x438;&#x435;&#x20;&#x440;&#x435;&#x43A;&#x43B;&#x430;&#x43C;&#x44B;"; //ogame.ru
	T_ar[9] = "Advertenties verwijderen"; //ogame.nl
	T_ar[10] = "Elimina Pubblicit&agrave;"; //ogame.it
	
var L_sa = new Array(); //9.
	L_sa[0] = "Normal ads"; //ogame.org
	L_sa[1] = "??????"; //ogame.com.br
	L_sa[2] = "Normale Werbung"; //ogame.de
	L_sa[3] = "Publicidad normal"; //Ugamela.com
	L_sa[4] = "Publicit&eacute;s normales"; //ogame.fr
	L_sa[5] = "Pubs normais"; //ogame.com.pt
	L_sa[6] = "Normalno"; //ogame.ba
	L_sa[7] = "Zwyk&#x0142;e reklamy"; //ogame.pl
	L_sa[8] = "&#x41E;&#x431;&#x44B;&#x43A;&#x43D;&#x43E;&#x432;&#x435;&#x43D;&#x43D;&#x430;&#x44F;&#x20;&#x440;&#x435;&#x43A;&#x43B;&#x430;&#x43C;&#x430;"; //ogame.ru
	L_sa[9] = "Normale advertenties"; //ogame.nl
	L_sa[10] = "Annunci normali"; //ogame.it
	
var L_coa = new Array(); //10.
	L_coa[0] = "Commander Info ad link"; //ogame.org
	L_coa[1] = "??????"; //ogame.com.br
	L_coa[2] = "Commander-Links im Men&uuml;"; //ogame.de
	L_coa[3] = "Enlace Info Comandante"; //Ugamela.com
	L_coa[4] = "Lien de pub Info Commandant"; //ogame.fr
	L_coa[5] = "Link de pub Informa&ccedil;&atilde;o comandante"; //ogame.com.pt
	L_coa[6] = "Commander Info link"; //ogame.ba
	L_coa[7] = "Link do informacji o komandorze"; //ogame.pl
	L_coa[8] = "&#x421;&#x441;&#x44B;&#x43B;&#x43A;&#x430;&#x20;&#x22;&#x418;&#x43D;&#x444;&#x43E;&#x440;&#x43C;&#x430;&#x446;&#x438;&#x44F;&#x20;&#x43E;&#x20;&#x441;&#x442;&#x430;&#x442;&#x443;&#x441;&#x435;&#x20;&#x43A;&#x43E;&#x43C;&#x430;&#x43D;&#x434;&#x438;&#x440;&#x430;&#x22;"; //ogame.ru
	L_coa[9] = "Commander advertentielink"; //ogame.nl
	L_coa[10] = "Pubblicit&agrave; Commander Info"; //ogame.it
	
var L_ica = new Array(); //11.
	L_ica[0] = "Officer's Casino ad link"; //ogame.org
	L_ica[1] = "??????"; //ogame.com.br
	L_ica[2] = "Offiziers-Links im Men&uuml;"; //ogame.de
	L_ica[3] = "Enlace Casino de los Oficiales"; //Ugamela.com
	L_ica[4] = "Lien de pub Casino d'Officiers"; //ogame.fr
	L_ica[5] = "Link de pub Casino de Oficiais"; //ogame.com.pt
	L_ica[6] = "Officer's Casino link"; //ogame.ba
	L_ica[7] = "Link do informacji o oficerach"; //ogame.pl
	L_ica[8] = "&#x421;&#x441;&#x44B;&#x43B;&#x43A;&#x430;&#x20;&#x22;&#x41E;&#x444;&#x438;&#x446;&#x435;&#x440;&#x441;&#x43A;&#x43E;&#x433;&#x43E;&#x20;&#x43A;&#x430;&#x437;&#x438;&#x43D;&#x43E;&#x22;"; //ogame.ru
	L_ica[9] = "Officierscasino advertentielink"; //ogame.nl
	L_ica[10] = "Pubblicit&agrave; Officiers"; //ogame.it
	
var L_topa = new Array(); //12.
	L_topa[0] = "Top upgrade icons ads"; //ogame.org
	L_topa[1] = "??????"; //ogame.com.br
	L_topa[2] = "Offizier Icons"; //ogame.de
	L_topa[3] = "Iconos de oficiales de arriba"; //Ugamela.com
	L_topa[4] = "Ic&ocirc;nes de publicit&eacute; sup&eacute;rieures"; //ogame.fr
	L_topa[5] = "Pub &iacute;cones de upgrade"; //ogame.com.pt
	L_topa[6] = "Top upgrade ikone"; //ogame.ba
	L_topa[7] = "Ikony z reklamami"; //ogame.pl
	L_topa[8] = "&#x418;&#x43A;&#x43E;&#x43D;&#x43A;&#x438;&#x20;&#x430;&#x43F;&#x433;&#x440;&#x435;&#x439;&#x434;&#x43E;&#x432;&#x20;&#x432;&#x432;&#x435;&#x440;&#x445;&#x443;"; //ogame.ru
	L_topa[9] = "Bovenste icoonadvertenties"; //ogame.nl
	L_topa[10] = "Icone in alto dell'aggiornamento"; //ogame.it
	
var T_ut = new Array(); //13.
	T_ut[0] = "Utilities"; //ogame.org
	T_ut[1] = "??????"; //ogame.com.br
	T_ut[2] = "Zus&auml;tzliches"; //ogame.de
	T_ut[3] = "Utilidades"; //Ugamela.com
	T_ut[4] = "Utilitaires"; //ogame.fr
	T_ut[5] = "Utilidades"; //ogame.com.pt
	T_ut[6] = "Alati"; //ogame.ba
	T_ut[7] = "Dodatki"; //ogame.pl
	T_ut[8] = "&#x423;&#x442;&#x438;&#x43B;&#x438;&#x442;&#x44B;"; //ogame.ru
	T_ut[9] = "Hulpmiddelen"; //ogame.nl
	T_ut[10] = "Utilit&agrave;"; //ogame.it
	
var L_rs = new Array(); //14.
	L_rs[0] = "Debris harvest link"; //ogame.org
	L_rs[1] = "??????"; //ogame.com.br
	L_rs[2] = "TF abbau in Galaansicht"; //ogame.de
	L_rs[3] = "Enlace para recogida de escombros"; //ogame.com.es
	L_rs[4] = "Lien d'exploitation des champs de d&eacute;bris"; //ogame.fr
	L_rs[5] = "Link de reciclagem de destro&ccedil;os"; //ogame.com.pt
	L_rs[6] = "Link za recikliranje rusevina"; //ogame.ba
	L_rs[7] = "Link do zbierania szcz&#x0105;tk&oacute;w"; //ogame.pl
	L_rs[8] = "&#x421;&#x441;&#x44B;&#x43B;&#x43A;&#x430;&#x20;&#x441;&#x431;&#x43E;&#x440;&#x430;&#x20;&#x43E;&#x431;&#x43B;&#x43E;&#x43C;&#x43A;&#x43E;&#x432;"; //ogame.ru
	L_rs[9] = "Puinveld opruimen link"; //ogame.nl
	L_rs[10] = "Link di raccoglimento dei detriti"; //ogame.it
	
var L_sp = new Array(); //25.
	L_sp[0] = "Moon spy link"; //ogame.org
	L_sp[1] = "??????"; //ogame.com.br
	L_sp[2] = "Monde spionieren in Galaansicht"; //ogame.de
	L_sp[3] = "Enlace de espionaje de lunas"; //Ugamela.com
	L_sp[4] = "Lien d'espionnage de lune"; //ogame.fr
	L_sp[5] = "Link de espiar luas"; //ogame.com.pt
	L_sp[6] = "Link za spijuniranje mjeseca"; //ogame.ba
	L_sp[7] = "Link do szpiegowania ksi&#x0119;zyc&oacute;w"; //ogame.pl
	L_sp[8] = "&#x421;&#x441;&#x44B;&#x43B;&#x43A;&#x430;&#x20;&#x448;&#x43F;&#x438;&#x43E;&#x43D;&#x430;&#x436;&#x430;&#x20;&#x43B;&#x443;&#x43D;&#x44B;"; //ogame.ru
	L_sp[9] = "Maanspionagelink"; //ogame.nl
	L_sp[10] = "Spionaggio diretto delle lune"; //ogame.it
	
var L_mxs = new Array(); //15.
	L_mxs[0] = "Maximum ships and defenses"; //ogame.org
	L_mxs[1] = "??????"; //ogame.com.br
	L_mxs[2] = "Gesamtanzahl von baubaren Schiffen und Verteidigung"; //ogame.de
	L_mxs[3] = "M&aacute;ximos naves y defensas"; //Ugamela.com
	L_mxs[4] = "Vaisseaux et d&eacute;fenses maximum"; //ogame.fr
	L_mxs[5] = "M&aacute;ximo de naves e defesas"; //ogame.com.pt
	L_mxs[6] = "Maximum brodova i obrane"; //ogame.ba
	L_mxs[7] = "Maksimum statk&oacute;w i obrony"; //ogame.pl
	L_mxs[8] = "&#x41C;&#x430;&#x43A;&#x441;&#x438;&#x43C;&#x443;&#x43C;&#x20;&#x43A;&#x43E;&#x440;&#x430;&#x431;&#x43B;&#x435;&#x439;&#x20;&#x438;&#x20;&#x437;&#x430;&#x449;&#x438;&#x442;&#x44B;"; //ogame.ru
	L_mxs[9] = "Maximum aantal schepen en verdediging"; //ogame.nl
	L_mxs[10] = "Difese e Navi massime"; //ogame.it
	
var L_cdesc = new Array(); //27.
	L_cdesc[0] = "Minimize descriptions"; //ogame.org
	L_cdesc[1] = "??????"; //ogame.com.br
	L_cdesc[2] = "Beschreibungen minimieren"; //ogame.de
	L_cdesc[3] = "Descripciones reducidas"; //Ugamela.com
	L_cdesc[4] = "Minimizer de description"; //ogame.fr
	L_cdesc[5] = "Minimizar descri&ccdeil;&otilde;es"; //ogame.com.pt
	L_cdesc[6] = "Smanji opise"; //ogame.ba
	L_cdesc[7] = "Ukryj opis"; //ogame.pl
	L_cdesc[8] = "&#x421;&#x43E;&#x43A;&#x440;&#x430;&#x442;&#x438;&#x442;&#x44C;&#x20;&#x43E;&#x43F;&#x438;&#x441;&#x430;&#x43D;&#x438;&#x44F;"; //ogame.ru
	L_cdesc[9] = "Minimaliseer beschrijvingen"; //ogame.nl
	L_cdesc[10] = "Minimizza le descrizioni"; //ogame.it
	
var B_sv = xpath("//input[@type='submit']");
if(B_sv.snapshotLength > 0){B_sv = B_sv.snapshotItem(0).value;} else {B_sv = "?????? SAVE ??????";}
	
if(notdetected){
	
	var T_lang= new Array(); //18.
		T_lang[0] = "<a href='http://userscripts.org/scripts/show/8938'>[Language not detected: you MUST choose the right one to work properly]</a>"; //ogame.org
		T_lang[1] = "<a href='http://userscripts.org/scripts/show/8938'>[??????]</a>"; //ogame.com.br
		T_lang[2] = "<a href='http://userscripts.org/scripts/show/8938'>[Sprache nicht erkannt, bitte richtige Sprache nutzen]</a>"; //ogame.de
		T_lang[3] = "<a href='http://userscripts.org/scripts/show/8938'>[Idioma no detectado: DEBES elegir el correcto para que funcione adecuadamente]</a>"; //Ugamela.com
		T_lang[4] = "<a href='http://userscripts.org/scripts/show/8938'>[Langue non d&eacute;tect&eacute;e : vous DEVEZ choisir la bonne pour fonctionner correctement]</a>"; //ogame.fr
		T_lang[5] = "<a href='http://userscripts.org/scripts/show/8938'>[Linguagem n&atilde;o detectada: TEM de escolher a certa para funcionar correctamente]</a>"; //ogame.com.pt
		T_lang[6] = "<a href='http://userscripts.org/scripts/show/8938'>[Jezik nije odabran: MORATE izabrati prikladan jezik dobro radi]</a>"; //ogame.ba
		T_lang[7] = "<a href='http://userscripts.org/scripts/show/8938'>[Nie znaleziono pliku j&#x0119;zykowego: MUSISZ wybra&#x0107; poprwany, aby wszystko dzia&#x0142;a&#x0142;o poprawnie]</a>"; //ogame.pl
		T_lang[8] = "<a href='http://userscripts.org/scripts/show/8938'>[&#x42F;&#x437;&#x44B;&#x43A;&#x20;&#x43D;&#x435;&#x43E;&#x43F;&#x440;&#x435;&#x434;&#x435;&#x43B;&#x435;&#x43D;&#x3A;&#x20;&#x412;&#x44B;&#x20;&#x414;&#x41E;&#x41B;&#x416;&#x41D;&#x42B;&#x20;&#x432;&#x44B;&#x431;&#x440;&#x430;&#x442;&#x44C;&#x20;&#x43F;&#x440;&#x430;&#x432;&#x438;&#x43B;&#x44C;&#x43D;&#x44B;&#x439;&#x20;&#x44F;&#x437;&#x44B;&#x43A;&#x20;&#x434;&#x43B;&#x44F;&#x20;&#x43D;&#x43E;&#x440;&#x43C;&#x430;&#x43B;&#x44C;&#x43D;&#x43E;&#x439;&#x20;&#x440;&#x430;&#x431;&#x43E;&#x442;&#x44B;]</a>"; //ogame.ru
		T_lang[9] = "<a href='http://userscripts.org/scripts/show/8938'>[Taal niet gevonden: je MOET de juiste kiezen om het script te kunnen laten werken]</a>"; //ogame.nl
		T_lang[10] = "<a href='http://userscripts.org/scripts/show/8938'>[Lingua non rilevata: DOVETE scegliere quella giusta per lavorare correttamente]</a>"; //ogame.it
	
	var L_cl = new Array(); //19.
		L_cl[0] = "Choose location"; //ogame.org
		L_cl[1] = "??????"; //ogame.com.br
		L_cl[2] = "Ort ausw&auml;hlen"; //ogame.de
		L_cl[3] = "Escoge localizaci&oacute;n"; //Ugamela.com
		L_cl[4] = "Choisissez le lieu"; //ogame.fr
		L_cl[5] = "Escolhe localiza&ccedil;&atilde;o"; //ogame.com.pt
		L_cl[6] = "Odaberi lokaciju"; //ogame.ba
		L_cl[7] = "Wybierz lokacje"; //ogame.pl
		L_cl[8] = "&#x412;&#x44B;&#x431;&#x435;&#x440;&#x438;&#x442;&#x435;&#x20;&#x43C;&#x435;&#x441;&#x442;&#x43E;&#x43F;&#x43E;&#x43B;&#x43E;&#x436;&#x435;&#x43D;&#x438;&#x435;"; //ogame.ru
		L_cl[9] = "Kies locatie"; //ogame.nl
		L_cl[10] = "Scegli la lingua"; //ogame.it
	
	var languages = new Array;
		languages[0] = "org";
		languages[1] = "br";
		languages[2] = "de";
		languages[3] = "Ugamela.com";
		languages[4] = "fr";
		languages[5] = "pt";
		languages[6] = "yu";
		languages[7] = "pl";
		languages[8] = "ru";
		languages[9] = "nl";
		languages[10] = "it";
		//languages[2] = "ogame.com.cn";
		//languages[4] = "ogame.dk";
		//languages[7] = "ogame.gr";
		//languages[9] = "ogame.jp";
		//languages[10] = "o-game.co.kr";
		//languages[15] = "ogame.se";
		//languages[16] = "ogame.com.tr";
		//languages[17] = "ogame.tw";
	
	var languageoptions = "";
	for(var i=0;i<languages.length;i++){
		if(i==parseInt(langloca)){
			languageoptions = languageoptions + "<option value='"+languages[i]+"' selected>OGame "+languages[i]+"</option>";
		} else {
			languageoptions = languageoptions + "<option value='"+languages[i]+"'>OGame "+languages[i]+"</option>";
		}
	}

	var langtable = "<tr><td class=\"c\" colspan=\"2\">"+T_lang[langloca]+"</td></tr>"+
					"<tr><th>"+L_cl[langloca]+"</th><th><select id=\"selectlocation\">"+languageoptions+"</select></th><tr>";
} else {
	var langtable = "";
}

var F_head = document.getElementsByTagName('head')[0];
var F_script = document.createElement('script');
	F_script.type = 'text/javascript';
	F_script.innerHTML = 'function resetbut(id,color){ '+
						'var theinp = document.getElementById(id); '+
						'theinp.value = color; '+
						'theinp.style.color = color; '+
						'} '+
						'function changer(id){ '+
						'var theinp = document.getElementById(id); '+
						'theinp.style.color = theinp.value; '+
						'} '+
						'function addvalue(id,val){ '+
						'var theinp = document.getElementsByName("fmenge["+id+"]")[0]; '+
						'theinp.value = val;'+
						'}';
	F_head.appendChild(F_script);

var optionszone = xpath("/html/body/center[2]").snapshotItem(0);
var optionstable = document.createElement('table');
	optionstable.width = "519px";
	optionstable.innerHTML = "<tr><td class=\"c\" colspan=\"2\">"+T_rc[langloca]+"</td></tr>"+
	"<tr><th>"+L_mc[langloca]+"</th><th><input type=\"button\" value=\"&reg;\" style=\"cursor:help;\" title=\""+R_rt[langloca]+"\" onclick=\"resetbut('metalcolor','#F1531E')\" ondblclick=\"resetbut('metalcolor','')\"><input type=\"text\" onkeyup=\"changer('metalcolor')\" style=\"color:"+color_m+";\" id=\"metalcolor\" maxlength=\"18\" size =\"20\" value=\""+color_m+"\"></th></tr>"+
	"<tr><th>"+L_cc[langloca]+"</th><th><input type=\"button\" value=\"&reg;\" style=\"cursor:help;\" title=\""+R_rt[langloca]+"\" onclick=\"resetbut('crystalcolor','#54B0DC')\" ondblclick=\"resetbut('crystalcolor','')\"><input type=\"text\" onkeyup=\"changer('crystalcolor')\" style=\"color:"+color_c+";\" id=\"crystalcolor\" maxlength=\"18\" size =\"20\" value=\""+color_c+"\"></th></tr>"+
	"<tr><th>"+L_dc[langloca]+"</th><th><input type=\"button\" value=\"&reg;\" style=\"cursor:help;\" title=\""+R_rt[langloca]+"\" onclick=\"resetbut('deuteriumcolor','#9AACCB')\" ondblclick=\"resetbut('deuteriumcolor','')\"><input type=\"text\" onkeyup=\"changer('deuteriumcolor')\" style=\"color:"+color_d+";\" id=\"deuteriumcolor\" maxlength=\"18\" size =\"20\" value=\""+color_d+"\"></th></tr>"+
	"<tr><th>"+L_ec[langloca]+"</th><th><input type=\"button\" value=\"&reg;\" style=\"cursor:help;\" title=\""+R_rt[langloca]+"\" onclick=\"resetbut('energycolor','#F2D99D')\" ondblclick=\"resetbut('energycolor','')\"><input type=\"text\" onkeyup=\"changer('energycolor')\" style=\"color:"+color_e+";\" id=\"energycolor\" maxlength=\"18\" size =\"20\" value=\""+color_e+"\"></th></tr>"+
	"<tr><td class=\"c\" colspan=\"2\">"+T_ar[langloca]+"</td></tr>"+
	"<tr><th>"+L_sa[langloca]+"</th><th><input type=\"checkbox\" id=\"standard\" value=\""+standardads+"\" "+togglecheck(standardads)+" onclick=\"javascript: if(this.value == '0'){this.value = '1';} else {this.value = '0';}\"></th></tr>"+
	"<tr><th>"+L_coa[langloca]+"</th><th><input type=\"checkbox\" id=\"CIlink\" value=\""+cilink+"\" "+togglecheck(cilink)+" onclick=\"javascript: if(this.value == '0'){this.value = '1';} else {this.value = '0';}\"></th></tr>"+
	"<tr><th>"+L_ica[langloca]+"</th><th><input type=\"checkbox\" id=\"OClink\" value=\""+oclink+"\" "+togglecheck(oclink)+" onclick=\"javascript: if(this.value == '0'){this.value = '1';} else {this.value = '0';}\"></th></tr>"+
	"<tr><th>"+L_topa[langloca]+"</th><th><input type=\"checkbox\" id=\"TOPicons\" value=\""+topicons+"\" "+togglecheck(topicons)+" onclick=\"javascript: if(this.value == '0'){this.value = '1';} else {this.value = '0';}\"></th></tr>"+
	"<tr><td class=\"c\" colspan=\"2\">"+T_ut[langloca]+"</td></tr>"+
	"<tr><th>"+L_rs[langloca]+"</th><th><input type=\"checkbox\" id=\"recycler\" value=\""+harvest+"\" "+togglecheck(harvest)+" onclick=\"javascript: if(this.value == '0'){this.value = '1';} else {this.value = '0';}\"></th></tr>"+
	"<tr><th>"+L_sp[langloca]+"</th><th><input type=\"checkbox\" id=\"moonspy\" value=\""+moonspy+"\" "+togglecheck(moonspy)+" onclick=\"javascript: if(this.value == '0'){this.value = '1';} else {this.value = '0';}\"></th></tr>"+
	"<tr><th>"+L_res[langloca]+"</th><th><input type=\"checkbox\" id=\"relvl\" value=\""+relvl+"\" "+togglecheck(relvl)+" onclick=\"javascript: if(this.value == '0'){this.value = '1';} else {this.value = '0';}\"></th></tr>"+
	"<tr><th>"+L_mxs[langloca]+"</th><th><input type=\"checkbox\" id=\"maxships\" value=\""+maxships+"\" "+togglecheck(maxships)+" onclick=\"javascript: if(this.value == '0'){this.value = '1';} else {this.value = '0';}\"></th></tr>"+
	"<tr><th>"+L_ret[langloca]+"</th><th><input type=\"checkbox\" id=\"readytime\" value=\""+readytime+"\" "+togglecheck(readytime)+" onclick=\"javascript: if(this.value == '0'){this.value = '1';} else {this.value = '0';}\"></th></tr>"+
	"<tr><th>"+T_cs[langloca]+"</th><th><input type=\"checkbox\" id=\"calcships\" value=\""+calcships+"\" "+togglecheck(calcships)+" onclick=\"javascript: if(this.value == '0'){this.value = '1';} else {this.value = '0';}\"></th></tr>"+
	"<tr><th>"+L_cdesc[langloca]+"</th><th><input type=\"checkbox\" id=\"collapsedesc\" value=\""+collapsedesc+"\" "+togglecheck(collapsedesc)+" onclick=\"javascript: if(this.value == '0'){this.value = '1';} else {this.value = '0';}\"></th></tr>"+
	"<tr><th>"+T_pc[langloca]+"</th><th><input type=\"checkbox\" id=\"advstor\" value=\""+advstor+"\" "+togglecheck(advstor)+" onclick=\"javascript: if(this.value == '0'){this.value = '1';} else {this.value = '0';}\"></th></tr>"+langtable+
	"<tr><th colspan=\"2\"><input type=\"button\" id=\"saveall\" value=\""+B_sv+"\"></th></tr>";
	
	optionszone.appendChild(optionstable);
	document.getElementById("saveall").addEventListener("click", saver, false);
}

var res = xpath("//font[@color='#ffffff']");
if(res.snapshotLength > 0){
	res.snapshotItem(0).color = (color_m);
	res.snapshotItem(1).color = (color_c);
	res.snapshotItem(2).color = (color_d);
	res.snapshotItem(3).color = (color_e);
}

if((/buildings.php.+mode.Flotte/.test(ogtitle) == true) || (/buildings.php.+mode.Verteidigung/.test(ogtitle) == true) || (/mode.Forschung/.test(ogtitle) == true) || (/game.b_building.php/.test(ogtitle) == true)){
	if((readytime == "1") || (maxships == "1")){
		var allcurres = xpath("//font[contains(@color,'#')]/ancestor::table[contains(@width,'100%')]/tbody/tr[3]/td[position()<5 and position()>1]");
		if(allcurres.snapshotLength > 0){
			var curmet = mystr2num(reder(allcurres.snapshotItem(0).innerHTML));
			var curcry = mystr2num(reder(allcurres.snapshotItem(1).innerHTML));
			var curdeu = mystr2num(reder(allcurres.snapshotItem(2).innerHTML));
		}
		var shipstd = xpath("//td[@class='k']");
		var F_scriptinjection = document.createElement('script');
			F_scriptinjection.type = 'text/javascript';
		
		var J_mon= new Array(); //20.
			J_mon[0] = 'var mymonth = new Array(); mymonth[0]="Jan"; mymonth[1]="Feb"; mymonth[2]="Mar"; mymonth[3]="Apr"; mymonth[4]="May"; mymonth[5]="Jun"; mymonth[6]="Jul"; mymonth[7]="Aug"; mymonth[8]="Sep"; mymonth[9]="Oct"; mymonth[10]="Nov"; mymonth[11]="Dec";'; //ogame.org
			J_mon[1] = 'var mymonth = new Array(); mymonth[0]="???"; mymonth[1]="???"; mymonth[2]="???"; mymonth[3]="???"; mymonth[4]="???"; mymonth[5]="???"; mymonth[6]="???"; mymonth[7]="???"; mymonth[8]="???"; mymonth[9]="???"; mymonth[10]="???"; mymonth[11]="???";'; //ogame.com.br
			J_mon[2] = 'var mymonth = new Array(); mymonth[0]="Jan"; mymonth[1]="Feb"; mymonth[2]="M&auml;r"; mymonth[3]="Apr"; mymonth[4]="Mai"; mymonth[5]="Jun"; mymonth[6]="Jul"; mymonth[7]="Aug"; mymonth[8]="Sep"; mymonth[9]="Okt"; mymonth[10]="Nov"; mymonth[11]="Dez";'; //ogame.de
			J_mon[3] = 'var mymonth = new Array(); mymonth[0]="Ene"; mymonth[1]="Feb"; mymonth[2]="Mar"; mymonth[3]="Abr"; mymonth[4]="May"; mymonth[5]="Jun"; mymonth[6]="Jul"; mymonth[7]="Ago"; mymonth[8]="Sep"; mymonth[9]="Oct"; mymonth[10]="Nov"; mymonth[11]="Dic";'; //Ugamela.com
			J_mon[4] = 'var mymonth = new Array(); mymonth[0]="Jan"; mymonth[1]="F&eacute;v"; mymonth[2]="Mar"; mymonth[3]="Avr"; mymonth[4]="Mai"; mymonth[5]="Juin"; mymonth[6]="Juil"; mymonth[7]="Aou"; mymonth[8]="Sep"; mymonth[9]="Oct"; mymonth[10]="Nov"; mymonth[11]="D&eacute;c";'; //ogame.fr
			J_mon[5] = 'var mymonth = new Array(); mymonth[0]="Jan"; mymonth[1]="Fev"; mymonth[2]="Mar"; mymonth[3]="Abr"; mymonth[4]="Mai"; mymonth[5]="Jun"; mymonth[6]="Jul"; mymonth[7]="Ago"; mymonth[8]="Set"; mymonth[9]="Out"; mymonth[10]="Nov"; mymonth[11]="Dez";'; //ogame.com.pt
			J_mon[6] = 'var mymonth = new Array(); mymonth[0]="Sij"; mymonth[1]="Velj"; mymonth[2]="Ozu"; mymonth[3]="Tra"; mymonth[4]="Svi"; mymonth[5]="Lip"; mymonth[6]="Srp"; mymonth[7]="Kol"; mymonth[8]="Ruj"; mymonth[9]="Lis"; mymonth[10]="Stu"; mymonth[11]="Pro";'; //ogame.ba
			J_mon[7] = 'var mymonth = new Array(); mymonth[0]="Sty"; mymonth[1]="Lut"; mymonth[2]="Mar"; mymonth[3]="Kwi"; mymonth[4]="Maj"; mymonth[5]="Cze"; mymonth[6]="Lip"; mymonth[7]="Sie"; mymonth[8]="Wrz"; mymonth[9]="Pa&#x017A;"; mymonth[10]="Lis"; mymonth[11]="Gru";'; //ogame.pl
			J_mon[8] = 'var mymonth = new Array(); mymonth[0]="&#x42F;&#x43D;&#x432;"; mymonth[1]="&#x424;&#x435;&#x432;"; mymonth[2]="&#x41C;&#x430;&#x440;"; mymonth[3]="&#x410;&#x43F;&#x440;"; mymonth[4]="&#x41C;&#x430;&#x439;"; mymonth[5]="&#x418;&#x44E;&#x43D;"; mymonth[6]="&#x418;&#x44E;&#x43B;"; mymonth[7]="&#x410;&#x432;&#x433;"; mymonth[8]="&#x421;&#x435;&#x43D;"; mymonth[9]="&#x41E;&#x43A;&#x442;"; mymonth[10]="&#x41D;&#x43E;&#x44F;"; mymonth[11]="&#x414;&#x435;&#x43A;";'; //ogame.ru
			J_mon[9] = 'var mymonth = new Array(); mymonth[0]="Jan"; mymonth[1]="Feb"; mymonth[2]="Mrt"; mymonth[3]="Apr"; mymonth[4]="Mei"; mymonth[5]="Jun"; mymonth[6]="Jul"; mymonth[7]="Aug"; mymonth[8]="Sep"; mymonth[9]="Okt"; mymonth[10]="Nov"; mymonth[11]="Dec";'; //ogame.nl
			J_mon[10] = 'var mymonth = new Array(); mymonth[0]="Gen"; mymonth[1]="Feb"; mymonth[2]="Mar"; mymonth[3]="Apr"; mymonth[4]="Mag"; mymonth[5]="Giu"; mymonth[6]="Lug"; mymonth[7]="Ago"; mymonth[8]="Set"; mymonth[9]="Ott"; mymonth[10]="Nov"; mymonth[11]="Dic";'; //ogame.it
			
		var J_rel= new Array(); //21.
			J_rel[0] = "Ready, reloading page..."; //ogame.org
			J_rel[1] = "??????: "; //ogame.com.br
			J_rel[2] = "Fertig, seite neu laden..."; //ogame.de
			J_rel[3] = "Listo, recargando la p&aacute;gina..."; //Ugamela.com
			J_rel[4] = "Pr&ecirc;t, rechargement de la page..."; //ogame.fr
			J_rel[5] = "Pronto, a actualizar p&aacute;gina..."; //ogame.com.pt
			J_rel[6] = "Spremno, ponovo pokretanje stranice..."; //ogame.ba
			J_rel[7] = "Gotowe, od&#x015B;wie&#x017C;anie strony..."; //ogame.pl
			J_rel[8] = "&#x413;&#x43E;&#x442;&#x43E;&#x432;&#x43E;&#x2C;&#x20;&#x43E;&#x431;&#x43D;&#x43E;&#x432;&#x43B;&#x44F;&#x435;&#x43C;&#x20;&#x441;&#x442;&#x440;&#x430;&#x43D;&#x438;&#x447;&#x43A;&#x443;..."; //ogame.ru
			J_rel[9] = "Klaar, laden van de pagina..."; //ogame.nl
			J_rel[10] = "Pronto, ricaricando la pagina..."; //ogame.it
		
		var F_head = document.getElementsByTagName('head')[0];
		var F_script = document.createElement('script');
			F_script.type = 'text/javascript';
			F_script.innerHTML = 'function changeval(name,valor){'+
							'document.getElementsByName(name)[0].value=valor} '+
							'function moreships(name){'+
							'var valor=parseInt(document.getElementsByName(name)[0].value); '+
							'document.getElementsByName(name)[0].value=(valor+1); } '+
							'function lessships(name){'+
							'var valor=parseInt(document.getElementsByName(name)[0].value); '+
							'document.getElementsByName(name)[0].value=(valor-1); } '+
							'function hourexec(hid,hdata){'+
							'hdata = hdata - 1; '+
							'var hhor = Math.floor(hdata/3600); '+
							'var hmin = Math.floor((hdata-(hhor*3600))/60); '+
							'var hsec = hdata-(hhor*3600)-(hmin*60); '+
							'var whentime = new Date(); '+
							J_mon[langloca]+
							'whentime.setSeconds(whentime.getSeconds()+hdata); '+
							'document.getElementById(hid).innerHTML = "'+L_ret[langloca]+': "+hhor+"h "+hmin+"m "+hsec+"s  &nbsp;|&nbsp; "+whentime.getDate()+"&nbsp;"+mymonth[whentime.getMonth()]+"&nbsp;-&nbsp;"+whentime.getHours()+":"+whentime.getMinutes()+":"+whentime.getSeconds(); '+
							'if(hdata == 0){document.getElementById(hid).innerHTML = "'+J_rel[langloca]+'"; window.setTimeout("window.location.reload();",2000);} '+
							'if(hdata > 0){ window.setTimeout(("hourexec(\'"+hid+"\',"+hdata+");"), 999); } '+
							'}';
			F_head.appendChild(F_script);

		var alltds = xpath("//td[@class='l']/br/parent::td");
		for (var i = 0; i < alltds.snapshotLength; i++ ) {
			var thistd = alltds.snapshotItem(i).innerHTML;	
			
			var thismet = X_mlg.exec(thistd);
			if(thismet!= null){ thismet = mystr2num(RegExp.$2); } else {thismet = 0;}
			var thiscry = X_clg.exec(thistd);
			if(thiscry!= null){ thiscry = mystr2num(RegExp.$2); } else {thiscry = 0;}
			var thisdeu = X_dlg.exec(thistd);
			if(thisdeu!= null){ thisdeu = mystr2num(RegExp.$2); } else {thisdeu = 0;}
			
			if((maxships == "1") && ((/buildings.php.+mode.Flotte/.test(ogtitle) == true) || (/buildings.php.+mode.Verteidigung/.test(ogtitle) == true))){
				var notpos = xpath("//form/preceding-sibling::br/preceding-sibling::font[@color='#ff0000']/preceding-sibling::br/following-sibling::font[@color='#ff0000']");
				if(notpos.snapshotLength > 0){var cando = false;} else {var cando = true;}
				var maxval = calcmaxnum(curmet,curcry,curdeu,thismet,thiscry,thisdeu);
				if((maxval > 0) && (/font\>/.test(shipstd.snapshotItem(i).innerHTML) == false) && cando){
					var thisshipstd = shipstd.snapshotItem(i);
					
					var thisimgid = /fmenge.(\d+)/.exec(thisshipstd.innerHTML);
						thisimgid = RegExp.$1;
						
					if((thisimgid == "407") || (thisimgid == "408")){ maxval = 1;}
				
					var maxtable = document.createElement('table');
						maxtable.width = "100%";
						maxtable.innerHTML = "<tr><td style='text-align:center;'><a href='javascript:changeval(\"fmenge["+thisimgid+"]\","+maxval+");'>max:&nbsp;"+maxval+"</a><br><a href='javascript:lessships(\"fmenge["+thisimgid+"]\");'>&laquo;</a>&nbsp;&nbsp;<a href='javascript:changeval(\"fmenge["+thisimgid+"]\",0);'>&reg;</a>&nbsp;&nbsp;<a href='javascript:moreships(\"fmenge["+thisimgid+"]\");'>&raquo;</a></td></tr>";
					thisshipstd.appendChild(maxtable);
				}
			}
			
			if(readytime == "1"){
				var R_np= new Array(); //22.
					R_np[0] = "Not all necessary resources are being produced!"; //ogame.org
					R_np[1] = "??????"; //ogame.com.br
					R_np[2] = "Nicht alle n&ouml;tigen Ressis vorhanden"; //ogame.de
					R_np[3] = "No todos los recursos necesarios est&aacute;n siendo producidos!"; //Ugamela.com
					R_np[4] = "Toutes les ressources n&eacute;cessaires n'ont pas &eacute;t&eacute; produites!"; //ogame.fr
					R_np[5] = "Nem todos os recursos necess&aacute;rios est&atilde;o a ser produzidos!"; //ogame.com.pt
					R_np[6] = "Ne proizvode se svi potrebni resursi!"; //ogame.ba
					R_np[7] = "Brak wszystkich niezb&#x0119;dnych surowc&oacute;w!"; //ogame.pl
					R_np[8] = "&#x41D;&#x435;&#x20;&#x432;&#x441;&#x435;&#x20;&#x43D;&#x443;&#x436;&#x43D;&#x44B;&#x435;&#x20;&#x440;&#x435;&#x441;&#x443;&#x440;&#x441;&#x44B;&#x20;&#x43F;&#x440;&#x43E;&#x438;&#x437;&#x432;&#x43E;&#x434;&#x44F;&#x442;&#x441;&#x44F;&#x21;"; //ogame.ru
					R_np[9] = "Je hebt niet genoeg grondstoffen!"; //ogame.nl
					R_np[10] = "Non tutte le risorse necessarie possono essere prodotte!"; //ogame.it
					
				var metfact = parseInt(checker((langstr+planetcoords+"met"),"0"));
				var cryfact = parseInt(checker((langstr+planetcoords+"cry"),"0"));
				var deufact = parseInt(checker((langstr+planetcoords+"deu"),"0"));
				var timeval = calctime(curmet,curcry,curdeu,thismet,thiscry,thisdeu,metfact,cryfact,deufact);
				if((timeval > 0) && (timeval != Infinity)){
					thistd = thistd + "<div id='hor"+i+"'></div>";
					F_scriptinjection.innerHTML += "hourexec('hor"+i+"',"+timeval+"); ";
				}
				if(timeval == Infinity){
					thistd = thistd + "<div>"+R_np[langloca]+"</div>";
				}
			}	
			
			thistd = thistd.replace(X_mlg, ("$1<b style='color:"+color_m+";'>$2"));
			thistd = thistd.replace(X_clg, ("$1<b style='color:"+color_c+";'>$2"));
			thistd = thistd.replace(X_dlg, ("$1<b style='color:"+color_d+";'>$2"));
			thistd = thistd.replace(X_elg, ("$1<b style='color:"+color_e+";'>$2"));  
			alltds.snapshotItem(i).innerHTML = thistd;
		}
		if(collapsedesc == "1"){
			delall("//td[@class='l']/br[1]/following-sibling::text()[1]");
			delall("//td[@class='l']/br[2]");
			var allimgs = xpath("//td[@class='l']/a/img");
			for (var j = 0; j < allimgs.snapshotLength; j++ ) {
				var imgw = allimgs.snapshotItem(j).width;
				var imgh = allimgs.snapshotItem(j).height;
				var imgsw = allimgs.snapshotItem(j).style.width;
				var imgsh = allimgs.snapshotItem(j).style.height;
				allimgs.snapshotItem(j).width = resizer(imgw,imgh,imgw);
				allimgs.snapshotItem(j).height = resizer(imgw,imgh,imgh);
				allimgs.snapshotItem(j).style.width = resizer(imgsw,imgsh,imgsw);
				allimgs.snapshotItem(j).style.height = resizer(imgsw,imgsh,imgsh);
			}
		}
		if(readytime == "1"){
			var F_body = document.getElementsByTagName('body')[0];
				F_body.appendChild(F_scriptinjection);
		}
	}
}

if(standardads == "1"){
	del("//script[contains(@src,'googlesyndication')]/parent::center/parent::td/parent::tr");
	delall("//iframe[@name=@id]");
	del("//div[@id='combox_container']");
}
if(cilink == "1"){
	del("//a[contains(@href, 'commander/info.php')]/parent::center/parent::td/parent::tr");
}
if(oclink == "1"){
	del("//a[contains(@href, 'offiziere.php')]/parent::font/parent::div/parent::td/parent::tr");
}
if(topicons == "1"){
	del("//td[@align='center' and @width='35']/parent::tr/parent::tbody/parent::table/parent::td");
}

if(relvl == "1"){
if(/mode.Forschung/.test(ogtitle) == true){
	var alltds = xpath("//td[@class='l']/br/parent::td");
	if(alltds.snapshotLength > 0){
	var mytable = xpath("//body/center/table[contains(@align,'top')]//table").snapshotItem(0);
	var valor = 0;
	for (var i = 0; i < alltds.snapshotLength; i++ ) {
		var thistd = alltds.snapshotItem(i).innerHTML;
		if  (X_lvl.test(thistd) == false){
			continue;
		} else {
		var thislvl = X_lvl.exec(thistd);
			thislvl = RegExp.$1;
			valor += parseInt(thislvl);
		}
	}
	var output = document.createElement('table');
		output.width = '530px';
		output.innerHTML = "<tr><td class='c'>"+L_res[langloca]+": <b>"+valor+"</b></td></tr>";
		mytable.parentNode.insertBefore(output, mytable);
	}
}
}

if(/\/game\/flotten.+mode.Flotte/.test(ogtitle) == true){
if(calcships == "1"){
	var ship202 = new Array();
		ship202[0] = "Small Cargo"; //ogame.org
		ship202[1] = "Cargueiro Pequeno"; //ogame.com.br
		ship202[2] = "Kleiner Transporter"; //ogame.de
		ship202[3] = "Nave peque&ntilde;a de carga"; //Ugamela.com
		ship202[4] = "Petit transporteur"; //ogame.fr
		ship202[5] = "Cargueiro Pequeno"; //ogame.com.pt
		ship202[6] = "Mali transporter"; //ogame.ba
		ship202[7] = "Ma&#x0142;y transporter"; //ogame.pl
		ship202[8] = "&#x41C;&#x430;&#x43B;&#x44B;&#x439;&#x20;&#x442;&#x440;&#x430;&#x43D;&#x441;&#x43F;&#x43E;&#x440;&#x442;"; //ogame.ru
		ship202[9] = "Klein vrachtschip"; //ogame.nl
		ship202[10] = "Cargo leggero"; //ogame.it
		
	var ship203 = new Array();
		ship203[0] = "Large Cargo"; //ogame.org
		ship203[1] = "Cargueiro Grande"; //ogame.com.br
		ship203[2] = "Gro&#x00DF;er Transporter"; //ogame.de
		ship203[3] = "Nave grande de carga"; //Ugamela.com
		ship203[4] = "Grand transporteur"; //ogame.fr
		ship203[5] = "Cargueiro Grande"; //ogame.com.pt
		ship203[6] = "Veliki transporter"; //ogame.ba
		ship203[7] = "Du&#x017C;y transporter"; //ogame.pl
		ship203[8] = "&#x411;&#x43E;&#x43B;&#x44C;&#x448;&#x43E;&#x439;&#x20;&#x442;&#x440;&#x430;&#x43D;&#x441;&#x43F;&#x43E;&#x440;&#x442;"; //ogame.ru
		ship203[9] = "Groot vrachtschip"; //ogame.nl
		ship203[10] = "Cargo pesante"; //ogame.it
		
	var F_head = document.getElementsByTagName('head')[0];
	var F_script = document.createElement('script');
		F_script.type = 'text/javascript';
		F_script.innerHTML = 'function calcships(){ '+
							'var curmet = parseInt(document.getElementsByName("curmet")[0].value); '+
							'var curcry = parseInt(document.getElementsByName("curcry")[0].value); '+
							'var curdeu = parseInt(document.getElementsByName("curdeu")[0].value); '+
							'var shipsholder = document.getElementsByName("innerships")[0]; '+
							'shipsholder.innerHTML = "'+ship202[langloca]+': "+(Math.ceil((curmet+curcry+curdeu)/5000))+"<br>"+"'+ship203[langloca]+': "+(Math.ceil((curmet+curcry+curdeu)/25000)); '+
							'}';
		F_head.appendChild(F_script);

	var allcurres = xpath("//font[contains(@color,'#')]/ancestor::table[contains(@width,'100%')]/tbody/tr[3]/td[position()<5 and position()>1]");
	if(allcurres.snapshotLength > 0){
		var curmet = mystr2num(reder(allcurres.snapshotItem(0).innerHTML));
		var curcry = mystr2num(reder(allcurres.snapshotItem(1).innerHTML));
		var curdeu = mystr2num(reder(allcurres.snapshotItem(2).innerHTML));
	}
		
	var resname = xpath("//font/parent::b/parent::i/b/font");
	var metname = resname.snapshotItem(0).innerHTML;
	var cryname = resname.snapshotItem(1).innerHTML;
	var deuname = resname.snapshotItem(2).innerHTML;

	var calcszone = xpath("//td[@class='c' and @colspan='4']/parent::node()/parent::node()/parent::table");
	if(calcszone.snapshotLength > 0){
		var calcsholder = document.createElement('table');
			calcsholder.width = "519";
			calcsholder.border = "0";
			calcsholder.cellPadding = "0";
			calcsholder.cellSpacing = "1";
			calcsholder.innerHTML = "<tr height='20'><td class='c' colspan='3'>"+T_cs[langloca]+":</td></tr><tr height='20'><th>"+metname+"</th><th><input name='curmet' value='"+curmet+"' onchange='calcships()' onkeyup='calcships()'></th><th rowspan='3' name='innerships'><script type='text/javascript'>calcships();</script></th></tr><tr height='20'><th>"+cryname+"</th><th><input name='curcry' value='"+curcry+"' onchange='calcships()' onkeyup='calcships()'></th></tr><tr height='20'><th>"+deuname+"</th><th><input name='curdeu' value='"+curdeu+"' onchange='calcships()' onkeyup='calcships()'></th></tr>";
		calcszone.snapshotItem(0).parentNode.insertBefore(calcsholder, calcszone.snapshotItem(0).nextSibling);
	}
}
}

if(/\/game\/galaxy.php/.test(ogtitle) == true){
var fontinf = xpath("//font");
if(fontinf.snapshotLength > 0){

var thisgal = xpath("//input[@name='galaxy']").snapshotItem(0).value;
var thissis = xpath("//input[@name='system']").snapshotItem(0).value;

for(var i=0;i < fontinf.snapshotLength;i++){
	var fontinflen = fontinf.snapshotItem(i).parentNode.childNodes.length;
	
	if((fontinflen == 1) && (harvest == "1")){
		
		var L_har= new Array(); //23.
			L_har[0] = "Harvest"; //ogame.org
			L_har[1] = "??????"; //ogame.com.br
			L_har[2] = "Tr&uuml;mmerfeld"; //ogame.de
			L_har[3] = "Recolectar"; //Ugamela.com
			L_har[4] = "Recycler"; //ogame.fr
			L_har[5] = "Recolher"; //ogame.com.pt
			L_har[6] = "Recikliranje"; //ogame.ba
			L_har[7] = "Zbieraj"; //ogame.pl
			L_har[8] = "&#x421;&#x43E;&#x431;&#x440;&#x430;&#x442;&#x44C;"; //ogame.ru
			L_har[9] = "Opruimen"; //ogame.nl
			L_har[10] = "Raccogli"; //ogame.it
		
		var thisharvresmet = fontinf.snapshotItem(i).parentNode.parentNode.parentNode.childNodes[1].childNodes[1].innerHTML
		var thisharvrescry = fontinf.snapshotItem(i).parentNode.parentNode.parentNode.childNodes[2].childNodes[1].innerHTML
		var plan = /.+\[\d+\:\d+\:(\d+).+/.exec((fontinf.snapshotItem(i).parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.childNodes[0].childNodes[0].innerHTML));
		var thispla = RegExp.$1;
		fontinf.snapshotItem(i).parentNode.innerHTML = "<input id='harv"+i+"' type='text' value='"+Math.ceil((mystr2num(thisharvresmet)+mystr2num(thisharvrescry))/20000)+"' size='1'>&nbsp;<a href='#' onclick='var hval = document.getElementById(\"harv"+i+"\").value; doit(8, "+thisgal+", "+thissis+", "+thispla+", 2, hval)'>"+L_har[langloca]+"</a>";
	}
	if((fontinflen > 1) && (moonspy == "1")){

		var L_spy= new Array(); //24.
			L_spy[0] = "Espionage"; //ogame.org
			L_spy[1] = "??????"; //ogame.com.br
			L_spy[2] = "Spioneren"; //ogame.de
			L_spy[3] = "Espiar"; //Ugamela.com
			L_spy[4] = "Espionner"; //ogame.fr
			L_spy[5] = "Espiar"; //ogame.com.pt
			L_spy[6] = "Spijuniranje"; //ogame.ba
			L_spy[7] = "Szpiegowanie"; //ogame.pl
			L_spy[8] = "&#x428;&#x43F;&#x438;&#x43E;&#x43D;&#x430;&#x436;"; //ogame.ru
			L_spy[9] = "Spioneren"; //ogame.nl
			L_spy[10] = "Spia"; //ogame.it
		
		var plan = /.+\[\d+\:\d+\:(\d+).+/.exec((fontinf.snapshotItem(i).parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.childNodes[0].childNodes[0].innerHTML));
		var thispla = RegExp.$1;
		
		var spyholder = document.createElement('table');
			spyholder.innerHTML = "<tr><td><input id='spy"+i+"' type='text' value='3' size='1'>&nbsp;<a href='#' onclick='var sval = document.getElementById(\"spy"+i+"\").value; doit(6, "+thisgal+", "+thissis+", "+thispla+", 3, sval);'>"+L_spy[langloca]+"</a></td></tr>";
	
		fontinf.snapshotItem(i).parentNode.insertBefore(spyholder, fontinf.snapshotItem(i));
		fontinf.snapshotItem(i).parentNode.removeChild(fontinf.snapshotItem(i));
	}
}
}
}