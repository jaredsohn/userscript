// ==UserScript==
// @name           Chat Alleanza
// @namespace      ajdedja
// @include        http://*.ogame.*/game/index.php?page=*
// ==/UserScript==


	//-----------------------------------------------
	//  BUTTON
	//-----------------------------------------------

	function addButton()
                { 
		var buttonPosition = document.getElementById("links");
		if(!buttonPosition) 
		{
			return;
		}

		var button = document.createElement("li");
                button.onclick = 'window.open("www.google.com","","scrollbars=1,width="600",height="600",top="0",left="0""); return false;';
		button.innerHTML = '<span class="menu_icon" id="IconeScript"><img src="http://img810.imageshack.us/img810/3261/imgestionscript.png" ></span/><a href="" class="menubutton"><span class="textlabel">Chat Jedi</span></a>';
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