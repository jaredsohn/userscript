// ==UserScript==
// @name        Map Maker "delete point" hotkey
// @description Allows quick removal of selected point in the line or shape. Just right click the point and press DELETE. 
// @namespace	bozar
// @include		http://www.google.com/mapmaker*
// @include		http://www.google.pl/mapmaker*
// @version		1.0.2
// @require		https://ajax.googleapis.com/ajax/libs/jquery/1.8.1/jquery.min.js
// @grant		none
// ==/UserScript==

// menu item search routine
$("#map").bind("contextmenu",function(e){
	var intervalID;
	var found = false;
	intervalID = setInterval(function(){
	// console.log("timeout elapsed");
	if(found) return;
		var item = $(".menuitem[cad='src:gw-contextmenu-findfeature']").parent().children().first();
		if(item.length == 1){
			found = true;
			// console.log("menu item found");
			$(document).bind("keydown", bindHotkey);
			// console.log("hotkey bound");
			clearInterval(intervalID);
		}
	}, 50);
});
// console.log("mouse event bound");

// handler for the delete key
function bindHotkey(e){
	// console.log("key pressed: " + e.keyCode);
	if(e.keyCode == 46){
		$(".menuitem[cad='src:gw-contextmenu-findfeature']").parent().children().first().click();
		// console.log("target clicked");
	}
	$(document).unbind("keydown", bindHotkey);
	// console.log("hotkey unbound");
}