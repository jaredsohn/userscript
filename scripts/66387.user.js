// ==UserScript==
// @name 		Live Wetter mit Vorschau  alle Pennergame s (by Basti1012 ) 
// @namespace 		basti1012 http://pennerhack.foren-city.de
// @description 	Es wird daws wetter von Pennergame ueberschrieben und das aktuelle live wetter aus hamburg angezeigt .Mit 6 tages vorschau 
// @include http://*pennergame.de*
// @include http://*berlin.pennergame.de*
// @include http://*menelgame.pl*
// @include http://*dossergame.co.uk*
// @include http://*mendigogame.es*
// @include http://*clodogame.fr/*
// @include http://*serserionline.com*
// ==/UserScript==


GM_xmlhttpRequest({
	method: 'GET',
		url: 'http://www.meinestadt.de/hamburg/wetter',
		onload: function(responseDetails) {
			var content = responseDetails.responseText;
			var text11 = content.split('<div id="iconWetterlage">')[1];
			var text22 = text11.split('</div>')[0];
			var text33 = content.split('temperatur-imagesize">')[1];
			var text44 = text33.split('</div')[0];

			document.getElementById('weather').innerHTML = ''+text22+'<font style=\"color:black; font-size:200%;\"><b>'+text44+'</b></font>';
			document.getElementById('weather_desc').innerHTML = '<div id="test"</div>';

			GM_xmlhttpRequest({
				method: 'GET',
				url: 'http://www.wettercrew.de/deutschlandwetter/hamburg/',
				onload: function(responseDetails) {
					var content = responseDetails.responseText;
					for(x=1;x<=6;x++){
						var text111 = content.split('align=right>')[x];
						var text222 = text111.split('</tr></table>')[0];
						document.getElementById('test').innerHTML += text222;
					}
				}
			});
		}
});