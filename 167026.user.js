// ==UserScript==
// @name           TEST ENDU
// @namespace      endu
// @description    Wertet die Gildenspenden aus
// @include        http://endurias.evergore.de/evergore.html?page=guild_protocol&selection=2*
// ==/UserScript==

cnt = 5;
var now = new Date();
param = location.search.substring(1).split("&");
if (param.length > 1 && param[1].split("=")[0] == "month")
	month = param[1].split("=")[1];
else month = now.getMonth() + 1;
if (param.length > 2 && param[2].split("=")[0] == "year")
	year = param[2].split("=")[1];
else year = now.getFullYear();

function nextItem(type){
	if (type == "add"){
		row = document.getElementsByTagName("tr")[++cnt].getElementsByTagName("td");
		reg = /LP.*/;
		if (valid = (typeof(row[0]) != "undefined" && !reg.test(row[0].innerHTML))){
			ret = new Array(row[0].innerHTML, row[1].innerHTML);
			if (location.search.substring(6, 20) == "guild_protocol") {
				reg = /<u>(\w*)<\/u><br>(\d*).*/;
				arr = reg.exec(row[2].innerHTML);
				ret.push(arr[1],arr[2]);
			}
		} else cnt--;
	} 
	return (valid&&ret);
}

function Add(Item){
	GM_xmlhttpRequest({
	  method: "POST",
	  url: "http://chaosman.bplaced.net/ajax.php",
	  data: "type=add&date="+Item[0]+"&name="+Item[1]+"&deposit="+((Item[2] == "Einlagerung" || Item[2] == "Einzahlung")?1:0)+"&value="+Item[3],
	  headers: {
	    "Content-Type": "application/x-www-form-urlencoded"
	  },
	  onload: function(response) {
	  	Value = response.responseText;
	  	if (Value != "") {
	  		GM_log(Value)
			document.getElementsByTagName("tr")[cnt].setAttribute("style","background-color:#6CA6CD;");
	  	} else document.getElementsByTagName("tr")[cnt].setAttribute("style","background-color:#9ACD32;");
	  	if (Item = nextItem("add") ) Add(Item)
	  	else {
	  		th = document.createElement('th');
			th.innerHTML = 'Diese Seite wurde erfolgreich an den Server ?bertragen!';
			th.setAttribute("colspan",3);
			document.getElementsByTagName("table")[3].insertRow(1).appendChild(th);
	  	}
	  }
	});
}

if (location.search.split("&").pop() == "update"){ //Ausf?hren des Datenbankupdates
	if (Item = nextItem("add")) Add(Item);
} else if (location.search.substring(6, 22) == "guild_leadership") { //Ausgabe der Spendenliste
	//Einf?gen des Dropdown Men?s zur Monatauswahl
	montharr = new Array("Januar", "Februar", "M&auml;rz", "April", "Mai", "Juni", "Juli",
	                       "August", "September", "Oktober", "November", "Dezember");
	drop = document.createElement("select");
	lastmonth = now.getMonth() + (now.getFullYear() - 2010)*12;
	aktmonth = parseInt(month) + (year - 2010)*12 - 1;
	for (var i = 4; i <= lastmonth; i++){
		option = document.createElement("option");
		option.innerHTML = montharr[i%12] + " " + (Math.floor(i/12) + 2010);
		option.value = i;
		if (i == aktmonth) option.selected = "selected";
		drop.appendChild(option);
	}
	
	//Start der Datenabfrage
	if (Item = nextItem("get")) Get(Item);
} else { //Protokollseite
	th = document.createElement('th');
	th.innerHTML = '<a href="#" onclick="location.search += \'&update\'">Daten mit Server abgleichen</a>';
	th.setAttribute("colspan",3);
	document.getElementsByTagName("table")[3].insertRow(1).appendChild(th);
}