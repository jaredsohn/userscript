// ==UserScript==
// @version       0.92 Beta
// @name          Alerta Ogame SMS
// @author          Eduardo Casanova
// @namespace     http://www.roendal.net
// @description          Avisa mediante SMS de las misiones de flota enemigo: Ataque, Espionaje y Confederacion. Actualiza la visiÃ³n general de manera aleatoria. He desactivado los sonidos y los camibos de color. Si los querÃ©is tener, usad el script de Ramon RS Reydmon, Alerta Ogame.

// @include        http://*.ogame.*/game/index.php?page=overview*
// @include        http://*.ogame.*/game/index.php?page=options*

// ==/UserScript==

//-----------------CONFIGURACION SCRIPT------------
// No es necesario ningun cambio, usa el menu de opciones
// de Ogame para configurarlo

//----------------COMIENZO DEL SCRIPT-----------------------
// No edites nada a partir de aqui, podria dejar de funcionar

//----------------Variables Principales----------------------
var MIN = GM_getValue('alertaogamesmsMIN',30);
var MAX = GM_getValue('alertaogamesmsMAX',45);

var calendar_user = GM_getValue('alertaogamesmscalendar_user','usuario@gmail.com');
var calendar_pass = GM_getValue('alertaogamesmscalendar_pass','contrasena');

var url_php = GM_getValue('url_php','http://www.roendal.net/ogame_scripts/sms/sms.php');

//----------------Variables Auxiliares----------------------
var listaElementos, elementoActual;
var numeroFlotasEnemigas;
var misionFlotasEnemigas;
var misionFlotasEnemigasLong;
var mensajeAlerta;
var mensajeSMS;
var parselimit;
var reloj;
const img_minus = "data:image/gif;base64,R0lGODlhCQAJAPAAAAAAAP///yH5BAAAAAAALAAAAAAJAAkAAAggAAEIHEgwgMGDAQQiPKhwYUIADwc+dDjRYcOFBDMCCAgAOw==";
const img_plus = "data:image/gif;base64,R0lGODlhCQAJAPAAAAAAAP///yH5BAAAAAAALAAAAAAJAAkAAAghAAEIHEgwgMGDAQQeBLCQoUGHCRkSlAixYsWGCBtOHBgQADs=";


//----------------Funciones Auxiliares----------------------

//Generar numero aleatorio
window.aleatorio = function(){
aleat = Math.random() * (MAX-MIN);
aleat = Math.round(aleat);
return parseInt(MIN) + aleat;
}

//Cargar scripts auxiliares
window.enviarSMS = function(texto){
        var j = document.createElement("script");
        j.type = "text/javascript";
        j.src = url_php + "?user=" + calendar_user + "&pass=" + calendar_pass + "&texto=" + texto;
        document.getElementById('smsnotificacion').appendChild(j);
}
//Probar la conexion
window.probarConexion = function(texto){
        var j = document.createElement("script");
        j.type = "text/javascript";
        j.src = url_php + "?pruebaConex=1&user=" + calendar_user + "&pass=" + calendar_pass;
        document.getElementById('pruebaconexion').appendChild(j);
}

//Probar envio sms
window.probarSMS = function(texto){
        var j = document.createElement("script");
        j.type = "text/javascript";
        j.src = url_php + "?pruebaSMS=1&user=" + calendar_user + "&pass=" + calendar_pass;
        document.getElementById('pruebasms').appendChild(j);
}


