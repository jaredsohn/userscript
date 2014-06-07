// ==UserScript==
// @name           Zaznaczenie dowolnej wioski na mapie
// @namespace      none
// @description    KDN (korte dorpsnotities) Korte notities bij een dorp op de kaart toevoegen
// @version        0.1.20100318
// @author         Peety, Simon Hilz (map-routine)
// @include        http://pl*.plemiona.pl/game.php?*screen=map*
// @include        http://pl*.plemiona.pl/game.php?*screen=info_village*
// ==/UserScript==

// Translated by Lekensteyn
// Source: http://forum.die-staemme.de/showthread.php?t=109701
// Site: http://www.tribetool.nl/
/**
 * 1.01 - 200907131630 Release
 * 0.1.20100318 Compatible with version 6.0
 */

var server = document.location.host.split('.')[0],
	 akt_map = "map_alt",
	 watch_map = false,
	 watch_timer,
	 show_opt = false,
	 bild = [],
	 url = ['http://www.imgbox.de/users/Peety/'],
	 counter = 0,
	 sign = 0,
	 no_icon = 1;
var grafikpaket = ["report","none","handpoint","eye","lightning","weatherclouds","weathershowers","weatheralert","userfemale","usermale","verlassen2","verlassen","zoom","lupe","herzen16","smileyangel","smileywink"
					,"smileyfrown","smileytounge","smileyflat","smileygg","padlockclosed","azeichengelb","warning16","achtungsmall","Achtung","cancelred","redcross","noaccess","hakenok","hakenok2","minus"
						,"kugelpfeilgrn","arrowred","pfeil11","pfeileckgrn","pfeilecktrk","pfeileckblau","pfeileckrot","help","error","question","textneu21","textnew06","new","flag72","flag73","flag71","feuer06"
							,"home","home2","home16","stopsign","nuclear","de","flaggenpiraten02","Sackgasse","tweeter","pandaklein","stern10","King","Weather","Female","Male","Radioactive","Superman","Right"
								,"Check","Information","information2","ausrufezeichenblau","Wecker","Bueroklammer","de","Pfeilrotoben","pencil","pencilgreen","pencilblue","hammer","schloss","options"];
for (var i=0; i<grafikpaket.length; i++) {
	bild[counter+i] = url[0]+grafikpaket[i]+".png";
}
counter += grafikpaket.length;
var pic_opt = counter-1;
bild[54] = url[0]+'alarm08.gif';	//geanimeerd 
bild[73] = url[0]+'agluehbirne33.gif';

var grafik = ["spear","sword","axe","archer","spy","light","marcher","heavy","ram","catapult","knight","snob"];
for (i=0; i<grafik.length; i++) {
	bild[counter+i] = "/graphic/unit/unit_"+grafik[i]+".png";
}
counter += grafik.length;

var buildings = ["main","barracks","stable","smith","garage","statue","storage","place","market","hide","wood","stone","iron","farm","wall","snob","church"];
for (i=0; i<buildings.length; i++) {
	bild[counter+i] = "/graphic/buildings/"+buildings[i]+".png";
}
counter += buildings.length;

var other = ["unit/def","unit/def_cav","command/attack","command/support","unit/speed","holz","lehm","eisen","face","gold","klee","klee_grau","rabe"
			,"ally_rights/found","ally_rights/lead","ally_rights/invite","new_mail","new_report","ally_rights/internal_forum"
				,"group_jump","rename","villages","rechts","links","rechts2","links2","unten","oben","group_right","group_left","overview/trader/outgoing"
					,"overview/trader/return","ally_forum","/dots/grey","dots/brown","stat/red","stat/yellow","stat/green","stat/vacation"];
for (i=0; i<other.length; i++) {
	bild[counter+i] = "/graphic/"+other[i]+".png";
}
counter += other.length;

var farbpic = ["schwarz","braun","rot","orange","gruen","blau","violet"],
	 farbe = ["000000","703820","A80000","E06000","007700","0000AA","770088"],
	 farburl = new Array();
for (i=0; i < 7;i++) {
	farburl[i] = url[0]+"Kugel"+farbpic[i]+".png";
}


