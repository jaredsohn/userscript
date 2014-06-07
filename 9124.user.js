// ==UserScript==
// @name Ogame MUI : Standard overview.php (Overview)
// @author Izcelion
// @description Ogame MUI : Standard overview.php (Overview)
// @language MUI
// @include http://*/game/overview.php*
// @exclude http://*/game/allianzdepot.php*
// @exclude http://*/game/allianzen.php*
// @exclude http://*/game/b_building.php*
// @exclude http://*/game/bericht.php*
// @exclude http://*/game/bewerbungen.php*
// @exclude http://*/game/buddy.php*
// @exclude http://*/game/buildings.php*
// @exclude http://*/game/flotten1.php*
// @exclude http://*/game/flotten2.php*
// @exclude http://*/game/flottenversand.php*
// @exclude http://*/game/galaxy.php*
// @exclude http://*/game/imperium.php*
// @exclude http://*/game/infos.php*
// @exclude http://*/game/leftmenu.php*
// @exclude http://*/game/logout.php*
// @exclude http://*/game/messages.php*
// @exclude http://*/game/notizen.php*
// @exclude http://*/game/options.php*
// @exclude http://*/game/raketenangriff.php*
// @exclude http://*/game/redir.php*
// @exclude http://*/game/renameplanet.php*
// @exclude http://*/game/resources.php*
// @exclude http://*/game/stat.php*
// @exclude http://*/game/suche.php*
// @exclude http://*/game/techtree.php*
// @exclude http://*/game/writemessages.php*
// ==/UserScript==

// umlaute
// &auml; = ï¿½
// &uuml; = ï¿½
// &ouml; = ï¿½


//==========================
// get language
//==========================

	
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
		X_mlg = /(Metal: )<b>([\.0-9]+)/; X_clg = /(Crystal: )<b>([\.0-9]+)/; X_dlg = /(Deuterium: )<b>([\.0-9]+)/; X_elg = /(Energy: )<b>([\.0-9]+)/; X_lvl = /\(level (\d+)/;
}

//============================
// changeable variables beginn
//============================

var L_m= new Array(); //1.
	L_m[0] = "Moon"; //ogame.org
	L_m[1] = "???"; //ogame.com.br
	L_m[2] = "Mond"; //ogame.de
	L_m[3] = "Luna"; //ogame.com.es
	L_m[4] = "Lune"; //ogame.fr
	L_m[5] = "Lua"; //ogame.com.pt
	L_m[6] = "???"; //ogame.ba
	L_m[7] = "???"; //ogame.pl
	L_m[8] = "???"; //ogame.ru
	L_m[9] = "Maan"; //ogame.nl
	L_m[10] = "Luna"; //ogame.it

var L_p= new Array(); //2.
	L_p[0] = "Planet"; //ogame.org
	L_p[1] = "???"; //ogame.com.br
	L_p[2] = "Planet"; //ogame.de
	L_p[3] = "Planeta"; //ogame.com.es
	L_p[4] = "plan&egrave;te"; //ogame.fr
	L_p[5] = "Planeta"; //ogame.com.pt
	L_p[6] = "???"; //ogame.ba
	L_p[7] = "???"; //ogame.pl
	L_p[8] = "???"; //ogame.ru
	L_p[9] = "Planeet"; //ogame.nl
	L_p[10] = "???"; //ogame.it

var L_progress= new Array(); //3.
	L_progress[0] = "in work"; //ogame.org
	L_progress[1] = "???"; //ogame.com.br
	L_progress[2] = "in Bau"; //ogame.de
	L_progress[3] = "construcci&oacute;n"; //ogame.com.es
	L_progress[4] = "en t&acirc;che"; //ogame.fr
	L_progress[5] = "em progresso"; //ogame.com.pt
	L_progress[6] = "???"; //ogame.ba
	L_progress[7] = "???"; //ogame.pl
	L_progress[8] = "???"; //ogame.ru
	L_progress[9] = "in bouw"; //ogame.nl
	L_progress[10] = "a costruzione"; //ogame.it