//-----------------Actualiza un timer-----------------------
//opcion = 0; Funcionamiento normal
//opcion = 1; Reiniciar contador (parselimit = aleatorio)
//opcion = 2; Frenar contador (parselimit = 0)
window.begintimer = function(opcion){
if(opcion==0){    //NORMAL

        if (!document.images)
                return;
        if (parselimit==0){
                document.getElementById('relojop').addEventListener("click", function(){begintimer(1);}, true);
                document.getElementById("relojop").innerHTML = "<a href=\"javascript:;\">Iniciar auto-vigilancia</a>";
        }else if (parselimit==1){
                window.setTimeout("location.href= document.URL", 1000);
                reloj = window.setTimeout(function(){begintimer(0);},1000);
                document.getElementById("reloj").innerHTML = "Iniciando auto-vigilancia";
                document.getElementById("relojop").innerHTML = "";
        }else{
                parselimit-=1;
                curmin=Math.floor(parselimit/60);
                cursec=parselimit%60;
                if (curmin!=0){
                        curtime=curmin+" minutos y "+cursec+" segundos hasta la siguiente vigilancia";
                }else{
                        curtime=cursec+" segundos hasta la siguiente vigilancia";
                }
                if(curmin < 10){curminstr = '0' + curmin;}else{curminstr = curmin;}
                if(cursec < 10){cursecstr = '0' + cursec;}else{cursecstr = cursec;}
                
                curminitime = curminstr + ':' + cursecstr;
                
                document.getElementById("minireloj").innerHTML = curminitime;
                document.getElementById("reloj").innerHTML = curtime;
                document.getElementById('relojop').addEventListener("click", function(){begintimer(2);GM_setValue("alertaogamesmsdesactivado",true);}, true);
                document.getElementById("relojop").innerHTML = "<a href=\"javascript:;\">Parar auto-vigilancia</a>";
                reloj = window.setTimeout(function(){begintimer(0);},1000);
        }
}else if(opcion==1){    //Reiniciar Reloj
        if(parselimit==0){
                parselimit = aleatorio ();
                reloj = window.setTimeout(function(){begintimer(0);},1000);
                document.getElementById("minireloj").innerHTML = "<font color=green><b>INIC</b></font>";
                document.getElementById("reloj").innerHTML = "Iniciando sistema ...";
                document.getElementById('relojop').addEventListener("click", function(){begintimer(2);GM_setValue("alertaogamesmsdesactivado",true);}, true);
                document.getElementById("relojop").innerHTML = "<a href=\"javascript:;\">Parar auto-vigilancia</a>";
        }
}else if(opcion==2){    //Frenar reloj

        parselimit = 0;
        clearTimeout(reloj);
        document.getElementById('relojop').addEventListener("click", function(){begintimer(1);GM_setValue("alertaogamesmsdesactivado",false);}, true);
        document.getElementById("reloj").innerHTML = "Auto-vigilancia detenida";
        document.getElementById("minireloj").innerHTML = "<font color=red><b>STOP</b></font>";
        document.getElementById("relojop").innerHTML = "<a href=\"javascript:;\">Iniciar auto-vigilancia</a>";
}else{
        document.getElementById("reloj").innerHTML = "Error en el reloj";
}
}

