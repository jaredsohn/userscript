// ==UserScript==
// @name Erweiterte Dorfinfos
// @description (v. 1.9.2) Zeigt Infos aus Berichten direkt im Infopopup auf der Karte.
// @author Simon Hilz, realneode, Heinzelmaenchen
// @include http://*.die-staemme.de/game.php?*village=*&screen=map
// @include http://*.die-staemme.de/game.php?*village=*&screen=report&mode=all&view=*
// @include http://*.die-staemme.de/game.php?*village=*&screen=map&x=*&y=*
// @include http://*.die-staemme.de/game.php?*village=*&screen=report&mode=attack&view=*
// @include http://*.die-staemme.de/game.php?*screen=info_village&id=*
// ==/UserScript==

var server = document.location.host.split('.')[0];
var akt_map = "mapOld";
var watch_map = false; 
var watch_map_timer;

if(document.location.href.match (/.+screen=map/)) {
	scan_map();
	var map_container = getElementsByClassName("map_container")[0];
	var tds = map_container.getElementsByTagName("td");
	tds[1].addEventListener("click",function() {check_map_move(akt_map);},true);
	tds[3].addEventListener("click",function() {check_map_move(akt_map);},true);
	tds[(tds.length - 4)].addEventListener("click",function() {check_map_move(akt_map);},true);
	tds[(tds.length - 2)].addEventListener("click",function() {check_map_move(akt_map);},true);
	var insertpos = getElementsByClassName("map_container")[1];
	insertpos = insertpos.parentNode.parentNode;
	var main = getElementsByClassName("main")[0];
	var div = document.createElement("div");
	div.setAttribute("style","text-align:left;margin: 0px auto;");
	var p = document.createElement("p");
	p.setAttribute("class","small");
	p.setAttribute("align","center");
	var a = document.createElement("a");
	a.setAttribute("href","javascript:void(0);");
	a.addEventListener("click",function(){show_settings();},false);
	a.appendChild(document.createTextNode("> Erweiterte Dorfinfos Optionen anzeigen <"));
	p.appendChild(a);
	div.appendChild(p);
	var table = document.createElement("table");
	table.setAttribute("id","extended_dorfinfo_settings");
	table.setAttribute("class","vis");
	table.setAttribute("style","display:none;");
	
	var row = document.createElement("tr");
	var td = document.createElement("td");
	var check = document.createElement("input");
	check.setAttribute("type","checkbox");
	check.setAttribute("name","show_troups");
	check.checked = GM_getValue(server + "_" + "show_troups",false);
	check.addEventListener("change",function(){edit_setting(server + "_" + this.name,this.checked);},false);
	td.appendChild(check);
	td.appendChild(document.createTextNode("Truppen anzeigen"));
	row.appendChild(td);
	table.appendChild(row);
	
	row = document.createElement("tr");
	td = document.createElement("td");
	check = document.createElement("input");
	check.setAttribute("type","checkbox");
	check.setAttribute("name","show_ressis");
	check.checked = GM_getValue(server + "_" + "show_ressis",true);
	check.addEventListener("change",function(){edit_setting(server + "_" + this.name,this.checked);},false);
	td.appendChild(check);
	td.appendChild(document.createTextNode("Erspaehte Rohstoffe anzeigen"));
	row.appendChild(td);
	table.appendChild(row);
	
	row = document.createElement("tr");
	td = document.createElement("td");
	check = document.createElement("input");
	check.setAttribute("type","checkbox");
	check.setAttribute("name","show_wall");
	check.checked = GM_getValue(server + "_" + "show_wall",true);
	check.addEventListener("change",function(){edit_setting(server + "_" + this.name,this.checked);},false);
	td.appendChild(check);
	td.appendChild(document.createTextNode("Gebäude und Zustimmung anzeigen"));
	row.appendChild(td);
	table.appendChild(row);
	
	row = document.createElement("tr");
	td = document.createElement("td");
	check = document.createElement("input");
	check.setAttribute("type","checkbox");
	check.setAttribute("name","speed");
	check.checked = GM_getValue(server + "_" + "speed",false);
	check.addEventListener("change",function(){edit_setting(server + "_" + this.name,this.checked);},false);
	td.appendChild(check);
	td.appendChild(document.createTextNode("Geschwindigkeit 1.6"));
	row.appendChild(td);
	table.appendChild(row);
	
	div.appendChild(table);
	insertpos.appendChild(div);
	}
