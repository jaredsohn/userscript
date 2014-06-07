// ==UserScript==
// @name        	Deutsche Online-News Bettelboxen blocken
// @namespace      	*
// @description 	Entfernt die Bettel-Boxen auf deutschen News-Sites (Anti AdBlock Hinweis)
// @include        	http://www.spiegel.de/*
// @include 		http://www.sueddeutsche.de/*
// @include		http://www.zeit.de/*
// @include		http://www.faz.net/*
// @include		http://www.golem.de/*
// @require 		http://ajax.googleapis.com/ajax/libs/jquery/2.0.0/jquery.min.js
// @version     	0.4
// ==/UserScript==



// FAZ
// Für die FAZ wird jQuery benötigt. Vielleicht fällt aber jemand noch ne elegantere Lösung ein... Wer keine FAZ liest kann oben die "@require" Zeile löschen und hier alles auskommentieren...
if (document.getElementById('FAZSeite') != null) {
    $('[id*=MidBlock]').css("display", "none");
	$('[id=FAZSeite]').css("margin-top", "0px");
};

// Zeit
if (document.getElementById('zeit-de') != null) {
	var zeit = document.getElementById('header');
	if (zeit != null) {
		var zeit_child = zeit.childNodes[0];
		zeit_child.style.display = 'none';
    	};
};

// Spiegel Online
if (document.getElementById('spWrapper') != null) {
	// Timeout, even if set to zero, is needed or blocking fails... WTF?
    window.setTimeout(function(){
		var spon = document.getElementById('spWrapper');
			var spon_child = spon.childNodes[0];
			spon_child.style.display = 'none';
	},0);
};

// Süddeutsche
if (document.getElementById('sueddeutsche') != null) {
    var sz = document.getElementsByTagName('body')[0];
	if (sz != null) {
		var sz_child = sz.childNodes[0];
		sz_child.style.display = 'none';
	};
};


// Golem
// Das DOM von Golem gibt mir Rätsel auf! Funktioniert im Moment nicht, werde demnächst nochmal drüber grübeln...

//if (document.getElementsByClassName('golem-flip-std') != null) {
//    //alert("GOLEM");
//    window.setTimeout(function(){
//		var golem = document.getElementById('screen');
//		if (golem != null) {
//			var golem_child = golem.childNodes[4];
//       	 alert (golem_child);
//			golem_child.style.display = 'none';
//		};
//    },1000);
//};