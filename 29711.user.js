// ==UserScript==
// @name           identi.send
// @namespace      http://brightbyte.de/gm/ 
// @description    On identi.ca, send message on hitting <enter>. Who needs multi-line messages anyway?
// @include        http://identi.ca/*
// ==/UserScript==

identiSend = {
	field: document.getElementById("status_textarea"),
	button: document.getElementById("status_submit"),
	counter: document.getElementById("counter"),

	keyPressHandler: function (event) {
		if ( event.keyCode == 13 && identiSend.checkCounter() ) {
			if ( !identiSend.counter.innerHTML.match(/^-/) ) {
				identiSend.button.click();
				return false;
			}
		} else {
			return true;
		}
	},

	inputHandler: function (event) {
		identiSend.checkCounter();
		return true;
	},

	checkCounter: function () {
		if ( identiSend.counter.innerHTML.match(/^-/) ) {
			identiSend.counter.style.color = "#DD0000";
			identiSend.field.style.backgroundColor = "#FFCCCC";
			return false;
		} else {
			identiSend.counter.style.color = identiSend.origCounterColor;
			identiSend.field.style.backgroundColor = identiSend.origFieldBackground;
			return true;
		}
	}
}

if ( identiSend.field && identiSend.button ) {
	identiSend.origCounterColor = identiSend.counter.style.color;
	identiSend.origFieldBackground = identiSend.field.style.backgroundColor;

	identiSend.field.addEventListener('keypress', identiSend.keyPressHandler, false);
	identiSend.field.addEventListener('keyup', identiSend.inputHandler, false);
	identiSend.button.style.border = "2px solid red";
}
