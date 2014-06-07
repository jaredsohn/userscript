// ==UserScript==
// @name				DSIp-AdressenZuweiser
// @author				Seoester
// @namespace			none
// @description			Dieses Skript weist im Browsergame Die Staemme mithilfe eines Cookies Ip-Adressen einen Namen zu und gibt diese dann aus
// @include			http://*.die-staemme.de/*
// ==/UserScript==

var ck = false;
var arraylength;
var ipname;
var ipreg = new RegExp("\\d{1,3}\.\\d{1,3}\.\\d{1,3}\.\\d{1,3}");
var world = location.host.split(".")[0];
location.href.match(/\/(.{5,12})\?/g);
var script = RegExp.$1;

if(location.href.indexOf("screen=settings&mode=logins") != -1) {
	var confield = document.getElementById("content_value");
	var logfield;
	var table;
	var button = new Array(20);
	var ip = new Array(20);
	for(var i = 0; i < 20; i++) {
		logfield = confield.getElementsByTagName("td")[i];
		if(logfield && logfield.innerHTML.indexOf("20 Logins") != -1)
			break;
	}
	
	
	//Herausfinden der Ip-Adressen-Tabelle
	for(var i = 13; i < 35; i++) {
		if(document.getElementsByTagName("tbody")[i]) {
			var ku = document.getElementsByTagName("tbody")[i];
		}
		if(ku.childNodes[0] && ku.childNodes[0].childNodes[1] && ku.childNodes[0].childNodes[1].innerHTML == "IP") {
			//Intialisierung der Tabelle
			table = document.getElementsByTagName("tbody")[i];
			break;
		}
	}
	var p1 = table.getElementsByTagName("tr")[0];
	var kr = document.createElement("th");
	p1.appendChild(kr);
	kr.innerHTML = "Namen";
	
	
	//Erstellen des Delete Cookie buttons
	dcookie = document.createElement("button");
	logfield.appendChild(dcookie);
	dcookie.innerHTML = "Cookie löschen";
	dcookie.addEventListener("click", deleteCookie, false);
	
	
	loadCookie();
	
	createElements();
	
} else if(ipreg.exec(document.getElementsByTagName("body")[0].innerHTML) && document.getElementsByTagName("body")[0].innerHTML.indexOf("Last Login") != -1) {
	var start = false;
	var main_num;
	for(var i = 10; i >= 0; i--) {
		if(document.getElementsByClassName("main")[i] && ipreg.exec(document.getElementsByClassName("main")[i].innerHTML) && document.getElementsByClassName("main")[i].getElementsByTagName("b")[1]) {
			start = true;
			main_num = i;
		}
	}
	if(start) {
		loadCookie();
		var cell = document.getElementsByClassName("main")[main_num].getElementsByTagName("td")[0];
		var ip = cell.getElementsByTagName("b")[1].innerHTML;
		ipname = checkName(cell.getElementsByTagName("b")[1].innerHTML);
		if(ipname != "")
			cell.getElementsByTagName("b")[1].innerHTML = "von " + ipname + " (" + ip + ")";
	}
}




//Funktionsintialisierungen

function createElements() {
	var line = new Array(20);
	var field = new Array(20);
	//Schleife zum Erstellen der neuen Zelle, Erstellung des Buttons und Suchen nach Namen der Ip-Adressen
	for(var i = 0; i < 20; i++) {
		var num = i + 1;
		if(table.getElementsByTagName("tr")[num]) {
			line[i] = table.getElementsByTagName("tr")[num];
			ip[i] = line[i].childNodes[1].innerHTML;
			field[i] = document.createElement("td");
			line[i].appendChild(field[i]);
			button[i]= document.createElement("button");
			field[i].appendChild(button[i]);
			button[i].innerHTML = "Hinzufügen/Ändern";
			button[i].addEventListener("click", setName, false);
			line[i].childNodes[1].innerHTML += " (" + checkName(ip[i]) + ")";
		}
	}
}


