// ==UserScript==
// @name           OGame - Chat GT-R
// @author         THORMENTA GT - ogame.com.es 
// @include        http://uni113.ogame.com.es/game/index.php?page=*
// arroba include        http://*.ogame.com.es/game/index.php?page=networkkommunikation*
// ==/UserScript==
// Versión 1.0

var url = location.href;

	//-----------------------------------------------
	//  BUTTON
	//-----------------------------------------------
	function addButton(){ 
		var buttonPosition = document.getElementById("links");
		if(!buttonPosition) 
		{
			return;
		}

		var button = document.createElement("li");
		button.innerHTML = '<span class="menu_icon" id="IconeScript"><img src="http://img810.imageshack.us/img810/3261/imgestionscript.png" ></span/><a target="_self" accesskey="" href="' + location.href + "&Scripts" + '" class="menubutton "><span class="textlabel">Chat GT-R</span></a>';
		buttonPosition = document.getElementById("links").getElementsByTagName("ul")[0].getElementsByTagName("li")[10];
		insertAfter(button, buttonPosition);
	}
	
	//-----------------------------------------------
	// INSERT BUTTON
	//-----------------------------------------------
	function insertAfter(elem, after){
		var dad = after.parentNode;
		if(dad.lastchild == after)
			dad.appendChild(elem);
		else 
			dad.insertBefore(elem, after.nextSibling);
	}
	
	if(!document.getElementById('IconeScript')){
		addButton();
	}
	
	//-----------------------------------------------
	// INSERT CHAT
	//-----------------------------------------------
function displayChat(){

	var html_a_rajouter = ' <span id="headGestionScript"><center><h2>Gestionnaire des Scripts</h2></center></span>'; // 
	document.getElementById('inhalt').innerHTML = html_a_rajouter ;


	(function(){

	var elemento = document.getElementById('inhalt');  
	var titulo = document.getElementsByTagName('h2');
	titulo[0].innerHTML = 'GT-R Chat';
	var p = document.createElement("p");
	var chat = '<embed wmode="transparent" src="http://www.xatech.com/web_gear/chat/chat.swf" quality="high" width="660" height="500" name="chat" FlashVars="id=150987744&rl=Argentina" align="middle" allowScriptAccess="sameDomain" type="application/x-shockwave-flash" pluginspage="http://xat.com/update_flash.shtml" /><br><small><a target="_BLANK" href="http://xat.com/web_gear/?cb">Get your own Chat Box!</a> <a target="_BLANK" href="http://xat.com/web_gear/chat/go_large.php?id=150987744">Go Large!</a></small><br>';
	elemento.setAttribute('style', 'height:550px;background-image:none;');
	p.setAttribute('style', 'margin:7px;');
	p.innerHTML = chat;
	elemento.appendChild(p);
	})();
}
	
if (location.href.indexOf('Scripts') != -1){ 
	displayChat();
}	