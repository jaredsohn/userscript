// ==UserScript==
// @version       1.2
// @name	Color Mision Ogame 0.78
// @author	  ZEYsoft
// @namespace     
// @description	  Cambia los colores de misiones en Visión General de Ogame.
// @include  http://uni*.ogame.*/game/index.php?page=overview*
// @include  http://uni*.ogame.*/game/overview.php*
// ==/UserScript==

var listaElementos, elementoActual; //nos sirven para recorrer

//---La mision:-------- Color en RGB

var esAtacar       = "rgb(000,200,000)";
var eraAtacar      = "rgb(150,150,150)";
var vieneAtaque    = "rgb(200,000,000)";

var esConfed       = "rgb(000,220,159)";
var eraConfed      = "rgb(150,150,150)";
var vieneConfed    = "rgb(200,000,000)";

var esRecolectar   = "rgb(147,164,079)";
var eraRecolectar  = "rgb(150,150,150)";

var esExpedicion   = "rgb(255,255,000)";
var esTransportar  = "rgb(000,237,016)";
var eraTransportar = "rgb(150,150,150)";
var vieneTransporte= "rgb(120,244,244)";

var esEspionaje    = "rgb(245,160,075)";
var eraEspionaje   = "rgb(190,120,025)";
var vieneEspionaje = "rgb(255,083,083)";

var esDesplegar    = "rgb(009,208,208)";
var eraDesplegar   = "rgb(150,150,150)";

var esColonizar    = "rgb(255,255,255)";
var eraColonizar   = "rgb(150,150,150)";

var esMantener     = "rgb(000,255,000)";
var eraMantener    = "rgb(150,150,150)";

//  comienza el codigo del script....

if(document.baseURI.indexOf("overview") != -1){
	listaElementos = document.getElementsByTagName('span');
	for (var i = 0; i < listaElementos.length; i++) {
		elementoActual = listaElementos[i];

			//La mision es: Confederacion
		if (elementoActual.className.substring(0,20)=='flight ownfederation')
		{
			elementoActual.style.color = esConfed;
		}

			//La mision era: Confederacion
		if (elementoActual.className.substring(0,20)=='return ownfederation')
		{
			elementoActual.style.color = eraConfed;
		}

			//viene ataque de Confederacion
		if (elementoActual.className.substring(0,17)=='flight federation')
		{
			elementoActual.style.color = vieneConfed;
		}

			//La mision es: Atacar
		if (elementoActual.className.substring(0,16)=='flight ownattack')
		{
			elementoActual.style.color = esAtacar;
		}

			//La mision era: Atacar
		if (elementoActual.className.substring(0,16)=='return ownattack')		
		{
			elementoActual.style.color = eraAtacar;
		}

			//Una flota enemiga te va a atacar
		if (elementoActual.className.substring(0,13)=='flight attack')		
		{
			elementoActual.style.color = vieneAtaque;
		}

			//La mision es: Recolectar
		if (elementoActual.className.substring(0,17)=='flight ownharvest')
		{
			elementoActual.style.color = esRecolectar;
		}

			//La mision era: Recolectar 
		if (elementoActual.className.substring(0,17)=='return ownharvest')
		{
			elementoActual.style.color = eraRecolectar;
		}


			//La mision es: expedicion
		if (elementoActual.className.substring(0,20)=='holding owntransport')
		{
			elementoActual.style.color = esExpedicion;
		}
			//La mision es: Transportar
		if (elementoActual.className.substring(0,19)=='flight owntransport')	
		{
			elementoActual.style.color = esTransportar;
		}

			//La mision era:Transportar
		if (elementoActual.className.substring(0,19)=='return owntransport')
		{
			elementoActual.style.color = eraTransportar;
		}

			//Una flota pacifica transporta
		if (elementoActual.className.substring(0,16)=='flight transport')
		{
			elementoActual.style.color = vieneTransporte;
		}

			//La mision es: Espionaje
		if (elementoActual.className.substring(0,19)=='flight ownespionage')
		{
			elementoActual.style.color = esEspionaje;
		}

			//La mision era: Espionaje
		if (elementoActual.className.substring(0,19)=='return ownespionage')
		{
			elementoActual.style.color = eraEspionaje;
		}

			//Flota enemiga te Espia
		if (elementoActual.className.substring(0,16)=='flight espionage')
		{
			elementoActual.style.color = vieneEspionaje;
		}

			//La mision es: Desplegar
		if (elementoActual.className.substring(0,16)=='flight owndeploy')
		{
			elementoActual.style.color = esDesplegar;
		}

			//La mision era: Desplegar
		if (elementoActual.className.substring(0,16)=='return owndeploy')
		{
			elementoActual.style.color = eraDesplegar;
		}

			//La mision es: Colonizar
		if (elementoActual.className.substring(0,16)=='flight owncolony')
		{
			elementoActual.style.color = esColonizar;
		}

			//La mision era: Colonizar
		if (elementoActual.className.substring(0,16)=='return owncolony')
		{
			elementoActual.style.color = eraColonizar;
		}

			//La flota esta en orbita
		if (elementoActual.className.substring(0,15)=='holding ownhold')
		{
			elementoActual.style.color = esMantener;
		}

			//La mision es: Mantener posision
		if (elementoActual.className.substring(0,14)=='flight ownhold')
		{
			elementoActual.style.color = esMantener;
		}

			//La mision era:Mantener posicion
		if (elementoActual.className.substring(0,14)=='return ownhold')
		{
			elementoActual.style.color = eraMantener;
		}
	} //fin del ciclo
}// fin de la funcion
