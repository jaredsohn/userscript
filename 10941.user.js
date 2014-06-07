   1. // ==UserScript==
   2. // @version       1.8
   3. // @name          Alerta Ogame
   4. // @author      gongas
   5. // @namespace     viva Portugal
   6. // @description      Avisa mediante sons as as missões inimigas : Ataque, Espionagem , avisa de mensagens , modifica todas los cores de Galáxia e das missões na vista geral, Actualiza a vista geral aleatoriamente
   7. // @include  http://ogame*/galaxy.php*
   8. // @include  http://ogame*.de/game/overview.php*  
   9. // @include  http://uni*.ogame*/game/overview.php*
  10. // @include  http://uni*.ogame*/game/galaxy.php*
  11. // ==/UserScript==
  12.
  13. var listaElementos, elementoActual; //nos sirven para recorrer
  14. var espionajeSound = "http://sounds.wavcentral.com/movies/starwars/alerted.mp3";
  15. var ataqueSound    = "http://yitan.prohosts.org/Sounds/ataqueSound.mp3";//"http://www.moviewavs.com/0028375953/WAVS/Movies/Star_Wars/imperial.wav&quot;;
  16. var mensajeSound   = "http://sounds.wavcentral.com/movies/starwars/target.mp33";
  17.
  18. var sonido=0;
  19.
  20.
  21. //Ajusta el volumen, si tienen una flota numerosa y reciben muchos mensajes pueden bajarle el vol.
  22. var volMensajes = "60";   // "0"=desactivado "100" =activado completamente
  23. var volEspionaje= "80";
  24. var volAtaque   = "100";
  25.
  26.
  27.
  28. // Funcion de aleatorio...........
  29. var MIN = 15; // segundos (MINIMO)
  30. var MAX = 30; // segundos (MAXIMO)
  31.
  32.
  33. //---------------- EN VISTA GENERAL ---------------------EN VISTA GALAXIA-----------------
  34.
  35. //---La mision:-------- Color en RGB --------Tipo de jugador:---------- Color en RGB -----
  36.
  37. var esAtacar       = "rgb(000,200,000)";      var normal        = "rgb(255,255,240)";
  38. var eraAtacar      = "rgb(150,150,150)";      var debil         = "rgb(064,128,128)";
  39. var vieneAtaque    = "rgb(200,000,000)";      var fuerte        = "rgb(255,70,70)";
  40.                                             
  41. var esConfed       = "rgb(000,220,159)";      var inactivo      = "rgb(94,255,94)";
  42. var eraConfed      = "rgb(150,150,150)";      var muyInactivo   = "rgb(000,147,000)";
  43. var vieneConfed    = "rgb(200,000,000)";      var vacaciones    = "rgb(0,159,236)";
  44.
  45. var esRecolectar   = "rgb(147,164,079)";      var suspendido    = "rgb(000,000,000)";
  46. var eraRecolectar  = "rgb(150,150,150)";
  47.
  48. var esTransportar  = "rgb(000,237,016)";
  49. var eraTransportar = "rgb(150,150,150)";
  50. var vieneTransporte= "rgb(120,244,244)";
  51.
  52. var esEspionaje    = "rgb(245,160,075)";
  53. var eraEspionaje   = "rgb(190,120,025)";
  54. var vieneEspionaje = "rgb(255,083,083)";
  55.
  56. var esDesplegar    = "rgb(009,208,208)";
  57. var eraDesplegar   = "rgb(150,150,150)";
  58.
  59. var esColonizar    = "rgb(255,255,255)";
  60. var eraColonizar   = "rgb(150,150,150)";
  61.
  62. var esMantener     = "rgb(000,255,000)";
  63. var eraMantener    = "rgb(150,150,150)";
  64.
  65.
  66. //  comienza el codigo del script....
  67.
  68. function aleatorio(){
  69. aleat = Math.random() * (MAX-MIN)
  70. aleat = Math.round(aleat)
  71. return parseInt(MIN) + aleat
  72. }
  73.
  74. function playSound(){
  75.      body = document.getElementsByTagName("body")[0];
  76.      var emb = document.createElement("embed");
  77.      emb.src = sonido;
  78.      emb.setAttribute("autostart", "true");
  79.      emb.setAttribute("loop", "false");
  80.      emb.setAttribute("hidden", "true");
  81.      emb.setAttribute("volume", volMensajes);
  82.      body.appendChild(emb);
  83. }
  84.
  85.
  86.
  87. function autoReload()
  88. {
  89.    sonido=0;
  90.    var tiempo=aleatorio();
  91.    var timeID = setTimeout("location.href= document.URL", tiempo*1000) 
  92.    var publi = document.getElementsByTagName ('th');
  93.
  94.         for (var i = publi.length - 1; i >= 0; i--) {
  95.             htmldentro = publi[i].innerHTML;
  96.             if(htmldentro.search('Tienes') != -1 ) {
  97.                            sonido=mensajeSound;
  98.                 }
  99.            
 100.               }
 101.
 102.    listaElementos = document.getElementsByTagName('span');
 103.       for (var i = 0; i < listaElementos.length; i++) {
 104.           elementoActual = listaElementos[i];
 105.     
 106.
 107.
 108.           if (elementoActual.className.substring(0,20)=='flight ownfederation')//La mision es: Confederacion
 109.           {
 110.             elementoActual.style.color = esConfed;
 111.       }
 112.
 113.           if (elementoActual.className.substring(0,20)=='return ownfederation')//La mision era: Confederacion
 114.           {
 115.             elementoActual.style.color = eraConfed;
 116.       }
 117.
 118.           if (elementoActual.className.substring(0,17)=='flight federation')//viene ataque de Confederacion
 119.           {
 120.             elementoActual.style.color = vieneConfed;
 121.             if(sonido!=espionajeSound)
 122.               sonido=ataqueSound;
 123.
 124.       }
 125.
 126.
 127.
 128.
 129.           if (elementoActual.className.substring(0,16)=='flight ownattack')//La mision es: Atacar
 130.           {
 131.             elementoActual.style.color = esAtacar;
 132.       }
 133.           if (elementoActual.className.substring(0,16)=='return ownattack')//La mision era:Atacar
 134.       {
 135.             elementoActual.style.color = eraAtacar;
 136.       }
 137.
 138.           if (elementoActual.className.substring(0,13)=='flight attack')//Una flota enemiga te va a atacar
 139.       {
 140.             if(sonido!=espionajeSound)
 141.               sonido=ataqueSound;
 142.             elementoActual.style.color = vieneAtaque;
 143.   
 144.       }
 145.
 146.
 147.           if (elementoActual.className.substring(0,17)=='flight ownharvest')//La mision es: Recolectar
 148.           {
 149.         elementoActual.style.color = esRecolectar;
 150.           }
 151.           if (elementoActual.className.substring(0,17)=='return ownharvest')//La mision era:Recolectar
 152.           {
 153.             elementoActual.style.color = eraRecolectar;
 154.           }
 155.
 156.          
 157.           if (elementoActual.className.substring(0,19)=='flight owntransport')//La mision es: Transportar
 158.       {
 159.         elementoActual.style.color = esTransportar;
 160.           }
 161.           if (elementoActual.className.substring(0,19)=='return owntransport')//La mision era:Transportar
 162.       {
 163.         elementoActual.style.color = eraTransportar;
 164.           }
 165.           if (elementoActual.className.substring(0,16)=='flight transport')//una flota pacifica transporta
 166.       {
 167.         elementoActual.style.color = vieneTransporte;
 168.           }
 169.
 170.           if (elementoActual.className.substring(0,19)=='flight ownespionage')//La mision es: Espionaje
 171.       {
 172.         elementoActual.style.color = esEspionaje;
 173.       }
 174.           if (elementoActual.className.substring(0,19)=='return ownespionage')//La mision era:Espionaje
 175.       {
 176.         elementoActual.style.color = eraEspionaje;
 177.           }
 178.
 179.           if (elementoActual.className.substring(0,16)=='flight espionage')//Flota enemiga te Espia
 180.       {
 181.             sonido=espionajeSound;
 182.         elementoActual.style.color = vieneEspionaje;
 183.         }
 184.
 185.
 186.         if (elementoActual.className.substring(0,16)=='flight owndeploy')//La mision es: Desplegar
 187.     {
 188.       elementoActual.style.color = esDesplegar;
 189.     }
 190.         if (elementoActual.className.substring(0,16)=='return owndeploy')//La mision era:Desplegar
 191.     {
 192.       elementoActual.style.color = eraDesplegar;
 193.         }
 194.
 195.         if (elementoActual.className.substring(0,16)=='flight owncolony')//La mision es: Colonizar
 196.     {
 197.       elementoActual.style.color = esColonizar;
 198.     }
 199.         if (elementoActual.className.substring(0,16)=='return owncolony')//La mision era:Colonizar
 200.     {
 201.       elementoActual.style.color = eraColonizar;
 202.         }
 203.    
 204.         if (elementoActual.className.substring(0,15)=='holding ownhold')//La flota esta en orbita
 205.     {
 206.       elementoActual.style.color = esMantener;
 207.     }
 208.         if (elementoActual.className.substring(0,14)=='flight ownhold')//La mision es: Mantener posision
 209.     {
 210.       elementoActual.style.color = esMantener;
 211.     }
 212.         if (elementoActual.className.substring(0,14)=='return ownhold')//La mision era:Mantener posicion
 213.     {
 214.       elementoActual.style.color = eraMantener;
 215.         }
 216.
 217.       } //fin del ciclo
 218.
 219.  
 220.   if(sonido!=0){
 221.    playSound();
 222.   }
 223.
 224.
 225. }// fin de la funcion
 226.
 227.
 228.
 229.
 230. ///// Esta parte es para la galaxia
 231.
 232. if(document.baseURI.indexOf("galaxy.php") != -1) { //Si esta abierta la parte de galaxia...
 233.    listaElementos = document.getElementsByTagName('span');
 234.
 235.       for (var i = 0; i < listaElementos.length; i++) {
 236.               elementoActual = listaElementos[i];
 237.          
 238.           if (elementoActual.className.substring(0,6)=='normal')
 239.             {
 240.             elementoActual.style.color = normal;
 241.             }
 242.
 243.           if (elementoActual.className.substring(0,8)=='inactive')
 244.             {
 245.             elementoActual.style.color = inactivo;
 246.             }
 247.           if (elementoActual.className.substring(0,12)=='longinactive')
 248.             {
 249.             elementoActual.style.color = muyInactivo;
 250.             }
 251.           if (elementoActual.className.substring(0,6)=='strong')
 252.             {
 253.             elementoActual.style.color = fuerte;
 254.             }
 255.           if (elementoActual.className.substring(0,4)=='noob')
 256.             {
 257.             elementoActual.style.color = debil;
 258.             }
 259.           if (elementoActual.className.substring(0,8)=='vacation')
 260.             {
 261.             elementoActual.style.color = vacaciones;
 262.             }
 263.           if (elementoActual.className.substring(0,6)=='banned')
 264.             {
 265.             elementoActual.style.color = suspendido;
 266.             }
 267.
 268.
 269.       }
 270. }
 271. else  //En caso contrario solo recargamos la pagina de vision General
 272. autoReload();