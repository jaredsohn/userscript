// ==UserScript==
// @name        Google Dictionary Input Enhancer
// @namespace   GDIE
// @description press your keyboard and input the character to the text box whenever you focus on anything.
// @include     http://www.google.com/dictionary?*
// @version     0.0.1
// ==/UserScript==

var targetName = 'q';
var focusing = 0;

var onloadFunction = function() {
var elem = document.getElementsByTagName('input');
var arr = new Array();
	for(i = 0,iarr = 0; i < elem.length; i++) {
		if (elem[i].getAttribute("type") != 'text') continue;
	att = elem[i].getAttribute("name");
		if(att == targetName) {
		elem[i].id = 'myTargetElement';

		var onclickFunction = function() {
		focusing = 1;
		}
		var onblurFunction = function() {
		focusing = 0;
		}
		var onkeydownFunction = function() {
			if (focusing) areturn;
		document.getElementById('myTargetElement').focus();
		focusing = 1;
		}

		elem[i].addEventListener("click", onclickFunction, true);
		elem[i].addEventListener("blur", onblurFunction, true);
		document.addEventListener("click", onblurFunction, true);
		document.addEventListener("keydown", onkeydownFunction, true);
		break;
		}
	}
}

document.addEventListener("load", onloadFunction, true);