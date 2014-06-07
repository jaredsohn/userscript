// ==UserScript==
// @name        Beschwerdenhilfe
// @namespace   Rox97
// @description Eine kleine Hilfe für Beschwerden
// @include     *rpg-city.de/*
// @version     1
// @grant metadaten
// ==/UserScript==

if(document.URL.search(/PostAdd&threadID/) != -1)
{
	var info = document.getElementsByTagName("table")[0].getElementsByTagName("tr")[0].getElementsByTagName("td")[1].innerHTML.replace(/<[^>]*>/g, "").replace(/&nbsp;/g, "");
	info.search(/, ([^ ]+) gegen ([^ ]+\n)/);
	var p2 = RegExp.$1;
	var p1 = RegExp.$2;
	p2 = p2.replace(/\s*/g, "");
	p1 = p1.replace(/\s*/g, "");

	var reasons = [
		["~**Vordefinierte Sanktionen**~", "Kein Text verfügbar"],
		["-----------------------------------", "Kein Text verfügbar"],
		["Sinnlos DM", "Guten Tag,\n\nWir haben uns hier zusammengefunden, um einen Streit zwischen dem\nAngeklagten "+p1+" und dem Kläger "+p2+" zu schlichten.\n\nDem Angeklagten "+p1+" wird vorgeworfen, den Kläger "+p2+" grundlos umgebracht zu haben.\nDie hier im Fall vorliegenden Beweismittel bezeugen die oben beschriebene Tat.\n\nAus diesem Grund fällt folgendes Urteil:\n\n|**********Urteil für "+p1+"**********|\n\n     |-Der Angeklagte erhält eine Freiheitsstrafe von 120 Minuten Prison.\n\n|**********Urteil für "+p1+"**********|\n\n\n#Anklage abgeschlossen."],
		["DM in NO-DM zone", "Guten Tag,\n\nWir haben uns hier zusammengefunden, um einen Streit zwischen dem\nAngeklagten "+p1+" und dem Kläger "+p2+" zu schlichten.\n\nDem Angeklagten "+p1+" wird vorgeworfen, den Kläger "+p2+" in einer 'No-DM Zone' angegriffen/umgebracht zu haben.\nDie hier im Fall vorliegenden Beweismittel bezeugen die oben beschriebene Tat.\n\nAus diesem Grund fällt folgendes Urteil:\n\n|**********Urteil für "+p1+"**********|\n\n     |-Der Angeklagte erhält eine Freiheitsstrafe von 240 Minuten Prison.\n\n|**********Urteil für "+p1+"**********|\n\n\n#Anklage abgeschlossen."],
		["Leichte Beleidigung", "Guten Tag,\n\nWir haben uns hier zusammengefunden, um einen Streit zwischen dem\nAngeklagten "+p1+" und dem Kläger "+p2+" zu schlichten.\n\nDem Angeklagten "+p1+" wird vorgeworfen, den Kläger "+p2+" Beleidigt zu haben.\nDie hier im Fall vorliegenden Beweismittel bezeugen die oben beschriebene Tat.\n\nAus diesem Grund fällt folgendes Urteil:\n\n|**********Urteil für "+p1+"**********|\n\n     |-Der Angeklagte erhält ein Chatverbot von 240 Minuten.\n\n|**********Urteil für "+p1+"**********|\n\n\n#Anklage abgeschlossen."],
		["Mittlere Beleidigung", "Guten Tag,\n\nWir haben uns hier zusammengefunden, um einen Streit zwischen dem\nAngeklagten "+p1+" und dem Kläger "+p2+" zu schlichten.\n\nDem Angeklagten "+p1+" wird vorgeworfen, den Kläger "+p2+" Beleidigt zu haben.\nDie hier im Fall vorliegenden Beweismittel bezeugen die oben beschriebene Tat.\n\nAus diesem Grund fällt folgendes Urteil:\n\n|**********Urteil für "+p1+"**********|\n\n     |-Der Angeklagte erhält eine Account-Sperre für 24 Stunden.\n     |-Der Angeklagte erhält einen Account-Warn.\n\n|**********Urteil für "+p1+"**********|\n\n\n#Anklage abgeschlossen."],
		["Schwere Beleidigung", "Guten Tag,\n\nWir haben uns hier zusammengefunden, um einen Streit zwischen dem\nAngeklagten "+p1+" und dem Kläger "+p2+" zu schlichten.\n\nDem Angeklagten "+p1+" wird vorgeworfen, den Kläger "+p2+" Beleidigt zu haben.\nDie hier im Fall vorliegenden Beweismittel bezeugen die oben beschriebene Tat.\n\nAus diesem Grund fällt folgendes Urteil:\n\n|**********Urteil für "+p1+"**********|\n\n     |-Der Angeklagte erhält eine Account-Sperre für 1 Woche.\n     |-Der Angeklagte erhält einen Account-Warn.\n\n|**********Urteil für "+p1+"**********|\n\n\n#Anklage abgeschlossen."],
		["Service Abuse", "Guten Tag,\n\nWir haben uns hier zusammengefunden, um einen Streit zwischen dem\nAngeklagten "+p1+" und dem Kläger "+p2+" zu schlichten.\n\nDem Angeklagten "+p1+" wird vorgeworfen, einen Service-Chat ausgenutzt zu haben.\nDie hier im Fall vorliegenden Beweismittel bezeugen die oben beschriebene Tat.\n\nAus diesem Grund fällt folgendes Urteil:\n\n|**********Urteil für "+p1+"**********|\n\n     |-Der Angeklagte erhält ein Chatverbot von 60 Minuten.\n\n|**********Urteil für "+p1+"**********|\n\n\n#Anklage abgeschlossen."],
		["Ausnutzen von Bugs", "Guten Tag,\n\nWir haben uns hier zusammengefunden, um einen Streit zwischen dem\nAngeklagten "+p1+" und dem Kläger "+p2+" zu schlichten.\n\nDem Angeklagten "+p1+" wird vorgeworfen, einen Bug ausgenutzt zu haben.\nDie hier im Fall vorliegenden Beweismittel bezeugen die oben beschriebene Tat.\n\nAus diesem Grund fällt folgendes Urteil:\n\n|**********Urteil für "+p1+"**********|\n\n     |-Der Angeklagte erhält einen Account-Warn.\n     |-Der Angeklagte erhält eine Freiheitsstrafe von 120 min Prison.\n\n|**********Urteil für "+p1+"**********|\n\n\n#Anklage abgeschlossen."],
		["Umgangston", "Guten Tag,\n\nWir haben uns hier zusammengefunden, um einen Streit zwischen dem\nAngeklagten "+p1+" und dem Kläger "+p2+" zu schlichten.\n\nDem Angeklagten "+p1+" wird vorgeworfen, eine falsche Ausdrucksweise gewählt zu haben.\nDie hier im Fall vorliegenden Beweismittel bezeugen die oben beschriebene Tat.\n\nAus diesem Grund fällt folgendes Urteil:\n\n|**********Urteil für "+p1+"**********|\n\n     |-Der Angeklagte erhält ein Chatverbot von 120 Minuten Prison.\n\n|**********Urteil für "+p1+"**********|\n\n\n#Anklage abgeschlossen."],
		["Spieler ist Gesperrt", "Guten Tag,\n\nDer Fall wird aus folgendem Grund abgelehnt:\n\n|**********Grund für die Ablehnung**********|\n\n     |-Der Angeklagte ist vom Server gebannt.\n\n|**********Grund für die Ablehnung**********|\n\n\n#Anklage abgeschlossen."],
		["Sanktion schon erhalten", "Guten Tag,\n\nDer Fall wird aus folgendem Grund abgelehnt:\n\n|**********Grund für die Ablehnung**********|\n\n     |-Der Angeklagte hat die Sanktion bereits erhalten.\n\n|**********Grund für die Ablehnung**********|\n\n\n#Anklage abgeschlossen."],
		["Unreales verhalten", "Guten Tag,\n\nWir haben uns hier zusammengefunden, um einen Streit zwischen dem\nAngeklagten "+p1+" und dem Kläger "+p2+" zu schlichten.\n\nDem Angeklagten "+p1+" wird vorgeworfen, sich unreal verhalten zu haben.\nDie hier im Fall vorliegenden Beweismittel bezeugen die oben beschriebene Tat.\n\nAus diesem Grund fällt folgendes Urteil:\n\n|**********Urteil für "+p1+"**********|\n\n     |-Der Angeklagte erhält eine Freiheitsstrafe von 120 Minuten Prison.\n\n|**********Urteil für "+p1+"**********|\n\n\n#Anklage abgeschlossen."],
		["Spam", "Guten Tag,\n\nWir haben uns hier zusammengefunden, um einen Streit zwischen dem\nAngeklagten "+p1+" und dem Kläger "+p2+" zu schlichten.\n\nDem Angeklagten "+p1+" wird vorgeworfen, im Chat gespamt zu haben.\nDie hier im Fall vorliegenden Beweismittel bezeugen die oben beschriebene Tat.\n\nAus diesem Grund fällt folgendes Urteil:\n\n|**********Urteil für "+p1+"**********|\n\n     |-Der Angeklagte erhält ein Chatverbot für 60 Minuten.\n\n|**********Urteil für "+p1+"**********|\n\n\n#Anklage abgeschlossen."],
		["DM auf Dienstleistende", "Guten Tag,\n\nWir haben uns hier zusammengefunden, um einen Streit zwischen dem\nAngeklagten "+p1+" und dem Kläger "+p2+" zu schlichten.\n\nDem Angeklagten "+p1+" wird vorgeworfen, Dienstleistende grundlos beschossen/umgebracht zu haben.\nDie hier im Fall vorliegenden Beweismittel bezeugen die oben beschriebene Tat.\n\nAus diesem Grund fällt folgendes Urteil:\n\n|**********Urteil für "+p1+"**********|\n\n     |-Der Angeklagte erhält eine Freiheitsstrafe von 120 Minuten Prison.\n\n|**********Urteil für "+p1+"**********|\n\n\n#Anklage abgeschlossen."],
		["KFZ Betrug", "Guten Tag,\n\nWir haben uns hier zusammengefunden, um einen Streit zwischen dem\nAngeklagten "+p1+" und dem Kläger "+p2+" zu schlichten.\n\nDem Angeklagten "+p1+" wird vorgeworfen, Dienstleistende grundlos beschossen/umgebracht zu haben.\nDie hier im Fall vorliegenden Beweismittel bezeugen die oben beschriebene Tat.\n\nAus diesem Grund fällt folgendes Urteil:\n\n|**********Urteil für "+p1+"**********|\n\n     |-Der Angeklagte erhält einen Account-Warn.\n     |-Der Angeklagte erhält eine Freiheitsstrafe von 120 min Prison.\n\n|**********Urteil für "+p1+"**********|\n\n\n#Anklage abgeschlossen."],
		["Gegenseitigkeit", "Guten Tag,\n\nDer Fall wird aus folgendem Grund abgelehnt:\n\n|**********Grund für die Ablehnung**********|\n\n     |-Beruht auf Gegenseitigkeit, beide waren beteiligt.\n\n|**********Grund für die Ablehnung**********|\n\n\n#Anklage abgeschlossen."],
		["Keine Beweise vorhanden", "Guten Tag,\n\nDer Fall wird aus folgendem Grund abgelehnt:\n\n|**********Grund für die Ablehnung**********|\n\n     |-Es sind keine gültigen Beweise vorhanden.\n\n|**********Grund für die Ablehnung**********|\n\n\n#Anklage abgeschlossen."]
	];

	var select = document.createElement("select");
	var option;
	for(var i=0;i<reasons.length;i++)
	{
		option = document.createElement("option");
		option.innerHTML = reasons[i][0];
		option.value = reasons[i][1];
		select.appendChild(option);
	}
	select.setAttribute("onchange", "document.getElementsByName('beschreibung')[0].value = this.options[this.selectedIndex].value;");
	select.setAttribute("style", "margin-right:10px;");
	document.getElementsByTagName("form")[0].insertBefore(select, document.getElementsByTagName("form")[0].getElementsByTagName("input")[0]);
}
else
{
	var count = 0;
	for(var i=0;i<document.getElementsByTagName("div").length;i++)
	{
		if(document.getElementsByTagName("div")[i].innerHTML.replace(/<[^>]*>/g, "") == "Wartet auf Admin")
		{
			count++;
		}
	}
	document.getElementsByTagName("h1")[0].innerHTML = "Aktuell sind "+count+" Beschwerden offen";
}