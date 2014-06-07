// ==UserScript==
// @name           	rip-lyd.ativoforum
// @namespace     	rip-lyd.ativoforum
// @description    	forum/chat
// @author			FallenAngell
// @include        	http://s15.br.kingsage.*&s=ally
// @include        	http://s15.br.kingsage.*&m=overview
// @include         http://s15.b5.kingsage.*&s=profile
// @include         http://s15.b5.kingsage.*&m=profile
// ==/UserScript==

var gameServer = top.location.host;
var gameServerParts = gameServer.split(".");
var serverName = gameServerParts[0];
//var community = gameServerParts[1] + '-' + gameServerParts[2];
var InfoChat = "";
if(gameServerParts[2] == "nl"){
InfoChat = "Het standaard kanaal is de alliantie tag aangevuld met de server. Mocht jouw alliantie een ander kanaal gebruiken dan kun je deze hier veranderen. Wil je een Kanaalbeheer bot in het kanaal hebben dan raden wij de standaardnaam aan: '[alliantie tag]-[wereld]'. Bijvoorbeeld: #test-alpha"
}
else{
InfoChat = "The standard channel is the alliance tag combined with the server name. If your alliance uses a other channel you can change it here. If you want a channel-management bot like chanserv we recommend: '[alliance tag]-[server name]'. For example: #test-alpha"
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
tbodys = document.getElementsByClassName("contentpane")[1]; 
buttons = '<td><img src="http://s1.kingsage.nl/img/tabs/menue_n_left.png" ></td><td background="http://s1.kingsage.nl/img/tabs/menue_n_back.png"><a href='+chat+' target="_blank">Reservas</a></td><td><img src="http://s1.kingsage.nl/img/tabs/menue_n_right.png" ></td><td background="http://s1.kingsage.nl/img/tabs/menue_n_back.png"><a href="" target="_blank"></a></td>'; 
split = tbodys.innerHTML.split("</tr></tbody></table></div><br>"); 
document.getElementsByClassName("contentpane")[1].innerHTML = split[0]+buttons+'</tr></tbody></table></div><br><div id="_mg_div"> '+ 
'<iframe type="text/javascript" src="http://rip-lyd.ativoforum.com/forum" height="650px" width="800px"></iframe>' 
+' </div>'+split[1]; 
}

function addoptions() {
	tbodys = document.getElementsByClassName("contentpane")[1];
	options = '<table class="borderlist" style="width:500px;"><tr><th colspan="2">OBGHelper - ally chat</a></th></tr><tr><td><input name="ally_chat" id="AllyChatValue" value="' + GM_getValue('OBGAlly'+serverName,'OBGAlly') + '" /> <input type="submit" class="button" id="saveOptions" value="OK" /></td></tr></table>';
	document.getElementsByClassName("contentpane")[1].innerHTML = tbodys.innerHTML+options;
	//Add button event
	document.getElementById('saveOptions').addEventListener('click', function ()
	{
	  GM_setValue('OBGAlly'+serverName, document.getElementById('AllyChatValue').value);
	  //change text to option page
	  document.getElementById('AllyChatValue').innerHTML = GM_getValue('OBGAlly'+serverName,'OBGAlly');
	  document.getElementById('AllyChatValue').focus();
	}, false);
}

if(String(document.URL).indexOf("&s=ally") >= 0 || String(document.URL).indexOf("&m=overview") >= 0) {
	if(GM_getValue('OBGAlly'+serverName,'OBGAlly')=='OBGAlly'){
		string = String(document.getElementsByClassName('contentpane')[1].getElementsByTagName('h1')[0].innerHTML);
			GM_setValue('OBGAlly' + serverName, string + "-" + nameserverName());
	}
	if(GM_getValue('OBGUser'+serverName,'OBGUser')=='OBGUser'){
		namestring = String(document.getElementById('settlement').innerHTML);
		GM_setValue('OBGUser'+serverName, namestring.split("|")[2].split(" ")[0]);
	}
	var chat = "http://rip-lyd.ativoforum.com/f2-reservas" + GM_getValue('OBGUser'+serverName,'OBGUser') + "&ally=" + GM_getValue('OBGAlly'+serverName,'OBGAlly');
	addbuttons();
}

if(String(document.URL).indexOf("&s=profile") >= 0 || String(document.URL).indexOf("&m=profile") >= 0) {
	if(GM_getValue('OBGUser'+serverName,'OBGUser')!='OBGUser' && GM_getValue('OBGAlly'+serverName,'OBGAlly')!='OBGAlly'){
		var chat = "http://rip-lyd.ativoforum.com/f2-reservas" + GM_getValue('OBGUser'+serverName,'OBGUser') + "&ally=" + GM_getValue('OBGAlly'+serverName,'OBGAlly');
		addoptions();
	}
}



