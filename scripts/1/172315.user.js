// ==UserScript==
// @name        P2WFF
// @namespace   P2WFF
// @include     http://bladesoflegends.com/
// @include     http://www.bladesoflegends.com/
// @version     1
// ==/UserScript==

// Started at 02:31
// Finished at 02: 45

var r;
var started = false;

Tie = function () { }

Tie.id = function (w) {
	return document.getElementById(w);
}

Tie.start = function () {
	clearTimeout(r);
	
	if (Tie.id("loadInventoryFromTown")) {
		Tie.id("loadBattle").click();
		r = setTimeout(function () { Tie.start(); }, 1500);
	} else {
		if (Tie.id("BattleSubmit") && started == false) {
			Tie.id("BattleSubmit").click();
			started = true;
		} else {
			if (Tie.id("ActionTimerCounter")) {
				var time = Tie.id("ActionTimerCounter").innerHTML;
				
				if (time <= 0 && time != "") {
					Tie.id("BattleAgain").click();
				}
			}
		}
		
		if (Tie.id("CaptchaPassword")) {
			started = false;
			alert("Botcheck");
		} else {
			r = setTimeout(function () { Tie.start(); }, 500);
		}
	}
	
	Tie.id("chatMessage").focus();
	Tie.id("showAttributes").checked = false;
	
}

window.onload = function () {
	var go = document.createElement('input');
		go.setAttribute('type','submit');
		go.addEventListener("click", Go, false);
		go.value = "Start/Stop";	
		go.style.width = "100px";			
		go.style.position = "absolute";			
		go.style.top = "1px";			
		go.style.left = "1px";			
		Tie.id("navigation").appendChild(go);
		
}

function Go() {
	if (started == true) {
		clearTimeout(r);
		started = false;
	} else {
		Tie.start();
	}

}