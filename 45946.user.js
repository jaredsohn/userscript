// ==UserScript==
// @author         pajafumo@hotmail.com
// @website: 	   http://www.masdetodos.com
// @version        3.1.0
// @name           Mis Contactos Claro Guatemala 3.1.0 - masdetodos.com
// @grant       GM_getValue
// @grant       GM_setValue
// @namespace      claro_contact_list 3.1.0
// @description    Script para crear una lista de contactos con celular de Claro de Guatemala. Maneja varias listas de contactos, solo tienes que ingresar tu nombre y automaticamente el script empieza a interactuar. Dudas o felicitaciones a pajafumo@hotmail.com
// @include        http://mensajes.claro.com.gt/*
// ==/UserScript==

// Begin Script Update Checker code
var SUC_script_num=45946;var version_timestamp=1370229918000;try{function updateCheck(b){if((b)||(parseInt(GM_getValue("SUC_last_update","0"))+86400000<=(new Date().getTime()))){try{GM_xmlhttpRequest({method:"GET",url:"http://userscripts.org/scripts/source/"+SUC_script_num+".meta.js?"+new Date().getTime(),headers:{"Cache-Control":"no-cache"},onload:function(f){var e,d,c,g;c=f.responseText;GM_setValue("SUC_last_update",new Date().getTime()+"");d=parseInt(/@uso:version\s*(.*?)\s*$/m.exec(c)[1]);e=parseInt(GM_getValue("SUC_current_version","-1"));if(e!=-1){g=(/@name\s*(.*?)\s*$/m.exec(c))[1];GM_setValue("SUC_target_script_name",g);if(d>e){if(confirm('There is an update available for the Greasemonkey script "'+g+'."\nWould you like to go to the install page now?')){GM_openInTab("http://userscripts.org/scripts/show/"+SUC_script_num);GM_setValue("SUC_current_version",d)}}else{if(b){alert('No update is available for "'+g+'." :(  ')}}}else{GM_setValue("SUC_current_version",d+"")}}})}catch(a){if(b){alert("An error occurred while checking for updates:\n"+a)}}}}GM_registerMenuCommand(GM_getValue("SUC_target_script_name","???")+" - Manual Update Check",function(){updateCheck(true)});updateCheck(false)}catch(err){}
// End Script Update Checker code
window.addEventListener("load", function (){
	var ventana = window.location
	if (ventana == 'http://mensajes.claro.com.gt/mensaje.php')
	{
		var str = 'ERROR:';
		if (!findString(str))
		{
			/* borrar los datos del mensaje enviado de la cookie */
			var cookiename = 'tmpmsg';
			deleteCookie(cookiename, '', -10, "/", "",null);
		}
		setTimeout ( 'window.location.replace("http://mensajes.claro.com.gt/mensaje_claro.php")', 2000 );
	}
	else
	{
		inputid();
		decorar();
		/* esperar a enviar el formulario para grabar los datos temporales*/
		var sendform = document.getElementById('B1');
		sendform.addEventListener("click", tempmsg, true);		
		var loginInput = document.getElementById('nombre');
		loginInput.addEventListener("blur", iniciar, true);		
		/* agregar los datos si hubo error al enviar */
		var cookies = document.cookie;
		var cookiename = 'tmpmsg';
		var usercookie = readCookie(cookiename);
		if ( cookies.length == 0) /* si la cookie no esta creada */
			{
			}
		else if ( null === usercookie) /* si la cookie no esta creada */
			{
			}
		else
			{
				readtempmsg();
			}
	}
}, true) //invoke function

/********************* FUNCIONES PARA DETECAR ERROR  ****************************/
function findString (str) {
/* funcion para buscar texto en la pagina, en este caso ERROR: por si hubo error al enviar el mensaje */
 if (parseInt(navigator.appVersion)<4) return;
 var strFound;
  // CODE FOR BROWSERS THAT SUPPORT window.find
  strFound=self.find(str);
  if (strFound && self.getSelection && !self.getSelection().anchorNode) {
   strFound=self.find(str)
  }
  if (!strFound) {
   strFound=self.find(str,0,1)
   while (self.find(str,0,1)) continue
  }
	 if (strFound) 
		{
		 return true;
		}
	else
		{
			return false;
		}
}


function tempmsg()
{
	var loginInput = document.getElementById('nombre').value;
	var cel = document.getElementById('telefono').value;
	var msg = document.getElementById('eBann').value;
	var data = loginInput + ':' + cel + ':' + msg;
	var cookiename = 'tmpmsg';
	var cookies = document.cookie;
	writeCookie(cookiename, data, 1500, "/", "",null); // agrego un numero en la cookie		
}

