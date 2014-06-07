// ==UserScript==
// @name        Adminhilfe
// @namespace   PaveLow45
// @include     *cp.rpg-city.de*
// @version     1.1
// ==/UserScript==
var content;
var a = document.getElementsByTagName("a");
var ul = document.getElementsByTagName("ul")[0];
var li = document.createElement("li");
var ticketid = a[2].href;
ticketid.search(/ticket=(.*)/);
ticketid = RegExp.$1;
li.innerHTML = "<a style='color:orange'; href='http://cp.rpg-city.de/index.php?funktion=_sucheusers&ticket=" + ticketid + "'>Accountsuche</a>";
ul.insertBefore(li, ul.getElementsByTagName("li")[ul.getElementsByTagName("li").length - 1]);

document.body.innerHTML = document.body.innerHTML.replace("Fahrzeug Garage</a> verwalten.", "Fahrzeug Garage</a> verwalten.<br><br>Du kannst hier einen <a href='http://cp.rpg-city.de/index.php?funktion=_sucheusers&ticket=" + ticketid + "'>User Account</a> suchen.<br>Du kannst hier die <a href='http://cp.rpg-city.de/index.php?funktion=_players&ticket=" + ticketid + "'>Spieler auf dem Server</a> einsehen.");

/* Supporter Anzeige */
document.body.innerHTML = document.body.innerHTML.replace(/Willkommen,/, "Willkommen, Supporter");

if(document.getElementsByClassName("infobox").length > 0)
{
	/* KD Rate */
	content = document.getElementsByClassName("infobox")[0].innerHTML;
	content = content.replace(/<[^>]+>/g, "");
	content.search(/Morde: (\d+)/);
	var kills = parseInt(RegExp.$1);
	content.search(/Gestorben: (\d+)/);
	var deaths = parseInt(RegExp.$1);
	document.getElementsByClassName("infobox")[0].innerHTML += "<b>KD-Rate</b>: "+(Math.round(kills*100/deaths)/100)+" &Oslash;";
	
	/* Respektanzeige */
	content.search(/Respekt: (\d+) \/ (\d+)/);
	var an1 = parseInt(RegExp.$1);
	var an2 = parseInt(RegExp.$2);
	document.body.innerHTML = document.body.innerHTML.replace("<b>Respekt:</b> "+an1+" / "+an2+"", "<b>Respekt:</b> "+an1+" / "+an2+" ("+formatNumber(an2-an1)+" Benötigt)");

	/* Gesamt Geld Anzeige */
	content.search(/Bargeld: ([^\$]+)/);
	var bargeld = parseInt(RegExp.$1.replace(/\./g, ""));
	content.search(/Konto: ([^\$]+)/);
	var konto = parseInt(RegExp.$1.replace(/\./g, ""));
	content.search(/Festgeld: ([^\$]+)/);
	var festgeld = parseInt(RegExp.$1.replace(/\./g, ""));
	document.body.innerHTML = document.body.innerHTML.replace("Ø", "Ø<br><b>Gesamtvermögen:</b> "+formatNumber(bargeld+konto+festgeld)+"$");

	/* Strafpunkte Ausrechner */
	content.search(/Punkte \((\d+)\.(\d+)\.(\d+) (\d+):(\d+)\)/);
	var d1 = parseInt(RegExp.$1);
	var d2 = parseInt(RegExp.$2);
	var d3 = parseInt(RegExp.$3);
	var d4 = parseInt(RegExp.$4);
	var d5 = parseInt(RegExp.$5);
	var expires = ""+d1+"."+d2+"."+d3+" "+d4+":"+d5+""; 
	expires.search(/(\d+).(\d+).(\d+) (\d+):(\d+)/);
	expires = new Date(RegExp.$2+" "+RegExp.$1+", "+RegExp.$3+" "+RegExp.$4+":"+RegExp.$5+":00").getTime();
	var now = new Date().getTime();
	var diff = expires-now;
	var h = Math.floor(diff/1000/60/60);
	var m = Math.round(diff/1000/60%60);
	document.body.innerHTML = document.body.innerHTML.replace("("+d1+"."+d2+"."+d3+" 02:"+d5+")", "(noch "+h+" Stunden und "+m+" Minuten)");

	/* Zuletzt Online */
	content.search(/am (\d+)\.(\d+)\.(\d+) (\d+):(\d+)/);
	var d1 = parseInt(RegExp.$1);
	var d2 = parseInt(RegExp.$2);
	var d3 = parseInt(RegExp.$3);
	var d4 = parseInt(RegExp.$4);
	var d5 = parseInt(RegExp.$5);
	var expires = ""+d1+"."+d2+"."+d3+" "+d4+":"+d5+""; 
	expires.search(/(\d+).(\d+).(\d+) (\d+):(\d+)/);
	expires = new Date(RegExp.$2+" "+RegExp.$1+", "+RegExp.$3+" "+RegExp.$4+":"+RegExp.$5+":00").getTime();
	var now = new Date().getTime();
	var diff = now-expires;
	var h = Math.floor(diff/1000/60/60);
	var m = Math.round(diff/1000/60%60);
	document.body.innerHTML = document.body.innerHTML.replace("Uhr.", "Uhr. <b> (vor "+h+" Stunden und "+m+" Minuten)</b>");
}

