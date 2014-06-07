// ==UserScript==
// @name           DS Karte mit Tastatur bewegen
// @namespace      Die St�mme
// @description    Erm�glicht das Bewegen der Karte mit den Pfeiltasten
// @include        http://de*.die-staemme.de/game.php*screen=map*
// @include        http://en*.tribalwars.net/game.php*screen=map*
// ==/UserScript==


function setCookie(name,value,expires){ // expires ist eine Angabe in Tagen, in denen der Cookie gel�scht werden soll.
	var now = new Date();
	now.setTime(now.getTime() + (expires*24*60*60*1000));
	now = now.toGMTString();
	document.cookie = name+"="+value+";expires="+now;
}
function getCookie(name){
	var cookies = document.cookie.split("; ");
	var value = false;
	for(var i in cookies){
		var cook = cookies[i].split("=");
		if(cook[0] == name){
			value = cook[1];
			break;
		}
	}
	return value;
}
function deleteCookie(name){
	document.cookie = name+"=;expires=Thu, 01-Jan-70 00:00:01 GMT";
}

function showLegend(left,right,up,down,language){
	left = String.fromCharCode(left);
	right = String.fromCharCode(right);
	up = String.fromCharCode(up);
	down = String.fromCharCode(down);
	var ger = (language=="german");
	
	var table = document.createElement("table");
	table.setAttribute("style","border: 1px solid; background-color: rgb(221, 204, 170); margin-left: 2px; margin-bottom:4px; width:300px");
	var tr = document.createElement("tr");
	var th = document.createElement("th");
	th.setAttribute("style","font-size:11px; font-style:italic");
	th.innerHTML = ger ? "Karte mit Tastatur bewegen" : "Move map with the keyboard";
	var td0 = document.createElement("td");
	td0.setAttribute("style","font-size:10px;");
	td0.innerHTML = '<a href="'+location.href+'&clearSettings">('+(ger ? "Bearbeiten" : "edit")+')</a>';
	tr.appendChild(th);
	tr.appendChild(td0);
	table.appendChild(tr);
	
	var tr2 = document.createElement("tr");
	var tr3 = document.createElement("tr");
	for(var i=1;i<=4;i++){
		eval('var td'+i+' = document.createElement("td")');
		eval('td'+i+'.setAttribute("style","font-size:10px")');
	}
	td1.innerHTML = (ger ? "Norden" : "North")+": <strong>"+up+"</strong>";
	td2.innerHTML = (ger ? "Osten" : "east")+": <strong>"+right+"</strong>";
	td3.innerHTML = (ger ? "S&uuml;" : "South")+": <strong>"+down+"</strong>";
	td4.innerHTML = (ger ? "Westen" : "west")+": <strong>"+left+"</strong>";
	tr2.appendChild(td1);
	tr2.appendChild(td2);
	tr3.appendChild(td3);
	tr3.appendChild(td4);
	table.appendChild(tr2);
	table.appendChild(tr3);
	
	var lgTable = document.getElementsByTagName("table");
	lgTable = lgTable[lgTable.length-1];
	lgTable.parentNode.insertBefore(table,lgTable);
}

function clearSettings(){
	deleteCookie("left_ASCII");
	deleteCookie("right_ASCII");
	deleteCookie("up_ASCII");
	deleteCookie("down_ASCII");
	deleteCookie("language");
	location.href = location.href.substr(0,location.href.indexOf("clearSettings"));
}

