// ==UserScript==
// @name           KDN
// @namespace      none
// @description    Notatki wiosek
// @version        1.03 - 200907310615
// @author         Peety, Simon Hilz (map-routine)
// @include        http://pl*.plemiona.pl/game.php?*screen=map*
// @include        http://pl*.plemiona.pl/game.php?*screen=info_village&id=*
// ==/UserScript==

var server = document.location.host.split('.')[0];
var akt_map = "mapOld";
var watch_map = false;
var watch_timer;
var show_opt = false;
var bild = new Array();
var url = new Array();
url[0] = 'http://www.imgbox.de/users/Peety/'
var counter = 0; 
var sign = 0;
var no_icon = 1; 
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
bild[54] = url[0]+'alarm08.gif';	//animierte 
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

var farbpic = ["schwarz","braun","rot","orange","gruen","blau","violet"];
var farbe = ["000000","703820","A80000","E06000","007700","0000AA","770088"];
var farburl = new Array();
for (i=0; i < 7;i++) {
	farburl[i] = url[0]+"Kugel"+farbpic[i]+".png";
}



if(document.body.innerHTML.match(/input name=\"sid_refresh_password/)) {
	return;
}
else if(!document.body.innerHTML.match(/popup_scroll\(\'villages\.php/)) {
	return;
}
else if(document.location.href.match(/screen=map/)) {
	scan_map();
	var map_container = getElementsByClassName("map_container")[0];
	var tds = map_container.getElementsByTagName("td");
	tds[1].addEventListener("click",function() {check_mmove(akt_map);}, true);
	tds[3].addEventListener("click",function() {check_mmove(akt_map);}, true);
	tds[(tds.length - 4)].addEventListener("click",function() {check_mmove(akt_map);}, true);
	tds[(tds.length - 2)].addEventListener("click",function() {check_mmove(akt_map);}, true);
}
else if(document.location.href.match (/screen=info_village&id=/)) {
	var tab = document.evaluate('//table[@class="main"]/tbody/tr/td/table[@class="vis left"]/tbody',document,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null).snapshotItem(0);
	var id = location.href.split("id=")[1].replace(/\&.+/,""); 
	var ein = einlesen(id);
	var row = document.createElement("tr");
	row.setAttribute("id", 'KDN');
	var td1 = document.createElement("td");
	td1.setAttribute("colspan","2");
	td1.innerHTML = "<a style=\"color:#803800\"><b>» <\/b><\/color><\/a>";
	var del = document.createElement("input");
	del.setAttribute("type","image");
	del.setAttribute("style", "position:relative; top:2px; left:-3px;");
	del.setAttribute("src", bild[sign]);
	del.setAttribute("title", "delete");
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
	opt.setAttribute("title", "options");
	opt.addEventListener("click", function() {ein = options(tab,id);},false);
	td1.appendChild(del);
	td1.appendChild(eingabe);
	td1.appendChild(opt);
	row.appendChild(td1);
	tab.appendChild(row);
}

function options(pos, id) {					// Optionen anzeigen
	show_opt = !show_opt;
	if (show_opt) {
	// Textcolor
		var ein = einlesen(id);
		var row2 = document.createElement("tr");
		row2.setAttribute("id", 'KDNcol');
		td1 = document.createElement("td");
		if(ein[3] == true) {		// Fettschrift
			td1.setAttribute("style", "color:#"+farbe[ein[1]]+";font-weight:bold;");
		} 
		else {		
			td1.setAttribute("style", "color:#"+farbe[ein[1]]);
		}
		td1text = document.createTextNode("Textcolor:");
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
				if(ein[3] == true) {		// Fettschrift
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
		textweight.setAttribute("title", "fett/bold");
		textweight.checked = ein[3];
		textweight.addEventListener("change", function() {
			ein[3] = this.checked; 
			set_info(id, ein[0], ein[1], ein[2], ein[3]);
			if(ein[3] == true) {		// Fettschrift
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
		icon[0]= "";		// damit es nicht undefined ist
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

function mapinfo(k) {						// Dorf im Popup ermitteln
	var map_start = document.getElementById('info_content').getElementsByTagName("tbody")[0];
	remove_info(map_start);
	var map = getElementsByClassName("map")[0];
	var tds = map.getElementsByTagName("td");
	var link = tds[k].getElementsByTagName("a")[0];
	var akt_id = link.href.split("info_village&id=")[1];
	dorfinfo(akt_id, map_start);
}

function dorfinfo(id, map_start) {				// im Popup anzeigen
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
		if (ein[2] > 1) {			// Icon ausgewählt
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
		if(ein[3] == true) {		// Fettschrift
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

function einlesen(id) {						// gespeicherte Daten einlesen
	var einlesen = GM_getValue(server+"_info_"+id, ";;0;;0;;false");
	var ein = einlesen.split(";;");
	var e = ein.length;
	if (e < 4) {			// Kompatibilität zur alten Version 0.2/0.5
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

function set_info(id, text, col, pic, bold) {	// Daten speichern
	if (text != "") {
		GM_setValue(server+"_info_"+id, text+";;"+col+";;"+pic+";;"+bold);
	}
	else {
		GM_deleteValue(server+"_info_"+id);
	}
}

function del_notizen(server) {				// alle gespeicherten Notizen einer Welt löschen
	var liste = [];
	liste = GM_listValues();
	var sicher;
	sicher = window.confirm("Bist du sicher, dass alle Dorf-Notizen dieser Welt gelöscht werden sollen?\n(einzelne Notizen werden durch Leeren des Eingabefelds gelöscht)\nAre you sure you want to delete all notes of this world?\nWeet je zeker dat je alle notities van deze wereld wilt verwijderen?");
	if (sicher) {
		for (var i=0; i<liste.length; i++){
			if (liste[i].split("_")[0] == server) {
					GM_deleteValue(liste[i]);
			}
		}
	}
}

function scan_map() {						// Dörfer auf der Map erkennen
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
			tds[j].getElementsByTagName("img")[0].setAttribute("id",j);
			tds[j].getElementsByTagName("img")[0].addEventListener("mouseover",function(e) {mapinfo(e.target.id);}, false);
		}
	}
}

function remove_info(map_start) {				// Hinweis aus Popup löschen
	if(document.getElementById('info_i')) {
		map_start.removeChild(document.getElementById('info_i'));
	}
}

function check_mmove(akt_map_loc) {			// wurde die Karte verschoben?
	var groesse = document.getElementById('map').getElementsByTagName("tr").length;
	if(!watch_map) {
		watch_timer = window.setInterval(check_mmove,300,akt_map);
		watch_map = true;
		return false;
	}
	var obj = document.getElementById(akt_map_loc);
	if (obj) {
		var obj1 = obj.style.left; 
		var obj2 = obj.style.top;
		if(obj1 == (groesse*53)*(-1)+"px" || obj1 == (groesse*53)+"px" || obj2 == (groesse*38)*(-1)+"px" || obj2 == (groesse*38)+"px")
		{
			switch(akt_map_loc)
			{
				case "mapOld":
					akt_map = "mapNew";
					break;
				case "mapNew":
					akt_map = "mapOld";
					break;
			}
			scan_map();
			window.clearInterval(watch_timer);
			watch_map = false;
		}
	}
}

function check_number(num) {					// auf Zahl überprüfen
	num = parseInt(num,10);
	if (isNaN(num)) {
		num = 0;
	}
	return num;
}

function getElementsByClassName(classname, node) {//neue Funktion getElementsByClassName()
	if(!node) {
		node = document.getElementsByTagName("body")[0];
	}
	var a = [];
	var re = new RegExp('\\b' + classname + '\\b');
	var els = node.getElementsByTagName("*");
	for(var i=0,j=els.length; i<j; i++) {
		if(re.test(els[i].className)) {
			a.push(els[i]);
		}
	}
	return a;
}
