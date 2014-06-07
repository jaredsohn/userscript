// ==UserScript==
// @name FAZ.NET: Zeige alle Kommentare
// @description zeigt alle Kommentare ohne das man jeweils davor auf + druecken muss
// @include http://www.faz.net/*
// ==/UserScript==

// GreaseKit compatibility 
if (typeof(unsafeWindow) === 'undefined') { 
	unsafeWindow = window; 
}

var arrayDivs = document.body.getElementsByTagName("div");
for(var i = 0; i < arrayDivs.length; i++) {
	if(arrayDivs[i].id.match("h1komdetail_(.)*")) {
		var nummer = arrayDivs[i].id.substr(12);
		unsafeWindow.switchKom('komdetail_' + nummer);
	}
}