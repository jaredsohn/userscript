// ==UserScript==
// @name        BA-TP-fix
// @namespace   http://userscripts.org/users/466607
// @description Fix BA tier point calculator
// @include     http://www.britishairways.com/travel/flight-calculator/*
// @include     https://www.britishairways.com/travel/flight-calculator/*
// @version     1
// ==/UserScript==

function inject(func) {
    var source = func.toString();
    var script = document.createElement('script');
    script.innerHTML = "("+ source +")()";
    document.body.appendChild(script);
}

function fixit()
{
	var classFirstP= new Array("P","First");
	for (var i = 0; i < airlinesAndTheirClasses.length; i++) {
		var ac =  airlinesAndTheirClasses[i];
		if (ac[0][0] == "AA") {
			ac[1] = new Array(classEconomyLowestK,classEconomyFlexibleY, classBusinessJ,classFirstP);
		} else if (ac[0][0] = "CX") {
			ac[1] = new Array(classEconomyLowestK,classEconomyFlexibleY,classPremierW,classBusinessJ,classFirstF);
		}
	}
}

inject(fixit);
