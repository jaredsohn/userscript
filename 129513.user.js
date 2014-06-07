// ==UserScript==
// @name           H_Alianza
// @namespace      Reox
// @description    Usuarios y distancia
// @include        http://*.hispaniaeljuego.com/game/alliances/*
// ==/UserScript==

var texto = "";
var posicionInicio = 0;
var posicionFinal = 0;
var posCorIni = 0;
var posCorFin = 0;

var coordX = 0;
var coordY = 0;
var ciudadX = 370;
var ciudadY = 285;
var disZ = 0;

var textoX = "";
var textoY = "";
var textoZ = "000";

addDiv();
insertarScript();
addTab();
var ciudadesDiv=document.getElementById('ciudades');
var as = document.getElementsByTagName('a');
for (var i=0; i<as.length; i++) {
  if ((as[i].href.indexOf('/game/player/') != -1) && (as[i].href.indexOf('/game/player/me/') == -1))
  {
    	var texto = "";
    	var posicionInicio = 0;
    	var posicionFinal = 0;
	var posCorIni = 0;
	var posCorFin = 0;

    GM_xmlhttpRequest({
    method: 'GET',
    url: as[i].href,
    headers: {
        'User-agent': 'Mozilla/4.0 (compatible)',
        'Accept': 'application/atom+xml,application/xml,text/xml',
    },
    onload: function(responseDetails) {
	      posicionInicio = responseDetails.responseText.indexOf('<h2>Ciudades de');
	      texto = responseDetails.responseText.substring(posicionInicio);
	      posicionInicio = texto.indexOf('<table class="rk">');
	      posicionFinal = texto.indexOf('</table>') + 8;
	      texto = texto.substring(posicionInicio,posicionFinal);

	texto += '<table class="vv"><tbody><tr><td><b>Distancia</b></td><td style="text-align: center;">&nbsp;</td><td style="text-align: center;"><b>Coordenada X </b></td><td style="text-align: center;">&nbsp;</td><td style="text-align: center;"><b>Coordenada Y </b></td><td style="text-align: center;">&nbsp;</td></tr>';
	
	while((texto.indexOf('/x/',posCorIni)) != -1)
	{

		posCorIni = texto.indexOf('/x/',posCorIni) + 3;
		posCorFin =  posCorIni + 3;
		coordX = texto.substring(posCorIni,posCorFin);
		textoX = coordX;

		posCorIni = texto.indexOf('/y/',posCorIni) + 3;
		posCorFin =  posCorIni + 3;
		coordY = texto.substring(posCorIni,posCorFin);
		textoY = coordY;
		
		disZ = Math.round(Math.sqrt((Math.pow((ciudadX - coordX), 2)+ Math.pow((ciudadY - coordY), 2))));
		textoZ = disZ;

		texto += '<tr><td><b>';
		texto += textoZ;
		texto += '</b></td><td style="text-align: center;">&nbsp;</td><td style="text-align: center;">';
		texto += textoX;
		texto += '</td><td style="text-align: center;">&nbsp;</td><td style="text-align: center;">';
		texto += textoY;
		texto += '</td></tr>';
	}

texto += '<tr><td style="text-align: center;">&nbsp;</td></tr></tbody></table>';
	posCorIni = 0;
	

	      ciudadesDiv.innerHTML += texto;
	    }
    });
  }
}

function addDiv(){
  var divTag = document.createElement("div");
  divTag.id = "ciudades";
  divTag.className = "kk";
  divTag.style.display = "none";
  var divPadre = document.getElementsByClassName('GA_MOD_B GA_MOD_MIN');
  divPadre[0].appendChild(divTag);
}

function addTab()
{
  var tabs;
  var liTag = document.createElement('li');
  var aTag = document.createElement('a');
  aTag.href = '#';
  aTag.setAttribute('onclick', 'ocultarDiv()');
  //aTag.className = "sel";
  var spanTag = document.createElement('span');
  spanTag.innerHTML = 'Ciudades';
  aTag.appendChild(spanTag);
  liTag.appendChild(aTag);
  tabs = document.getElementsByClassName('GA_MOD_TABS');
  tabs[0].appendChild(liTag);
}

function insertarScript()
{
  script='function ocultarDiv(){tabs=document.getElementsByClassName("kk");tabs[0].style.display = "none";var ciudadesDiv=document.getElementById("ciudades");ciudadesDiv.style.display= "";}';
  var heads = document.getElementsByTagName("head");
  if (heads.length > 0) {
    var node = document.createElement("script");
    node.type = "text/javascript";
    node.innerHTML = script;
    heads[0].appendChild(node); 
  }
}