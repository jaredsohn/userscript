// ==UserScript==
// @name Ogame MUI : JumpGate (max/none/no/all ships)
// @author Flater
// @description Ogame MUI : JumpGate (max/none/no/all ships)
// @language mui
// @include http://*/game/infos.php?session=*&gid=43
// ==/UserScript==

//==========================
// get language
//==========================

	
function saver(){
	var server = document.getElementById('hiddenserver').value;
	GM_setValue((server+"colorm"), (document.getElementById('metalcolor').value));
	GM_setValue((server+"colorc"), (document.getElementById('crystalcolor').value));
	GM_setValue((server+"colord"), (document.getElementById('deuteriumcolor').value));
	GM_setValue((server+"colore"), (document.getElementById('energycolor').value));
	
	GM_setValue((server+"standardads"), (document.getElementById('standard').value));
	GM_setValue((server+"cilink"), (document.getElementById('CIlink').value));
	GM_setValue((server+"oclink"), (document.getElementById('OClink').value));
	GM_setValue((server+"topicons"), (document.getElementById('TOPicons').value));
	
	GM_setValue((server+"harvest"), (document.getElementById('recycler').value));
	GM_setValue((server+"moonspy"), (document.getElementById('moonspy').value));
	GM_setValue((server+"relvl"), (document.getElementById('relvl').value));
	GM_setValue((server+"maxships"), (document.getElementById('maxships').value));
	GM_setValue((server+"readytime"), (document.getElementById('readytime').value));
	GM_setValue((server+"calcships"), (document.getElementById('calcships').value));
	GM_setValue((server+"collapsedesc"), (document.getElementById('collapsedesc').value));
	GM_setValue((server+"advstor"), (document.getElementById('advstor').value));
	GM_setValue((server+"advmess"), (document.getElementById('advmess').value));
	
	if(notdetected){GM_setValue((server+"langloca"), (document.getElementById('selectlocation').selectedIndex)); GM_setValue((server+"langstr"), (document.getElementById('selectlocation').options[document.getElementById('selectlocation').selectedIndex].value));}
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

var ogtitle = window.location.href;
var ogserver = /http\:\/\/([\.0-9a-zA-Z]+)\//.exec(ogtitle);
if(ogserver != null){ ogserver = RegExp.$1; } else { ogserver = "0"; }

var ruleslink = (window.parent.frames[0].document).evaluate("//a[contains(@href,'lang=') and contains(@href,'go=')]", (window.parent.frames[0].document), null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
var ruleslink2 = (window.parent.frames[0].document).evaluate("//a[contains(@href,'regeln')]", (window.parent.frames[0].document), null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
if(ruleslink.snapshotLength > 0){
	var langstr = /lang.(\w+)/.exec(ruleslink.snapshotItem(0).href);
	if(langstr != null){ langstr = RegExp.$1; } else {langstr = checker((ogserver+"langstr"),"not"); notdetected = true;}
} else if(ruleslink2.snapshotLength > 0){
	var langstr = /\.(\w+)\/regeln.html/.exec(ruleslink2.snapshotItem(0).href);
	if(langstr != null){ langstr = RegExp.$1; } else {langstr = checker((ogserver+"langstr"),"not"); notdetected = true;}
}else {
	langstr = checker((ogserver+"langstr"),"not");
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
		langloca = "5"; X_mlg = /(Metal: )<b>([\.0-9]+)/; X_clg = /(Cristal: )<b>([\.0-9]+)/; X_dlg = /(Deut.rio: )<b>([\.0-9]+)/; X_elg = /(Energia: )<b>([\.0-9]+)/; X_lvl = /\(N.vel (\d+)/;
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
		langloca = "0"; X_mlg = /(Metal: )<b>([\.0-9]+)/; X_clg = /(Crystal: )<b>([\.0-9]+)/; X_dlg = /(Deuterium: )<b>([\.0-9]+)/; X_elg = /(Energy: )<b>([\.0-9]+)/; X_lvl = /\(level (\d+)/;
}

//============================
// changeable variables beginn
//============================


var L_avail= new Array(); //1.
	L_avail[0] = "available"; //ogame.org
	L_avail[1] = "???"; //ogame.com.br
	L_avail[2] = "vorhanden"; //ogame.de
	L_avail[3] = "disponible"; //ogame.com.es
	L_avail[4] = "disponible"; //ogame.fr
	L_avail[5] = "???"; //ogame.com.pt
	L_avail[6] = "prisutno"; //ogame.ba
	L_avail[7] = "???"; //ogame.pl
	L_avail[8] = "???"; //ogame.ru
	L_avail[9] = "aanwezig"; //ogame.nl
	L_avail[10] = "disponibile"; //ogame.it

var L_max= new Array(); //2.
	L_max[0] = "max"; //ogame.org
	L_max[1] = "max"; //ogame.com.br
	L_max[2] = "max"; //ogame.de
	L_max[3] = "max"; //ogame.com.es
	L_max[4] = "max"; //ogame.fr
	L_max[5] = "max"; //ogame.com.pt
	L_max[6] = "max"; //ogame.ba
	L_max[7] = "max"; //ogame.pl
	L_max[8] = "max"; //ogame.ru
	L_max[9] = "max"; //ogame.nl
	L_max[10] = "max"; //ogame.it

var L_min= new Array(); //3.
	L_min[0] = "nul"; //ogame.org
	L_min[1] = "nul"; //ogame.com.br
	L_min[2] = "keine"; //ogame.de
	L_min[3] = "anular"; //ogame.com.es
	L_min[4] = "anuler"; //ogame.fr
	L_min[5] = "nul"; //ogame.com.pt
	L_min[6] = "nul"; //ogame.ba
	L_min[7] = "nul"; //ogame.pl
	L_min[8] = "nul"; //ogame.ru
	L_min[9] = "nul"; //ogame.nl
	L_min[10] = "nul"; //ogame.it

var L_all= new Array(); //4.
	L_all[0] = "all ships"; //ogame.org
	L_all[1] = "all ships"; //ogame.com.br
	L_all[2] = "Alle Schiffe"; //ogame.de
	L_all[3] = "todos"; //ogame.com.es
	L_all[4] = "Tous les vaisseaux"; //ogame.fr
	L_all[5] = "all ships"; //ogame.com.pt
	L_all[6] = "Svi brodovi"; //ogame.ba
	L_all[7] = "all ships"; //ogame.pl
	L_all[8] = "all ships"; //ogame.ru
	L_all[9] = "all ships"; //ogame.nl
	L_all[10] = "all ships"; //ogame.it

var L_none= new Array(); //5.
	L_none[0] = "no ships"; //ogame.org
	L_none[1] = "no ships"; //ogame.com.br
	L_none[2] = "Keine Schiffe"; //ogame.de
	L_none[3] = "ninguno"; //ogame.com.es
	L_none[4] = "Aucun vaisseaux"; //ogame.fr
	L_none[5] = "no ships"; //ogame.com.pt
	L_none[6] = "Nijedan brod"; //ogame.ba
	L_none[7] = "no ships"; //ogame.pl
	L_none[8] = "no ships"; //ogame.ru
	L_none[9] = "no ships"; //ogame.nl
	L_none[10] = "no ships"; //ogame.it


//============================
// changeable variables end
//============================

(function(){

	
	//=========================================
	//Insere + modifie les fonctions js d'ogame
	//=========================================

	var script = window.document.createElement('span');
        script.innerHTML = '<script src="js/flotten.js" type="text/javascript"></script><script language="JavaScript">function maxShipsC() {var id;for (i = 200; i < 220; i++) {id = "c"+i; maxShip(id); }}function noShipsC (){var id;for (i = 200; i < 220; i++) {id = "c"+i;noShip(id);}}</script>';
	var doc = document.evaluate('/HTML[1]/BODY[1]/CENTER[2]/FORM[1]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue ;
        doc.parentNode.insertBefore(script,doc);

	//===============
	//Rebulding table
	//===============

	var trnode = document.getElementsByTagName('form')[0].getElementsByTagName('table')[1].getElementsByTagName('tr');
	    trnode[0].childNodes[1].attributes[0].nodeValue = 4 ;
	    trnode[trnode.length-1].childNodes[1].attributes[0].nodeValue = 4 ;
	
	for( i = 1; i < trnode.length-1; i++ ) 
	{
		var vaisseaux= trnode[i].childNodes[1].childNodes[0].childNodes[0] ;
		var nb_vaisseaux = trnode[i].childNodes[1].childNodes[1] ;
		var nb_vaisseaux1 = nb_vaisseaux.nodeValue.substring(1,nb_vaisseaux.nodeValue.indexOf(L_avail[langloca],0)-1);
		var class_vaisseaux = trnode[i].childNodes[3].childNodes[0].attributes[4] ;
		var class_vaisseaux1 = class_vaisseaux.nodeValue.substring(1,4) ;
		var class_ship = "'c"+class_vaisseaux1+"'";
		trnode[i].innerHTML = '<th><a href="javascript:maxShip('+class_ship+');">'+vaisseaux.nodeValue+'</a></th><th>'+nb_vaisseaux1+'<input name="maxc'+class_vaisseaux1+'" value="'+nb_vaisseaux1+'" type="hidden"></th><th><a href="javascript:maxShip('+class_ship+');">'+L_max[langloca]+'</a> / <a href="javascript:noShip('+class_ship+');">'+L_min[langloca]+'</a> </th><th><input tabindex="1" name="c'+class_vaisseaux1+'" size="7" maxlength="7" value="0" type="text"></th>';




	}

	var tablenode = document.getElementsByTagName('form')[0].getElementsByTagName('table')[1].getElementsByTagName('tbody')[0];
	tablenode.innerHTML = tablenode.innerHTML.substring(0, tablenode.innerHTML.length-85)+'<th colspan="2"><a href="javascript:noShipsC();">'+L_none[langloca]+'</a></th><th colspan="2"><a href="javascript:maxShipsC();">'+L_all[langloca]+'</a></th>'+tablenode.innerHTML.substring(tablenode.innerHTML.length-84, tablenode.innerHTML.length-1);


})();
