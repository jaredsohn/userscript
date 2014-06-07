// ==UserScript==
// @name           Reportador de firmas
// @namespace      -
// @include        http://board.ogame.com.es/thread*
// ==/UserScript==

function xpath(query) {
	return document.evaluate(query, document, null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
}

//Buscamos el head para insertar el script.
var F_head = document.getElementsByTagName('head')[0];
//Creamos el script.
var F_script = document.createElement('script');
F_script.type = 'text/javascript';
//Insertamos la función enviafirma.
F_script.innerHTML = 'function enviafirma(idusu,nombre,motivo){;\n'+
	'document.formfirma.motivo.value=motivo;\n'+
	'document.formfirma.idusu.value=idusu;\n'+
	'document.formfirma.nombre.value=nombre;\n'+
	'document.formfirma.submit();\n}';
//Agregamos el script al final del head.
F_head.appendChild(F_script);

//Buscamos el body para insertar el formulario.
var F_body = document.getElementsByTagName('body')[0];
//Creamos el formulario.
var F_form = document.createElement('form');
//Configuramos todos los atributos que nos hacen falta.
F_form.name = 'formfirma';
F_form.id = 'formfirma';
F_form.method = 'post';
F_form.target = '_blank';
F_form.action = "http://kestaslame.es/peni/recibir.php";
//Lo añadimos al final del body.
F_body.appendChild(F_form);
//Creamos los elementos del formulario, inputs de texto oculto.
var F_input = document.createElement('input');
F_input.type='hidden';
F_input.name='idusu';
F_form.appendChild(F_input);
var F_input = document.createElement('input');
F_input.type='hidden';
F_input.name='nombre';
F_form.appendChild(F_input);
var F_input = document.createElement('input');
F_input.type='hidden';
F_input.name='motivo';
F_form.appendChild(F_input);

//Aquí debes poner tus datos, donde pone Penitencia has de poner tu nick de moderador.
//Más abajo, donde pone contrasenya, has de poner la pass que yo te proporcione.
var F_input = document.createElement('input');
F_input.type='hidden';
F_input.name='moderador';
F_input.value='Dummy tester';
F_form.appendChild(F_input);
var F_input = document.createElement('input');
F_input.type='hidden';
F_input.name='contrasenya';
F_input.value='tester';   //AQUÍ TU PASSWORD
F_form.appendChild(F_input);

//Buscamos todos los links que contengan 'profile.php?userid'.
var nombres = xpath("//a[contains(@href,'profile.php?userid')]");
//Comenzamos a recorrerlos.
for (var i = 0; i < nombres.snapshotLength; i++ ) 
{
	//Usuario actual.
	var estenombre = nombres.snapshotItem(i);
	//Si tiene la propiedad font en el código es porque es miembro del team. En tal caso, lo ignoramos.
	if(estenombre.innerHTML.indexOf('font')==-1)
	{	
		//Cogemos el id de usuario para poder rellenar su perfil.
		var idusu=String(estenombre.href.match(/userid=(\d+)/gi)).split("=")[1];
		//Creamos un salto de línea.
		var linea=document.createElement('br');
		//Creamos un nuevo enlace, que irá en el botón.
		var enlace =document.createElement('a');
		//Configuramos sus atributos. Al hacer click, llamará a la función mostrar.
		enlace.setAttribute('href', 'javascript:mostrar('+idusu+',"'+estenombre.innerHTML+'");');
		//Metemos código html en el contenido del link, para mostrar la imagen del botón.
		enlace.innerHTML="<img alt='Reportar firma ilegal' border='0' src='http://img113.imageshack.us/img113/9498/botonxg9.gif'/>";
		
		//Insertamos el enlace y el salto de línea, para que quede el botón encima del nombre.
		estenombre.parentNode.insertBefore(enlace,estenombre);
		estenombre.parentNode.insertBefore(linea,estenombre);
	}
}

//Función que obtiene tamaño horizontal y vertical del documento. Sacada de otro script, por lo que no la comento.
function getSize() {
  var myWidth = 0, myHeight = 0;
  if( typeof( window.innerWidth ) == 'number' ) {
    //Non-IE
    myWidth = window.innerWidth;
    myHeight = window.innerHeight;
  } else if( document.documentElement && ( document.documentElement.clientWidth || document.documentElement.clientHeight ) ) {
    //IE 6+ in 'standards compliant mode'
    myWidth = document.documentElement.clientWidth;
    myHeight = document.documentElement.clientHeight;
  } else if( document.body && ( document.body.clientWidth || document.body.clientHeight ) ) {
    //IE 4 compatible
    myWidth = document.body.clientWidth;
    myHeight = document.body.clientHeight;
  }
  return {x:myWidth,y:myHeight};
}
//Funcioó que calcula el desplazamiento horizontal y vertical del documento. Sacado de otro script, por lo que no la comento.
function getScrollXY() {
  var scrOfX = 0, scrOfY = 0;
  if( typeof( window.pageYOffset ) == 'number' ) {
    //Netscape compliant
    scrOfY = window.pageYOffset;
    scrOfX = window.pageXOffset;
  } else if( document.body && ( document.body.scrollLeft || document.body.scrollTop ) ) {
    //DOM compliant
    scrOfY = document.body.scrollTop;
    scrOfX = document.body.scrollLeft;
  } else if( document.documentElement && ( document.documentElement.scrollLeft || document.documentElement.scrollTop ) ) {
    //IE6 standards compliant mode
    scrOfY = document.documentElement.scrollTop;
    scrOfX = document.documentElement.scrollLeft;
  }
  return {x:scrOfX,y:scrOfY};
}


function mostrar(idusu,nombre)
{
	//Creamos una variable con todo el código HTML de la capa y del formulario.
	//El formulario consta de 7 botones, cada uno llama a la función "enviafirma" con los
	//datos que necesita, que son el nombre del usuario, su perfil, y el valor del botón
	//que nos indicará el motivo.
	//El botón cancelar cierra el div sin hacer nada más.
	var Code  = "<center>"+
	"<form name='form2' action='' method=''><table border='0'>"+
	"<tr><td align='center' colspan='2'><input type='button' onclick='enviafirma(\""+idusu+"\",\""+nombre+"\",\"1\");document.getElementById(\"divconfig\").style.display=\"none\"' value='Dimensiones'></td></td>"+
	"<tr><td align='center' colspan='2'><input type='button' onclick='enviafirma(\""+idusu+"\",\""+nombre+"\",\"2\");document.getElementById(\"divconfig\").style.display=\"none\"' value='Peso'></td></td>"+
	"<tr><td align='center' colspan='2'><input type='button' onclick='enviafirma(\""+idusu+"\",\""+nombre+"\",\"3\");document.getElementById(\"divconfig\").style.display=\"none\"' value='Tamaño y peso'></td></td>"+
	"<tr><td align='center' colspan='2'><input type='button' onclick='enviafirma(\""+idusu+"\",\""+nombre+"\",\"4\");document.getElementById(\"divconfig\").style.display=\"none\"' value='Contenido ofensivo'></td></td>"+
	"<tr><td align='center' colspan='2'><input type='button' onclick='enviafirma(\""+idusu+"\",\""+nombre+"\",\"5\");document.getElementById(\"divconfig\").style.display=\"none\"' value='Tamaño del texto'></td></td>"+
	"<tr><td align='center' colspan='2'><input type='button' onclick='enviafirma(\""+idusu+"\",\""+nombre+"\",\"6\");document.getElementById(\"divconfig\").style.display=\"none\"' value='Otro'></td></td>"+
	"<tr><td align='center' colspan='2'>"+
	"<input type='button' value='Cancelar' onclick='document.getElementById(\"divconfig\").style.display=\"none\"' />"+
	"</table></form></center>";
	
	//Buscamos si el div ya existe.
	var a=document.getElementById("divconfig");
	//Si existe, lo eliminamos.
	if(a) 
	{	
		var padre=a.parentNode;
		padre.removeChild(a);
		//Volvemos a generar el código HTML y lo insertamos nuevamente en el body.
		a.innerHTML=Code;
		document.body.appendChild(a);
	}
	//Si no existe, lo creamos y configuramos.
	if (!a){
		var center=document.createElement("center");
		a=document.createElement("div");
		a.innerHTML=Code;
		a.setAttribute('id', 'divconfig');
		a.style.zIndex=20;
		a.style.setProperty('background-color','#00CCFF',null);
		a.style.setProperty('color','#000000',null);
		a.style.setProperty('overflow','auto',null);
		a.style.setProperty('position','absolute',null);
		a.style.setProperty('border','4px solid #FFCB8C',null);
		//a.style.setProperty('left','0px',null);
		//a.style.setProperty('top','0px',null);
		//a.style.setProperty('width','100px',null);
		//a.style.setProperty('height','100px',null);
		center.appendChild(a);
		//Lo añadimos al body.
		document.body.appendChild(center);
	}
	var tam=getSize(); //Obtenemos el tamaño de la ventana.
	var desp=getScrollXY(); //Obtenemos el desplazamiento de la ventana.

	//Centramos el div en la pantalla.
	a.style.setProperty('left',(((tam.x-a.clientWidth)/2)+desp.x)+'px',null);
	a.style.setProperty('top',(((tam.y-a.clientHeight)/2)+desp.y)+'px',null);
	a.style.setProperty('padding','5px', null);

	//Y finalmente, mostramos el div.
	a.style.setProperty('display','',null);
}

unsafeWindow.mostrar=mostrar;