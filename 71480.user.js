// ==UserScript==
// @name           AktenlinkAuswahl
// @namespace      @DaHaiz
// @description    (v 1.1.1) Ersetzt das Eingabefeld f�r die Spieler-/Aktenlinks durch Drop-Down-Felder (TWPlus,DSReal,TW Stats,my Webtool)
// @include        http://*.*staemme.*/game.php?village=*&screen=settings&mode=settings
// ==/UserScript==

//Nummer des aktuellen Servers ermitteln
server = document.location.href.match("http://*([0-9]+)*.*staemme.*/")[1];

//Die verschiedenen Anbieter der Spielerakten incl. Spieler-/ und Stammesaktenlink mit {player_id} bzw. {ally_id} als ID-Platzhalter
fileProvider = [
		{
		"Name":"TW Plus",
		"Player":"http://de"+server+".twplus.org/file/player/{player_id}/",
		"Ally":"http://de"+server+".twplus.org/file/ally/{ally_id}/"
		},
		
		{
		"Name":"DS Real",
		"Player":"http://www.dsreal.de/index.php?tool=akte&mode=player&world=de"+server+"&id={player_id}",
		"Ally":"http://www.dsreal.de/index.php?tool=akte&mode=ally&world=de"+server+"&id={ally_id}"
		},
		
		{
		"Name":"TW Stats",
		"Player":"http://de.twstats.com/de"+server+"/index.php?page=player&id={player_id}",
		"Ally":"http://de.twstats.com/de"+server+"/index.php?page=ally&id={ally_id}"
		},
		{
		"Name":"my Webtool",
		"Player":"http://de.my-webtool.com/games/die-staemme/de"+server+"/users/{player_id}",
		"Ally":"http://de.my-webtool.com/games/die-staemme/de"+server+"/allies/{ally_id}"
		}
	];

//F�gt die Auswahllisten nach den entsprechenden Inputs ein
function init()
	{
	//Spieleraktenlinkinput
	var playerInput = document.getElementsByName("player_profile_link")[0];
	//Stammesaktenlinkinput
	var allyInput = document.getElementsByName("ally_profile_link")[0];
	
	//Spieler- und Stammesakteninputs lahmlegen
	playerInput.name = "player_profile_link_old";
	allyInput.name = "ally_profile_link_old"; 
	
	//Spieler- und Stammesakteninputs verstecken
	playerInput.style.display = "none";
	allyInput.style.display = "none";
	
	//Spieleraktenlinkselect
	var playerSelect = document.createElement("select");
	//Name des Spielerinputs setzen
	playerSelect.setAttribute("name","player_profile_link");
	
	//Stammesaktenlinkselect
	var allySelect = document.createElement("select");
	//Name des Stammesinputs setzen
	allySelect.setAttribute("name","ally_profile_link");
	
	
	
	//Spieler-/Allyoptions f�r die am Anfang definierten Provider erstellen und ans Playerselect einf�gen
	for(var i = 0;i<fileProvider.length;i++)
		{
		//Option f�r Spielerselect erstellen
		var playerOption = document.createElement("option");
		//Als Value den Spielerlink setzen
		playerOption.setAttribute("value",fileProvider[i]["Player"]);
		//Als angezeigten Optiontext den Namen des Providers setzen
		playerOption.appendChild(document.createTextNode(fileProvider[i]["Name"]));
		
		//Pr�fen, ob diese Option die aktuell ausgew�hlte ist und eventuell selected-Attribut vergebem
		if(playerInput.value == fileProvider[i]["Player"])
			{
			playerOption.setAttribute("selected","selected");	
			}
			
			
		//Spieleroption ins Spielerselect einf�gen
		playerSelect.appendChild(playerOption);
		
		
		//Option f�r Stammesselect erstellen
		var allyOption = document.createElement("option");
		//Als Value den Spielerlink setzen
		allyOption.setAttribute("value",fileProvider[i]["Ally"]);
		//Als angezeigten Optiontext den Namen des Providers setzen
		allyOption.appendChild(document.createTextNode(fileProvider[i]["Name"]));
		
		//Pr�fen, ob diese Option die aktuell ausgew�hlte ist und eventuell selected-Attribut vergebem
		if(allyInput.value == fileProvider[i]["Ally"])
			{
			allyOption.setAttribute("selected","selected");	
			}
		
		//Spieleroption ins Spielerselect einf�gen
		allySelect.appendChild(allyOption);
		}
	
	//Player- und Stammesselects an die entsprechende Stelle einf�gen
	playerInput.parentNode.appendChild(playerSelect);
	allyInput.parentNode.appendChild(allySelect);
	}

//Pr�fen, ob Spieler- und Stammesaktenlinkinputs vorhanden sind
if(document.getElementsByName("player_profile_link")[0] && document.getElementsByName("ally_profile_link")[0])
	{
	//Skript starten
	init();	
	}

