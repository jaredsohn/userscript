// ==UserScript==
// @version       1.8
// @name          Alerta Ogame
// @author	  Ramon RS Reydmon , modyfikacja PL Ktoska
// @namespace     Viva Mexico Cabrones
// @description	  Avisa mediante sonido las misiones de flota enemigo: Ataque, Espionaje y Confederacion, avisa de mensajes sin leer, cambia todos los colores de Galaxia y de misiones en vision Gral, Ademas actualiza la vision Gral aleatoriamente 
// @include  http://fornax.ogame.onet.pl/game/index.php* 
// ==/UserScript==

var listaElementos, elementoActual; //nos sirven para recorrer
var espionajeSound = "http://simplythebest.net/sounds/WAV/sound_effects_WAV/sound_effect_WAV_files/red_alert.wav";
var ataqueSound    = "http://simplythebest.net/sounds/WAV/WAV_files/movie_WAV_files/houston.wav";
var mensajeSound   = "http://simplythebest.net/sounds/WAV/WAV_files/movie_WAV_files/monty_message.wav";

var sonido=0;


//Ajusta el volumen, si tienen una flota numerosa y reciben muchos mensajes pueden bajarle el vol.
var volMensajes = "100";   // "0"=desactivado "100" =activado completamente
var volEspionaje= "80";
var volAtaque   = "100";



// Funcion de aleatorio...........
var MIN = 22; // segundos (MINIMO)
var MAX = 44; // segundos (MAXIMO)


//---------------- EN VISTA GENERAL ---------------------EN VISTA GALAXIA-----------------

//---La mision:-------- Color en RGB --------Tipo de jugador:---------- Color en RGB -----

var esAtacar       = "rgbx(000,200,000)";      var normal        = "rgbx(255,255,240)";
var eraAtacar      = "rgbx(150,150,150)";      var debil         = "rgbx(064,128,128)";
var vieneAtaque    = "rgbx(200,000,000)";      var fuerte        = "rgbx(255,70,70)";
                                             
var esConfed       = "rgbx(000,220,159)";      var inactivo      = "rgbx(94,255,94)";
var eraConfed      = "rgbx(150,150,150)";      var muyInactivo   = "rgbx(000,147,000)";
var vieneConfed    = "rgbx(200,000,000)";      var vacaciones    = "rgbx(0,159,236)";

var esRecolectar   = "rgbx(147,164,079)";      var suspendido    = "rgbx(000,000,000)";
var eraRecolectar  = "rgbx(150,150,150)";

var esTransportar  = "rgbx(000,237,016)";
var eraTransportar = "rgbx(150,150,150)";
var vieneTransporte= "rgbx(120,244,244)";

var esEspionaje    = "rgbx(245,160,075)";
var eraEspionaje   = "rgbx(190,120,025)";
var vieneEspionaje = "rgbx(255,083,083)";

var esDesplegar    = "rgbx(009,208,208)";
var eraDesplegar   = "rgbx(150,150,150)";

var esColonizar    = "rgbx(255,255,255)";
var eraColonizar   = "rgbx(150,150,150)";

var esMantener     = "rgbx(000,255,000)";
var eraMantener    = "rgbx(150,150,150)";

//  comienza el codigo del script....

function aleatorio(){
aleat = Math.random() * (MAX-MIN)
aleat = Math.round(aleat)
return parseInt(MIN) + aleat
} 

