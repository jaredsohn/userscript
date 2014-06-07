// ==UserScript==
// @name           Angriffswarner
// @namespace      ****.net
// @description    Warnt dich sobald du angegriffen wirst.
// @include        http://*pennergame.de/*
// @version 1.0
// ==/UserScript==


GM_xmlhttpRequest({
	method: 'GET',
	url: 'http://www.pennergame.de/fight/overview/',
	onload: function(responseDetails) {
		var content = responseDetails.responseText;
		if(content.match(/warning/)){
			newa = document.createElement('a');
			newa.setAttribute('class', 'new_msg_infoscreen');
			newa.setAttribute('href', '/fight/overview/#form1');
			newa.setAttribute('title', 'Eingehender Angriff');
			newa.setAttribute('style', 'margin-right:35px');
			newimg = newa.appendChild(document.createElement('img'));
//			newimg.setAttribute('src', 'http://media.pennergame.de/img/dots/warning.gif');
			newimg.setAttribute('src', 'http://i44.tinypic.com/w9900g.jpg');
			newimg.setAttribute('width', '25');
			newimg.setAttribute('height', '25');
			newimg.setAttribute('border', '0');
			document.getElementById("infoscreen").insertBefore(newa, document.getElementsByTagName("form")[0]);
		}
	}
});
