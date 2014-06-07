// ==UserScript==
// @name           AvisoAtaque
// @namespace      yelidmod.com/mendigo
// @description    Muestra la alerta de ataque arriba.
// @include        http://*mendigogame.es/*
// ==/UserScript==


GM_xmlhttpRequest({
    method: 'GET',
    url: 'http://www.mendigogame.es/fight/overview/',
    onload: function(responseDetails) {
				var content = responseDetails.responseText;
			  if(content.match(/warning/)){
			    newa = document.createElement('a');
					newa.setAttribute('class', 'new_msg_infoscreen');
 					newa.setAttribute('href', '/fight/overview/#');
					newa.setAttribute('title', 'Ataque detallado');
					newa.setAttribute('style', 'margin-right:35px');
    			newimg = newa.appendChild(document.createElement('img'));
					newimg.setAttribute('src', 'http://media.mendigogame.es/img/attackwarning.png');
					newimg.setAttribute('width', '15');
  				newimg.setAttribute('height', '15');
  				newimg.setAttribute('border', '0');
    			document.getElementById("infoscreen").insertBefore(newa, document.getElementsByTagName("form")[0]);
				}
    }
});