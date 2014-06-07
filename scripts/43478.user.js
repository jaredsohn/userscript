// ==UserScript==
// @name             Zero turn script
// @namespace      http://labourissues.com
// @description    If you click the checkbox, it says "Nothing here, just us chickens!"
// @include          *charpane.php
// ==/UserScript==

var turn = document.getElementsByTagName('span');
var counter = 0;
for (var i = 0; i < turn.length; i++) {
	if (turn[i].getAttribute("class") == "black") {
		counter++; 
		if (counter == 4) { // we're looking for the fourth one, which is turns

			GM_setValue("turns",turn[i].innerHTML);
			if (GM_getValue("d_checkbox") == true) { 
				turn[i].innerHTML = "Nope, no turns here! Just us chickens!";
			}
			turn[i].parentNode.innerHTML += '<br /><input type = "checkbox" id = "turnsLeft"'+(GM_getValue("d_checkbox")?'checked':'')+'/>';;
			var checkbox = document.getElementById('turnsLeft');

			checkbox.addEventListener('click', function (){
			if (GM_getValue("d_checkbox") == true) {
				GM_setValue("d_checkbox", false);
				turn[i].innerHTML = GM_getValue("turns");

			} else {
				GM_setValue("d_checkbox", true);			
				turn[i].innerHTML = "Nope, no turns here! Just us chickens!";

			}
			}, false);
			break;
		
		}
	}
}