//Crear un div con un mensaje
window.mostrarMensaje= function(){
        var bigdiv;
        var headdiv;
        var maindiv;
        
        if(!document.getElementById('ogameextensions')){
            bigdiv = document.createElement('div');
            bigdiv.setAttribute('id','ogameextensions');
            bigdiv.style.left = "155px";
            bigdiv.style.top = "80px";
            bigdiv.style.position = "absolute";
            document.body.appendChild(bigdiv);
        }else{
            bigdiv = getElementById('ogameextensions');
        }
        
        if(!document.getElementById('ogameextensionshead')){
            headdiv = document.createElement('div');
            headdiv.setAttribute('id','ogameextensionshead');
            headdiv.style.width = "150px";
            headdiv.style.background = "#222c41";
            headdiv.style.border = "1px #415680 solid";
            headdiv.style.padding = "2px";
            headdiv.innerHTML = '<b>&gt;&gt; Extensiones Ogame</b>';
            bigdiv.appendChild(headdiv);
        }
        
        if(!document.getElementById('ogameextensionsmain')){
            maindiv = document.createElement('div');
            maindiv.setAttribute('id','ogameextensionsmain');
            maindiv.style.width = "150px";
            maindiv.style.background = "#344566";
            maindiv.style.border = "1px #415680 solid";
            maindiv.style.padding = "2px";
            bigdiv.appendChild(maindiv);
        }else{
            maindiv = getElementById('ogameextensionsmain');
        }
        
        
        var newdiv = document.createElement('div');
        newdiv.setAttribute('id','alertaogamesms');
        var newheaddiv = document.createElement('div');
        newheaddiv.setAttribute('id','alertaogamesmshead');
        var newmaindiv = document.createElement('div');
        newmaindiv.setAttribute('id','alertaogamesmsmain');
        newmaindiv.style.paddingLeft='10px';
        
        if(GM_getValue('alertaogamesmsimploded',0) == 1){
            newmaindiv.style.display = 'none';
            var imagen = document.createElement('img');
            imagen.setAttribute('id','alertaogamesmsimpexp');
            imagen.setAttribute('src',img_plus);
            imagen.addEventListener("click", alertaogamesmsexplode, false);
            newheaddiv.appendChild(imagen);
        }else{
            var imagen = document.createElement('img');
            imagen.setAttribute('id','alertaogamesmsimpexp');
            imagen.setAttribute('src',img_minus);
            imagen.addEventListener("click", alertaogamesmsimplode, false);
            newheaddiv.appendChild(imagen);        
        }
                
        
        var strong = document.createElement('b');
        strong.appendChild(document.createTextNode('Alerta Ogame SMS'));
        newheaddiv.appendChild(strong);
        var minitimer = document.createElement('div');
        minitimer.setAttribute('id','minireloj');
        minitimer.style.cssFloat = 'right';
        if(GM_getValue('alertaogamesmsimploded',0) == 1){
            minitimer.style.display = 'block';
        }else{
            minitimer.style.display = 'none';
        }
        newheaddiv.appendChild(minitimer);
        newmaindiv.appendChild(document.createTextNode('Resultado vigilancia:'));
        newmaindiv.appendChild(document.createElement('br'));
        var resultado = document.createElement('div');
        resultado.setAttribute('id','resultado');
        newmaindiv.appendChild(resultado);
        var hr = document.createElement('hr');
        hr.setAttribute('width','50%');
        newmaindiv.appendChild(hr);
        maindiv.appendChild(newdiv);
        var reloj = document.createElement('div');
        reloj.setAttribute('id','reloj');
        newmaindiv.appendChild(reloj);
        var relojop = document.createElement('div');
        relojop.setAttribute('id','relojop');
        newmaindiv.appendChild(relojop);
        var smsnotificacion = document.createElement('div');
        smsnotificacion.setAttribute('id','smsnotificacion');
        newmaindiv.appendChild(smsnotificacion);
        
        newdiv.appendChild(newheaddiv);
        newdiv.appendChild(newmaindiv);
        maindiv.appendChild(newdiv);
}
//esconder y mostrar el menu de Alerta Ogame SMS
window.alertaogamesmsimplode = function(){
        var imagen = document.getElementById('alertaogamesmsimpexp');
        imagen.setAttribute('src',img_plus);
        imagen.removeEventListener("click", alertaogamesmsimplode, false);
        imagen.addEventListener("click", alertaogamesmsexplode, false);
        document.getElementById('alertaogamesmsmain').style.display='none';
        document.getElementById('minireloj').style.display='block';
        GM_setValue('alertaogamesmsimploded',1);
}
window.alertaogamesmsexplode = function(){
        var imagen = document.getElementById('alertaogamesmsimpexp');
        imagen.setAttribute('src',img_minus);
        imagen.removeEventListener("click", alertaogamesmsexplode, false);
        imagen.addEventListener("click",  alertaogamesmsimplode, false);
        document.getElementById('alertaogamesmsmain').style.display='block';
        document.getElementById('minireloj').style.display='none';
        GM_setValue('alertaogamesmsimploded',0);
        
}


//Resultado de la vigilancia
window.mostrarResultado = function(texto){
        document.getElementById("resultado").innerHTML = texto;

}

