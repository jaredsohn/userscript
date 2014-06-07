// ==UserScript==
// @name          oRead
// @namespace     http://oread.tk
// @description   Autoscrolling for no-hand reading.
// @include       *
// ==/UserScript==

var oread_i= 1;
var interval;
var started;
document.body.innerHTML = document.body.innerHTML + "<div id='bar' style='z-index:99999999999999999999999999;position: fixed; top: 0px; left: 0px; background-color: #DDD; padding: 5px 5px 5px 5px;'></div>";
var bar = document.getElementById("bar");

function codigo(caracter) { letra = caracter.which || event.keyCode; return letra; }

function oread(caracter) {
	if (codigo(caracter) == 111) {
		started = true;
		UpdateBar();
		Scroll();
	}

	if (started === true) {
		if (codigo(caracter) == 119) { //W Pressed
			console.log(119);
			oread_i = oread_i+ 1;
			interval = Scroll();
		}
 
		if (codigo(caracter) == 115) { //S Pressed
			console.log(115);
			oread_i = oread_i- 1;
			interval = Scroll();
		}

		if (codigo(caracter) == 113) { //Q pressed
			console.log(113);
			oread_i = 0;
			Scroll();
			bar.innerHTML = "";
		}
	}

	console.log("Pressed "+caracter.which);
}

function Scroll() {
	window.clearInterval(interval);
	UpdateBar();
	return window.setInterval(function() { window.scrollBy(0,oread_i); }, 75);
}

function UpdateBar() {
	bar.innerHTML = 'Scrolling '+oread_i+'. W -> Faster, S -> Slower. Q -> Quit.';
	return oread_i;
}

window.onkeypress = oread;