function readtempmsg()
{
	var cookiename = 'tmpmsg';
	var tmpCookie = readCookie(cookiename);
	var vals = tmpCookie.split(':');
	tmpnombre = vals[0];
	tmpcel = vals[1];
	tmpmsg = vals[2];
	var nombre = document.getElementById('nombre');
	var telefono = document.getElementById('telefono');
	var msg = document.getElementById('eBann');
	if (msg.value == '')
		{
			nombre.value = tmpnombre;
			telefono.value = tmpcel;
			msg.value = tmpmsg;
		}
}

/********************* FIN DE FUNCIONES PARA DETECTAR ERROR **************************/

function iniciar()
{
	var loginInput = document.getElementById('nombre');
	var name = loginInput.value;
	if (name == "")
	{
		document.getElementById('nombre').focus();
	}
	else
	{
	var cookies = document.cookie;
	var usercookie = readCookie(name);
	if ( cookies.length == 0 )
		{
			recordar();
		}
	else if (usercookie === null)
		{
			recordar();
		}
	else
		{
			newelements()
		}
	}
}




function recordar()
{
	var r = document.getElementById('recordar');
	if (null == r)
	{	
		var r = document.createElement("p");
		r.style.fontWeight = "bold";
		r.style.color = "#000000";
		r.setAttribute('id',"recordar");
		r.innerHTML = 'Recordar mis telefonos: <input type="checkbox" value="1" name="recordar" />';
		r.addEventListener("change", newelements, true);
		var a = document.getElementById('nombre');
		a.parentNode.insertBefore(r, a.nextSibling);
	}
	var hide = document.getElementById('newelement');
	if (hide != null)
		{
			hide.style.display='none';
		}
}

function newelements()
{
	// funcion para agregar despues de...
	var a = document.getElementById('nombre');
	name = a.value;
	var p = document.getElementById('newelement');
	if (null == p)
	{
	var n = document.createElement("p");
	n.setAttribute('id','newelement');
	a.parentNode.insertBefore(n, a.nextSibling); // pone despues del campo
	p = document.getElementById('newelement');
	}
	var cookies = document.cookie;
	var usercookie = readCookie(name);
	if ( cookies.length == 0)
		{
			/* oculto el elemento para recordar */
			var hide = document.getElementById('recordar');
			hide.style.display='none';
			/* agregamos los elementos para agregar contactos */
			var options = '<option value="">contactos</option><option value="1">agregar contacto</option>';
			p.innerHTML = '<select name="select" id="miscontactos" >'+options+'</select>';
			p.innerHTML += '<br /><a href="#" id="agregarcontacto" >Agregar Contacto</a>';
			select = document.getElementById('miscontactos');
			select.addEventListener("change", agregar, true);
			link = document.getElementById('agregarcontacto');
			link.addEventListener("click", agregar, true);
		}
	else if ( null == usercookie )
		{
			/* oculto el elemento para recordar */
			var hide = document.getElementById('recordar');
			hide.style.display='none';
			/* agregamos los elementos para agregar contactos */
			var options = '<option value="">contactos</option><option value="1">agregar contacto</option>';
			p.innerHTML = '<select name="select" id="miscontactos" >'+options+'</select>';
			p.innerHTML += '<br /><a href="#" id="agregarcontacto" >Agregar Contacto</a>';
			select = document.getElementById('miscontactos');
			select.addEventListener("change", agregar, true);
			link = document.getElementById('agregarcontacto');
			link.addEventListener("click", agregar, true);
		}
	else
		{
			/* oculto el elemento para recordar */
			var hide = document.getElementById('recordar');
			if (hide != null)
			{
			hide.style.display='none';
			}
			/* leemos los valores de la libreta */
			var tmpCookie = readCookie(name);
			var vals = tmpCookie.split(',');
			var options = '<option value="">mis contactos</option>';
			for (var i=0;i<vals.length;i++)
			{
				var nombre = vals[i].split(':');
				nombre = nombre[0];
				var numero = vals[i].split(':');
				numero = numero[1];
				options += '<option value="'+numero+'">'+nombre+'</option>';
			}
			p.innerHTML = '<select name="select" id="miscontactos" >'+options+'</select>';
			p.innerHTML += '<br /><br /><br /><a href="#" id="agregarcontacto" >Agregar Contacto</a>';
			p.innerHTML += '&nbsp;&nbsp;&nbsp;<a href="#" id="eliminarcontacto" >Eliminar Contacto</a>';
			
			select = document.getElementById('miscontactos');
			select.addEventListener("change", putcel, true);
			
			link = document.getElementById('agregarcontacto');
			link.addEventListener("click", agregar, true);
			
			linke = document.getElementById('eliminarcontacto');
			linke.addEventListener("click", eliminarcontacto, true);
		}
}