//Recargar la web
window.autoreload = function(){

   parselimit = aleatorio();
   mostrarMensaje();
   if(GM_getValue("alertaogamesmsdesactivado",false)){
      begintimer(2); 
   }else{
      begintimer(0); 
   }
   

   mensajeAlerta = "";
   numeroFlotasEnemigas = 0;
   misionFlotasEnemigas = new Array();
   misionFlotasEnemigasLong = new Array();
   listaElementos = document.getElementsByTagName('span');
      for (var i = 0; i < listaElementos.length; i++) {
          elementoActual = listaElementos[i];

          if (elementoActual.className.substring(0,17)=='flight federation')//viene ataque de Confederacion
          {
           numeroFlotasEnemigas++;
           misionFlotasEnemigas.push("Cfd");
           misionFlotasEnemigasLong.push("Ataque confederado");

          }

          if (elementoActual.className.substring(0,13)=='flight attack')//Una flota enemiga te va a atacar
          {
           numeroFlotasEnemigas++;
           misionFlotasEnemigas.push("Atk");
           misionFlotasEnemigasLong.push("Ataque en solitario");

          }


          if (elementoActual.className.substring(0,16)=='flight espionage')//Flota enemiga te Espia
          {
           numeroFlotasEnemigas++;
           misionFlotasEnemigas.push("Esp");
           misionFlotasEnemigasLong.push("Espionaje");

          }




      } //fin del ciclo

   if(numeroFlotasEnemigas == 1){ //Hemos detectado al menos una flota enemiga, avisamos por sms
        mensajeSMS = numeroFlotasEnemigas + " flota. Mision: " + misionFlotasEnemigas.join(",");
        mensajeAlerta = numeroFlotasEnemigas + " flota enemiga detectada. Su misione es: " + misionFlotasEnemigasLong[0];
        enviarSMS(mensajeSMS);

   }else if(numeroFlotasEnemigas > 1){ //Hemos detectado mas de una flota enemiga, avisamos por sms
        mensajeSMS = numeroFlotasEnemigas + " flotas. Misiones: " + misionFlotasEnemigas.join(",");
        mensajeAlerta = numeroFlotasEnemigas + " flotas enemigas detectadas. Sus misiones son: " + misionFlotasEnemigasLong.join(", ");
        enviarSMS(mensajeSMS);

   }else{
        mensajeAlerta = "Todo en calma";

   }

   mostrarResultado(mensajeAlerta);


}

