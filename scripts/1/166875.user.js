// ==UserScript==
// @name          Bplaced Anzeiger
// @namespace      Bplaced Anzeiger
// @description    Zeigt die Gildenspenden auf Bplaced an
// @include        chaosman.bplaced.net/*
// @include 	   http://chaosman.bplaced.net/*
// ==/UserScript==
// version 3.0
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
				reg = /d/;
				arr = reg.exec(row[2].innerHTML);
				ret.push(arr[1],arr[2]);
			} else {
				reg = /d/;
				arr = reg.exec(row[2].innerHTML);
				ret.push(arr[1],arr[2].replace(/<br>/g,";"));
			}
		} else cnt--;
	} else if (type == "get") {
		row = document.getElementsByTagName("tr")[cnt++].getElementsByTagName("td");
		reg = /LP.*/;		
		if (valid = (typeof(row[0]) != "undefined" && !reg.test(row[0].innerHTML))){
			ret = new Array(row[0].innerHTML,month,year);
		} else cnt--;
	}
	return (valid&&ret);
}



function Get(Item){
	GM_xmlhttpRequest({
	  method: "POST",
	  url: "http://chaosman.bplaced.net/ajax.php",
	  data: "type=get&name="+Item[0]+"&month="+Item[1]+"&year="+Item[2],
	  headers: {
	    "Content-Type": "application/x-www-form-urlencoded"
	  },
	  onload: function(response) {
	  	Value = response.responseText;
	  	editItem(Value.split(","));
	  	if (Item = nextItem("get")) Get(Item)
	  }
	});
}

function editItem(arr){
	row = document.getElementsByTagName("tr")[cnt - 1];
	td = row.insertCell(-1);
	td.innerHTML = arr[0] - arr[1];
	td = row.insertCell(-1);
	td.innerHTML = arr[2] - arr[3];	
	td = row.insertCell(-1);
	td.innerHTML = arr[0] - arr[1] + parseInt(arr[2] - arr[3]);
}

if (location.search.split("&").pop() == "update"){ //Ausf?hren des Datenbankupdates
	if (Item = nextItem("add")) Add(Item);

} else if (location.search.substring(6, 22) =="guild_leadership") { //Ausgabe der Spendenliste
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
	document.getElementsByTagName("h1")[0].appendChild(drop);
	drop.addEventListener("change",function(){
	if (location.search.substring(6, 23) =="guild_leadershipd"){ //CAS
	location.search = "?page=guild_leadershipd&month="+(this.options[this.selectedIndex].value % 12 + 1)+"&year="+(Math.floor(this.options[this.selectedIndex].value / 12) + 2010)}
	else if (location.search.substring(6, 23) =="guild_leadershipa"){ //aduial
	location.search = "?page=guild_leadershipa&month="+(this.options[this.selectedIndex].value % 12 + 1)+"&year="+(Math.floor(this.options[this.selectedIndex].value / 12) + 2010)}
	else if (location.search.substring(6, 23) =="guild_leadershipn"){ //nebel
	location.search = "?page=guild_leadershipn&month="+(this.options[this.selectedIndex].value % 12 + 1)+"&year="+(Math.floor(this.options[this.selectedIndex].value / 12) + 2010)}
	else if (location.search.substring(6, 23) =="guild_leadershipg"){ //grauelfen
	location.search = "?page=guild_leadershipg&month="+(this.options[this.selectedIndex].value % 12 + 1)+"&year="+(Math.floor(this.options[this.selectedIndex].value / 12) + 2010)}
	else if (location.search.substring(6, 23) =="guild_leadershipl"){ //lumen
	location.search = "?page=guild_leadershipl&month="+(this.options[this.selectedIndex].value % 12 + 1)+"&year="+(Math.floor(this.options[this.selectedIndex].value / 12) + 2010)}
	else if (location.search.substring(6, 24) =="guild_leadershiptr"){ //Tauben
	location.search = "?page=guild_leadershiptr&month="+(this.options[this.selectedIndex].value % 12 + 1)+"&year="+(Math.floor(this.options[this.selectedIndex].value / 12) + 2010)}
	else if (location.search.substring(6, 24) =="guild_leadershipta"){ //Taranteln
	location.search = "?page=guild_leadershipta&month="+(this.options[this.selectedIndex].value % 12 + 1)+"&year="+(Math.floor(this.options[this.selectedIndex].value / 12) + 2010)}
},true); 
	// Anpassen des Tabellenkopfes
	tharr = new Array("Gildenkasse","Gildenlager","Gesamtbilanz");
	for each (var title in tharr){
		th = document.createElement("th");
		th.innerHTML = title;
		document.getElementsByTagName("tr")[cnt - 1].appendChild(th);
	}	
	//Start der Datenabfrage
	if (Item = nextItem("get")) Get(Item);
} else { //Protokollseite
	th = document.createElement('th');
	th.setAttribute("colspan",3);
	document.getElementsByTagName("table")[3].insertRow(1).appendChild(th);
}