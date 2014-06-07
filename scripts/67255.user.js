// ==UserScript==
// @name          DS_Speicherstand
// @description    Färbt den Speicherstand neben dem Bauernhofstand ein, von grün bis rot prozentual zum Maximum
// @include        http://de*.die-staemme.de/game.php?*
// @author 	pinjam
// ==/UserScript==

var color = {
	'12.5': "#00F500", 
	'25': 	"#23D200", 
	'37.5': "#46AF00", 
	'50': 	"#698C00", 
	'62.5': "#8C6900", 
	'75': 	"#AF4600", 
	'87.5': "#D22300", 
	'100': 	"#F50000"
};

function colors() {
	var speicher = document.getElementById("storage").innerHTML;
	var percentages = ["12.5","25","37.5","50","62.5","75","87.5","100"];
	var percent = document.getElementById("wood").innerHTML / speicher * 100;
	for(var z = 0; z < percentages.length; z++) {
		if(percent <= percentages[z]) {
			document.getElementById("wood").style.color = color[percentages[z]];
			break;
		}
	}
	var percent = document.getElementById("stone").innerHTML / speicher * 100;
	for(var z = 0; z < percentages.length; z++) {
		if(percent <= percentages[z]) {
			document.getElementById("stone").style.color = color[percentages[z]];
			break;
		}
	}
	var percent = document.getElementById("iron").innerHTML / speicher * 100;
	for(var z = 0; z < percentages.length; z++) {
		if(percent <= percentages[z]) {
			document.getElementById("iron").style.color = color[percentages[z]];
			break;
		}
	}
}

function points() {
	if (document.getElementById("wood").innerHTML >= 1000) document.getElementById("wood").innerHTML = (document.getElementById("wood").innerHTML/1000).toFixed(3);
	if (document.getElementById("stone").innerHTML >= 1000) document.getElementById("stone").innerHTML = (document.getElementById("stone").innerHTML/1000).toFixed(3);
	if (document.getElementById("iron").innerHTML >= 1000) document.getElementById("iron").innerHTML = (document.getElementById("iron").innerHTML/1000).toFixed(3);
};

colors();
//points();