//Añadir más opciones a la pagina de opciones
window.anadirOpciones = function (){
{
TABLA = document.createElement('table');
TABLA.setAttribute('width','519');
TBODY = document.createElement('tbody');

//1
FILA1 = document.createElement('tr');
COLUMNA1 = document.createElement('td');
COLUMNA1.setAttribute('colspan','2');
COLUMNA1.setAttribute('className','c');
COLUMNA1.setAttribute('class','c');
TEXTO1 = document.createTextNode('Opciones de Alerta Ogame SMS');
COLUMNA1.appendChild(TEXTO1);

//2 Prueba de conexion
FILA2 = document.createElement('tr');
COLUMNA21 = document.createElement('th');
COLUMNA21.setAttribute('width','52%');
TEXTO21 = document.createTextNode('Prueba de conexión a Google Calendar');
COLUMNA21.appendChild(TEXTO21);
COLUMNA21.appendChild(document.createElement('br'));
COLUMNA21.appendChild(document.createTextNode('('));
A21 = document.createElement('a');
A21.setAttribute('href','http://code.google.com/intl/es-ES/apis/accounts/docs/AuthForInstalledApps.html#Errors');
A21.setAttribute('target','_blank');
A21.appendChild(document.createTextNode('Lista de posibles errores'));
COLUMNA21.appendChild(A21);
COLUMNA21.appendChild(document.createTextNode(')'));
COLUMNA22 = document.createElement('th');
BOTON22 = document.createElement('input');
BOTON22.setAttribute('type', 'submit');
BOTON22.setAttribute('value', 'Probar Conexión');
BOTON22.addEventListener("click", probarConexion, true);
COLUMNA22.appendChild(BOTON22);
COLUMNA22.appendChild(document.createElement('br'));
DIV22 = document.createElement('div');
DIV22.setAttribute('id','pruebaconexion');
COLUMNA22.appendChild(DIV22);

//2b SMS de Prueba
FILA2b = document.createElement('tr');
COLUMNA2b1 = document.createElement('th');
COLUMNA2b1.setAttribute('width','52%');
TEXTO2b1 = document.createTextNode('Envio de SMS de prueba');
COLUMNA2b1.appendChild(TEXTO2b1);
COLUMNA2b2 = document.createElement('th');
BOTON2b2 = document.createElement('input');
BOTON2b2.setAttribute('type', 'submit');
BOTON2b2.setAttribute('value', 'Probar SMS');
BOTON2b2.addEventListener("click", probarSMS, true);
COLUMNA2b2.appendChild(BOTON2b2);
COLUMNA2b2.appendChild(document.createElement('br'));
DIV2b2 = document.createElement('div');
DIV2b2.setAttribute('id','pruebasms');
COLUMNA2b2.appendChild(DIV2b2);

//3 calendar_user
FILA3 = document.createElement('tr');
COLUMNA31 = document.createElement('th');
COLUMNA31.setAttribute('width','52%');
TEXTO31 = document.createTextNode('Usuario de Google Calendar');
COLUMNA31.appendChild(TEXTO31);
COLUMNA32 = document.createElement('th');
TXTINPUT32 = document.createElement('input');
TXTINPUT32.setAttribute('type', 'text');
TXTINPUT32.setAttribute('name', 'alertaogamesmscalendar_user');
TXTINPUT32.setAttribute('id', 'alertaogamesmscalendar_user');
TXTINPUT32.setAttribute('maxlength', '100');
TXTINPUT32.setAttribute('size', '20');
TXTINPUT32.setAttribute('value', calendar_user);
COLUMNA32.appendChild(TXTINPUT32);

//4 calendar_pass
FILA4 = document.createElement('tr');
COLUMNA41 = document.createElement('th');
COLUMNA41.setAttribute('width','52%');
TEXTO41 = document.createTextNode('Password de Google Calendar');
COLUMNA41.appendChild(TEXTO41);
COLUMNA42 = document.createElement('th');
TXTINPUT42 = document.createElement('input');
TXTINPUT42.setAttribute('type', 'password');
TXTINPUT42.setAttribute('name', 'alertaogamesmscalendar_pass');
TXTINPUT42.setAttribute('id', 'alertaogamesmscalendar_pass');
TXTINPUT42.setAttribute('maxlength', '100');
TXTINPUT42.setAttribute('size', '20');
TXTINPUT42.setAttribute('value', calendar_pass);
COLUMNA42.appendChild(TXTINPUT42);

//5 MIN
FILA5 = document.createElement('tr');
COLUMNA51 = document.createElement('th');
COLUMNA51.setAttribute('width','52%');
TEXTO51 = document.createTextNode('Mínimo tiempo reload (segundos)');
COLUMNA51.appendChild(TEXTO51);
COLUMNA52 = document.createElement('th');
TXTINPUT52 = document.createElement('input');
TXTINPUT52.setAttribute('type', 'text');
TXTINPUT52.setAttribute('name', 'alertaogamesmsMIN');
TXTINPUT52.setAttribute('id', 'alertaogamesmsMIN');
TXTINPUT52.setAttribute('maxlength', '5');
TXTINPUT52.setAttribute('size', '5');
TXTINPUT52.setAttribute('value', MIN);
COLUMNA52.appendChild(TXTINPUT52);

//6 MAX
FILA6 = document.createElement('tr');
COLUMNA61 = document.createElement('th');
COLUMNA61.setAttribute('width','52%');
TEXTO61 = document.createTextNode('Máximo tiempo reload (segundos)');
COLUMNA61.appendChild(TEXTO61);
COLUMNA62 = document.createElement('th');
TXTINPUT62 = document.createElement('input');
TXTINPUT62.setAttribute('type', 'text');
TXTINPUT62.setAttribute('name', 'alertaogamesmsMAX');
TXTINPUT62.setAttribute('id', 'alertaogamesmsMAX');
TXTINPUT62.setAttribute('maxlength', '5');
TXTINPUT62.setAttribute('size', '5');
TXTINPUT62.setAttribute('value', MAX);
COLUMNA62.appendChild(TXTINPUT62);

//6b Desactivar contador
FILA6b = document.createElement('tr');
COLUMNA6b1 = document.createElement('th');
COLUMNA6b1.setAttribute('width','52%');
TEXTO6b1 = document.createTextNode('Desactivar script');
COLUMNA6b1.appendChild(TEXTO6b1);
COLUMNA6b2 = document.createElement('th');
TXTINPUT6b2 = document.createElement('input');
TXTINPUT6b2.setAttribute('type', 'checkbox');
TXTINPUT6b2.setAttribute('name', 'alertaogamesmsdesactivado');
TXTINPUT6b2.setAttribute('id', 'alertaogamesmsdesactivado');
if(GM_getValue('alertaogamesmsdesactivado',false)){
  TXTINPUT6b2.setAttribute('checked', 'checked');
}
COLUMNA6b2.appendChild(TXTINPUT6b2);

//7 Guardar Config
FILA7 = document.createElement('tr');
COLUMNA7 = document.createElement('th');
COLUMNA7.setAttribute('colspan','2');
BOTON7 = document.createElement('input');
BOTON7.setAttribute('type', 'submit');
BOTON7.setAttribute('value', 'Guardar Configuración');
BOTON7.addEventListener("click", guardarConfiguracion, true);
COLUMNA7.appendChild(BOTON7);


FILA1.appendChild(COLUMNA1);
FILA2.appendChild(COLUMNA21);
FILA2.appendChild(COLUMNA22);
FILA2b.appendChild(COLUMNA2b1);
FILA2b.appendChild(COLUMNA2b2);
FILA3.appendChild(COLUMNA31);
FILA3.appendChild(COLUMNA32);
FILA4.appendChild(COLUMNA41);
FILA4.appendChild(COLUMNA42);
FILA5.appendChild(COLUMNA51);
FILA5.appendChild(COLUMNA52);
FILA6.appendChild(COLUMNA61);
FILA6.appendChild(COLUMNA62);
FILA6b.appendChild(COLUMNA6b1);
FILA6b.appendChild(COLUMNA6b2);
FILA7.appendChild(COLUMNA7);
TBODY.appendChild(FILA1);
TBODY.appendChild(FILA2);
TBODY.appendChild(FILA2b);
TBODY.appendChild(FILA3);
TBODY.appendChild(FILA4);
TBODY.appendChild(FILA5);
TBODY.appendChild(FILA6);
TBODY.appendChild(FILA6b);
TBODY.appendChild(FILA7);
TABLA.appendChild(TBODY);

document.getElementById('content').childNodes[1].insertBefore(TABLA,document.getElementById('content').childNodes[1].childNodes[0]);
}


}

window.guardarConfiguracion = function(){
        GM_setValue("alertaogamesmscalendar_user",document.getElementById("alertaogamesmscalendar_user").value);
        GM_setValue("alertaogamesmscalendar_pass",document.getElementById("alertaogamesmscalendar_pass").value);
        GM_setValue("alertaogamesmsMIN",document.getElementById("alertaogamesmsMIN").value);
        GM_setValue("alertaogamesmsMAX",document.getElementById("alertaogamesmsMAX").value);
        var desactivado = false;
        if (document.getElementById("alertaogamesmsdesactivado").checked){desactivado = true;}
        GM_setValue("alertaogamesmsdesactivado",desactivado);
          window.setTimeout("location.href= document.URL", 50);

}

//-------------FUNCIONAMIENTO SCRIPT-----------------------

//----------------¿Estamos en overview?-------------------------

if(document.baseURI.indexOf("overview") != -1) {
        autoreload();
}

//----------------¿Estamos en opciones?-------------------------

if(document.baseURI.indexOf("options") != -1) {

        anadirOpciones();

}
