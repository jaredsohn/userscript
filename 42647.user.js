// ==UserScript==
// @version       3.0
// @name          Gato Botas II
// @author	  Neo.
// @description	  Thanks to Neo.
// @include  http://*/game/*
// @exclude	
// ==/UserScript==

(function()
{
	if (document.location.href.indexOf('overview') != -1)
	{
		/* Montrer les flottes a l'aller */
		GM_addStyle('body center table tr.flight th span a[title]:after {content:" ("attr(title)")"; color: #FF9900; font-size: 11px;}');
		/* Montrer les flottes au retour */
		GM_addStyle('body center table tr.return th span a[title]:after {content:" ("attr(title)")"; color: #FFCC66; font-size: 11px;}');
	}
	else if (document.location.href.indexOf('phalanx') != -1)
	{
		/* Montrer les flottes protegees par phalange */
		GM_addStyle('body center table tr th font a[title]:after {content:" ("attr(title)")"; color: #FFA500; font-size: 11px;}');
	}
})();

var listaElementos, elementoActual; //nos sirven para recorrer
var espionajeSound = "http://www.ilovewavs.com/Effects/Beeps/FlyinOff.wav";
var ataqueSound    = "http://7176983685849987507-a-1802744773732722657-s-sites.googlegroups.com/site/fabianyamano/Home/dos.wav?attredirects=0&auth=ANoY7cpyx7FeUO8c5BDO3mKnwhJvxAvi5_x6wU3qjVDRLCqOI6SnC_JCwclC3ATQKGB7vFvQi_MtEBbpm9eUkX-Xaqjf12tCBXpi2qI7xaCbEs5GQqSUmWlA8uvQ7Wm06AKs7Esfbctv2SOgq_ZH2ckPlLKDzIA3v2tYoKLrs0twn_jAQ9tdycVeR_OAgmWgyW9D1zYJYFYy";
var mensajeSound   = "http://www.ilovewavs.com/Effects/Beeps/FlyinOff.wav";
var confedeSound   = "http://7176983685849987507-a-1802744773732722657-s-sites.googlegroups.com/site/fabianyamano/Home/dos.wav?attredirects=0&auth=ANoY7cpyx7FeUO8c5BDO3mKnwhJvxAvi5_x6wU3qjVDRLCqOI6SnC_JCwclC3ATQKGB7vFvQi_MtEBbpm9eUkX-Xaqjf12tCBXpi2qI7xaCbEs5GQqSUmWlA8uvQ7Wm06AKs7Esfbctv2SOgq_ZH2ckPlLKDzIA3v2tYoKLrs0twn_jAQ9tdycVeR_OAgmWgyW9D1zYJYFYy";

var sonido=0;

//Ajusta el volumen, si tienen una flota numerosa y reciben muchos mensajes pueden bajarle el vol.
var volMensajes = "50";   // "0"=desactivado "100" =activado completamente
var volEspionaje= "70";
var volAtaque   = "100";

// Funcion de aleatorio...........
var MIN = 840;  // segundos (MINIMO)
var MAX = 1800; // segundos (MAXIMO)

//---------------- EN VISTA GENERAL ---------------------EN VISTA GALAXIA-----------------
//---La mision:-------- Color en RGB --------Tipo de jugador:---------- Color en RGB -----

var esAtacar       = "rgb(255,255,000)";      var normal        = "rgb(255,255,240)";
var eraAtacar      = "rgb(255,102,0)";        var debil         = "rgb(021,189,0)";
var vieneAtaque    = "rgb(255,000,000)";      var fuerte        = "rgb(255,70,70)";
                                             
var esConfed       = "rgb(000,220,159)";      var inactivo      = "rgb(230,235,20)";
var eraConfed      = "rgb(150,150,150)";      var muyInactivo   = "rgb(255,255,000)";
var vieneConfed    = "rgb(200,000,000)";      var vacaciones    = "rgb(0,159,236)";

var esRecolectar   = "rgb(77,255,45)";      var suspendido    = "rgb(000,000,000)";
var eraRecolectar  = "rgb(77,255,78)";

var esTransportar  = "rgb(255,255,255)";
var eraTransportar = "rgb(244,163,62)";
var vieneTransporte= "rgb(120,244,244)";

var esEspionaje    = "rgb(245,160,075)";
var eraEspionaje   = "rgb(190,120,025)";
var vieneEspionaje = "rgb(255,083,083)";

var esDesplegar    = "rgb(009,244,244)";


var esColonizar    = "rgb(255,255,255)";
var eraColonizar   = "rgb(150,150,150)";

var esMantener     = "rgb(000,255,000)";
var eraMantener    = "rgb(150,150,150)";


//  comienza el codigo del script....

function aleatorio()
{
	aleat = Math.random() * (MAX-MIN);
	aleat = Math.round(aleat);
	return parseInt(MIN) + aleat;
} 

function playSound()
{
	body = document.getElementsByTagName("body")[0];
	var emb = document.createElement("embed");
	emb.src = sonido;
	emb.setAttribute("autostart", "true");
	emb.setAttribute("loop", "false");
	emb.setAttribute("hidden", "true");
	emb.setAttribute("volume", volMensajes);
	body.appendChild(emb);
}

