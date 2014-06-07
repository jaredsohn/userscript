// ==UserScript==
// @name 			KdN
// @namespace		none
// @description	KDN (kurze Dorf Notizen) Hinweise zu jedem Dorf eingeben / short village notices
// @version		0.14 - 200906191855
// @author 		Peety, Simon Hilz
// @include 		http://*.*staemme.*/game.php?*village=*&screen=map*
// @include 		http://*.tribalwars.*/game.php?*village=*&screen=map*
// @include 		http://*.*staemme.*/game.php?*screen=info_village&id=*
// @include 		http://*.tribalwars.*/game.php?*screen=info_village&id=*
// ==/UserScript==

var server = document.location.host.split('.')[0];
var akt_map = "mapOld";
var watch_map = false; 
var watch_map_timer;

if(document.body.innerHTML.match(/input name=\"sid_refresh_password/)) {
	return;
}
else if(!document.body.innerHTML.match(/popup_scroll\(\'villages\.php/)) {
	return;
} 
else if(document.location.href.match (/screen=map/)) {
	scan_map();
	var map_container = getElementsByClassName("map_container")[0];
	var tds = map_container.getElementsByTagName("td");
	tds[1].addEventListener("click",function() {check_map_move(akt_map);}, true);
	tds[3].addEventListener("click",function() {check_map_move(akt_map);}, true);
	tds[(tds.length - 4)].addEventListener("click",function() {check_map_move(akt_map);}, true);
	tds[(tds.length - 2)].addEventListener("click",function() {check_map_move(akt_map);}, true);

}
else if(document.location.href.match (/village=\d+&screen=info_village&id=/)) {
/* Tabelle ermitteln, in der später die neue Zeile eingefügt wird */ 
	var tab = document.evaluate('//table[@class="main"]/tbody/tr/td/table[@class="vis left"]/tbody',document,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null).snapshotItem(0); 
	var id = location.href.split("id=")[1].replace(/\&.+/,""); 
	var row = document.createElement("tr");
	var td1 = document.createElement("td");
	td1.setAttribute("colspan","2");
	td1.innerHTML = "<a style=\"color:#803000\"><b>» <\/b><\/color><\/a>";
	var del = document.createElement("input");
	del.setAttribute("type","image");
	del.setAttribute("style", "vertical-align: middle");
	del.setAttribute("src", "http://forum.die-staemme.de/staemme/buttons/report.gif");
	del.setAttribute("title", "delete");
	var eingabe = document.createElement("input");
	eingabe.setAttribute("type", "text");
	eingabe.setAttribute("style", "font-size: 10pt");
	eingabe.setAttribute("name", "eingabe");
	eingabe.value = GM_getValue(server+"_info_"+id, "");
	eingabe.setAttribute("size","34");
	eingabe.setAttribute("maxlength", "32");
	eingabe.setAttribute("method", "post");
	eingabe.addEventListener("change",function(){set_info(id, eingabe.value);},false);
	del.addEventListener("click",function(){del_notizen(server); eingabe.value = GM_getValue(server+"_info_"+id, "");}, false);
	td1.appendChild(del);
	td1.appendChild(eingabe);
	row.appendChild(td1);
	tab.appendChild(row);
}

function add_info_to_map(k) {
	var cont_tb = document.getElementById('info_content').getElementsByTagName("tbody")[0];
	remove_info(cont_tb);
	var map = getElementsByClassName("map")[0];
	var tds = map.getElementsByTagName("td");
	var link = tds[k].getElementsByTagName("a")[0];
	var akt_id = link.href.split("info_village&id=")[1];
	dorfinfo(akt_id, cont_tb);
	
}

function dorfinfo(id, cont_tb) {
	if (GM_getValue(server+"_info_"+id, false)) {
		var row = document.createElement("tr");
		row.setAttribute("id",'info_i');
		var td1 = document.createElement("td");
		td1.innerHTML = " <img style=\"vertical-align: middle\" src=\"http:\/\/forum.die-staemme.de\/staemme\/buttons\/report\.gif\" alt=\"\" ";
		td2 = document.createElement("td");
		td2.setAttribute("colspan","2");
		td2.innerHTML = GM_getValue(server+"_info_"+id,"");
		row.appendChild(td1);
		row.appendChild(td2);
		cont_tb.appendChild(row);
	}
}

function set_info(dorf_id, text) {
	if (text != "") {
		GM_setValue(server+"_info_"+dorf_id,text);
	}
	else {
		GM_deleteValue(server+"_info_"+dorf_id);
	}	
}

function del_notizen(server) {
	var liste = [];
	liste = GM_listValues();
	var sicher;
	sicher = window.confirm("Bist du wirklich sicher, dass alle Dorf-Notizen dieser Welt gelöscht werden sollen?\n(einzelne Notizen werden durch Leeren des Eingabefelds gelöscht)");
	if (sicher){
		for (var i=0; i<liste.length; i++){
			if (liste[i].split("_")[0] == server) {
					GM_deleteValue(liste[i]);
			}
		}
	}
}


function scan_map() {
	var cont_tb = document.getElementById('info_content').getElementsByTagName("tbody")[0];
	remove_info(cont_tb);

	var doerfer = "";
	switch(getElementsByClassName("map").length) {
	case 1:
		map = getElementsByClassName("map")[0];
		break;
		
	case 2:
		map = getElementsByClassName("map")[1];
		break;
	}
	var tds = map.getElementsByTagName("td");
	for(var j = 0; j<tds.length;j++) {
		if(tds[j].getElementsByTagName('a').length == 1) {
			doerfer = doerfer + "_"+j+" - ";
			tds[j].getElementsByTagName("img")[0].setAttribute("id",j);
			tds[j].getElementsByTagName("img")[0].addEventListener("mouseover",function(e) {add_info_to_map(e.target.id);}, false);	
		}	
	}
	doerfer = "";
}

function remove_info(cont_tb) { 
	if(document.getElementById('info_i')) cont_tb.removeChild(document.getElementById('info_i'));
}

function check_map_move(akt_map_loc) {
	var groesse = document.getElementById('map').getElementsByTagName("tr").length;
	if(!watch_map){watch_map_timer = window.setInterval(check_map_move,500,akt_map); watch_map=true; return false;}
	if(document.getElementById(akt_map_loc).style.left == (groesse * 53) * (-1) + "px" || document.getElementById(akt_map_loc).style.left == (groesse * 53) + "px" || document.getElementById(akt_map_loc).style.top == (groesse * 38) * (-1) + "px" || document.getElementById(akt_map_loc).style.top == (groesse * 38) + "px")
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
		window.clearInterval(watch_map_timer);
		watch_map = false;
	}
}

function getElementsByClassName(classname, node) {
	if(!node) node = document.getElementsByTagName("body")[0];
	var a = [];
	var re = new RegExp('\\b' + classname + '\\b');
	var els = node.getElementsByTagName("*");
	for(var i=0,j=els.length; i<j; i++){
		if(re.test(els[i].className)) {
			a.push(els[i]);
		}
	}
	return a;
}
