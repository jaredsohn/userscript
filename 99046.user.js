// ==UserScript==
// @name           Wheel/Party/Tsuki/Darts
// @namespace      Conster
// @description    For all your loop and tsukiball needs
// @include        http://www.animecubed.com/billy/bvs/partyhouse.html
// ==/UserScript==

function process_event(event) {
	if (event.keyCode == 49) {		//1 - regular spin, Karaoke, throw darts 1x, 1 tsuki-game
		if (document.forms.namedItem("raf")) {					//We're at the wheel
			document.forms.namedItem("raf").submit();
		} else if (document.forms.namedItem("dgame")) { 			//Darts
			throw_darts();
		} else if (document.forms.namedItem("pr")) { 				//Party Room
			party("Karaoke");							//Karaoke
		} else if (document.forms.namedItem("skib")) {				//Tsukiball
			throw_ball();
		}
	} else if (event.keyCode == 50) {		//2 - 'Research' Expedition
		if (document.forms.namedItem("pr")) { 					//Party Room
			party("Research");							//'Research' Expedition
		}
	} else if (event.keyCode == 51) {		//3 - cheat-spin, All-Out Bash, throw darts 10x, MegaGame Tsuki
		if (document.forms.namedItem("raf")) {					//We're at the wheel
			var checkthis = document.evaluate("//input[@name='seasonbribe' and @value='go']", document, null,
			 XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue
			if(checkthis != null) {		checkthis.checked = true;	}
			document.forms.namedItem("raf").submit();
		} else if (document.forms.namedItem("dgame")) { 			//Darts
			var checkthis = document.evaluate("//input[@name='megadart' and @value='1']", 
					 document, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue
			if(checkthis != null) {
				checkthis.checked = true;
			}
			throw_darts();
		} else if (document.forms.namedItem("pr")) { 				//Party Room
			party("Bash");								//All-Out Bash
		} else if (document.forms.namedItem("skib")) {				//Tsukiball
			var checkthis = document.evaluate("//input[@name='megatsuki' and @value='1']",
					 document, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue
			if(checkthis != null) {
				checkthis.checked = true;
			}
			throw_ball();
		}
	}
}

function throw_darts() {
	var options = document.forms.namedItem("dgame").elements;
	if(options != null) {
		for(var i=0; i<options.length; i++) {
			if (options[i].value == "Kunai") {			//Throwing Kunai
				//change to "Poison Needles", "Shuriken", or "Holy Arrow", if you don't like Kunai
				options[i].click();
			}
		}
	}
	document.forms.namedItem("dgame").submit();
}

function party(name) {
	var options = document.forms.namedItem("pr").elements;
	if(options != null) {
		for(var i=0; i<options.length; i++) {
			if(options[i].value==name) {			//Karaoke
				options[i].click();
			}
		}
	}
	document.forms.namedItem("pr").submit();
}

function throw_ball() {
	var options = document.forms.namedItem("skib").elements;
	if(options != null) {
		for(var i=0; i<options.length; i++) {
			if(options[i].value=="high") {		//Go For Broke
				options[i].click();
			}
		}
	}
	var checkthis = document.evaluate("//input[@name='doemall' and @value='go']",
			 document, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue
	if(checkthis != null) {		//if you can throw all balls (so you're in a game), DO IT
		checkthis.checked = true;
	}
	document.forms.namedItem("skib").submit();
}

document.documentElement.addEventListener("keyup", process_event, true);