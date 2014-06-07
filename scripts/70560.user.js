// ==UserScript==
// @name           	OBGHelper - Ally Chat
// @namespace     	http://userscripts.org/scripts/show/69252
// @description    	Jou directe link met je alliantie op de irc server van GF
// @author			Nightlion & JosDaBosS
// @include        	http://s*.bitefight.nl/bite/ally.php
// @include         http://s*.bitefight.nl/bite/uebersicht.php
// @include         http://s*.bitefight.nl/bite/einstellungen.php
// @exclude        	http://board.ikariam.*/*
//
// @require             http://userscripts.org/scripts/source/57756.user.js
//
// @version             0.2
// @history             0.2 Auto-update
// @history             0.1 First release
// ==/UserScript==

ScriptUpdater.check(70560, "0.2");


var gameServer = top.location.host;
var gameServerParts = gameServer.split(".");
var serverName = gameServerParts[0];
var community = gameServerParts[1] + '-' + gameServerParts[2];

if(gameServerParts[2] == "nl"){
var InfoChat = "Het standaard kanaal is de alliantie tag aangevuld met de server. Mocht jouw alliantie een ander kanaal gebruiken dan kun je deze hier veranderen. Wil je een Kanaalbeheer bot in het kanaal hebben dan raden wij de standaardnaam aan: '[alliantie tag]-[wereld]'. Bijvoorbeeld: #test-alpha"
var Vampire = "Vampier"
var Werewolf = "Weerwolf"
var Alliance = "Alliantie"
}
if(gameServerParts[2] == "us"){
var InfoChat = "The standard channel is the alliance tag combined with the server name. If your alliance uses a other channel you can change it here. If you want a channel-management bot like chanserv we recommend: '[alliance tag]-[server name]'. For example: #test-alpha"
var Vampire = "Vampire"
var Werewolf = "Werewolf"
var Alliance = "Clan"
}



function nameserverName(){
	switch(serverName){
		case "s666" :
			return "test";
		case "s1" :
			return "alpha";
		case "s2" :
			return "beta";
		case "s3" :
			return "gamma";
		case "s4" :
			return "delta";
		case "s5" :
			return "epsilon";
		case "s6" :
			return "zeta";
		case "s7" :
			return "eta";
		case "s8" :
			return "theta";
		case "s9" :
			return "lota";
		case "s10" :
			return "kappa";
		case "s11" :
			return "lambda";
		case "s12" :
			return "my";
		case "s13" :
			return "ny";
		case "s14" :
			return "xi";
	}
}

function addbuttons() {
	tbodys = document.getElementById("content");
	buttons = '<br><center><input type="button" class="button" id="btn1" name="btn1" value="Chat Now!" onclick=window.open("' + chat + '") />  <input type="button" class="button" id="btn2" name="btn2" value="Trainer Forum" onclick=window.open("http://trainer.jinamoja.nl/index.php") /></center>';
	split = tbodys.innerHTML.split("</table></p>");
	document.getElementById("content").innerHTML = split[0]+split[1]+buttons+"</table></p>"+split[2]+split[3]+split[4];
}

function addoptions() {
	tbodys = document.getElementById("content");
	options = '<br><h2><a href="http://userscripts.org/scripts/show/69252" target="_blank">OBGHelper - ally chat</a></h2><center><p>Ally Chat: <input class="textfield" style="width: 120px;" type="text" id="AllyChatValue" value="' + GM_getValue('OBGAlly'+serverName,'OBGAlly') + '"></p></center><p>' + InfoChat + '</p><p><div class="centerButton"><input type = "button" class="button" id="saveOptions" value="Save"></div></p>';
	split = tbodys.innerHTML.split("</textarea></p>");
	document.getElementById("content").innerHTML = split[0]+"</textarea></p>"+options+split[1]+"</textarea></p>"+split[2];
	//Add button event
	document.getElementById('saveOptions').addEventListener('click', function ()
	{
	  GM_setValue('OBGAlly'+serverName, document.getElementById('AllyChatValue').value);
	  //change text to option page
	  document.getElementById('AllyChatValue').innerHTML = GM_getValue('OBGAlly'+serverName,'OBGAlly');
	  document.getElementById('AllyChatValue').focus();
	}, false);
}

if(String(document.URL).indexOf("/bite/ally.php") >= 0) {
	if(GM_getValue('OBGAlly'+serverName,'OBGAlly')=='OBGAlly'){
		string = String(document.getElementById('content').getElementsByTagName('h2')[0].innerHTML);
		if(string.indexOf(Alliance)!=-1) {
			GM_setValue('OBGAlly' + serverName, string.slice(string.indexOf("[")+1,string.indexOf("]")) + "-" + nameserverName());
		}
	}
	if(GM_getValue('OBGUser'+serverName,'OBGUser')=='OBGUser'){
		GM_openInTab("http://"+ gameServer + "/bite/uebersicht.php");
	}
	else{
		var chat = "http://trainer.jinamoja.nl/chats/ikariamNL.php?nick=" + GM_getValue('OBGUser'+serverName,'OBGUser') + "&ally=" + GM_getValue('OBGAlly'+serverName,'OBGAlly') + "&com=" + community;
		addbuttons();
	}
}

if(String(document.URL).indexOf("/bite/uebersicht.php") >= 0) {
	if(GM_getValue('OBGAlly'+serverName,'OBGAlly')=='OBGAlly'){
		GM_openInTab("http://"+ gameServer + "/bite/ally.php");
	}
	if(GM_getValue('OBGUser'+serverName,'OBGUser')=='OBGUser'){
		string = String(document.getElementById('keyinfo').getElementsByTagName('h2')[0].innerHTML);
		if(string.indexOf(Werewolf)!=-1 || string.indexOf(Vampire)!=-1) {
			GM_setValue('OBGUser' + serverName, string.slice(string.indexOf(" ")+1));
		}
	}
}

if(String(document.URL).indexOf("/bite/einstellungen.php") >= 0) {
	if(GM_getValue('OBGUser'+serverName,'OBGUser')=='OBGUser'){
		GM_openInTab("http://"+ gameServer + "/bite/uebersicht.php");
	}
	if(GM_getValue('OBGAlly'+serverName,'OBGAlly')=='OBGAlly'){
		GM_openInTab("http://"+ gameServer + "/bite/ally.php");
	}
	else{
		var chat = "http://trainer.jinamoja.nl/chats/ikariamNL.php?nick=" + GM_getValue('OBGUser'+serverName,'OBGUser') + "&ally=" + GM_getValue('OBGAlly'+serverName,'OBGAlly');
		addoptions();
	}
}