var L_h= new Array(); //4.
	L_h[0] = "Server time"; //ogame.org
	L_h[1] = "???"; //ogame.com.br
	L_h[2] = "Serverzeit"; //ogame.de
	L_h[3] = "???"; //ogame.com.es
	L_h[4] = "???"; //ogame.fr
	L_h[5] = "Hora do Servidor"; //ogame.com.pt
	L_h[6] = "???"; //ogame.ba
	L_h[7] = "???"; //ogame.pl
	L_h[8] = "???"; //ogame.ru
	L_h[9] = "???"; //ogame.nl
	L_h[10] = "???"; //ogame.it

var L_planetsize= new Array(); //5.
	L_planetsize[0] = "Diameter"; //ogame.org
	L_planetsize[1] = "???"; //ogame.com.br
	L_planetsize[2] = "Durchmesser"; //ogame.de
	L_planetsize[3] = "Di&aacute;metro"; //ogame.com.es
	L_planetsize[4] = "???"; //ogame.fr
	L_planetsize[5] = "Diametro"; //ogame.com.pt
	L_planetsize[6] = "???"; //ogame.ba
	L_planetsize[7] = "???"; //ogame.pl
	L_planetsize[8] = "???"; //ogame.ru
	L_planetsize[9] = "Diameter"; //ogame.nl
	L_planetsize[10] = "???"; //ogame.it

var L_temp= new Array(); //6.
	L_temp[0] = "Temperature"; //ogame.org
	L_temp[1] = "???"; //ogame.com.br
	L_temp[2] = "Temperatur"; //ogame.de
	L_temp[3] = "Temperatura"; //ogame.com.es
	L_temp[4] = "Temp&eacute;rature"; //ogame.fr
	L_temp[5] = "Temperatura"; //ogame.com.pt
	L_temp[6] = "???"; //ogame.ba
	L_temp[7] = "???"; //ogame.pl
	L_temp[8] = "???"; //ogame.ru
	L_temp[9] = "Temperatuur"; //ogame.nl
	L_temp[10] = "???"; //ogame.it

var L_pos= new Array(); //7.
	L_pos[0] = "Position"; //ogame.org
	L_pos[1] = "???"; //ogame.com.br
	L_pos[2] = "Position"; //ogame.de
	L_pos[3] = "Posici&oacute;n"; //ogame.com.es
	L_pos[4] = "Position"; //ogame.fr
	L_pos[5] = "Posi&ccedil;&atilde;o"; //ogame.com.pt
	L_pos[6] = "???"; //ogame.ba
	L_pos[7] = "???"; //ogame.pl
	L_pos[8] = "???"; //ogame.ru
	L_pos[9] = "Plaats"; //ogame.nl
	L_pos[10] = "Impiego"; //ogame.it

var L_poi= new Array(); //8.
	L_poi[0] = "Points"; //ogame.org
	L_poi[1] = "???"; //ogame.com.br
	L_poi[2] = "Punkte"; //ogame.de
	L_poi[3] = "Aguja"; //ogame.com.es
	L_poi[4] = "???"; //ogame.fr
	L_poi[5] = "Pontos"; //ogame.com.pt
	L_poi[6] = "???"; //ogame.ba
	L_poi[7] = "???"; //ogame.pl
	L_poi[8] = "???"; //ogame.ru
	L_poi[9] = "Wissel"; //ogame.nl
	L_poi[10] = "???"; //ogame.it

var L_selected= new Array(); //9.
	L_selected[0] = "selected"; //ogame.org
	L_selected[1] = "???"; //ogame.com.br
	L_selected[2] = "ausgew&auml;hlt"; //ogame.de
	L_selected[3] = "???"; //ogame.com.es
	L_selected[4] = "???"; //ogame.fr
	L_selected[5] = "selecionado"; //ogame.com.pt
	L_selected[6] = "???"; //ogame.ba
	L_selected[7] = "???"; //ogame.pl
	L_selected[8] = "???"; //ogame.ru
	L_selected[9] = "???"; //ogame.nl
	L_selected[10] = "???"; //ogame.it


//============================
// changeable variables end
//============================



