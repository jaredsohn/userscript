// ==UserScript==
// @version       1.0
// @name          Ogame alarm Turk Versiyonu
// @author	  Moskof
// @description	  Mesajlarda calmiyor. Saldiri ve sondalarda calar. Genel Durum ekrani.
// @include  http://*/game/*
// @exclude	
// ==/UserScript==

(function()
{
	if (document.location.href.indexOf('overview') != -1)
	{
		
		GM_addStyle('body center table tr.flight th span a[title]:after {content:" ("attr(title)")"; color: #FF9900; font-size: 11px;}');
		
		GM_addStyle('body center table tr.return th span a[title]:after {content:" ("attr(title)")"; color: #FFCC66; font-size: 11px;}');
	}
	else if (document.location.href.indexOf('phalanx') != -1)
	{
		
		GM_addStyle('body center table tr th font a[title]:after {content:" ("attr(title)")"; color: #FFA500; font-size: 11px;}');
	}
})();

var listaElementos, elementoActual; //nos sirven para recorrer
var espionajeSound = "http://xlx.ogame.free.fr/sons/sirene4.mp3";
var ataqueSound    = "http://xlx.ogame.free.fr/sons/sirene1.mp3";
var confedeSound   = "http://xlx.ogame.free.fr/sons/sirene1.mp3";



var sonido=0;

var volMensajes = "50";   
var volEspionaje= "70";
var volAtaque   = "100";


var MIN = 840;  // segundos (MINIMO)
var MAX = 1800; // segundos (MAXIMO)

var esAtacar       = "";      var normal        = "";
var eraAtacar      = "";        var debil         = "";
var vieneAtaque    = "";      var fuerte        = "";
                                             
var esConfed       = "";      var inactivo      = "";
var eraConfed      = "";      var muyInactivo   = "";
var vieneConfed    = "";      var vacaciones    = "";

var esRecolectar   = "";      var suspendido    = "";
var eraRecolectar  = "";

var esTransportar  = "";
var eraTransportar = "";
var vieneTransporte= "";

var esEspionaje    = "";
var eraEspionaje   = "";
var vieneEspionaje = "";

var esDesplegar    = "";


var esColonizar    = "";
var eraColonizar   = "";

var esMantener     = "";
var eraMantener    = "";



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

		if (elementoActual.className.substring(0,20)=='flight ownfederation')
			elementoActual.style.color = esConfed;
		else if (elementoActual.className.substring(0,20)=='return ownfederation')
            elementoActual.style.color = eraConfed;
		else if (elementoActual.className.substring(0,17)=='flight federation')

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
    } 

	if (sonido!=0)
		playSound();
}


	autoReload();