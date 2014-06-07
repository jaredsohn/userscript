// ==UserScript==
// @name           Sauberkeitsanzeige Pennergame 4.0 Hamburg,Berlin und München 
// @namespace      http://www.pennertreff.de  
// @description    Zeigt die aktuelle Sauberkeit bei dem Logutbutton an 
// @include        http://*pennergame.de*
// ==/UserScript==

var url = document.location.href;
if (url.indexOf("http://berlin.pennergame")>=0) {var link = "http://berlin.pennergame.de"}
if (url.indexOf("http://www.pennergame")>=0) {var link = "http://www.pennergame.de"}
if (url.indexOf("http://muenchen.pennergame")>=0) {var link = "http://muenchen.pennergame.de"}

GM_xmlhttpRequest({
  	method: 'GET',
   	url: ''+link+'/overview/',
        onload: function(responseDetails) {
        	var content = responseDetails.responseText;
			var text1 = content.split('Sauberkeit:')[1];
			var Sauber = text1.split('%')[0];

			if (Sauber<30) {
				var farbe = "red"
			if (Sauber<100) {
                                var farbe = "yellow"
                        } else {
				var farbe = "green"
	
}
//document.getElementsByClassName("icon crowncap")[0].innerHTML = '<img src=\"http://img3.abload.de/img/schwamve0k.png\" width=\"16\" height=\"16\">&nbsp;<font style=\"color:'+farbe+'; font-size:120%;\"><b>&nbsp;'+Sauber+' %</b></font>';


document.getElementById("my-profile").innerHTML += '<a href="/city/washhouse/" class="ttip" rel="Klick hier, um zum Waschen zu kommen"><font style=\"color:'+farbe+'; font-size:120%;\"><b>&nbsp;'+Sauber+' % Sauber</b></font></a>';


}});