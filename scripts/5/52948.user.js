// ==UserScript==
// @name           TW Kaart Bewegen met toetsen
// @namespace      Tribal Wars
// @description    Bletnieehjom ( Gioachino ) & OVI ownenn
// @include        http://nl*.tribalwars.nl/game.php*screen=map*
// ==/UserScript==

function setCookie(name,value,expires){ // expires ist eine Angabe in Tagen, in denen der Cookie gelöscht werden soll.
	var now = new Date();
	now.setTime(now.getTime() + (expires*24*60*60*1000));
	now = now.toGMTString();
	document.cookie = name+"="+value+";expires="+now;
}
function getCookie(name){
	var cookies = document.cookie.split(";");
	var value = null;
	for(var i in cookies){
		var cook = cookies[i].split("=");
		if(cook[0].substr(1) == name){
			value = cook[1];
			break;
		}
	}
	return value;
}
function deleteCookie(name){
	document.cookie = name+"=;expires=Thu, 01-Jan-70 00:00:01 GMT";
}

//(function(){
var cook_left = getCookie("left_ASCII");
var cook_right = getCookie("right_ASCII");
var cook_up = getCookie("up_ASCII");
var cook_down = getCookie("down_ASCII");

var MSG_LEFT = "Druk op OK en dan de knop voor naar het Westen te gaan.";
var MSG_RIGHT = "Druk op OK en dan de knop voor naar het Oosten te gaan.";
var MSG_UP = "Druk op OK en dan de knop voor naar het Noorden te gaan.";
var MSG_DOWN = "Druk op OK en dan de knop voor naar het Westen te gaan.";

if(!(cook_left && cook_right && cook_up && cook_down)){
	var check = confirm("De toetsen voor het navigeren op de kaart instellen.
OVI Pownd btw!");
	if(check){
		var left_ASCII, right_ASCII, up_ASCII, down_ASCII;
		alert(MSG_LEFT);
		left_ASCII = true;
		document.addEventListener("keypress",function(event){
			var key = event.which.toString();
			if(!key){ alert("De toets kan niet gelezen worden, gebruik een andere."); return; }
			
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
				alert("De toetsen zijn geïmporteerd.");
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
	}
}
else{
	var left = cook_left;
	var right = cook_right;
	var up = cook_up;
	var down = cook_down;
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
//})();