else if((document.location.href.search(/.+&screen=report&mode=all&view=/) > -1)|(document.location.href.search(/.+&screen=report&mode=attack/) > -1)) {
	var report = readReport();
	if (report != false){
		report = report.split(",");
		var splitted = document.location.href.split('=');
		var rep_id = parseInt(splitted[(splitted.length -1)]);
		var id = report[8];
		if(GM_getValue(server + "_rep_id_" + id,false) != false) {
			if(rep_id > parseInt(GM_getValue(server + "_rep_id_" + id,0))) {
			/* Reihenfolge: Holz, Lehm, Eisen, Holzfäller, Lehmgrube, Eisenmine, Bauernhof, Wall, DorfID, Sendezeit */
			GM_setValue(server + "_" + id,""+report);
			GM_setValue(server + "_rep_id_" + id,rep_id);
			GM_setValue(server + "_truppen_" + id,getInsideTroups());
			GM_setValue(server + "_truppena_" + id,getOutsideTroups());
			show_meldung("Dorfinfos geupdated.");
			}
			else {
				show_meldung("Dorfinfos in diesem Bericht sind veraltet.");
			}
		}else{
		/* Reihenfolge: Holz, Lehm, Eisen, Holzfäller, Lehmgrube, Eisenmine, Bauernhof, Wall, DorfID, Sendezeit */
		GM_setValue(server + "_" + id,""+report);
		GM_setValue(server + "_rep_id_" + id,rep_id);
		GM_setValue(server + "_truppen_" + id,getInsideTroups());
		GM_setValue(server + "_truppena_" + id,getOutsideTroups());
		show_meldung("Dorfinfos eingetragen.");
		}
	}
}

if(document.location.href.search(/.+&screen=info_village&id=/) > -1){
	addNewRow() ;
}
	
function show_meldung(msg) {
  /* Spalten erzeugen */
  var row = document.createElement("tr");
  var td1 = document.createElement("td");
  var td2 = document.createElement("td");
  
  /* Nachricht einfügen */
  td1.innerHTML = "Dorfinfos Meldung";
  td2.innerHTML = msg;
  
  /* Spalten einfügen */
  row.appendChild(td1);
  row.appendChild(td2);
  
  if(document.body.innerHTML.match(/DS Report/))
		var spoo = 1;
  else
		var spoo = 0;
  
  var tab = getElementsByClassName("vis")[1 + spoo].getElementsByTagName("tbody")[0].getElementsByTagName("tr")[1];
  tab.parentNode.insertBefore(row, tab);
}

function show_settings()
	{
	$('extended_dorfinfo_settings').setAttribute("style","");
	a.removeEventListener("click",function(){show_settings();},false);
	a.addEventListener("click",function(){hide_settings();},false)
	a.innerHTML = "< Erweiterte Dorfinfos Optionen verstecken >"
	}

function hide_settings()
	{
	$('extended_dorfinfo_settings').setAttribute("style","display:none;");
	a.removeEventListener("click",function(){hide_settings();},false);
	a.addEventListener("click",function(){show_settings();},false)
	a.innerHTML = "> Erweiterte Dorfinfos Optionen anzeigen <";
	}

function edit_setting(setting,new_value)	
	{
	GM_setValue(setting,new_value);
	}

function check_map_move(akt_map_loc)
	{
	var groesse = $('map').getElementsByTagName("tr").length;
	if(watch_map==false){watch_map_timer = window.setInterval(check_map_move,300,akt_map);watch_map=true;return false;}
	if($(akt_map_loc).style.left == (groesse * 53) * (-1) + "px" || $(akt_map_loc).style.left == (groesse * 53) + "px" || $(akt_map_loc).style.top == (groesse * 38) * (-1) + "px" || $(akt_map_loc).style.top == (groesse * 38) + "px")
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
		else {
		}	
	}
		
