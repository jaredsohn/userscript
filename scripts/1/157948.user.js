// ==UserScript==
// @name           Horloge
// @namespace      Orandin
// @description    Ajoute une horloge sur l'interface des RR
// @include        http://www.lesroyaumes.com/*
// ==/UserScript==

function Horloge() 
{
	Jour = new Date;
	Horloge = showFilled(Jour.getHours()) + ":" + showFilled(Jour.getMinutes()) + ":" + showFilled(Jour.getSeconds());
	if(DOMHorloge = document.getElementById('OrandinJSHorloge')) {
		DOMHorloge.innerHTML = Horloge;
	}
	else {
		CreationHorloge();
	}
}
function CreationHorloge() {
	if ( DOM = document.querySelector("div.horloge > div")) {
		DOM.innerHTML += '–<span id="OrandinJSHorloge" style="color: #E7B965;">'+Horloge+'</span>';
	}
}

function showFilled(Value) {
	return (Value > 9) ? "" + Value : "0" + Value;
}

setInterval(Horloge, 10);
