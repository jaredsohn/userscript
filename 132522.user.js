// ==UserScript==
// @name           Tetris Friends Adblocker
// @namespace      Jaime Derrez
// @include        http://*tetrisfriends.com*
// ==/UserScript==
//Werkend getest in Firefox en Chrome.

//VERSION
var currentVersion = 102;


//ACTION: KILL ALL THE ADS!
var delay = 200; //seems legit
var log = setTimeout("document.getElementsByClassName('game_loading game_loading_Battle2P')[0].innerHTML=''; document.getElementsByClassName('game_loading game_loading_Battle2P')[0].style.display='none'; document.getElementsByClassName('game_container')[0].style.height='auto'; document.getElementById('contentFlash').style.visibility='visible'; document.getElementById('rail_left').innerHTML=''; document.getElementById('rail_right').innerHTML='';", delay);


//SERVER REQUEST: NEW VERSION?
var scriptURL = "http://userscripts.org/scripts/show/132522";

var ping = GM_xmlhttpRequest({
	method: 'GET',
	url: 'http://userscripts.jaimederrez.nl/tetris/ping.php',
	headers:
	{
		'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
		'Accept': 'text/html',
	},
	onload: function(responseDetails)
	{
		var latestVersion = responseDetails.responseText;
		if (latestVersion > currentVersion) {
			//request user to update the userscript
			var updateMsgNL = "Language: <img src='http://userscripts.jaimederrez.nl/tetris/img/nl.png'><div style='background-color:white; border: 1px solid black; text-align: left;'><span style='color: red; font-weight: bold;'>Update beschikbaar voor de Tetris Friends-adblocker!</span><br/><br/>U gebruikt momenteel de verouderde versie "+currentVersion/100+" hoewel versie "+latestVersion/100+" al uit is. Het wordt u aangeraden aan om te updaten en zo de vervelende advertenties weg te houden.<br/><br/><b>Hoe update ik?</b><br/> 1. <a href='"+scriptURL+"'>Ga naar installatiepagina.</a><br/>2. Druk nogmaals op de grote groene knop 'Install'.<br/>3. Uw browser vraagt toestemming om de plug-in te installeren. Sta dit toe. U heeft nu succesvol de nieuwste versie geïnstalleerd van de Tetris Friends-adblocker.<br/><br/>Bedankt voor het gebruiken van de Tetris Friends-adblocker</div>";
			var updateMsgEN = "Language: <img src='http://userscripts.jaimederrez.nl/tetris/img/gb.png'><div style='background-color:white; border: 1px solid black; text-align: left;'><span style='color: red; font-weight: bold;'>Update available for the Tetris Friends Adblocker!</span><br/><br/>You are currently using the outdated version "+currentVersion/100+" however version "+latestVersion/100+" had already been released. You are recommended to update and keep those annoying ads away.<br/><br/><b>How to update?</b><br/>1. <a href='"+scriptURL+"'>Visit the installation page.</a><br/>2. Click on the big green button saying 'Install'.<br/>3. Your web browser will ask permission to install the plug-in. Accept this. You now have succesfully installed the newest version of the Tetris Friends Adblocker.<br/><br/>Thanks for using the Tetris Friends Adblocker.</div>";
			document.getElementById('rail_left').innerHTML=updateMsgEN;
			document.getElementById('rail_right').innerHTML=updateMsgNL;
		}
		else {
			//nothing to do here
		}

	}
});