function putcel()
{
	var num = document.getElementById('miscontactos').value;
	var cel = document.getElementById('telefono');
	if (cel.value != num)
		{
			cel.value = num;
		}
}
	
function agregar()
{
// funcion para agregar despues de...
var a2 = document.getElementById('agregarcontacto');
a2.style.display='none';
var t = document.createElement("p");
t.style.color = "#000000";
t.innerHTML = '<form name="agregarcel" id="agregarcel">nombre: <input name="contacto" id="contacto" value="" type="text" size="10" maxlength="10"></input>&nbsp; telefono: <input name="celular" id="celular" value="" type="text" size="10" maxlength="8"></input>&nbsp;<input type="button" id="buttonagregar" value="Agregar" /></form>';
a2.parentNode.insertBefore(t, a2.nextSibling); // pone encima del campo
			boton = document.getElementById('buttonagregar');
			boton.addEventListener("click", crearcontacto, true);  //wcmHerramientasBarraCC
}
	
function crearcontacto()
{
	var nombre = document.getElementById('contacto').value;
	var celular = document.getElementById('celular').value;
	if (nombre == '' || celular == '')
	{
		alert('Debes agregar un numero')
	}
	else
	{
	var loginInput = document.getElementById('nombre');
	name = loginInput.value;
	var cookies = document.cookie;
	var usercookie = readCookie(name);
	if ( cookies.length == 0)
		{
			writeCookie(loginInput.value, nombre+':'+celular, 1500, "/", "",null);
			/* mensaje de exito */
			var a2 = document.getElementById('telefono');
			var t2 = document.createElement("p");
			t2.style.color = "#000000";
			t2.innerHTML = 'Contacto agregado<br>nombre: '+nombre+'<br> cel: '+celular;
			a2.parentNode.insertBefore(t2, a2.nextSibling); // pone encima del campo
			var cel = document.getElementById('telefono');
			cel.value = celular;
			var h = document.getElementById('agregarcel');
			h.style.display='none';
		}
	else if ( null === usercookie)
		{
			writeCookie(loginInput.value, nombre+':'+celular, 1500, "/", "",null);
			/* mensaje de exito */
			var a2 = document.getElementById('telefono');
			var t2 = document.createElement("p");
			t2.style.color = "#000000";
			t2.innerHTML = 'Contacto agregado<br>nombre: '+nombre+'<br> cel: '+celular;
			a2.parentNode.insertBefore(t2, a2.nextSibling); // pone encima del campo
			var cel = document.getElementById('telefono');
			cel.value = celular;
			var h = document.getElementById('agregarcel');
			h.style.display='none';
		}
	else
		{
			//alert("proc para add more");
			tmpCookie = readCookie(loginInput.value);
			tmpCookie += ','+nombre+':'+celular;
			writeCookie(loginInput.value, tmpCookie, 1500, "/", "",null); // agrego un numero en la cookie
			/* mensaje de exito */
			var a2 = document.getElementById('telefono');
			var t2 = document.createElement("p");
			t2.style.color = "#000000";
			t2.innerHTML = 'Contacto agregado<br>nombre: '+nombre+'<br> cel: '+celular;
			a2.parentNode.insertBefore(t2, a2.nextSibling); // pone encima del campo
			var cel = document.getElementById('telefono');
			cel.value = celular;
			var h = document.getElementById('agregarcel');
			h.style.display='none';
		}
	}
}

function eliminarcontacto()
{
	var contacto = document.getElementById('miscontactos');
	var eliminar = contacto.value;
	if (eliminar == "")
	{
		alert('Debes seleccionar un contacto para eliminarlo!');
	}
	else
	{
		/* leemos los valores de la libreta */
		var loginInput = document.getElementById('nombre');
		name = loginInput.value;
		var tmpCookie = readCookie(name);
		var contactos = tmpCookie.split(',');
			var newcontactos = '';			
			for (var i=0; i<contactos.length; i++)
				{
					if ( contactos[i].indexOf(eliminar) != -1)
						{
							//document.getElementById('resultado'+i).innerHTML='Contacto eliminado '+eliminar
						}
					else
						{
							//document.getElementById('resultado'+i).innerHTML=contactos[i]
							newcontactos = newcontactos+','+contactos[i]
						}
				}
			newcontactos = newcontactos.substring(1)	
		if (newcontactos == "")
			{
				deleteCookie(loginInput.value, newcontactos, -10, "/", "",null); // agrego un numero en la cookie
				alert('Contacto eliminado: '+eliminar);
			}
		else
			{
				writeCookie(loginInput.value, newcontactos, 1500, "/", "",null); // agrego un numero en la cookie		
				alert('Contacto eliminado: '+eliminar);
			}
	}
}