function setName(evt) {
	var num;
	var ipadd;
	for(var i = 0; i < 20; i++) {
		if(evt.currentTarget == button[i]) {
			ipadd = ip[i];
		}
	}
	namev = prompt("Geben sie einen Namen für die Ip-Adresse "+ipadd+" ein." , checkName(ipadd));
	if(namev) {
		if(arraylength) {
			if(checkName(ipadd)) {
				num = checkNum(ipadd);
				ipname[num][0] = ipadd;
				ipname[num][1] = namev;
			} else {
				ipname[arraylength] = new Array(2);
				ipname[arraylength][0] = ipadd;
				ipname[arraylength][1] = namev;
			}
		} else {
			ipname[0][0]= ipadd;
			ipname[0][1]= namev;

		}
		for(var i in ipname) {
			ipname[i] = ipname[i].join("*");
		}

		ipname = ipname.join("#");

		var dates = new Date(2070, 12, 31, 1, 0);
		setzeCookie("ipaname", ipname, dates);
	}
	reload();
}


function checkName(ipaddr) {
	if(ck) {
		for(var i = 0; i < arraylength; i++) {
			var ipnameActArr = ipname[i][0].split(".");
			var ipnameAct = ipnameActArr[0] + "." + ipnameActArr[1] + "." + ipnameActArr[2];
			var regip = new RegExp("^" + ipnameAct + ".\\d{1,3}$");
			if(regip.exec(ipaddr))
				return ipname[i][1];
		}
	}
	return "";
}


function checkNum(ipaddr) {
	if(ck) {
		for(var i = 0; i < arraylength; i++) {
			if(ipaddr == ipname[i][0])
				return i;
		}
	}
}


function loadCookie() {
	//Intialisieren der Cookie Array
	var cookieStr = holeCookie("ipaname");;
	if(cookieStr != null) {
		ipname = cookieStr.split("#");
		arraylength = ipname.length;
		ck = true;
		for(var i in ipname) {
			ipname[i] = ipname[i].split("*");
		}
	} else {
		ipname = new Array(1);
		ipname[0] = new Array(2);
	}
	
}


function deleteCookie() {
	conf = confirm("Wollen sie das Cookie wirklich löschen?\nAlle gespeichtern Daten werden in diesem Fall gelöscht.");
	if(conf) {
		loescheCookie("ipaname");
		alert("Cookie wurde erfolgreich gelöscht.");
		reload();
	}
}


function reload() {
	//loadCookie;
	parent.location.href = "http://" + world + ".die-staemme.de/" + script + "?screen=settings&mode=logins";

}



//Die folgenden Funktionen sind aus dem Buch JavaScript von Stefan Koch erschienen im dpunkt Verlag uebernommen worden

function setzeCookie(name, wert) {
	var arg_wert = setzeCookie.arguments;
	var arg_laenge = setzeCookie.arguments.length;
	var expires = (arg_laenge > 2) ? arg_wert[2] : null;
	var path = (arg_laenge > 3) ? arg_wert[3] : null;
	var domain = (arg_laenge > 4) ? arg_wert[4] : null;
	var secure = (arg_laenge > 5) ? arg_wert[5] : false;
	document.cookie = name + "=" + encodeURIComponent(wert) +
		((expires == null) ? "" : ("; expires=" + 
			expires.toGMTString())) +
		((path == null) ? "" : ("; path=" + path)) +
		((domain == null) ? "" : ("; domain=" + domain)) +
		((secure == true) ? "; secure" : "");
}

function holeCookie(name) {
	name += "=";
	var laenge = name.length;
	var cookie_laenge = document.cookie.length;
	var i = 0;
	while (i < cookie_laenge) {
		var j = i + laenge;
		if (document.cookie.substring(i, j) == name)  {
			return holeCookieWert(j);
			break;
		}
		i = document.cookie.indexOf(" ", i) + 1;
		if (i == 0)
			break;
	}
	return null;
}

function holeCookieWert(position) {
	var ende = document.cookie.indexOf(";", position);
	if (ende == -1) 
		ende = document.cookie.length;
	return decodeURIComponent(
		document.cookie.substring(position, ende));
}

function loescheCookie(name) {
	var exp = new Date();
	exp.setTime(exp.getTime() - 1);
	var cookie_wert = holeCookie(name);
	if (cookie_wert != null)
		document.cookie = name + "=" + cookie_wert + 
				"; expires=" + exp.toGMTString();
}