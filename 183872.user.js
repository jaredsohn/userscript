// ==UserScript==
//
//Displayable Name of your script 
// @name           My First Script 
//
// brief description
// @description    Test   
//
//
// Your name, userscript userid link (optional)   
// @author         errday
//
//
//Version Number
// @version        1.5
//
// Urls process this user script on
// @include        http://*
//
// Add any library dependencies here, so they are loaded before your script is loaded.
//
// @require        https://ajax.googleapis.com/ajax/libs/jquery/1.9.0/jquery.min.js
//
// @history        1.5 again
// @history        1.4 current version
// @history        1.3 123 version
// @history        1.2 456 version
// @history        1.1 789 version
// @history        1.0 first version
// 
//
// ==/UserScript==


//And of course your code!!
 // Or you could call it "key"
 
 
var map = [];

document.addEventListener("keydown", keypress, false);

function keypress(e){
    e = e || event; // to deal with IE
    map[e.keyCode] = e.type == 'keydown';
    /*insert conditional here*/
	if(map[17] && map[16] && map[65])
	{ // CTRL+SHIFT+A
		alert('Control Shift A');
	}
	else 
		if(map[17] && map[16] && map[66])
	{ // CTRL+SHIFT+B
		alert('Control Shift B');
	}
	else 
		if(map[17] && map[16] && map[67])
	{ // CTRL+SHIFT+C
		alert('Control Shift C');
	}
}