function autoReload()
{
	sonido=0;
	var tiempo=aleatorio();
	var timeID = setTimeout("location.href= document.URL", tiempo*1000);
	var publi = document.getElementsByTagName ('th');
	
	for (var i = publi.length - 1; i >= 0; i--)
	{
		htmldentro = publi[i].innerHTML;
		if (htmldentro.indexOf('?page=messages') != -1)
			sonido=mensajeSound;
	}

	listaElementos = document.getElementsByTagName('span');
    for (var i = 0; i < listaElementos.length; i++)
	{
		elementoActual = listaElementos[i];

		if (elementoActual.className.substring(0,20)=='flight ownfederation')//La mision es: Confederacion
			elementoActual.style.color = esConfed;
		else if (elementoActual.className.substring(0,20)=='return ownfederation')//La mision era: Confederacion
            elementoActual.style.color = eraConfed;
		else if (elementoActual.className.substring(0,17)=='flight federation')//viene ataque de Confederacion
        {
			elementoActual.style.color = vieneConfed;
            if (sonido!=espionajeSound)
				sonido=confedeSound;
		}
        else if (elementoActual.className.substring(0,16)=='flight ownattack')//La mision es: Atacar
			elementoActual.style.color = esAtacar;
        else if (elementoActual.className.substring(0,16)=='return ownattack')//La mision era:Atacar
			elementoActual.style.color = eraAtacar;
        else if (elementoActual.className.substring(0,13)=='flight attack')//Una flota enemiga te va a atacar
		{
			if (sonido!=espionajeSound)
				sonido=ataqueSound;
            elementoActual.style.color = vieneAtaque;
		}
        else if (elementoActual.className.substring(0,17)=='flight ownharvest')//La mision es: Recolectar
			elementoActual.style.color = esRecolectar;
        else if (elementoActual.className.substring(0,17)=='return ownharvest')//La mision era:Recolectar 
			elementoActual.style.color = eraRecolectar;
        else if (elementoActual.className.substring(0,19)=='flight owntransport')//La mision es: Transportar
			elementoActual.style.color = esTransportar;
        else if (elementoActual.className.substring(0,19)=='return owntransport')//La mision era:Transportar
			elementoActual.style.color = eraTransportar;
        else if (elementoActual.className.substring(0,16)=='flight transport')//una flota pacifica transporta
			elementoActual.style.color = vieneTransporte;
        else if (elementoActual.className.substring(0,19)=='flight ownespionage')//La mision es: Espionaje
			elementoActual.style.color = esEspionaje;
        else if (elementoActual.className.substring(0,19)=='return ownespionage')//La mision era:Espionaje
			elementoActual.style.color = eraEspionaje;
        else if (elementoActual.className.substring(0,16)=='flight espionage')//Flota enemiga te Espia
		{
			sonido=espionajeSound;
			elementoActual.style.color = vieneEspionaje;
        }
        else if (elementoActual.className.substring(0,16)=='flight owndeploy')//La mision es: Desplegar
			elementoActual.style.color = esDesplegar;
        else if (elementoActual.className.substring(0,16)=='return owndeploy')//La mision era:Desplegar
			elementoActual.style.color = eraDesplegar;
        else if (elementoActual.className.substring(0,16)=='flight owncolony')//La mision es: Colonizar
			elementoActual.style.color = esColonizar;
        else if (elementoActual.className.substring(0,16)=='return owncolony')//La mision era:Colonizar
			elementoActual.style.color = eraColonizar;
        else if (elementoActual.className.substring(0,15)=='holding ownhold')//La flota esta en orbita
			elementoActual.style.color = esMantener;
        else if (elementoActual.className.substring(0,14)=='flight ownhold')//La mision es: Mantener posision
			elementoActual.style.color = esMantener;
        else if (elementoActual.className.substring(0,14)=='return ownhold')//La mision era:Mantener posicion
			elementoActual.style.color = eraMantener;
    } //fin del ciclo

	if (sonido!=0)
		playSound();
}// fin de la funcion

///// Esta parte es para la galaxia
if (document.baseURI.indexOf("index.php?page=galaxy") != -1)
{ //Si esta abierta la parte de galaxia...
	listaElementos = document.getElementsByTagName('span');

    for (var i = 0; i < listaElementos.length; i++)
	{
		elementoActual = listaElementos[i];
        if (elementoActual.className.substring(0,6)=='normal')
        	elementoActual.style.color = normal;
        else if (elementoActual.className.substring(0,8)=='inactive')
        	elementoActual.style.color = inactivo;
        else if (elementoActual.className.substring(0,12)=='longinactive')
        	elementoActual.style.color = muyInactivo;
        else if (elementoActual.className.substring(0,6)=='strong')
        	elementoActual.style.color = fuerte;
        else if (elementoActual.className.substring(0,4)=='noob')
        	elementoActual.style.color = debil;
        else if (elementoActual.className.substring(0,8)=='vacation')
        	elementoActual.style.color = vacaciones;
        else if (elementoActual.className.substring(0,6)=='banned')
        	elementoActual.style.color = suspendido;
    }
}
else  //En caso contrario solo recargamos la pagina de vision General
	autoReload();