if(document.URL.search(/funktion=_players/) != -1)
{ 
	content = document.getElementsByClassName("content")[0];
	for(var i=0;i<content.getElementsByTagName("div").length;i++)
	{
		if(content.getElementsByTagName("div")[i].innerHTML.search(/^(\d+).(\d+).(\d+) (\d+):(\d+)$/) != -1)
		{
			var d1 = parseInt(RegExp.$1);
			var d2 = parseInt(RegExp.$2);
			var d3 = parseInt(RegExp.$3);
			var d4 = parseInt(RegExp.$4);
			var d5 = parseInt(RegExp.$5);
			var expires = ""+d1+"."+d2+"."+d3+" "+d4+":"+d5+""; 
			expires.search(/(\d+).(\d+).(\d+) (\d+):(\d+)/);
			expires = new Date(RegExp.$2+" "+RegExp.$1+", "+RegExp.$3+" "+RegExp.$4+":"+RegExp.$5+":00").getTime();
			var now = new Date().getTime();
			var diff = now-expires;
			var m = Math.round(diff/1000/60);
			content.getElementsByTagName("div")[i].style.width = "auto";
			content.getElementsByTagName("div")[i].innerHTML += "  <b> (vor "+m+" Minuten)</b>";
		} 
	}
}

if(document.URL.search(/funktion=_sucheusers/) != -1)
{
	var table = document.getElementsByTagName("table")[0];
	var time;
	for(var i=1;i<table.getElementsByTagName("tr").length;i++)
	{
		time = table.getElementsByTagName("tr")[i].getElementsByTagName("td")[3];
		time.innerHTML.search(/(\d+).(\d+).(\d+) (\d+):(\d+)/);
		lastOnline = new Date(RegExp.$2+" "+RegExp.$1+", "+RegExp.$3+" "+RegExp.$4+":"+RegExp.$5+":00").getTime();
		var now = new Date().getTime();
		var diff = now-lastOnline;
		var h = Math.floor(diff/1000/60/60);
		var m = Math.round(diff/1000/60%60);
		time.innerHTML += "  <b> (vor "+h+" Stunden und "+m+" Minuten)</b>";
	}
}

var reasons = [
	["", ""],
	["Abgewiesen", "Guten Tag,\nDie Beschwerde wird aus einer der folgenden Gründe abgewiesen:\n\n- Mangelende Beweislage.\n- Der Angeklagte ist bereits gesperrt.\n- Die Beweise sind geschnitten/bearbeitet.\n- Es liegt kein Regelverstoß vor.\n- Es steht Aussage gegen Aussage.\n\nBeste Grüße,\nAdministration"],
	["Sinnlos DM", "Guten Tag,\nSinnlos DM ist nach dem Regelwerk §7 Deathmatch verboten und wird bestraft.\nDer Angeklagte erhält eine Freiheitsstrafe von 120 Minuten.\n\n// Fall Abgeschlossen\n\nBeste Grüße,\nAdministration"],
	["Totparken", "Guten Tag,\nTotparken ist nach dem Regelwerk §7 Deathmatch verboten und wird bestraft.\nDer Angeklagte erhält eine Freiheitsstrafe von 120 Minuten.\n\n// Fall Abgeschlossen\n\nBeste Grüße,\nAdministration"],
	["Leichte Beleidigung", "Guten Tag,\nLeichte Beleidigung ist nach dem Regelwerk §6 Beleidigungen verboten und wird bestraft.\nDer Angeklagte erhält eine Mute 240 Minuten Mute Strafe.\n\n// Fall Abgeschlossen\n\nBeste Grüße,\nAdministration"],
	["Mittlere Beleidigung", "Guten Tag,\nMittlere Beleidigung ist nach dem Regelwerk §6 Beleidigungen verboten und wird bestraft.\nDer Angeklagte erhählt einen 24 Stunden Ban und eine Verwarnung.\n\n// Fall Abgeschlossen\n\nBeste Grüße,\nAdministration"],
	["Schwere Beleidigung", "Guten Tag,\nSchwere Beleidigung ist nach dem Regelwerk §6 Beleidigungen verboten und wird bestraft.\nDer Angeklagte erhählt einen 7 Tage Ban und eine Verwarnung.\n\n// Fall Abgeschlossen\n\nBeste Grüße,\nAdministration"],
	["Carschieben", "Guten Tag,\nCarschieben ist nach dem Regelwerk §12 Unrealistischem Verhalten verboten und wird bestraft.\nDer Angeklagte erhählt eine Freiheitsstrafe von 60 Minuten\n\n// Fall Abgeschlossen\n\nBeste Grüße,\nAdministration"],
	["Spawnkill", "Guten Tag,\nSchießen mit Anti Spawn Kill oder Spawnkill ist nach Regelwerk §7 Deathmatch verboten und wird bestraft.\nDer Angeklagte erhält eine Freiheitsstrafe von 120 Minuten.\n\n// Fall Abgeschlossen\n\nBeste Grüße,\nAdministration"],
];

if(document.URL.search(/funktion=_beschwerden_admin_ansicht/) != -1)
{
	var select = document.createElement("select");
	var option;
	for(var i=0;i<reasons.length;i++)
	{
	  option = document.createElement("option");
	  option.innerHTML = reasons[i][0];
	  option.value = reasons[i][1];
	  select.appendChild(option);
	}
	select.setAttribute("onchange", "document.getElementsByName('beschreibung')[0].value = this.getElementsByTagName('option')[this.selectedIndex].value;");
	document.getElementsByName("cld")[0].insertBefore(select, document.getElementsByName("cld")[0].getElementsByTagName("input")[0]);
}

/* Funktionen */
function formatNumber(number)
{
	number += "";
    number = number.split("");
    for(var i=number.length-3;i>0;i-=3)
    {
      number.splice(i, 0, ".");
    }
    return number.join("");
}