(function(){



	var egrave = String.fromCharCode(232);
	var eaigu = String.fromCharCode(233);
	var ocirconflexe = String.fromCharCode(244);
	var agrave = String.fromCharCode(224);
	
	//==========================================================
	// Get/Save Planet/Moon list
	//==========================================================

	var optionnode = document.getElementsByTagName('option');
	var tabAllPlanet = new Array();
	var CptPlanet = 0;
	for(var i=0;i<optionnode.length;i++){
		tabAllPlanet[CptPlanet] = new Array();
		tabtmp = (optionnode[i].innerHTML).split("    ");
		tabtmp[1] = (tabtmp[1].replace("[","")).replace("]","");
		if(CptPlanet==0){
			tabAllPlanet[CptPlanet][0] = tabtmp[0];
			tabAllPlanet[CptPlanet][1] = tabtmp[1];
			tabAllPlanet[CptPlanet][2] = ((optionnode[i].getAttribute("value")).replace("/game/","")).replace("&mode=&gid=&messageziel=&re=0","");
			tabAllPlanet[CptPlanet][3] = L_selected[langloca];
			tabAllPlanet[CptPlanet][4] = "";
			tabAllPlanet[CptPlanet][5] = L_selected[langloca];
			CptPlanet++;
			} else {
			var PlanetFind = false;
			var v=0;
			while(v<CptPlanet && PlanetFind==false){
				if(tabAllPlanet[v][1]==tabtmp[1]) PlanetFind = true;
				v++;
			}
	
			if(PlanetFind==true) v=v-1;
			else {
				v=CptPlanet;
				CptPlanet++;
			}
	
			//alert(CptPlanet+"/"+PlanetFind+"/"+v);
	
			if (tabtmp[0]==L_m[langloca] || PlanetFind==true){
			
			    tabAllPlanet[v][1] = tabtmp[1];
				tabAllPlanet[v][4] = ((optionnode[i].getAttribute("value")).replace("/game/","")).replace("&mode=&gid=&messageziel=&re=0","");
			} else {
				tabAllPlanet[v][0] = tabtmp[0];
				tabAllPlanet[v][1] = tabtmp[1];
				tabAllPlanet[v][2] = ((optionnode[i].getAttribute("value")).replace("/game/","")).replace("&mode=&gid=&messageziel=&re=0","");
				tabAllPlanet[v][3] = L_selected[langloca];
				tabAllPlanet[v][4] = "";
				tabAllPlanet[v][5] = L_selected[langloca];
			}
	
		}
	}
	
	
	//==========================================================
	// Resize table at 100%
	//==========================================================
	var tablenode = document.getElementsByTagName('table');
	for(var i=0;i<tablenode.length;i++){
		if(tablenode[i].getAttribute("width")=="519" && (tablenode[i].innerHTML).indexOf(L_h[langloca],0)) tablenode[i].setAttribute("width","100%");
	}

	
	//==========================================================
	// Save characteristics of planet selected
	//==========================================================
	var trnode = document.getElementsByTagName('tr');
	var i = 0;
	var status = true;
	var tabPlanetCharacteristics = new Array();
	var cpt = 0;
	while (i<trnode.length) {
		var thnode = trnode[i].getElementsByTagName('th');
		if(thnode.length==2) {
			if((thnode[0].innerHTML).indexOf(L_planetsize[langloca],0)>=0 || (thnode[0].innerHTML).indexOf(L_temp[langloca],0)>=0 || (thnode[0].innerHTML).indexOf(L_pos[langloca],0)>=0 || (thnode[0].innerHTML).indexOf(L_poi[langloca],0)>=0) {
				tabPlanetCharacteristics[cpt] = new Array();
				tabPlanetCharacteristics[cpt][0] = thnode[0].innerHTML;
				tabPlanetCharacteristics[cpt][1] = thnode[1].innerHTML;
				status = false;
				cpt++;
			}
		}
		if (status) i++;
		else {
			trnode[i].parentNode.removeChild(trnode[i]);
			trnode = document.getElementsByTagName('tr');
			status = true;
		}
	}
	
	//==========================================================
	// Put/write planet characteristics
	//==========================================================
	var thnode = document.getElementsByTagName('th');
	var tableConstruct="";
	for(var i=0;i<thnode.length;i++){
		if(thnode[i].getAttribute("colspan")=="2"){
			var imgnode = thnode[i].getElementsByTagName('img');
			if(imgnode.length==1){
				if(imgnode[0].getAttribute("height")=="200" && imgnode[0].getAttribute("width")=="200"){
					imgnode[0].setAttribute("height","150");
					imgnode[0].setAttribute("width","150");
					for(u=0;u<4;u++){
						tableConstruct += "<tr>";
						tableConstruct += "<td class=\"c\">"+tabPlanetCharacteristics[u][0]+"</td>";
						tableConstruct += "<th>"+tabPlanetCharacteristics[u][1]+"</th>";
						tableConstruct += "</tr>";
					}
					tableConstruct ="<table width=\"100%\">"+tableConstruct+"</table>";
					thnode[i].innerHTML += tableConstruct;
				}
			}
		}
	}
	
	//==========================================================
	// Rebuild planets list with construction
	//==========================================================
	var tablenode = document.getElementsByTagName('table');
	var construction = "";
	for(var i=0;i<tablenode.length;i++){
		if(tablenode[i].getAttribute("class")=="s" && tablenode[i].getAttribute("align")=="top" && tablenode[i].getAttribute("border")=="0"){
			var trnode = tablenode[i].getElementsByTagName('tr');
			var j = 0;
			var status = true;
			var cpt = 0;
			while (j<trnode.length) {
				var thnode = trnode[j].getElementsByTagName('th');
				//if(thnode.length==2){
					for(g=0;g<thnode.length;g++){
						var ahrefnode = thnode[g].getElementsByTagName('a');
						var centernode = thnode[g].getElementsByTagName('center');
						//alert(centernode[0].innerHTML);
						if ((centernode[0].innerHTML).indexOf("non active",0)>=0) construction=L_selected[langloca];
						else construction = centernode[0].innerHTML;
						for(s=0;s<CptPlanet;s++){
						  var testone=ahrefnode[0].getAttribute("href");
						  var testtwo=tabAllPlanet[s][2];
						  pathSegs = testone.split( "&PHPSESSID" );
						  if(tabAllPlanet[s][2]==pathSegs[0]) tabAllPlanet[s][3]=construction;
						  if(tabAllPlanet[s][4]==pathSegs[0]) tabAllPlanet[s][5]=construction;
						}
						status = false;
						cpt++;
					}
				//}
	
				if (status) j++;
				else {
					trnode[j].parentNode.removeChild(trnode[j]);
					trnode = tablenode[i].getElementsByTagName('tr');
					status = true;
				}
			}
			//=======================================================
			// Write new tag <table></table>
			//=======================================================
			tablenode[i].setAttribute("width","100%");
			tablenode[i].innerHTML = "";
			tablenode[i].innerHTML += "<tr><td class=\"c\">[G:S:P]</td><td class=\"c\">"+L_p[langloca]+"</td><td class=\"c\">"+L_progress[langloca]+"</td><td class=\"c\">"+L_m[langloca]+"</td></tr>";
			for(s=0;s<CptPlanet;s++){
				if(tabAllPlanet[s][4].length>0) tablenode[i].innerHTML += "<tr><td class=\"c\">"+tabAllPlanet[s][1]+"</td><td class=\"c\"><a href='"+tabAllPlanet[s][2]+"'>"+tabAllPlanet[s][0]+"</a></td><th>"+tabAllPlanet[s][3]+"</th><td class=\"c\"><a href='"+tabAllPlanet[s][4]+"'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&radic;&nbsp;</a></td></tr>";
				else tablenode[i].innerHTML += "<tr><td class=\"c\">"+tabAllPlanet[s][1]+"</td><td class=\"c\"><a href='"+tabAllPlanet[s][2]+"'>"+tabAllPlanet[s][0]+"</a></td><th>"+tabAllPlanet[s][3]+"</th><td class=\"c\">&nbsp;-&nbsp;</td></tr>";
			}
		}
	}
	
	//alert("Standard overview.php (Overview)");


})();