// ==UserScript==
// @name           Attackalert for Dossergame
// @namespace      Pennerhilfe.de
// @description    Shows an icon in the head when somebody is attacking you (You need a dexterity level 20 to see this)
// @include        http://*dossergame.co.uk/*
// ==/UserScript==


GM_xmlhttpRequest({
    method: 'GET',
    url: 'http://www.dossergame.co.uk/fight/overview/',
    onload: function(responseDetails) {
				var content = responseDetails.responseText;
			  if(content.match(/warning/)){
			    newa = document.createElement('a');
					newa.setAttribute('class', 'new_msg_infoscreen');
 					newa.setAttribute('href', '/fight/overview/#');
					newa.setAttribute('title', 'incoming fight');
					newa.setAttribute('style', 'margin-right:35px');
    			newimg = newa.appendChild(document.createElement('img'));
					newimg.setAttribute('src', 'http://media.dossergame.co.uk/img/attackwarning.png');
					newimg.setAttribute('width', '15');
  				newimg.setAttribute('height', '15');
  				newimg.setAttribute('border', '0');
    			document.getElementById("infoscreen").insertBefore(newa, document.getElementsByTagName("form")[0]);
				}
    }
});