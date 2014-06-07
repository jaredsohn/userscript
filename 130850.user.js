// ==UserScript==
// @name           yah's Helper
// @include        http://*
// @include        https://*

// @require            https://ajax.googleapis.com/ajax/libs/jquery/1.5.0/jquery.min.js
// @require            https://ajax.googleapis.com/ajax/libs/jqueryui/1.8.9/jquery-ui.min.js
// @resource        jqueryUIcss    http://ajax.googleapis.com/ajax/libs/jqueryui/1.8.17/themes/redmond/jquery-ui.css

// version        0.1.0 13 Apr 2012
// ==/UserScript==

//Keycode for '*' key on number pad = 106

document.onkeydown = function(ev) {
	var key;
	ev = ev || event;
	key = ev.keyCode;
	if (key == 106) {
		//alert("That's the go button!");
		var inp = prompt("Command");
		
		//Check for reserver word:
		switch(inp){
			case "":
				break;
			case "book":
				var val = window.location.toString();
				var sc = prompt("Shortcut");
				GM_setValue("yahshelper_key_" + sc, val);
				break;
			case "new":
				//alert("new");
				var sc = prompt("Shortcut");
				var val = prompt("Value", "Value");
				GM_setValue("yahshelper_key_" + sc, val);
				break;
				
			default:
				//Check for Key/Value
				try{
					//alert(GM_getValue("yahshelper_key_" + inp));
					var val = GM_getValue("yahshelper_key_" + inp);
					if (val == undefined || val == null || val == ""){
						alert("unknown command");
					} else {
						window.location = val;
					}
				} catch(e) {*
					alert("unknown command");
				}
				break;
		}
	} else {//alert("Key: " + key);
	}
}

function shortcut_get(){
	
}
function shortcut_set(){
	
}