function writeCookie(nombre, valor, validez, ruta, dominio,secure) 
{
	var date = new Date();
	date.setTime(date.getTime() + (validez * 24 * 60 * 60 * 1000));
	document.cookie = 'claro_'+nombre + "=" + encodeURIComponent(valor) + 
	((validez == null) ? "" : "; expires=" + date.toUTCString()) +
	((ruta == null) ? "" : "; path=" + ruta) +
	((dominio == null) ? "" : "; domain=" + dominio) +
	((secure == null) ? "" : "; secure");
} 

function readCookie(name)
{	
  var mycookie = 'claro_'+name + "=";               
  var cookies = document.cookie;             
  if (cookies.length > 0) 
  {              
    var inicio = cookies.indexOf(mycookie);       
    if (inicio != -1) 
		{           
		  inicio += mycookie.length;       
		  var fin = cookies.indexOf(";", inicio);
		  if (fin == -1) fin = cookies.length;
			return decodeURIComponent(cookies.substring(inicio, fin));
		} 
  }
  return null;
}

function deleteCookie(nombre, valor, validez, ruta, dominio,secure) 
{
	var date = new Date(1970, 1, 1, 0, 0, 0);
	document.cookie = 'claro_'+nombre + "=" + encodeURIComponent(valor) + 
	((validez == null) ? "" : "; expires=" + date.toUTCString()) +
	((ruta == null) ? "" : "; path=" + ruta) +
	((dominio == null) ? "" : "; domain=" + dominio) +
	((secure == null) ? "" : "; secure");
}


function inputid()
{
	var campos = document.getElementsByTagName('input');
	for(var i = 0; i<campos.length; i++)
		{
			var nombrecampo = campos[i].name;
			if ( !campos[i].id )
				{
					campos[i].setAttribute("id", nombrecampo);
					document.getElementById(nombrecampo).style.border='1px solid #c4a000';
					document.getElementById(nombrecampo).style.background="#ffffff url(http://www.masdetodos.com/images/boton_amarillo.jpg) repeat-x";
					document.getElementById(nombrecampo).style.color="#000000";
				}
		}
	var tablas=document.getElementsByTagName("table");
	for(var a=0;a<tablas.length;a++)
		{
			tablas[a].setAttribute("id","tabla_"+a)
		}
		
	var tr=document.getElementsByTagName("tr");
	for(var a=0;a<tr.length;a++)
		{
			tr[a].setAttribute("id","tr_"+a)
		}
}

function decorar(){			
	document.body.style.background="#000000";
	document.getElementById("tabla_0").style.background="url(http://www.masdetodos.com/images/gradienteorange.jpg) repeat-x";
	var mensajes = document.getElementById('tr_0');
	if (mensajes != null)
		{
			mensajes.style.display='none';
		}	
	//document.getElementById("tabla_0").style.height='350px';
	document.getElementById('eBann').style.color="#000000";
	document.getElementById('eBann').style.border='1px solid #c4a000';
	document.getElementById('eBann').style.background="#ffffff url(http://www.masdetodos.com/images/gradientegreen2.jpg) repeat-x";
	
	}


function getElementsByClass(node,searchClass,tag) {
	/* usage:
		getElementsByClass(document,'midTxt1','p');
		var pframe = document.getElementById('midTxt1_1');
		pframe.setAttribute("style","width: 100%; height: 1000px");
	*/
	var classElements = new Array();
	var els = node.getElementsByTagName(tag); // use "*" for all elements
	var elsLen = els.length;
	var pattern = new RegExp("\\b"+searchClass+"\\b");
	for (i = 0, j = 0; i < elsLen; i++) {
	 if ( pattern.test(els[i].className) ) {
		 classElements[j] = els[i];
		 classElements[j].setAttribute("id",searchClass+"_"+j);
		 j++;
	 	}
	}
	return classElements;
}



