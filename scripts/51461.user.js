// ==UserScript==
// @name           PasarFotos
// @namespace      To_Net
// @include        http://www.tuenti.com/*
// ==/UserScript==



//GENERAR ELEMENTOS HTML, FORMULARIO DE ENTRADA DE DATOS PARA USUARIO.
var respondedor = document.createElement("div");
    respondedor.setAttribute("id","respondedor");

	var boton = document.createElement("input");
	    boton.setAttribute("type","submit");
	    boton.setAttribute("name","btnG");
	    boton.setAttribute("value",'Ok');
	    boton.setAttribute("onclick",function(){LanzaR()});
boton.addEventListener("click", function(){LanzaR()}, true);


	var etiqueta = document.createElement("input");
	    etiqueta.setAttribute("type","label");
	    etiqueta.setAttribute("AutoSize",true);
	    etiqueta.setAttribute("border",false);
	    etiqueta.setAttribute("readonly",true);
	    etiqueta.setAttribute("name","etiq");
	    etiqueta.setAttribute("value","Foto Numero:");

	var casilla = document.createElement("input");
	    casilla.setAttribute("name","casi")
	    casilla.setAttribute("maxlength",4);

	var imagen = document.createElement("img");
          imagen.setAttribute("type","img");
	    imagen.setAttribute("src","http://img32.imageshack.us/img32/7466/logoscripts.png");
          imagen.setAttribute("width","20%");



//SE DEFINE SU POSICI�N EN LA WEB.
respondedor.appendChild(document.createElement("br"));
respondedor.appendChild(imagen); 
respondedor.appendChild(etiqueta);     
respondedor.appendChild(casilla);
respondedor.appendChild(boton);
	var panel = document.getElementById("css_monitors");
    	panel.appendChild(respondedor);
	


//FUNCI�N QUE SE EJECUTA CUANDO HACEMOS CLICK EN EL BOT�N QUE HEMOS HABILITADO ARRIBA.
function LanzaR()
{

//PRIMERO, CALCULAR� EL ALBUM Y LA PAGINA EN LA QUE SE ENCUENTRA LA FOTO A LA QUE QUEREMOS IR, PARA AVERIGUAR EL ALBUM Y EL ID DE USUARIO LO LEERA DIRECTAMENTE DEL LINK.
var url= document.location.href;

if (url.substring(0,62)=="http://www.tuenti.com/#m=Photo&func=view_photo&collection_key=")
{
url= url.replace("http://www.tuenti.com/#m=Photo&func=view_photo&","");
var A= url.substring(0,25);

var valor= casilla.value;
var B= Math.floor(valor/25);
var C=valor%25

if (C==0)
{
B=B-1;
C=25;
}


var NuevoUrl="http://www.tuenti.com/#m=Albums&func=index&"+A+"&photo_albums_page=0&photos_page="+B

//UNA VEZ TENEMOS LOS DATOS DEL LINK QUE NOS LLEVAR� A LA PAGINA DEL ALBUM QUE NOS INTERESA, NOS MANDAR� A ELLA:
document.location.href=(NuevoUrl);

//UNA VEZ HECHO, DEBE PULSAR EN LA IMAGEN DE LAS 25 QUE HAY EN LA PAGINA DEL ALBUM, DEBE PINCHAR LA CORRECTA.
setTimeout(function(){PinchaR()},900)
}


function PinchaR()
{


//PRIMERO LEERA TODOS LOS LINKS QUE TENEMOS EN LA PAGINA PARA ACUMULAR EN UN ARRAY TODOS LOS LINKS.
var as = document.getElementsByTagName('a');
fotos = new Array(as.length);
var j=0;
       for(var i=0; i<as.length; i++) {
         var atributo = as[i].getAttribute('href');
//CON ESTE IF NOS COMPROBAR� SI EL LINK ES DE UNA FOTO O ES A CUALQUIER OTRA COSA, DE MODO QUE ALMACENAR� EN UN NUEVO ARRAY, FOTOS[], SOLO LOS LINKS QUE CUMPLAN ESA CONDICION, PARA ASI ELIMINAR LOS QUE SOBRAN, LOS UNICOS QUE LA CUMPLEN SON LOS QUE PASAN EL CONDICIONAL QUE TENEMOS ACONTINUACI�N.
			if (atributo.substring(0,9)==("#m=Photo&")){            
                     fotos[j]=atributo;
                     j++;
			 }
       }

//POR UN MOTIVO QUE DESCONOZCO, EN EL ARRAY ANTERIOR CON LAS FOTOS, NO SE ALMACENAN TODAS CORRECTAMENTE SINO QUE ALGUNAS SE REPITEN, TENEMOS LA SUERTE DE QUE LAS QUE SE REPITEN EST�N ACONTINUACI�N UNAS DE OTRAS.
//CON LO SIGUIENTE LO QUE HAREMOS SER� CREAR UN NUEVO ARRAY EN EL CUAL NO INCLUIR� LAS FOTOS QUE SE REPITAN, NO ES DIFICIL ENTENDER COMO FUNCIONA EL BUCLE PARA REALIZARLO.
var n=0;
var fotos2=new Array(25);

for (var k=0; k<fotos.length;k++)
{

if (fotos[k]==fotos[k+1])
{
fotos2[n]=fotos[k];
k++;
} 
else 
{
fotos2[n]=fotos[k];
}
n++;
}


//UNA VEZ TENEMOS EN EL ARRAY FOTOS2[] TODAS LAS FOTOS DE LA PAGINA CORRECTAMENTE ORDENADAS, DE IZQUIERDA A DERECHA Y ARRIBA ABAJO, EL SCRIPT NOS REDIRECCIONAR� A LA DIRECCI�N DEL ELEMENTO DEL ARRAY QUE COINCIDE CON LA FOTO QUE QUEREMOS VER, QUE ES EL RESTO DE LA DIVISI�N DE LA FOTO A LA QUE QUEREMOS IR Y LAS QUE HAY EN CADA PAGINA (25)
var valor= casilla.value;

var C=((valor%25)-1)

if (C==-1)
{
C=24;
}


document.location.href=(fotos2[C]);
}
}