function readReport()
{
  /* falls es sich nicht um einen Spähbericht handelt, wird die Funktion beendet */ 
	for(var x = 0, h4 = document.getElementsByTagName("h4"), spy = false; x < h4.length; x++) {
		if(h4[x].innerHTML.match(/Spionage/)) {
			spy = true;
			break;
		}
  }
  
	if (spy){
		/* Das Table-Element ermitteln, in dem die erspähten Daten stehen */ 
		var tab = h4[x].nextSibling.nextSibling;
		
		/* Rohstoffe auslesen */ 
		var res = [];
		var html = tab.getElementsByTagName("td")[0].innerHTML.replace(/<span class="grey">\.<\/span>/g, "");
		res[0] = (html.match(/holz\.png/)) ? html.split('title="Holz" alt="">')[1].split(' <img')[0] : 0;
		res[1] = (html.match(/lehm\.png/)) ? html.split('title="Lehm" alt="">')[1].split(' <img')[0] : 0;
		res[2] = (html.match(/eisen\.png/)) ? html.split('title="Eisen" alt="">')[1].replace(/ /, "") : 0;
		
  
		/* Gebäude auslesen */ 
		var code = tab.getElementsByTagName("td")[1].innerHTML;
		var buildings = [0,0,0,0,0];
		var names = ["Holzfäller","Lehmgrube","Eisenmine","Speicher","Wall"];
  
		for(var x = 0; x < names.length; x++) {
			if(code.match(names[x]))
				buildings[x] = code.split(names[x] + " <b>(Stufe ")[1].split(")</b>")[0];
		}
  
		/* Das Bericht-Table-Element ermitteln */
		tab = document.evaluate('//table[@class="main"]/tbody/tr/td/table/tbody/tr/td/table/tbody/tr/td/table[@class="vis"]/tbody',document,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null).snapshotItem(0);
  
		/* vilID auslesen */ 
		var hit = tab.innerHTML.match(/info\_village\&amp\;id=(\d+)/g);
		var vilID = hit[1].split("=")[1];
  
		/* Datum + Zeit auslesen */ 
		var date = tab.getElementsByTagName("tr")[1].getElementsByTagName("td")[1].innerHTML;
  
		var output = res + "," + buildings + "," + vilID + "," + date;
  
		/* überprüfen ob ZS ausgelesen werden kann */  
		for(var x = 0, th = document.getElementsByTagName("th"), zs = false; x < th.length; x++) {
			if(th[x].innerHTML.match(/Zustimmung/)) {
				zs = true;
				break;
			}
		}
  
		if(!zs)
			return output;
  
		var ZS = th[x].nextSibling.nextSibling.getElementsByTagName("b")[1].innerHTML;
    if (parseInt(ZS) <= 0){
				ZS = 25;
		}
		output += "," + ZS;
		return output;
	} else {
		for(var x = 0, h4 = document.getElementsByTagName("th"), bericht = false; x < h4.length; x++) {
			if((h4[x].innerHTML.search(/Verteidiger:/))>-1) {
				bericht = true;
				break;
			}
		}
		if(bericht){
			/* Das Bericht-Table-Element ermitteln */
			tab = document.evaluate('//table[@class="main"]/tbody/tr/td/table/tbody/tr/td/table/tbody/tr/td/table[@class="vis"]/tbody',document,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null).snapshotItem(0);
			/* vilID auslesen */ 
			var hit = tab.innerHTML.match(/info\_village\&amp\;id=(\d+)/g);
			var vilID = hit[1].split("=")[1];
			/* Datum + Zeit auslesen */ 
			var date = tab.getElementsByTagName("tr")[1].getElementsByTagName("td")[1].innerHTML;
  		var output = "0,0,0,0,0,0,0,-1," + vilID + "," + date;
  
			/* überprüfen ob ZS ausgelesen werden kann */  
			for(var x = 0, th = document.getElementsByTagName("th"), zs = false; x < th.length; x++) {
				if(th[x].innerHTML.match(/Zustimmung/)) {
					zs = true;
					break;
				}
			}
  
			if(!zs)
				return output;
  
			var ZS = th[x].nextSibling.nextSibling.getElementsByTagName("b")[1].innerHTML;
			if (parseInt(ZS) <= 0){
				ZS = 25;
			}
			output += "," + ZS;
			return output;
		}
		return false;
	}
  
  /* Reihenfolge: Holz, Lehm, Eisen, Holzfäller, Lehmgrube, Eisenmine, Bauernhof, Wall, DorfID, Sendezeit, (Zustimming) */ 
}

