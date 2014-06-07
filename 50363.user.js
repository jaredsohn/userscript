// ==UserScript==
// @name Pennergame Sauberkeit
// @namespace 1334769[Bande:Arschbackenhoernchen]
// @description Zeigt die aktuelle Sauberkeit im Status an.
// @include http://*pennergame.de*
// @exclude http://newboard.pennergame.de/
// @exclude http://highscore.pennergame.de/highscore/range/*
// ==/UserScript==

GM_xmlhttpRequest(
   {
  	method: 'GET',
   	url: 'http://www.pennergame.de/overview/',
        onload: function(responseDetails) 
		{
        	var content = responseDetails.responseText;
			var text1 = content.split('Sauberkeit:')[1];
			var text2 = text1.split('%')[0];
			var table = document.getElementsByTagName('form')[0];
			var td = table.getElementsByTagName('li')[6];
			td.innerHTML = 
			'<li class="submit"><input class="formbutton" type="submit" value="Logout" />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Sauberkeit: '+text2+'%</li>'	
		}
	});