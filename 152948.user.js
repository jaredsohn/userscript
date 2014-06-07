// ==UserScript==
// @name        League of Legends Tribunal Justice Review Enhancer
// @namespace   LoLTJRE
// @description Enhances the the Justice Review page for the League of Legends Tribunal
// @include     http://*.leagueoflegends.com/tribunal/*justice-review/*
// @version     1.0.9
// @grant       none
// ==/UserScript==

// Function for reading cookies
function readCookie(name) {
	var nameEQ = name + "=";
	var ca = document.cookie.split(';');
	for(var i=0;i < ca.length;i++) {
		var c = ca[i];
		while (c.charAt(0)==' ') c = c.substring(1,c.length);
		if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
	}
	return null;
}

// Define main worker variables
var getBody = document.getElementsByTagName("body")[0];
var rating1, rating2, rating3, rating4, rating5, rating6;
var result1, result2, color, deco;
var getPath = window.location.pathname.split('/');
var getLang = getPath[2];

var stat = new Array();
var historystat = new Array();

// Fallback for URL without language path
if (getLang == "justice-review") {
	getLang = readCookie("LOLLANG");
}

// Languages
switch (getLang) {
	// Other languages (Portugese, Turkish)
	case "pt-br":	rating1 = "Quase Ninguém"; rating2 = "Pouquíssimos"; rating3 = "Minority"; rating4 = "Controversia";
					rating5 = "Maioria"; rating6 = "Grande Maioria"; result1 = "Punir"; result2 = "Perdoar"; break;
	case "tr":		rating1 = "Neredeyse Hiç Kimse"; rating2 = "Çok Az Kisi"; rating3 = "Azinlik"; rating4 = "Çogunluk";
					rating5 = "Büyük Çogunluk"; rating6 = "Büyük Çogunluk"; result1 = "Ceza Ver"; result2 = "Affet"; break;
	// The EUNE languages (Polish, Greek, Romanian)
	case "pl":		rating1 = "Prawie nikt"; rating2 = "Nieliczni"; rating3 = "Niewielka ilosc osób"; rating4 = "Wiekszosc osób";
					rating5 = "Zdecydowana wiekszosc osób"; rating6 = "Znaczna wiekszosc osób"; result1 = "Ukarz"; result2 = "Ulaskaw"; break;
	case "el":		rating1 = "Σχεδόν κανείς"; rating2 = "Ελάχιστοι"; rating3 = "Μειοψηφία"; rating4 = "Πλειοψηφία";
					rating5 = "Ισχυρή Πλειοψηφία"; rating6 = "Συντριπτική πλειοψηφία"; result1 = "Τιμωρία"; result2 = "Χάρη"; break;
	case "ro":		rating1 = "Aproape nimeni"; rating2 = "Foarte putini"; rating3 = "Minoritatea"; rating4 = "Majoritatea";
					rating5 = "Majoritatea covârsitoare"; rating6 = "Majoritatea covârsitoare"; result1 = "Pedepsire"; result2 = "Iertare"; break;
	// The EUW languages (German, Spanish, French)
	case "de":		rating1 = "So gut wie niemand"; rating2 = "Nur sehr wenige"; rating3 = "Minderheit"; rating4 = "Mehrheit";
					rating5 = "Große Mehrheit"; rating6 = "Überragende Mehrheit"; result1 = "Bestrafen"; result2 = "Vergeben"; break;
	case "es":		rating1 = "Casi nadie"; rating2 = "Muy pocos"; rating3 = "Minoría"; rating4 = "Mayoría";
					rating5 = "Amplia mayoría"; rating6 = "Una gran mayoría"; result1 = "Castigar"; result2 = "Indultar"; break;
	case "fr":		rating1 = "Presque personne"; rating2 = "Minorité"; rating3 = "Minorité"; rating4 = "Majorité";
					rating5 = "Forte majorité"; rating6 = "Majorité écrasante"; result1 = "Condamner"; result2 = "Acquitter"; break;
	// The default language is English
	default:		rating1 = "Almost No One"; rating2 = "Very Few"; rating3 = "Minority"; rating4 = "Majority";
					rating5 = "Strong Majority"; rating6 = "Overwhelming Majority"; result1 = "Punish"; result2 = "Pardon"; break;
}

// Main function, on load of the page
getBody.onload = function () {
	$.each($('.stat'), function(index, value) {
		stat[index] = value.innerHTML;
	});
	$.each($('.history-stat'), function(index, value) {
		historystat[index] = value.innerHTML;
		switch(index) {
			case 0: value.innerHTML = value.innerHTML + "<br>(" + (historystat[index] * 100 / stat[0]).toFixed(2) + "%)"; break;
			case 1: value.innerHTML = value.innerHTML + "<br>(" + (historystat[index] * 100 / stat[0]).toFixed(2) + "%)"; break;
			case 2: value.innerHTML = value.innerHTML + "<br>(" + (historystat[index] / stat[0]).toFixed(2) + " / case)"; break;
			case 3: value.innerHTML = value.innerHTML + "<br>(" + (historystat[index] * 100 / stat[0]).toFixed(2) + "%)"; break;
		}
		$(value).css("font-size", "18px");
	});
	// Work on the table, one row at a time
	$.each($('#justice-review .data-table tbody tr'), function(index, value) {
		// Short vars
		var correct = false;
		var node0 = value.children[0].innerHTML; var node1 = value.children[1].innerHTML;
		var node2 = value.children[2].innerHTML; var node3 = value.children[3].innerHTML;
		// Correct Check
		switch (node1) {
			case result2:	correct = (node3 == result2) ? true : false; break;
			case result1:	correct = (node3 != result2) ? true : false; break;
			default: break;
		}
		// Community Agreement Shades and case notice
		switch (node2) {
			case rating1:	color = (correct) ? "#1919FF" : "#FF7519"; deco = "overline underline blink"; break;
			case rating2:	color = (correct) ? "#3333FF" : "#FF8533"; deco = "overline underline blink"; break;
			case rating3:	color = (correct) ? "#4D4DFF" : "#FF944D"; deco = "overline underline blink"; break;
			case rating4:	color = (correct) ? "#6666FF" : "#FFA366"; deco = "line-through"; break;
			case rating5:	color = (correct) ? "#8080FF" : "#FFB280"; deco = "line-through"; break;
			case rating6:	color = (correct) ? "#9999FF" : "#FFC299"; deco = "line-through"; break;
			default:		color = "#DBDBDB"; deco = "line-through"; break;
		}
		switch (node3) {
			default: break;
		}
		$(value).css({'background-color': color});
		$(value.children[0].children[0]).css({'color': '#000000', 'text-decoration': deco});
	});
}