// Liest die Truppen aus einem Bericht aus
function getInsideTroups()
{
  var units = [];
  var tab = document.evaluate('//table[@class="main"]/tbody/tr/td/table/tbody/tr/td/table/tbody/tr/td/table[@class="vis"]/tbody/tr/td/table/tbody/tr/td/table[@class="vis"]/tbody',document,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null).snapshotItem(1);
  
  if(!tab)
		return false;
  
  var stand = tab.getElementsByTagName("tr")[1].getElementsByTagName("td");
  var loose = tab.getElementsByTagName("tr")[2].getElementsByTagName("td");
  
  for(var x = 1; x < stand.length; x++) {
		var diff = stand[x].innerHTML-loose[x].innerHTML;
		units.push(diff);
  }
  
  return (""+units);
}

/* Liest die Truppen, die auswärts stehen aus einem Bericht aus */ 
function getOutsideTroups() 
{ 
  var units = []; 
  var tab = document.evaluate('//table[@class="main"]/tbody/tr/td/table/tbody/tr/td/table/tbody/tr/td/table[@class="vis"]/tbody/tr/td/table/tbody/tr/td/table/tbody',document,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null).snapshotItem(3); 
   
  if(!tab) 
     return false; 
   
  var tds = tab.getElementsByTagName("td"); 
  for(var x = 0; x < tds.length; x++) 
     units.push(tds[x].innerHTML); 
   
  return (""+units); 
}  

function addNewRow() 
{ 
  /* Tabelle ermitteln, in der später die neue Zeile eingefügt wird */ 
	var tab = document.evaluate('//table[@class="main"]/tbody/tr/td/table[@class="vis left"]/tbody',document,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null).snapshotItem(0); 
   
  /* Die neuen HTML-Elemente erstellen */ 
	var new_row_0 = document.createElement("tr"); 
	var new_row_1 = document.createElement("tr"); 
	var new_row_2 = document.createElement("tr");
	var new_row_3 = document.createElement("tr");
	var new_cell_0 = document.createElement("td"); 
	var new_cell_1 = document.createElement("td"); 
	var new_cell_2 = document.createElement("td");
	var new_cell_3 = document.createElement("td");
	var new_Link = document.createElement("a"); 
	var new_Link2 = document.createElement("a");
  
  /* Die Attribute der neuen HTML-Elemente setzen */ 
	new_row_1.id = "message_field";
	new_row_1.style.display = "none";
	
	new_row_3.id = "message_field";
	new_row_3.style.display = "none";
  
	new_cell_0.setAttribute("colspan","2");
  
	new_cell_1.setAttribute("colspan","2");
	new_cell_1.id = "message";
	new_cell_1.style.textAlign = "center";
	new_cell_1.style.color = "red";
	new_cell_1.style.fontSize = "1.4em";
	new_cell_1.style.fontWeight = "bold";
	new_cell_1.style.padding = "7px";
	
	new_cell_2.setAttribute("colspan","2");
	
	new_cell_3.setAttribute("colspan","2");
	new_cell_3.id = "message";
	new_cell_3.style.textAlign = "center";
	new_cell_3.style.color = "red";
	new_cell_3.style.fontSize = "1.4em";
	new_cell_3.style.fontWeight = "bold";
	new_cell_3.style.padding = "7px";
  
	new_Link.innerHTML = "&raquo; Dorfinformationen l&ouml;schen";  
	new_Link.href = "javascript: //do nothing";
	
	new_Link2.innerHTML = "&raquo; Alle Dorfinformationen l&ouml;schen";  
	new_Link2.href = "javascript: //do nothing";
	
  /* Die Funktion per Eventhandler an den Link koppeln */ 
	new_Link.addEventListener('click', function() 
	{ 
		var id = location.href.split("id=")[1].replace(/\&.+/, ""); 
     
		if(GM_getValue(server + "_" + id, false)) 
		{ 
			GM_deleteValue(server + "_" + id); 
			GM_deleteValue(server + "_rep_id_" + id);
			GM_deleteValue(server + "_truppen_" + id); 
			GM_deleteValue(server + "_truppena_" + id);
			new_Link.innerHTML = "&raquo; Dorfinformationen gel&ouml;scht";
		} else { 
			new_Link.innerHTML = "&raquo; keine Dorfinformationen vorhanden";
			} 
	}, false); 
		
	new_Link2.addEventListener('click', function() 
	{ 
		var liste = [];
		liste = GM_listValues();
		var sicher;
		sicher = window.confirm("Möchten Sie wirklich alle Dorfinformationen und Einstellungen löschen?");
		if (sicher){
			for (var i = 0; i < liste.length;i++){
				GM_deleteValue(liste[i]);
			}
			new_Link2.innerHTML = "&raquo; Alle Dorfinformationen gel&ouml;scht";
		}
		else{
			new_Link2.innerHTML = "&raquo; Alle Dorfinformationen nicht gel&ouml;scht";
		}
		
	}, false); 
   
  /* Die Elemente in die Seite intergrieren */ 
		new_cell_0.appendChild(new_Link);
		new_cell_2.appendChild(new_Link2);
		new_row_0.appendChild(new_cell_0);
		new_row_1.appendChild(new_cell_1);
		new_row_2.appendChild(new_cell_2);
		new_row_3.appendChild(new_cell_3);
		tab.appendChild(new_row_0);
		tab.appendChild(new_row_1);
		tab.appendChild(new_row_2);
		tab.appendChild(new_row_3);
}

