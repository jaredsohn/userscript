// ==UserScript==
// @name       Load players to database
// @namespace  http://bjoernpehling.de
// @version    0.2
// @description  Load handball players in the official database made by BJ
// @match      http://handball.powerplaymanager.com/de/scoutingubersicht.html*
// @include      http://handball.powerplaymanager.com/de/scoutingubersicht.html*
// @grant       none
// @copyright  2012+, You
// @updateURL https://neu.bjoernpehling.de/ppmcheck/handball/database.js
// ==/UserScript==

error = false;

loadingMsg = 'Lade Spieler...';
finishedMsg = 'Alle Spieler geladen';
retryMsg = 'Erneut versuchen';

function loadPlayers()
{
	document.body.style.cursor = "progress";
    document.querySelector("#loadPlayersId").innerHTML = loadingMsg;
    
	var players1 = document.getElementsByClassName('left_align tr0td2');
	var players2 = document.getElementsByClassName('left_align tr1td2');

	for (i=0;i<players1.length;i++)
	{
	    sendPlayerToDatabase(players1[i].children[1].getAttribute('href'));
	}

	for (i=0;i<players2.length;i++)
	{
	    sendPlayerToDatabase(players2[i].children[1].getAttribute('href'));
	}

    if (false === error) {
    	document.querySelector("#loadPlayersId").innerHTML = finishedMsg;
    } else {
    	document.querySelector("#loadPlayersId").innerHTML = retryMsg;
    }
    document.body.style.cursor = "auto";
}

function sendPlayerToDatabase(playerUrl)
{
    var data = getPlayerData(playerUrl);
    var url = "http://neu.bjoernpehling.de/ppmcheck/handball/receive-player.php";
	var params = "data=" + encodeURIComponent(data);
    var http = new XMLHttpRequest();
	http.open("POST", url, false);
	http.setRequestHeader("Content-type","application/x-www-form-urlencoded");
	http.onreadystatechange = function() {
		if (http.readyState != 4 || http.status != 200) {
			//error = true;
		}
	}
    http.send(params);
}

function getPlayerData(playerUrl) 
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", playerUrl, false );
    xmlHttp.send( null );
    return xmlHttp.responseText;
}

function init()
{
    var newdiv = document.createElement('div');
  	newdiv.setAttribute('class', 'button_small');
  	newdiv.innerHTML = '<a onclick="document.loadPlayers()"><div nowrap="true" id="loadPlayersId">Spieler in Datenbank eintragen</div></a>';
    newdiv.addEventListener ("click", loadPlayers , false);

    var myDiv   = document.querySelector (".center")

    if (myDiv) {
  		myDiv.appendChild(newdiv);
    }
}

init();

/**
var script= document.createElement('script'); script.type= 'text/javascript'; script.src= 'http://neu.bjoernpehling.de/ppmcheck/handball/database.js'; document.head.appendChild(script);


Konsole öffnen:
http://s1.directupload.net/images/131209/36752ebe.png

Text einfügen:
http://s14.directupload.net/images/131209/pfegxjh6.png

=> Ausführen und Konsole schließen

*/