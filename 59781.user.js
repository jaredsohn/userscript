// ==UserScript==
// @name           Sauberkeitsanzeige pennergame 4.0 (version 2)
// @namespace      http://pennerhack.foren-city.de
// @description    zeigt aktuelle sauberkeit bei den logut button an 
// @include        *pennergame.de*
// ==/UserScript==

GM_xmlhttpRequest({
  	method: 'GET',
   	url: 'http://www.pennergame.de/overview/',
        onload: function(responseDetails) {
        	var content = responseDetails.responseText;
			var text1 = content.split('Sauberkeit:')[1];
			var Sauber = text1.split('%')[0];

			if (Sauber<30) {
				var farbe = "red"
			} else {
				var farbe = "green"
	
}
//document.getElementsByClassName("icon crowncap")[0].innerHTML = '<img src=\"http://img3.abload.de/img/schwamve0k.png\" width=\"16\" height=\"16\">&nbsp;<font style=\"color:'+farbe+'; font-size:120%;\"><b>&nbsp;'+Sauber+' %</b></font>';


document.getElementById("my-profile").innerHTML += '<a href="/city/washhouse/" class="ttip" rel="Klick hier, um zum Waschen zu kommen"><font style=\"color:'+farbe+'; font-size:120%;\"><b>&nbsp;'+Sauber+' % Sauber</b></font></a>';


}});