function trennzeichen(zahl){
	zahl=parseInt(zahl);
	var ausgabe = "";
	if (zahl>1000){
		ausgabe += Math.floor(zahl/1000);
		ausgabe += ".";
		if (zahl%1000<100) {
			if (zahl%1000<10) {
				ausgabe += "00" + zahl%1000;
			}
			else{
				ausgabe += "0" + zahl%1000;
			}
		}
		else {
			ausgabe += zahl%1000;
		}
	}
	else{
		ausgabe+=zahl;
	}
	return ausgabe;
}

function getElementsByClassName(classname, node) {
if(!node) node = document.getElementsByTagName("body")[0];

      var a = [];
   
      var re = new RegExp('\\b' + classname + '\\b');
  
      var els = node.getElementsByTagName("*");
  
      for(var i=0,j=els.length; i<j; i++)
 
      if(re.test(els[i].className))a.push(els[i]);

      return a;
}

function $(id)
	{
	var object = document.getElementById(id);
	return object;
	}

function scan_map()
	{
	var cont_tb = $('info_content').getElementsByTagName("tbody")[0];
	if($('last_att'))cont_tb.removeChild($('last_att'));
	if($('last_att_units'))cont_tb.removeChild($('last_att_units'));
	if($('last_att_ressis'))cont_tb.removeChild($('last_att_ressis'));
	if($('last_att_zustimmung'))cont_tb.removeChild($('last_att_zustimmung'));
	if($('last_att_wall'))cont_tb.removeChild($('last_att_wall'));
	
	var doerfer = "";
	switch(getElementsByClassName("map").length)
		{
		case 1:
			map = getElementsByClassName("map")[0];
		break;
		
		case 2:
			map = getElementsByClassName("map")[1];
		break;
		}
	var tds = map.getElementsByTagName("td");
	for(var j = 0; j<tds.length;j++)
		{
		if(tds[j].getElementsByTagName('a').length == 1)
			{
			doerfer = doerfer + "_"+j+" - ";
			tds[j].getElementsByTagName("img")[0].setAttribute("id",j);
			tds[j].getElementsByTagName("img")[0].addEventListener("mouseover",function(e) {add_info_to_map(e.target.id,tds);},false);	
			}	
		}
	doerfer = "";
	}
	
function diffhour (last_att) {
	var att_time = last_att;
	var zeit_att = att_time.split(" ")[1];
	var h = zeit_att.split(":")[0];
	var i = zeit_att.split(":")[1];
	var d = att_time.split(".")[0];
	var m = att_time.split(".")[1];
	var j = att_time.split(".")[2];
	j = j.split(" ")[0];
	var att_date = new Date();
	j = "20" + j;
	att_date.setFullYear(j);
	att_date.setDate(d);
	att_date.setMonth(m-1);
	att_date.setHours(h);
	att_date.setMinutes(i);
	var now = new Date();
	var att_h = att_date.getTime() / 1000 / 60 / 60;
	var now_h = now.getTime() / 1000 / 60 / 60;
	var diff_h = now_h - att_h;
	return diff_h;
}

