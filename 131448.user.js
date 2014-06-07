// ==UserScript==
// @name           Chat Alleanza
// @namespace      ajdedja
// @include        http://*.ogame.*/game/index.php?page=*
// ==/UserScript==


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
		button.innerHTML = '<span class="menu_icon" id="IconeScript"><img src="http://img810.imageshack.us/img810/3261/imgestionscript.png" ></span/><a target="_self" accesskey="" href="' + location.href + "&Scripts" + '" class="menubutton "><span class="textlabel">Chat Jedi</span></a>';
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

	var html_a_rajouter = ' <span id="headGestionScript"><center><h2>Gestione dello Script</h2></center></span>'; // 
	document.getElementById('inhalt').innerHTML = html_a_rajouter ;


	(function(){

	var elemento = document.getElementById('inhalt');  
	var titolo = document.getElementsByTagName('h2');
	titolo[0].innerHTML = 'Chat Jedi';
	var lay = document.createElement("lay");
	var chat = '<embed src="http://www.xatech.com/web_gear/chat/chat.swf" quality="high" width="650" height="405" name="chat" FlashVars="id=172305553&rl=Italian" align="middle" allowScriptAccess="sameDomain" type="application/x-shockwave-flash" pluginspage="http://xat.com/update_flash.shtml" />';
	elemento.setAttribute('style', 'height:550px;background-image:none;');
	lay.setAttribute('style', 'margin:7px;');
	lay.innerHTML = chat;
	elemento.appendChild(lay);
	})();
}
	
if (location.href.indexOf('Scripts') != -1){ 
	displayChat();
}