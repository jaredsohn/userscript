// ==UserScript==
// @version       1.8
// @name          Don Ruskiy
// @author	  Ramon RS Reydmon
// @namespace     Viva Mexico Cabrones
// @description	  Nada Importante xD
// @include  http://ogame*/galaxy.php*
// @include  http://ogame*.de/game/overview.php*   
// @include  http://uni*.ogame*/game/overview.php* 
// @include  http://uni*.ogame*/game/galaxy.php* 
// ==/UserScript==

var listaElementos, elementoActual; //nos sirven para recorrer
var espionajeSound = "http://www.moviewavs.com/0028375953/WAVS/Movies/Star_Wars/imperial.wav";
var ataqueSound    = "http://www.moviewavs.com/0028375953/WAVS/Movies/Star_Wars/imperial.wav";//"http://www.moviewavs.com/0028375953/WAVS/Movies/Star_Wars/imperial.wav";
var mensajeSound   = "http://www.moviewavs.com/0028375953/WAVS/Movies/Star_Wars/imperial.wav";

var sonido=0;


//Ajusta el volumen, si tienen una flota numerosa y reciben muchos mensajes pueden bajarle el vol.
var volMensajes = "10";   // "0"=desactivado "100" =activado completamente
var volEspionaje= "80";
var volAtaque   = "100";



// Funcion de aleatorio...........
var MIN = 15; // segundos (MINIMO)
var MAX = 30; // segundos (MAXIMO)


//---------------- EN VISTA GENERAL ---------------------EN VISTA GALAXIA-----------------

//---La mision:-------- Color en RGB --------Tipo de jugador:---------- Color en RGB -----

var esAtacar       = "rgb(000,200,000)";      var normal        = "rgb(255,255,240)";
var eraAtacar      = "rgb(150,150,150)";      var debil         = "rgb(064,128,128)";
var vieneAtaque    = "rgb(200,000,000)";      var fuerte        = "rgb(255,70,70)";
                                             
var esConfed       = "rgb(000,220,159)";      var inactivo      = "rgb(94,255,94)";
var eraConfed      = "rgb(150,150,150)";      var muyInactivo   = "rgb(000,147,000)";
var vieneConfed    = "rgb(200,000,000)";      var vacaciones    = "rgb(0,159,236)";

var esRecolectar   = "rgb(147,164,079)";      var suspendido    = "rgb(000,000,000)";
var eraRecolectar  = "rgb(150,150,150)";

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
			if(htmldentro.search('Tienes') != -1 ) {
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