function add_info_to_map(i,tds)	{
	var cont_tb = $('info_content').getElementsByTagName("tbody")[0];
	if($('last_att'))cont_tb.removeChild($('last_att'));
	if($('last_att_units'))cont_tb.removeChild($('last_att_units'));
	if($('last_att_ressis'))cont_tb.removeChild($('last_att_ressis'));
	if($('last_att_zustimmung'))cont_tb.removeChild($('last_att_zustimmung'));
	if($('last_att_wall'))cont_tb.removeChild($('last_att_wall'));
	
	var trs = cont_tb.getElementsByTagName("tr");
	var hidden = 0;
	for(var j = 0; j < trs.length;j++)
		{
		if(trs[j].style.display == "none")hidden++;	
		}
	if(document.getElementById('info_bonus_image'))document.getElementById('info_bonus_image').setAttribute("rowspan",(8 - (hidden -1)));
	var map = getElementsByClassName("map")[0];
	var tds = map.getElementsByTagName("td");
	//var link = tds[i].getElementsByTagName('a')[0];
	//var akt_id = link.href.split("?")[1].split("=")[3];
	var link = tds[i].getElementsByTagName('a')[0];
  var akt_id = link.href.split("info_village&id=")[1];
	/* Reihenfolge: Holz, Lehm, Eisen, Holzfäller, Lehmgrube, Eisenmine, Bauernhof, Wall, DorfID, Sendezeit */
	var report = GM_getValue(server+"_"+akt_id,false);
	var report = report.split(",");
	var ressis = [report[0],report[1],report[2]];
	var show_wall = GM_getValue(server+"_show_wall",true);
	var show_time = GM_getValue(server+"_show_time",true);
	var show_ressis = GM_getValue(server+"_show_ressis",true);
	var show_troups = GM_getValue(server+"_show_troups",false);
	var server_speed = GM_getValue(server+"_speed",false);
	var diff_h=diffhour(report[9]);
	var speed = 1.0;
	if (server_speed){
		speed = 1.6;
	}
	var ressPerHour = [30,35,41,47,55,64,74,86,100,117,136,158,184,214,249,289,337,391,455,530,616,717,833,969,1127,1311,1525,1774,2063,2400];
	
	if(!report)
		{
		}
	else
		{
		//Truppen
		if (show_troups){
			var truppenHeim = GM_getValue(server + "_truppen_" + akt_id,false);
			var truppenAus = GM_getValue(server + "_truppena_" + akt_id,false);
			
			if (truppenHeim != false){
				truppenHeim = truppenHeim.split(",");
				
				var table = document.createElement("table");
				row = document.createElement("tr");
				row.setAttribute("id","last_att_units");
				td1 = document.createElement("td");
				td1.setAttribute("valign","bottom");
				var table2 = document.createElement("table");
				table2.setAttribute("class","vis");
				var row_unit = document.createElement("tr");
				var td_unit = document.createElement("td");
				td_unit.appendChild(document.createTextNode("Einheit: "));
				row_unit.appendChild(td_unit);
				table2.appendChild(row_unit);
				row_units = document.createElement("tr");
				td_units = document.createElement("td");
				td_units.appendChild(document.createTextNode("Truppen: "));
				row_units.appendChild(td_units);
				table2.appendChild(row_units);
				if (truppenAus != false){
					truppenAus = truppenAus.split(",");
					
					row_units = document.createElement("tr");
					td_units = document.createElement("td");
					td_units.appendChild(document.createTextNode("auswärts: "));
					row_units.appendChild(td_units);
					table2.appendChild(row_units);
				}
		
				td1.appendChild(table2);
				td2 = document.createElement("td");
				td2.setAttribute("valign","top");
				td2.setAttribute("colspan","2");
				table.setAttribute("class","vis");
				if (truppenHeim.length == 12){
					var einheiten = ["spear","sword","axe","archer","spy","light","marcher","heavy","ram","catapult","knight","snob"];
				}
				if (truppenHeim.length == 11){
					var einheiten = ["spear","sword","axe","archer","spy","light","marcher","heavy","ram","catapult","snob"];
				}
				if (truppenHeim.length == 9){
					var einheiten = ["spear","sword","axe","spy","light","heavy","ram","catapult","snob"];
				}
				var	code = "<tr class=\"center\">";
				for (var i=0; i < truppenHeim.length; i++){
					code += "<td width=\"35\"><img src=\"/graphic/unit/unit_" + einheiten[i] + ".png\"></td>";
				}
				code += "</tr><tr class=\"center\">";
				for (var i=0; i < truppenHeim.length; i++){
					if (parseInt(truppenHeim[i]) == 0){
						code += "<td width=\"35\" class=\"hidden\">" + truppenHeim[i] + "</td>";
					} else {
						code += "<td width=\"35\">" + "" + truppenHeim[i] + "</td>";
					}
				}
				code += "</tr>";
				if (truppenAus != false){
					code += "<tr class=\"center\">";
					for (var i=0; i < truppenAus.length; i++){
						if (parseInt(truppenAus[i]) == 0){
							code += "<td width=\"35\" class=\"hidden\">" + truppenAus[i] + "</td>";
						} else {
							code += "<td width=\"35\">" + "" + truppenAus[i] + "</td>";
						}
					}
					code += "</tr>";
				}
				table.innerHTML = code;
				td2.appendChild(table);
				row.appendChild(td1);
				row.appendChild(td2);
				cont_tb.appendChild(row);
			}
		}
		
		
		
			//Rohstoffe
			var speicher = [1000,1229,1512,1859,2285,2810,3454,4247,5222,6420,7893,9705,11932,14670,18037,22177,27266,33523,41217,50675,62305,76604,94184,115798,142373,175047,215219,264611,325337,400000];
			var speicherstufe = parseInt(report[6]);
			
			if ((show_ressis)&&(speicherstufe !=0)){
				row = document.createElement("tr");
				row.setAttribute("id","last_att_ressis");
				td1 = document.createElement("td");
				td1.innerHTML = "Rohstoffe: ";
				td2 = document.createElement("td");
				td2.setAttribute("colspan","2");
				
				/* Reihenfolge: Holz, Lehm, Eisen, Holzfäller, Lehmgrube, Eisenmine, Bauernhof, Wall, DorfID, Sendezeit */
				var ressis2=[];
				var graphic=["holz","lehm","eisen","axe","light","marcher"];
				var tragen = [10,80,50];
				var ausgabe="";
				for (var i=0;i <= 2;i++) {
					ressis2[i] = parseInt(ressis[i]);
					ressis2[i] +=  Math.floor(diff_h * ressPerHour[report[i+3]-1] *speed);
					ausgabe += "<img src=\"/graphic/" + graphic[i] + ".png\">";
					if (speicher[(speicherstufe-1)]<=ressis2[i]){
						ausgabe += "<a style=\"color:#FF0000\">";
					}
					else{
						if (0.8*speicher[(speicherstufe-1)]<=ressis2[i]){
							ausgabe += "<a style=\"color:#FF8000\">";
						}
					}
					if ((speicherstufe <= 30) && (speicherstufe >=1)){
						ressis2[i] = Math.min(speicher[(speicherstufe-1)],ressis2[i]);
					}
					ausgabe += trennzeichen(ressis2[i])+" ";
					if (0.8* speicher[(speicherstufe-1)]<=ressis2[i]){
						ausgabe += "</a>";
					}
				}
				
				ausgabe += "<br>";
				var bedarf =[];
				for (var i=0;i < tragen.length;i++) {
					bedarf[i] = (Math.floor((ressis2[0]+ressis2[1]+ressis2[2])/tragen[i])+1);
					ausgabe += " <img src=\"/graphic/unit/unit_" + graphic[3+i] + ".png\"> " + trennzeichen(bedarf[i])+" ";
				}
				
				td2.innerHTML = ausgabe;
				row.appendChild(td1);
				row.appendChild(td2);
				cont_tb.appendChild(row);
			}
			
			//Gebäude
			if (show_wall){
				row = document.createElement("tr");
				row.setAttribute("id","last_att_wall");
				td1 = document.createElement("td");
				td1.innerHTML = "Gebäude: ";
				td2 = document.createElement("td");
				td2.setAttribute("colspan","2");
				if (speicherstufe != 0){
					td2.innerHTML = "<img src=\"/graphic/res.png\"> "+ speicherstufe + " ( " + trennzeichen(speicher[speicherstufe-1]) +" ) ";
				}
				if (report[7] != -1){
					td2.innerHTML += "<img src=\"/graphic/buildings/wall.png\"> "+report[7];
				}
				if (report.length==11){
					var zustimmung = parseInt(report[10]);
					zustimmung += diff_h;
					zustimmung = Math.floor(Math.min(zustimmung,100));
					td2.innerHTML += " Zustimmung " + zustimmung;
				}
				row.appendChild(td1);
				row.appendChild(td2);
				cont_tb.appendChild(row);
			}
		}
	}