var id;
if(document.body.innerHTML.match(/input name=\"sid_refresh_password/)) ;
else if(document.location.href.match(/screen=map/)) {
	scan_map();
	var map_container = getElementsByClassName("map_container")[0];
	var tds = map_container.getElementsByTagName("td");
	tds[1].addEventListener("click",function() {check_mmove(akt_map);}, true);
	tds[3].addEventListener("click",function() {check_mmove(akt_map);}, true);
	tds[(tds.length - 4)].addEventListener("click",function() {check_mmove(akt_map);}, true);
	tds[(tds.length - 2)].addEventListener("click",function() {check_mmove(akt_map);}, true);
}
else if(document.location.href.match (/screen=info_village/) && (id=location.href.match(/id=(\d+)/))) {
	var tab = document.evaluate('//table[@class="main"]/tbody/tr/td/table[@class="vis"]/tbody',document,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null).snapshotItem(0);
	id = id[1];
	var ein = einlesen(id);
	var row = document.createElement("tr");
	row.setAttribute("id", 'KDN');
	var td1 = document.createElement("td");
	td1.setAttribute("colspan","2");
	td1.innerHTML = "<a style=\"color:#803800\"><b>» <\/b><\/a>";
	var del = document.createElement("input");
	del.setAttribute("type","image");
	del.setAttribute("style", "position:relative; top:2px; left:-3px;");
	del.setAttribute("src", bild[sign]);
	del.setAttribute("title", "Verwijderen");
	var eingabe = document.createElement("input");
	eingabe.setAttribute("type", "text");
	eingabe.setAttribute("style", "font-size: 10pt;");
	eingabe.setAttribute("name", "eingabe");
	eingabe.value = ein[0];
	eingabe.setAttribute("size","31");
	eingabe.setAttribute("maxlength", "32");
	eingabe.setAttribute("method", "post");
	eingabe.addEventListener("change",function() {
		ein[0] = eingabe.value;
		set_info(id, ein[0], ein[1], ein[2], ein[3]);
	},false);
	del.addEventListener("click",function() {
		del_notizen(server); 
		ein = einlesen(id); 
		eingabe.value = ein[0];
	}, false);

	var opt = document.createElement("input");
	opt.setAttribute("type","image");
	opt.setAttribute("style", "position:relative; top:2px; left:1px;");
	opt.setAttribute("src", bild[pic_opt]);
	opt.setAttribute("title", "Opties");
	opt.addEventListener("click", function() {ein = options(tab,id);},false);
	td1.appendChild(del);
	td1.appendChild(eingabe);
	td1.appendChild(opt);
	row.appendChild(td1);
	tab.appendChild(row);
}

function options(pos, id) {					// Opties bekijken
	show_opt = !show_opt;
	if (show_opt) {
	// Tekstkleur
		var ein = einlesen(id);
		var row2 = document.createElement("tr");
		row2.setAttribute("id", 'KDNcol');
		td1 = document.createElement("td");
		if(ein[3] == true) {		// Vetgedrukt
			td1.setAttribute("style", "color:#"+farbe[ein[1]]+";font-weight:bold;");
		} 
		else {		
			td1.setAttribute("style", "color:#"+farbe[ein[1]]);
		}
		td1text = document.createTextNode("Tekstkleur:");
		td1.appendChild(td1text);
		var td2 = document.createElement("td");
		td2.setAttribute("style", "border:none;");
		var table = document.createElement("table");
		table.setAttribute("style", "border:none; border-collapse:collapse;");
		var td21 = document.createElement("td");
		td21.setAttribute("style", "width:92%; vertical-align:middle; position:relative; left:1px;");
		var textcol = new Array();
		for (i = 0; i < 7; i++) {
			textcol[i] = document.createElement("input");
			textcol[i].setAttribute("type", "image");
			textcol[i].setAttribute("src", farburl[i]);			
			textcol[i].setAttribute("style", "vertical-align:middle; border:solid 2px; border-color:#F0ECD4;");
			textcol[i].setAttribute("title", "col"+i);
			textcol[i].setAttribute("value", i);
			textcol[i].addEventListener("click",function() {
				ein[1] = this.value; 
				set_info(id, ein[0], ein[1], ein[2], ein[3]);
				if(ein[3] == true) {		// Vetgedrukt
					td1.setAttribute("style", "color:#"+farbe[ein[1]]+";font-weight:bold;");
				} 
				else {		
					td1.setAttribute("style", "color:#"+farbe[ein[1]]);
				}
				td1.replaceChild(td1text,td1text);
			}, false);
			td21.appendChild(textcol[i]);
		}
	// font bold
		var td22 = document.createElement("td");
		textweight = document.createElement("input");
		textweight.setAttribute("type", "checkbox");
		textweight.setAttribute("style", "width:8%; vertical-align:middle; border: solid 2px; border-color:#F0ECD4;");
		textweight.setAttribute("title", "Vetgedrukt");
		textweight.checked = ein[3];
		textweight.addEventListener("change", function() {
			ein[3] = this.checked; 
			set_info(id, ein[0], ein[1], ein[2], ein[3]);
			if(ein[3] == true) {		// Vetgedrukt
				td1.setAttribute("style", "color:#"+farbe[ein[1]]+";font-weight:bold;");
			} 
			else {		
				td1.setAttribute("style", "color:#"+farbe[ein[1]]);
			}
			td1.replaceChild(td1text,td1text);
		}, false);
		td22.appendChild(textweight);
		table.appendChild(td21);
		table.appendChild(td22);
		td2.appendChild(table);
		row2.appendChild(td1);
		row2.appendChild(td2);
		pos.insertBefore(row2, document.getElementById('KDN').nextSibling);
	// Icons
		if (ein[2] < 1) {ein[2] = 1;}
		var row3 = document.createElement("tr");
		row3.setAttribute("id", 'KDNpic');
		td4 = document.createElement("td");
		td4.innerHTML = "<style=\"vertical-align:middle;\">Icon: <img src="+bild[ein[2]]+" alt=\"\">";
		var td5 = document.createElement("td");
		td5.setAttribute("style", "vertical-align:middle; position:relative; left:1px;");
		var icon = new Array();
		icon[0]= "";		// hiermee is het arrayelement niet 'undefined'
		for (i = 1; i < bild.length; i++) {
			icon[i] = document.createElement("input");
			icon[i].setAttribute("type", "image");
			icon[i].setAttribute("src", bild[i]);
			icon[i].setAttribute("style", "vertical-align:middle; border: solid 2px; border-color:#F0ECD4;");
			icon[i].setAttribute("title", "pic"+i);
			icon[i].setAttribute("value", i);
			icon[i].addEventListener("click",function() {
				ein[2] = this.value; 
				set_info(id, ein[0], ein[1], ein[2], ein[3]);
				td4.innerHTML = "<style=\"vertical-align:middle;\">Icon: ";
				if (ein[2] > 1) {
					td4.innerHTML += "<img src="+bild[ein[2]]+" alt=\"\">";
				}
				else {
					td4.innerHTML += "<img src="+bild[no_icon]+" alt=\"\">";
				}
			}, false);
			td5.appendChild(icon[i]);
		}
		if (ein[2] < 1) {ein[2] = 1;}
		row3.appendChild(td4);
		row3.appendChild(td5);
		pos.insertBefore(row3, document.getElementById('KDN').nextSibling.nextSibling);
		return ein;
	}
	else {
		if (document.getElementById('KDNpic')) {
			pos.removeChild(document.getElementById('KDNpic'));
		}
		if (document.getElementById('KDNcol')) {
			pos.removeChild(document.getElementById('KDNcol'));
		}
	}
}

function mapinfo(k) {						// Dorp in een popup opzoeken
	var map_start = document.getElementById('info_content').tBodies[0];
	remove_info(map_start);
	var map = getElementsByClassName("map")[0],
		tds = map.getElementsByTagName("td"),
		link = tds[k].getElementsByTagName("a")[0],
		akt_id = link.href.match(/id=(\d+)/)[1];
	dorfinfo(akt_id, map_start);
}

function dorfinfo(id, map_start) {				// in een popup bekijken
	if (GM_getValue(server+"_info_"+id, false)) {
		var ein = einlesen(id);
		var row = document.createElement("tr");
		row.setAttribute("id",'info_i');
		var td1 = document.createElement("td");
		td1.setAttribute("style", "border:none; padding:0px;");
		table = document.createElement("table");
		table.setAttribute("style", "border:none; border-collapse: collapse;");
		var td11 = document.createElement("td");
		td11.setAttribute("style", "width:98%; border:hidden; vertical-align:middle;");
		img = document.createElement("img");
		img.setAttribute("src", bild[sign]);
		img.setAttribute("style", "position:relative; left:-3px;");
		td11.appendChild(img);
		table.appendChild(td11);
		if (ein[2] > 1) {			// Plaatje uitgekozen
			var td12 = document.createElement("td");
			td12.setAttribute("style", "width:2%; border:hidden; vertical-align:middle;");
			img = document.createElement("img");
			img.setAttribute("src", bild[ein[2]]);
			img.setAttribute("style", "position:relative; right:-3px;");
			td12.appendChild(img);
			table.appendChild(td12);
		}
		td1.appendChild(table);
		row.appendChild(td1);
		
		td2 = document.createElement("td");
		td2.setAttribute("colspan","2");
		if(ein[3] == true) {		// Vetgedrukt
			td2.setAttribute("style", "font-weight:bold; color:#"+farbe[ein[1]]+";");
		} 
		else {		
			td2.setAttribute("style", "color:#"+farbe[ein[1]]+";");
		}
		td2.appendChild(document.createTextNode(ein[0]));
		row.appendChild(td2);
		map_start.appendChild(row);
	}
}

function einlesen(id) {						// opgeslagen informatie inlezen
	var einlesen = GM_getValue(server+"_info_"+id, ";;0;;0;;false");
	var ein = einlesen.split(";;");
	var e = ein.length;
	if (e < 4) {			// Compatibaliteit met oudere versies 0.2/0.5
		if (e == 1) {
			ein[0] = einlesen;
		}
		ein[1] = 0;
		ein[2] = 0;
		ein[3] = false;
	}
	else {
		ein[1] = check_number(ein[1]);
		ein[2] = check_number(ein[2]);
		if (ein[3]== "true") {
			ein[3] = true;
		}
		else {
			ein[3] = false;
		}
	}
	return ein;
}

function set_info(id, text, col, pic, bold) {	// Informatie opslaan
	if (text != "") {
		GM_setValue(server+"_info_"+id, text+";;"+col+";;"+pic+";;"+bold);
	}
	else {
		GM_deleteValue(server+"_info_"+id);
	}
}

function del_notizen(server) {				// alle opgeslagen notities van de spelwereld verwijderen
	var liste = [];
	liste = GM_listValues();
	var sicher;
	sicher = window.confirm("Weet je zeker dat je alle dorpsnotities van deze spelwereld wilt verwijderen?\n(individuele notities worden door het legen van de tekstveld verwijderd)");
	if (sicher) {
		for (var i=0; i<liste.length; i++){
			if (liste[i].split("_")[0] == server) {
					GM_deleteValue(liste[i]);
			}
		}
	}
}

function scan_map() {						// Dorpen op de kaart detecteren
	
var test=document.getElementById('mapOld').innerHTML.replace(/null, null/g,"'brak', null");
document.getElementById('mapOld').innerHTML = test;

var test=document.getElementById('mapNew').innerHTML.replace(/null, null/g,"'brak', null");
document.getElementById('mapNew').innerHTML = test;

setmapicon();
var map_start = document.getElementById('info_content').getElementsByTagName("tbody")[0];
	remove_info(map_start);

	switch(getElementsByClassName("map").length) {
	case 1:
		map = getElementsByClassName("map")[0];
		break;

	case 2:
		map = getElementsByClassName("map")[1];
		break;
	}
	var tds = map.getElementsByTagName("td");
	for(var j=0; j<tds.length; j++) {
		if(tds[j].getElementsByTagName('a').length == 1) {
			tds[j].getElementsByTagName("img")[0].id = j;
			tds[j].getElementsByTagName("img")[0].addEventListener("mouseover",function(e) {mapinfo(e.target.id);}, false);
		}
	}
}

function remove_info(map_start) {				// Notitie van een popup verwijderen
	if(document.getElementById('info_i')) {
		map_start.removeChild(document.getElementById('info_i'));
	}
}

function check_mmove(akt_map_loc) {			// is de kaart verschoven?
	var groesse = document.getElementById('map').getElementsByTagName("tr").length;
	if(!watch_map) {
		watch_timer = window.setInterval(check_mmove,500,akt_map);
		watch_map = true; 
		return false;
	}
	if(document.getElementById(akt_map_loc).style.left == (groesse * 53) * (-1) + "px" 
		|| document.getElementById(akt_map_loc).style.left == (groesse * 53) + "px" 
			|| document.getElementById(akt_map_loc).style.top == (groesse * 38) * (-1) + "px" 
				|| document.getElementById(akt_map_loc).style.top == (groesse * 38) + "px") {
		switch(akt_map_loc) {
			case "map_alt":
				akt_map = "map_neu";
			break;
			case "map_neu":
				akt_map = "map_alt";
			break;
		}
		scan_map();
		window.clearInterval(watch_timer);
		watch_map = false;
	}
}

function check_number(num) {					// een nummer controleren
	return parseInt(num, 10) || 0;
}

function getElementsByClassName(classname, node) {//nieuwe functie getElementsByClassName()
	if(!node) {
		node = document.body;
	}
	var a = [],
		re = new RegExp('\\b' + classname + '\\b'),
		els = node.getElementsByTagName("*");
	for(var i=0,j=els.length; i<j; i++) {
		if(re.test(els[i].className)) {
			a.push(els[i]);
		}
	}
	return a;
}
function setmapicon()	{
	var map = getElementsByClassName("map")[0];
	var links = map.getElementsByTagName("a");
	for (var i=0; i<links.length; i++){
		
		var id = links[i].href.split("info_village&id=")[1];
		if (GM_getValue(server+"_info_"+id, false)) {
			var ein = einlesen(id);
			img = document.createElement("img");
		    img.setAttribute("src", bild[ein[2]]);
		    img.setAttribute("style", "position:relative; top:-15px; left:35px");
		    links[i].appendChild(img);
		    }
		}
		
}