(function(){
if(location.href.match(/clearSettings/)){
	clearSettings();
	return;
}

var cook_left = getCookie("left_ASCII");
var cook_right = getCookie("right_ASCII");
var cook_up = getCookie("up_ASCII");
var cook_down = getCookie("down_ASCII");
var language = getCookie("language");

if(!language){
	alert("Bitte w�hle deine Sprache!\n\nPlease select your language!");
	var german = confirm("Sprichst du Deutsch?\n(Dr�cke Abbrechen, um Englisch zu w�hlen)\n\nDo you speak German?\n(Press Cancel to select English)");
	setCookie("language",(german ? "german" : "english"));
	language = getCookie("language");
}

if(language == "german"){	// Deutsch
	var MSG_LEFT = "Bitte dr�cke nach dem Klick auf OK die gew�nschte Taste f�r eine Bewegung der Karte nach Westen.";
	var MSG_RIGHT = "Bitte dr�cke nach dem Klick auf OK die gew�nschte Taste f�r eine Bewegung der Karte nach Osten.";
	var MSG_UP = "Bitte dr�cke nach dem Klick auf OK die gew�nschte Taste f�r eine Bewegung der Karte nach Norden.";
	var MSG_DOWN = "Bitte dr�cke nach dem Klick auf OK die gew�nschte Taste f�r eine Bewegung der Karte nach S�den.";
	var CONF_KEYS = "Karte mit Tastatur bewegen\n\nEs werden jetzt die Tasten f�r das Bewegen der Karte konfiguriert.\nKlicke auf Abbrechen, um die Standard-Tasten (w,d,s und a) zu verwenden.";
	var KEY_ERROR = "Die Taste konnte nicht eingelesen werden, bitte benutze eine andere.";
	var KEY_SUCCES = "Die Tasten wurden erfolgreich eingelesen.";
}
else{					//Englisch
	var MSG_LEFT = "After you pressed OK, please hit the key you want for a movement of the map to the west.";
	var MSG_RIGHT = "After you pressed OK, please hit the key you want for a movement of the map to the east.";
	var MSG_UP = "After you pressed OK, please hit the key you want for a movement of the map to the north.";
	var MSG_DOWN = "After you pressed OK, please hit the key you want for a movement of the map to the south.";
	var CONF_KEYS = "Move map with the keyboard\n\nThe keys for moving the map are now set.\nPress Cancel to use the standard-keys (w,d,s and a).";
	var KEY_ERROR = "The key couldn't be recognized. Please use another one.";
	var KEY_SUCCES = "The keys have been recognized succesfully.";
}

if(!(cook_left && cook_right && cook_up && cook_down)){
	var check = confirm(CONF_KEYS);
	if(check){
		var left_ASCII, right_ASCII, up_ASCII, down_ASCII;
		alert(MSG_LEFT);
		left_ASCII = true;
		document.addEventListener("keypress",function(event){
			var key = event.which.toString();
			if(key==0){ alert(KEY_ERROR); return; }
			
			if(left_ASCII===true){
				left_ASCII = key;
				right_ASCII = true;
				alert(MSG_RIGHT);
			}
			else if(right_ASCII===true){
				right_ASCII = key;
				up_ASCII = true;
				alert(MSG_UP);
			}
			else if(up_ASCII===true){
				up_ASCII = key;
				down_ASCII = true;
				alert(MSG_DOWN);
			}
			else if(down_ASCII===true){
				down_ASCII = key;
				alert("Die Tasten wurden erfolgreich eingelesen.");
				setCookie("left_ASCII",left_ASCII,150);
				setCookie("right_ASCII",right_ASCII,150);
				setCookie("up_ASCII",up_ASCII,150);
				setCookie("down_ASCII",down_ASCII,150);
				location.href = location.href;
			}
			else;
		},false);
	}
	else{
		setCookie("left_ASCII","97",10);
		setCookie("right_ASCII","100",10);
		setCookie("up_ASCII","119",10);
		setCookie("down_ASCII","115",10);
		location.href = location.href;
	}
}
else{
	var left = cook_left;
	var right = cook_right;
	var up = cook_up;
	var down = cook_down;
	showLegend(left,right,up,down,language);
	document.addEventListener("keypress",function(event){
		var key = event.which.toString();
		switch(key){
			case left: location.href = "javascript:startMapScroll('west')"; break;
			case right: location.href = "javascript:startMapScroll('east')"; break;
			case up: location.href = "javascript:startMapScroll('north')"; break;
			case down: location.href = "javascript:startMapScroll('south')"; break;
			default: break;
		}
	},false);
}
})();


