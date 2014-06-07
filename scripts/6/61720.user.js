// ==UserScript==
// @name           Ostrzegacz przed zbliżającą się walką by <<-Wu-Tang Clan->> 
// @namespace      ****.net
// @description    Warnt dich sobald du angegriffen wirst.
// @include        http://*menelgame.pl/*
// @exclude       http://board.menelgame.pl/*
// @version 2.0
// ==/UserScript==

var fightUrl = 'http://www.menelgame.pl/fight/overview/';
if (document.URL.match("berlin")) {
    fightUrl = 'http://menelgame.pl/fight/overview/';
}

GM_xmlhttpRequest({
	method: 'GET',
	url: fightUrl,
	onload: function(responseDetails) {
		var content = responseDetails.responseText;
		if(content.match(/warning/)){
            var part = content.split("warning")[1].split("<td>")[1];
            var TimeOfImpact = part.split("</td>")[0];
			newa = document.createElement('a');
			newa.setAttribute('class', 'new_msg_infoscreen');
			newa.setAttribute('href', '/fight/overview/#form1');
			newa.setAttribute('title', 'Eingehender Angriff: '+TimeOfImpact);
			newa.setAttribute('style', 'margin-right:35px');
			newimg = newa.appendChild(document.createElement('img'));
			newimg.setAttribute('src', 'http://media.menelgame.pl/img/dots/warning.gif');
//			newimg.setAttribute('src', 'http://i44.tinypic.com/w9900g.jpg');
			newimg.setAttribute('width', '25');
			newimg.setAttribute('height', '25');
			newimg.setAttribute('border', '0');
			document.getElementById("infoscreen").insertBefore(newa, document.getElementsByTagName("form")[0]);
		}
	}
});