function playSound(){
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
   var timeID = setTimeout("location.href= document.URL", tiempo*1000)  
   var publi = document.getElementsByTagName ('th');

		for (var i = publi.length - 1; i >= 0; i--) {
			htmldentro = publi[i].innerHTML;
			if(htmldentro.search('Liczba ') != -1 ) {
                           sonido=mensajeSound;
		        }
			
	          }

   listaElementos = document.getElementsByTagName('span');
      for (var i = 0; i < listaElementos.length; i++) {
          elementoActual = listaElementos[i];
     


          if (elementoActual.className.substring(0,20)=='flight ownfederation')//La mision es: Confederacion
          {
            elementoActual.style.color = esConfed;
	  }

          if (elementoActual.className.substring(0,20)=='return ownfederation')//La mision era: Confederacion
          {
            elementoActual.style.color = eraConfed;
	  }

          if (elementoActual.className.substring(0,17)=='flight federation')//viene ataque de Confederacion
          {
            elementoActual.style.color = vieneConfed;
            if(sonido!=espionajeSound)
              sonido=ataqueSound;

	  }




          if (elementoActual.className.substring(0,16)=='flight ownattack')//La mision es: Atacar
          {
            elementoActual.style.color = esAtacar;
	  }
          if (elementoActual.className.substring(0,16)=='return ownattack')//La mision era:Atacar
	  {
            elementoActual.style.color = eraAtacar;
	  }

          if (elementoActual.className.substring(0,13)=='flight attack')//Una flota enemiga te va a atacar
	  {
            if(sonido!=espionajeSound)
              sonido=ataqueSound;
            elementoActual.style.color = vieneAtaque;
   
	  }


          if (elementoActual.className.substring(0,17)=='flight ownharvest')//La mision es: Recolectar
          {
	    elementoActual.style.color = esRecolectar;
          }
          if (elementoActual.className.substring(0,17)=='return ownharvest')//La mision era:Recolectar 
          {
            elementoActual.style.color = eraRecolectar;
          }

          
          if (elementoActual.className.substring(0,19)=='flight owntransport')//La mision es: Transportar
	  {
	    elementoActual.style.color = esTransportar;
          }
          if (elementoActual.className.substring(0,19)=='return owntransport')//La mision era:Transportar
	  {
	    elementoActual.style.color = eraTransportar;
          }
          if (elementoActual.className.substring(0,16)=='flight transport')//una flota pacifica transporta
	  {
	    elementoActual.style.color = vieneTransporte;
          }

          if (elementoActual.className.substring(0,19)=='flight ownespionage')//La mision es: Espionaje
	  {
	    elementoActual.style.color = esEspionaje;
	  }
          if (elementoActual.className.substring(0,19)=='return ownespionage')//La mision era:Espionaje
	  {
	    elementoActual.style.color = eraEspionaje;
          }

          if (elementoActual.className.substring(0,16)=='flight espionage')//Flota enemiga te Espia
	  {
            sonido=espionajeSound;
	    elementoActual.style.color = vieneEspionaje;
        }


        if (elementoActual.className.substring(0,16)=='flight owndeploy')//La mision es: Desplegar
	{
	  elementoActual.style.color = esDesplegar;
	}
        if (elementoActual.className.substring(0,16)=='return owndeploy')//La mision era:Desplegar
	{
	  elementoActual.style.color = eraDesplegar;
        }

        if (elementoActual.className.substring(0,16)=='flight owncolony')//La mision es: Colonizar
	{
	  elementoActual.style.color = esColonizar;
	}
        if (elementoActual.className.substring(0,16)=='return owncolony')//La mision era:Colonizar
	{
	  elementoActual.style.color = eraColonizar;
        }
    
        if (elementoActual.className.substring(0,15)=='holding ownhold')//La flota esta en orbita
	{
	  elementoActual.style.color = esMantener;
	}
        if (elementoActual.className.substring(0,14)=='flight ownhold')//La mision es: Mantener posision
	{
	  elementoActual.style.color = esMantener;
	}
        if (elementoActual.className.substring(0,14)=='return ownhold')//La mision era:Mantener posicion
	{
	  elementoActual.style.color = eraMantener;
        }

      } //fin del ciclo

  
  if(sonido!=0){
   playSound();
  }


}// fin de la funcion




///// Esta parte es para la galaxia

if(document.baseURI.indexOf("galaxy.php") != -1) { //Si esta abierta la parte de galaxia...
   listaElementos = document.getElementsByTagName('span');

      for (var i = 0; i < listaElementos.length; i++) {
              elementoActual = listaElementos[i];
          
          if (elementoActual.className.substring(0,6)=='normal')
        	{
        	elementoActual.style.color = normal;
        	}

          if (elementoActual.className.substring(0,8)=='inactive')
        	{
        	elementoActual.style.color = inactivo;
        	}
          if (elementoActual.className.substring(0,12)=='longinactive')
        	{
        	elementoActual.style.color = muyInactivo;
        	}
          if (elementoActual.className.substring(0,6)=='strong')
        	{
        	elementoActual.style.color = fuerte;
        	}
          if (elementoActual.className.substring(0,4)=='noob')
        	{
        	elementoActual.style.color = debil;
        	}
          if (elementoActual.className.substring(0,8)=='vacation')
        	{
        	elementoActual.style.color = vacaciones;
        	}
          if (elementoActual.className.substring(0,6)=='banned')
        	{
        	elementoActual.style.color = suspendido;
        	}


      }
}
else  //En caso contrario solo recargamos la pagina de vision General
autoReload();